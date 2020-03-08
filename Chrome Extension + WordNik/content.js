window.addEventListener("mouseup", () => {
    let words = window.getSelection().toString().trim()
    if (words.length > 0) {
        let message = {
            text: words
        }
        chrome.runtime.sendMessage(message)
    }
})