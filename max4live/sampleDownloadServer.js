const express = require('express')
const maxAPI  = require("max-api");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

const port = '10221';

const app = express();
const ydl = new YoutubeMp3Downloader({
    "ffmpegPath": "C:\\bin\\ffmpeg.exe",
    "outputPath": "C:\\Users\\billi\\Documents\\Ableton\\User Library\\Samples",
})

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

ydl.on("finished", function(err, data) {
    // output file path on download
    maxAPI.outlet(data.file);
    maxAPI.post(JSON.stringify(data));
});

ydl.on("error", function(error) {
    maxAPI.post(error);
});

ydl.on("progress", function(progress) {
    maxAPI.post(JSON.stringify(progress));
});

app.post('/', (req, res) => {
    ydl.download(req.body.id)
    res.send({
        "message": "song received"
    })
})

app.listen(port, () => {
    maxAPI.post(`server is running on http://localhost:${port}`);
})