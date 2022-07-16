function downloadYoutube () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        if (! url.includes("youtube.com")) {
            throwError("current site is not youtube")
        } else {
            let youtubeID = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/gim.exec(url)[3]
            console.log(youtubeID)
            makeRequest("youtube", youtubeID)
        }
    });
}

function makeRequest(type, id) {
    fetch("http://localhost:10221", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            type: type,
            id: id
        })
    }).then( (response) => { 
    console.log(response)
    });
}

function throwError(msg) { 
    alert(msg)
}

let ytbutton = document.getElementById("yt-dl-button")
ytbutton.onclick = downloadYoutube