const tag = "ipList"
const today = getDate(new Date());

window.onload = async () => {
    const resp = await fetch("https://api6.ipify.org/")
    const lastIP = await resp.text();
    saveToLocal(lastIP, "lastIP")
    let arr = getFromLocal(tag)
    arr = assignIPAddress(arr, find(arr, today), lastIP)
    console.log(arr)
    if (arr) {
        if (saveToLocal(arr, tag)) console.log("saved")
        else console.error("something went wrong saving an array")
    }
    showResults();
}

//save for Future Use //True or False
function saveToLocal(arr, tag) {
    try {
        localStorage.setItem(tag, JSON.stringify(arr))
        return true
    } catch (e) {
        return false
    }
}
//if exists: load Previous array Otherwise creates New one //Array
function getFromLocal(tag) {
    let arr = JSON.parse(localStorage.getItem(tag))
    console.log(arr)
    return arr ? arr : new Array()
}

//chop the new Date() object //String "26 Jan"
function getDate(date) {
    date = String(date)
    return date.split(' ').splice(1, 2).join(', ');
}

//wanted date //Object
function find(arr, value) {
    return arr.find(x => x.date == value)
}

//push an ip address //Array Of Objects, null
function assignIPAddress(baseArr, obj, newIP) {
    let IPArr = [newIP]
    let newObj = {
        date: today,
        ipis: IPArr
    }
    if (baseArr.length == 0) {
        console.log("Costructor,", 1)
        return [newObj]
    } else if (!obj) {
        console.log("today Maker,", 2)
        baseArr.push(newObj)
        return baseArr;
    } else if (!sameIP(newIP, obj.ipis)) {
        console.log("append IP,", 3)
        obj.ipis.push(newIP);
        return baseArr;
    } else {
        console.log("duplicate ip", 4)
        return null;
    }
}

//prevent from saving same ip address //True Or False
function sameIP(ip, arr) {
    return arr.some(x => x == ip)
}