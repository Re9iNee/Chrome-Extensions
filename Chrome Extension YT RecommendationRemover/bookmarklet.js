//remove Video Recommendation from YT


//javascript:
(function () {
    let videos = document.querySelectorAll('.ytd-watch-next-secondary-results-renderer');
    for(let video of videos){
        video.remove()
    }
})()