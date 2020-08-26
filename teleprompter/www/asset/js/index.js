// Initialize \\
let speech = "The speech has not been input yet."
let title = "The title has not been input yet."

$("#scroll").hide();

$("#Header").hide();
$("#Header").slideDown("slow");

$("#about").hide();
$("#write").hide();
$("#record").hide();
$("#export").hide();
$("#end").hide();
$("#RecordStopButton").hide();

$(document).ready(); {
    $("#scroll").slideDown("fast");
    $("#about").slideDown("slow");
}

// Event Triggered Functions \\

function start() {
    $("#about").slideUp("slow");
    $("#startbutton").slideUp("slow");
    $("#Header").slideUp("slow");
    $("#write").slideDown("slow");
}

// Recording Control \\

function record() {
    let speechtmp = document.getElementById("speechin").value;

    //let titletmp = document.getElementById("titlein").value;

    console.log("User Speech Input: " + speechtmp);
    //console.log("User Title Input: " + titletmp);

    speech = speechtmp
    //title = titletmp

    $("#recInner").html(speech);
    $("#recTitle").html(title);
    $("#write").slideUp("slow");
    $("#record").slideDown("slow");
    

    let video = document.getElementById('video');

    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true },{ audio: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
        $("#video").slideDown("slow");
        stopped = false
    });
    }
}

const mediaRecorder = new MediaRecorder(stream, options);
mediaRecorder.stop();

function recordStart() {
    $("#RecordStopButton").slideDown();
    $("#RecordButton").slideUp();
    mediaRecorder.start();
}

function recordStop() {
    $("#RecordStopButton").slideUp();
    $("#RecordButton").slideDown();
    $("#end").slideDown();
    mediaRecorder.stop();
}

function done() {
    // Effects
    $("#end").slideUp("slow");
    $("#video").slideUp("slow");
    $("#RecordButton").slideUp("slow");
    $("#RecordStopButton").slideUp("slow");
    $("#recInner").slideUp("slow");
    $("#export").slideDown("slow");

    // Stop Video
    mediaRecorder.stop();

    // Export
    downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
    downloadLink.download = "speech.webm";
}