// document.body.style.border = "5px solid red";

console.log("Hi from chatgptff")
function sendPrompt(text) {
    const v = document.getElementById('prompt-textarea');
    v.value = text;
    v.dispatchEvent(new Event('input', {bubbles: true}));
    setTimeout(() => {
        v.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true
        }));
    }, 500)
};
const query = new URL(window.location.href).searchParams.get("q");
console.log("Process by chatgptff " + query);
sendPrompt(new URL(window.location.href).searchParams.get("q"));


