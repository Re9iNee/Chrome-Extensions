console.log("starting Terminator")

setTimeout(() => {
    let videos = document.querySelectorAll('.ytd-watch-next-secondary-results-renderer');
    console.log(videos) 
    for (let video of videos) {
        video.remove()
    }
}, 2000)


console.log("ending Terminator")