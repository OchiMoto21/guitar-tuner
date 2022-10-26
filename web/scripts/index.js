var source;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioContext.createAnalyser();
analyser.minDecibels = -100;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
if (!navigator?.mediaDevices?.getUserMedia) {
  // No audio allowed
  alert('Sorry, getUserMedia is required for the app.')
  return;
} else {
  var constraints = {audio: true};
  navigator.mediaDevices.getUserMedia(constraints)
    .then(
      function(stream) {
        // Initialize the SourceNode
        source = audioContext.createMediaStreamSource(stream);
        // Connect the source node to the analyzer
        source.connect(analyser);
        visualize();
      }
    )
    .catch(function(err) {
      alert('Sorry, microphone permissions are required for the app. Feel free to read on without playing :)')
    });
}
