function elt(type, ...childrens) {
    let dom = document.createElement(type);
    for (child of childrens) {
        if (typeof child != "string") dom.appendChild(child)
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}
let info;
let showing = false;
let ticking = false;

function showResults() {
    document.body.appendChild(elt("h1", localStorage.getItem("lastIP")))
    info = elt('code', 'scroll for History');
    document.body.appendChild(info)
    window.addEventListener('wheel', e => {
        e.preventDefault();
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (e.deltaY > 0) showHistory()
                else removeHistory();
                ticking = false;
            });

            ticking = true;
        }
    })
}

function showHistory() {
    if (!showing) {
        info.style.display = "none";
        let datas = getFromLocal(tag)
        for (data of datas) {
            document.body.appendChild(elt("h3", data.date))
            document.body.appendChild(elt("p", data.ipis.join("    |||   ")))
        }
        showing = true;
    }
}

function removeHistory() {
    if (showing) {
        info.style.display = "block";
        Array.from(document.querySelectorAll("h3")).map(e => e.remove());
        Array.from(document.querySelectorAll("p")).map(e => e.remove());
    }
    showing = false;
}