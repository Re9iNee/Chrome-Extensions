let currentPos = new Array();

function write(str) {
    return document.body.appendChild(document.createTextNode(str));
}
document.querySelector("button").addEventListener("click", e => {
    e.preventDefault();
    getGeoLocation();
})

function getGeoLocation() {
    console.log("TCL: getGeoLocation -> getGeoLocation")
    navigator.geolocation.getCurrentPosition(position => {
        const crds = position.coords;
        currentPos.push(crds.latitude)
        currentPos.push(crds.longitude)
        return FixUrl(crds.latitude, crds.longitude)
    }, e => {
        console.log(e)
        switch (e.code) {
            case 3: {
                throw ("timeout Try Again Code 3")
            }
            case 2: {
                throw ("Location Unavailable Code 2")
            }
            default: {
                break;
            }
        }
    }, {
        maximumAge: 0
    })
}

function FixUrl(lat, long) {
    console.log("TCL: FixUrl -> FixUrl")
    const date = new Date();
    const month = date.getMonth()
    const year = date.getFullYear()
    const url = `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=2&month=${month}&year=${year}`
    return fetchPray(url)
}
async function fetchPray(url) {
    console.log("TCL: fetchPray -> fetchPray")
    let resp = await fetch(url)
    resp = await resp.json();
    const city = returnCity(await resp)
    const today = new Date().getDate();
    write(city + " :")
    console.log("TCL: fetchPray -> city", city)
    console.log(write(JSON.stringify(resp.data[today - 1].timings)))
    return resp
}

function returnCity(resp) {
    console.log("TCL: returnCity -> returnCity")
    try {
        return resp.data[Math.floor(Math.random() * 28)].meta.timezone
    } catch (e) {
        console.log("Error?")
    }
}