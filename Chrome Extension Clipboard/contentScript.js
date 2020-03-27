console.log("Content Script")
window.addEventListener("copy", e => {
    console.log(window.getSelection().toString());
    const text = window.getSelection().toString()
    if (text.trim()) {
        chrome.runtime.sendMessage({
            content: text
        }, response => {
            console.log(response.farewell);
        });
    }
})