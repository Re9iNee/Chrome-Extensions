window.addEventListener("copy", e => {
    const text = window.getSelection().toString()
    if (text.trim()) {
        chrome.runtime.sendMessage({
            content: text.trim()
        }, response => {
            console.log(response.farewell);
        });
    }
})