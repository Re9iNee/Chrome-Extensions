console.info("Background Script is running On clipboard Extension");

const dbName = "Clipboard"
/* Creation */
// let db = TAFFY([{
//     text: "Thumb",
//     timestamp: "1584805254787",
//     isDeleted: false
// }, {
//     text: "Keep",
//     timestamp: "1582905254797",
//     isDeleted: false
// }]);
let db;
setup()

function setup() {
    db = load(dbName)
    db().context().settings.name = dbName
    db().context().settings.storageName = true
    /* Database Events */
    /* 
    db().context().settings.onInsert = () => {
        console.log("Index has been inserted")
        save(db)
    }
    db().context().settings.onUpdate = () => {
        console.log("Data base has been updated")
        save(db)
    }
    */
    db().context().settings.onDBChange = () => {
        save(db)
    }
}







/* Insert */
// db.insert({
//     text: "Was Everything",
//     timestamp: "1583005254107",
//     isDeleted: false
// });

function thrust(database, items) {
    database.insert(items)
}


/* Query */
// console.log(db({
//     text: "Thumb"
// }).count());

function inquiry(database, query) {
    return database(query).count()
}


/* Update */
// db({
//     name: "Was Everything"
// }).update({
//     timestamp: Date.now()
// });

function reform(database, index, item) {
    database(index).update(item)
}


/* sort */
// console.log(db().order("timestamp").first().text);



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request", request)
    dbManager(request.content)
    sendResponse({
        farewell: "Got your message Thank U"
    });
})


function dbManager(data) {
    if (inquiry(db, {
            text: data
        })) {
        reform(db, {
            text: data
        }, {
            timestamp: Date.now()
        })
    } else {
        thrust(db, {
            text: data,
            timestamp: Date.now(),
            isDeleted: false
        })
    }
}

function save(database) {
    console.log("Saved")
    if (dbName)
        localStorage.setItem(dbName, database().stringify())
    else localStorage.setItem("temp db", database().stringify())
}

function load(dbName) {
    console.log("data base has been loaded")
    return (dbName) ? TAFFY(JSON.parse(localStorage.getItem(dbName))) : TAFFY(JSON.parse(localStorage.getItem("temp db")))
}


/* Extension Events */
// chrome.runtime.onStartup.addListener(() => {
//     //when chrome opens
// })
// chrome.runtime.onInstalled.addListener(() => {
//     //when reload extension
// })
// chrome.runtime.onSuspend.addListener(() => {
//     localStorage.setItem("3", "suspend")
// })
// chrome.runtime.onSuspendCanceled.addListener(() => {
//     localStorage.setItem("4", "suspendCanceled")
// });
// chrome.runtime.onRestartRequired.addListener(() => {
//     localStorage.setItem("5", "restartRequired")
// });