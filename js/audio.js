var media = new Media(src, mediaSuccess, [mediaError], [mediaStatus]);
var my_media = new Media('audio/music.mp3', ...);
Media.MEDIA_NONE = 0;
Media.MEDIA_STARTING = 1;
Media.MEDIA_RUNNING = 2;
Media.MEDIA_PAUSED = 3;
Media.MEDIA_STOPPED = 4;
function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
                             // success callback
                             function () {
                             console.log("playAudio():Audio Success");
                             },
                             // error callback
                             function (err) {
                             console.log("playAudio():Audio Error: " + err);
                             }
                             );
    // Play audio
    my_media.play();
}
media.play();