const btn = document.querySelector('#btn');
const transcriptDisplay = document.querySelector('#transcript');

// 1. Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    btn.classList.add('listening');
    transcriptDisplay.innerText = "Listening...";
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    transcriptDisplay.innerText = `You said: "${command}"`;
    handleCommand(command);
};

recognition.onend = () => {
    btn.classList.remove('listening');
};

// 2. Command Processing Logic
function handleCommand(text) {
    if (text.includes('hello') || text.includes('hey')) {
        speak("Hello! I am your JavaScript assistant. How can I help you today?");
    } 
    else if (text.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}`);
    } 
    else if (text.includes('open google')) {
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
    } 
    else if (text.includes('weather')) {
        speak("I cannot check live weather yet, but it looks like a great day for coding!");
    }
    else {
        speak("I heard you say " + text + ". I don't know how to do that yet.");
    }
}

// 3. Speech Synthesis (The Voice)
function speak(sentence) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Start recognition on click
btn.addEventListener('click', () => {
    recognition.start();
});
