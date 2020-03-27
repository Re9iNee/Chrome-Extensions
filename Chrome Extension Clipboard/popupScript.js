const backgPage = chrome.extension.getBackgroundPage()
const dbCopy = backgPage.load("Clipboard")

function write(text) {
    if (text) {
        document.body.appendChild(document.createTextNode(text))
    } else {
        return
    }
}

const tr = document.querySelector("tr");

document.querySelectorAll('tr').forEach((elt, index) => {
    if (index !== 0) {
        elt.addEventListener("click", event => {
            const text = elt.firstElementChild.textContent;
            copy(text)
        })
    }
})

async function copy(text) {
    await navigator.clipboard.writeText(text);
    /* Alert the copied text */
    alert("Copied the text: " + text);
}



/* add to library */
add2Library("ClipBoard Bluh Bluh", "1 Minute Ago")

function add2Library(text, time) {
    document.querySelector("table").appendChild(elt("tr", {
        onclick: clicked
    }, elt("td", null, text), elt("td", null, time)))
}

function clicked(event) {
    const text = this.firstElementChild.textContent
    copy(text)
}

function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (child of children) {
        if (typeof child != "string") dom.appendChild(child)
        else dom.appendChild(document.createTextNode(child))
    }
    return dom;
}

function sort(database, by) {
    // console.log(db().order("timestamp").first().text);
    return database().order(by)
}

function concurrent(timestamp) {
    const time = Date.now() - timestamp;

    const seconds = time / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    return (seconds >= 59) ? (minutes >= 59) ? (hours >= 23) ? `${(days).toFixed()} Days Ago` : `${(hours).toFixed()} Hours ago` : `${minutes.toFixed()} Minutes ago` : `A few Seconds Ago`
}

function tables(as = "timestamp") {
    sort(dbCopy, as).get().forEach(data => {
        const text = data.text
        const time = data.timestamp
        add2Library(String(text), String(concurrent(time)))
    })
}

tables("timestamp");