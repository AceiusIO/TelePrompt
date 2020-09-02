// -- TelePrompt Core -- \\

// By AceiusIO

// Initialize \\

// Varubles
let speech = "The speech has not been input yet."
let title = "The title has not been input yet."

// Constants
const video = document.querySelector('video');
const constraints = {
    video: true
};

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {video.srcObject = stream});
// Choose a fact to display on the loading screen

let factList = [
"Teleprompter is powered by 349 lines of code!",
"You can use ANY HTML markup in your speeches?",
"The fact has not been choosen yet. Okay fine. XD",
"You can find the source code on github!",
"This was written in javascript!"]

let fact = "The fact has not been choosen yet."

fact = factList[Math.floor(Math.random() * factList.length)]; 

// Hide Stuff

$("#scroll").hide();

$("header").hide();

$("#end").hide();
$("#finish").hide();
$("#about").hide();
$("#write").hide();
$("#record").hide();
$("#export").hide();
$("#RecordStopButton").hide();

$(document).ready(); {
    $("#intro-fact-core").html("Did you know? " + fact);
    setTimeout(function(){
        $("#scroll").slideDown("fast");
        $("#about").slideDown("slow");
        $("#intro-fact").fadeOut();
        $("header").slideDown("slow");
    }, 2500);
}

// Event Triggered Functions \\

function start() {
    $("#about").slideUp("slow");
    $("#startbutton").slideUp("slow");
    $("header").slideUp("slow");
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
    
/*
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true },{ audio: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
            $("#video").slideDown("slow");
            stopped = false
        });
    }
*/

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