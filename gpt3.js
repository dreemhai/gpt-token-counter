
function checkTabsAndSendStream(message, tabs, string, body_data, idpopup) {
    if (tabs.id == -1) { //pdf case
      console.log("pdf case");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          sendStream(message, tabs[0].id, string, body_data, idpopup);
        });
      }
      else {// html case
        console.log("html case");
        sendStream(message, tabs.id, string, body_data, idpopup);
      }
    }
    
function sendStream(message, id, string, body_data, idpopup, uuid) {
      chrome.tabs.sendMessage(id, {
        message: message,
        text: string,
        body_data: body_data,
        id_popup: idpopup,
        uuid : uuid
      }); //send the completion to the content script
    }

async function promptGPT3Prompting(prompt, items, tabs) {
  console.log("promptGPT3Prompting ");
  var text = prompt["prompt"]
  var model = prompt["model"]
  var temperature = prompt["temperature"]
  var max_tokens = prompt["max_tokens"]
  var popupID = prompt["popupID"] // may be undefined
  var uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  //send immediately text to the content script
  console.log(text, model, temperature, max_tokens);
  const url = "https://api.openai.com/v1/completions";
  var body_data = {
    "model": model,
    "temperature": temperature,
    "max_tokens": max_tokens,
    "prompt": text,
    "stream": true
  };
  // remove stream from body_data
  var str_body_data = JSON.stringify(body_data);

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + items.APIKEY
    },
    body: str_body_data
  }
  ).then((response) => response.body)
    .then((body) => {
      checkTabsAndSendStream("GPTprompt", tabs, text, body_data, popupID,uuid); // send the prompt to the content script, to be added to last mini popup
      const reader = body.getReader();
      return pump();

      function pump() {
        return reader.read().then(({ done, value }) => {
          // When no more data needs to be consumed, close the stream
          if (done) {
            console.log("reader:done");
            return;
          }
          // Enqueue the next data chunk into our target stream
          // console.log(value);
          var stream = new TextDecoder().decode(value);//.substring(6);
          // console.log(string, typeof string);
          // if tabs.id == -1 then use querySelector to get the tab
          checkTabsAndSendStream("GPTStream_completion", tabs, stream, str_body_data, popupID, uuid);
          return pump();
        });
      }
    }
    ).catch(err => {
      console.log("error" + err);
      checkTabsAndSendStream("GPTStream_completion", tabs, "Error:" + err, str_body_data, popupID, uuid);
    });
}

export default promptGPT3Prompting;