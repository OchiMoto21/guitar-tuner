function init() {
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
            document.getElementById("init").style.display = "none";
        }
        
    )
    .catch(function(err) {
        console.log(err)
        alert('Sorry, microphone permissions are required for the app. Feel free to read on without playing :)');
    });
}

// Visualizing, copied from voice change o matic
var canvas = document.querySelector('.visualizer');
var canvasContext = canvas.getContext("2d");

canvas.width  = 0.8*window.innerWidth;
canvas.height = 0.8*window.innerHeight;

var WIDTH;
var HEIGHT;

function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    var drawVisual;
    var drawNoteVisual;

    var draw = function() {
        drawVisual = requestAnimationFrame(draw);
        analyser.fftSize = 2048;
        var bufferLength = analyser.fftSize;
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        canvasContext.fillStyle = 'rgb(66, 133, 244)';
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'rgb(0, 0, 0)';

        canvasContext.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
            canvasContext.moveTo(x, y);
            } else {
            canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height/2);
        canvasContext.stroke();
    }


    var drawFrequency = function() {
    var bufferLengthAlt = analyser.frequencyBinCount;
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function() {
        drawVisual = requestAnimationFrame(drawAlt);

        analyser.getByteFrequencyData(dataArrayAlt);

        canvasContext.fillStyle = 'rgb(0, 0, 0)';
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        var barHeight;
        var x = 0;

        for(var i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

        x += barWidth + 1;
        }
    };

    drawAlt();
    }

    var displayValue = "sine"
    if (displayValue == 'sine') {
    draw();
    } else {
    drawFrequency();
    }

}
}