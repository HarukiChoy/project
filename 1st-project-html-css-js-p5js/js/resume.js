let clickButton = document.querySelector("#startRecording");
let stopButton = document.querySelector("#stopRecording");

clickButton.addEventListener("click", function () {
  var speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);

    textArea.innerHTML = transcript;
  });

  if (speech == true) {
    recognition.start();
  }
});
let words = [
  "open game",
  "game",
  "open the game",
  "open the game of life",
  "game of life",
];

stopButton.addEventListener("click", function () {
  var speech = false;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.stop();
  let content = textArea.innerHTML;
  content = content.toLowerCase();
  for (let word of words) {
    if (content.includes(word)) {
      alert("This webpage will be redirected to the webpage of 'Game of Live'");
      window.location = "../html/index.html";
      break;
    }
  }
});
