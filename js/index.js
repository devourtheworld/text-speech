const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

// const data = [
//   {
//     image: "./img/sunset.png",
//     text: "I'm Thirsty",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Hungry",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Tired",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Hurt",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Happy",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Angry",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Sad",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I'm Scared",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I Want To Go Outside",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I Want To Go Home",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I Want To Go To School",
//   },
//   {
//     image: "./img/sunset.png",
//     text: "I Want To Go To Grandmas",
//   },
// ];

// data.forEach(createBox);

//create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  // const { image, text } = item; // creates items

  // box.classList.add("box"); //for border, style of grid items

  // for grid of items
  // box.innerHTML = `
  //     <img src="${image}" alt="${text}" />
  //     <p class="info">${text}</p>
  //   `;

  //'toggle text box' button
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect  for grid items
    // box.classList.add("active");
    // setTimeout(() => box.classList.remove("active"), 800);
  });

  //main.appendChild(box); // for grid items
}

// Init speech synth
const message = new SpeechSynthesisUtterance(); //contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices(); //gets all available voices on device

  voices.forEach((voice) => {
    const option = document.createElement("option"); //creates the HTML element specified by tagName

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`; //to make list of languages

    voicesSelect.appendChild(option); //to make list of languages, moves it from its current position to the new position
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message); //makes a queue of messages
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value); //set the matching voice object to be the value of the SpeechSynthesisUtterance.voice property
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices); // adding a function or an object that implements EventListener to the list of event listeners

// Toggle text box
//classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element. This can then be used to manipulate the class list
toggleBtn.addEventListener("click", () =>
  //for button
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice); //changes voice by using setVoice function

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
