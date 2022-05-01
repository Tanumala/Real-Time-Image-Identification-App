function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded);
}

function modelLoaded()
{
  console.log("modelLoaded");
}

function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}

 var previous_object = "";

function gotResult(error,result)
{
  if(error)
  {
    console.log(error);
  }
  else 
  {
    if((result[0].confidence>0.5)&&(previous_object!=result[0].label))
    {
      console.log(result);
      previous_object = result[0].label;
      synth = window.speechSynthesis;
      speak_data = "Object detected is "+result[0].label;
      utter_this = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utter_this);

      document.getElementById("result_object_name").innerHTML = result[0].label;
      document.getElementById("result_object_accuracy").innerHTML = result[0].confidence.toFixed(3);
    }
  }
}




