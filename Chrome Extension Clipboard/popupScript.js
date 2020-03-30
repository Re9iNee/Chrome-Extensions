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

async function copy(text) {
    await navigator.clipboard.writeText(text);
    /* Alert the copied text */
    // alert("Copied the text: " + text);
}

function deleteRow(event) {
    event.stopPropagation()
    dbCopy({
        text: this.name
    }).update({
        isDeleted: true
    })
    backgPage.save(dbCopy)
    reload();
}

/* add to library */
// add2Library("ClipBoard Bluh Bluh", "1 Minute Ago")
function add2Library(text, time, id = "") {
    document.querySelector("table").appendChild(elt("tr", {
        onclick: clicked,
        id: id
    }, elt("td", null, text), elt("td", null, time), elt("td", null, elt("input", {
        name: text,
        onclick: deleteRow,
        type: "checkbox"
    })), elt("td", null, elt("input", {
        type: "checkbox",
        name: text,
        onclick: favouriteToggle,
        checked: id === "favourites"
    }))))
}

function favouriteToggle(event) {
    event.stopPropagation()
    dbCopy({
        text: this.name
    }).update({
        isFavourite: this.checked
    })
    if (this.checked) {
        changeBackground(this.parentElement.parentElement, false, "#fcc603")
    } else {
        changeBackground(this.parentElement.parentElement, false, "")
        reload()
    }
    backgPage.save(dbCopy)
}

function clicked(event) {
    const text = this.firstElementChild.textContent
    changeBackground(this, true, "#3bd80d")
    copy(text)
}

function changeBackground(element, reset, to = "green") {
    element.style.transition = "all 0.5s"
    element.style.transitionTimingFunction = "cubic-bezier(0.75, 0.01, 0.12, 1.19)"
    element.style.backgroundColor = to
    if (reset) setTimeout(() => element.style.backgroundColor = "", 1000)
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

function tables(as, ascending) {
    if (ascending === "true") {
        sort(dbCopy, as).get().reverse().forEach(data => {
            const text = data.text
            const time = data.timestamp
            const isfavourite = data.isFavourite
            if (!data.isDeleted) {
                add2Library(String(text), String(concurrent(time)), (isfavourite) ? "favourites" : "")
            }
        })
    } else {
        sort(dbCopy, as).get().forEach(data => {
            const text = data.text
            const time = data.timestamp
            const isfavourite = data.isFavourite
            if (!data.isDeleted) {
                add2Library(String(text), String(concurrent(time)), (isfavourite) ? "favourites" : "")
            }
        })
    }
}

function reload() {
    window.location.href = "popup.html";
}


const readlocal = backgPage.readlocal;
const writelocal = backgPage.writelocal;
tables(readlocal("load as"), readlocal("ascending"))
/* text and time sort by EVENTS */
document.getElementById("text").addEventListener("click", e => {
    if (readlocal("ascending") === "true") {
        writelocal("ascending", false)
    } else {
        writelocal("ascending", true)
    }
    writelocal("load as", "text")
    reload();
})
document.getElementById("time").addEventListener("click", e => {
    if (readlocal("ascending") === "true") {
        writelocal("ascending", false)
    } else {
        writelocal("ascending", true)
    }
    writelocal("load as", "timestamp")
    reload()
})