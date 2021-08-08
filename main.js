prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    Image_format: "png",
    png_quality: 100
});

camera = document.getElementById("div_camera");

Webcam.attach("#div_camera");


function captureImg() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='WDYC' src='" + data_uri + "'>"
    })
}

console.log("ml5 version:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/iGektpBQV/model.json", has_model_loaded);

function has_model_loaded() {
    console.log("model is loaded!");
}

function speak() {
    var synth = window.speechSynthesis; //THIS IS AN API THAT HAS FUNCTIONS() TO CONVERT TEXT-SPEECH and here we are name spacing It
    var data_1 = "The first prediction is" + prediction_1;
    var data_2 = "And the second Prediction is" + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(data_1 + data_2);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("WDYC");
    classifier.classify(img, Got_result);
}

function Got_result(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak();

        if (result[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (result[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (result[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (result[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (result[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (result[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}