function log() {
  for(var i=0,len=arguments.length; i<len; i++) {
    var message = arguments[i];
    if(message && message.toString) {
      var s = message.toString();
      if(s.indexOf("[object ") >= 0) {
        s = JSON.stringify(message);
      }
      post(s);
    }
    else if(message === null) {
      post("<null>");
    }
    else {
      post(message);
    }
  }
  post("\n");
}

function createAudioTrack(filePath) {
	var liveObjPath = "live_set";
	var liveObj = new LiveAPI(liveObjPath);

	var audioTrack = liveObj.call("create_audio_track", -1); 
	audioTrackId = audioTrack[1];

	var nReturnTracks = liveObj.get("return_tracks").length / 2;
	var nTracks = liveObj.get("tracks").length / 2;

	var audioTrackObjPath = liveObjPath + " tracks " + (nTracks - 1);
	var audioTrackObj = new LiveAPI(audioTrackObjPath);

  post(filePath)

	// audioTrackObj.set("name", trackName);	
}

