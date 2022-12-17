//https://teachablemachine.withgoogle.com/models/tf622ZI9o/

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    })
}

console.log("ml5 version:"+ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tf622ZI9o/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Has Been Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speakData1="The First Prediction is "+prediction_1;
    utterthis=new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterthis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
}

function gotResults(error,results) {
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
        speak();
        if(results[0].label=="hEaRt <3") {
            document.getElementById("update_emoji").innerHTML="&#129310;";
            
        }
            if(results[0].label=="Thumbs Up") {
            document.getElementById("update_emoji").innerHTML="&#128077;";
            
        }
        if(results[0].label=="Peace") {
            document.getElementById("update_emoji").innerHTML="&#9996;";
            
        }
    }
}