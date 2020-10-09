// -- TelePrompt Core -- \\

const version = 0.1
const author = "AceiusIO"

// Initialize  
const NodeWebcam = require("node-webcam")

// Varubles
let speech = "The speech has not been input yet."
let title = "The title has not been input yet."

let opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false
 
};

// Constants
const video = document.querySelector("video");
const exitcamera = new Event("stop");

let shouldStop = false;
let stopped = false;

let factList = [
"Teleprompter is powered by 1466 lines of code!",
"You can use ANY HTML markup in your speeches!",
"The fact has not been choosen yet. Okay fine. XD",
"You can find the source code on github!",
"This was written in javascript!",
"If you disable CSS, you'll be able to play a game of snake!"]

let fact = "The fact has not been choosen yet."

fact = factList[Math.floor(Math.random() * factList.length)]; 

// Console
console.log("" + version);
console.log("By: " + author);
console.log("");
console.log('Choose fact "' + fact + '"');

// Hide Stuff

$("#scroll").hide();

$("header").hide();

$("#end").hide();
$("#finish").hide();
$("#about").hide();
$("#write").hide();
$("#record").hide();
$("#export").hide();
$("#elaborate").hide();
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

// Event Triggered Functions  

function start() {
    $("#about").slideUp("slow");
    $("#startbutton").slideUp("slow");
    $("header").slideUp("slow");
    $("#write").slideDown("slow");
}

function infoShow() {
    $("#about").slideUp("slow");
    $("#elaborate").slideDown("slow");
}

function infoHide() {
    $("#about").slideDown("slow");
    $("#elaborate").slideUp("slow");
}

// Recording Control

function record() {
    speech = $("#speechin").html();
    title = $("#titlein").html();

    console.log("User Speech Input: " + speech);
    console.log("User Title Input: " + title);

    $("#recInner").html(speech);
    $("#recTitle").html(title);
    $("#write").slideUp("slow");
    $("#record").slideDown("slow");

    var Webcam = NodeWebcam.create( opts );
    Webcam.capture("www/thumb.jpg", function( err, data ) {});
    Webcam.list( function( list ) {
        let anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
    });

    var handleSuccess = function(stream) {
        const options = {mimeType: 'video/webm'};
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }

        if(shouldStop === true && stopped === false) {
            mediaRecorder.stop();
            stopped = true;
        }
        });

        mediaRecorder.addEventListener('stop', function() {
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'speech.webm';
        });

        mediaRecorder.start();
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(handleSuccess);
}

function recordStart() {
    $("#RecordStopButton").slideDown();
    $("#RecordButton").slideUp();
}

function recordStop() {
    $("#RecordStopButton").slideUp();
    $("#RecordButton").slideDown();
    $("#end").slideDown();
}

function done() {
    $("#end").slideUp("slow");
    $("#video").slideUp("slow");
    $("#RecordButton").slideUp("slow");
    $("#RecordStopButton").slideUp("slow");
    $("#record").slideUp("slow");
    $("#export").slideDown("slow");
    $("#exTitle").html(title);
}