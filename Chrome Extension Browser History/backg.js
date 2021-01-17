console.log("Background is running")
window.queries = new Array()
let searchOption = {
    text: "",
    startTime: 1496323008,
    maxResults: 1000
}
chrome.history.search(searchOption, (datas) => {
    for (let data of datas) {
        queries.push({
            title: data.title,
            url: data.url,
            lastVisit: data.lastVisitTime,
            count: data.visitCount
        })
    }
    console.log(queries)
    const data = window.queries;
    fetch('http://localhost:3000/api', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.text()).then(console.log)
})