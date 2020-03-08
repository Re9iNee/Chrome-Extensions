console.log("background is running");
window.word = "night"
chrome.runtime.onMessage.addListener((request) => {
    window.word = request.text;
})