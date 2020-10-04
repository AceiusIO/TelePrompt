// -- TelePrompt Core -- \\

const version = 0.1
const author = "AceiusIO"

// Initialize ///////////////////

// Varubles
let speech = "The speech has not been input yet."
let title = "The title has not been input yet."

// Constants
const video = document.querySelector("video");
const exitcamera = new Event("stop");

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

// Event Triggered Functions ///////////////////

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
    title = $("#titlein").val();

    console.log("User Speech Input: " + speech);
    console.log("User Title Input: " + title);

    $("#recInner").html(speech);
    $("#recTitle").html(title);
    $("#write").slideUp("slow");
    $("#record").slideDown("slow");
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true },{ audio: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
            console.log("==================================================================================================");
            console.log("HOLDUP! From this point on, pasting ANYTHING in this console could cause serious camera problems.");
            console.log("IN FACT, Pasting anything in this console is dangerous if you don't know what you are doing.");
            console.log("CLOSE the console and stay safe.");
            $("#video").slideDown("slow");
            stopped = false
        });
    }
}

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
    $("#end").slideUp("slow");
    $("#video").slideUp("slow");
    $("#RecordButton").slideUp("slow");
    $("#RecordStopButton").slideUp("slow");
    $("#record").slideUp("slow");
    $("#export").slideDown("slow");

    mediaRecorder.dispatchEvent(exitcamera);
}