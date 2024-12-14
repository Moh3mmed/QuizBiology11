// Sample Questions (Can be edited/updated)
const questions = [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correct: 1 },
    { question: "What is the process of photosynthesis?", options: ["Respiration", "Transpiration", "Fermentation", "Light energy to chemical energy"], correct: 3 },
    { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Heart", "Lungs", "Liver"], correct: 1 },
    { question: "What is the chemical formula for water?", options: ["CO2", "O2", "H2O", "CH4"], correct: 2 },
    { question: "Who proposed the theory of evolution?", options: ["Newton", "Darwin", "Einstein", "Mendel"], correct: 1 },
    { question: "What is the genetic material in humans?", options: ["RNA", "DNA", "Proteins", "Carbohydrates"], correct: 1 },
    { question: "What is the main function of the white blood cells?", options: ["Transport oxygen", "Fight infections", "Digest food", "Produce energy"], correct: 1 },
    { question: "Which system controls voluntary actions?", options: ["Nervous system", "Digestive system", "Circulatory system", "Respiratory system"], correct: 0 }
];

let currentQuestionIndex = -1;
let score = 0;
let timerValue = 30;
let timerInterval;
let studentName = '';
let wheelRotation = 0;

function register() {
    studentName = document.getElementById("studentName").value;
    if (studentName) {
        // Hide the registration and show the quiz section
        document.getElementById("registration").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        spinWheel();  // Start the quiz by spinning the wheel
    } else {
        alert("Please enter your name.");
    }
}

function generateQRCode(name) {
    const qrCode = new QRCode(document.getElementById("qr-code"), {
        text: `Name: ${name}`,
        width: 128,
        height: 128
    });
}

function spinWheel() {
    wheelRotation += Math.floor(Math.random() * 360) + 720; // Spin 2-3 times
    document.getElementById("wheel").style.transform = `rotate(${wheelRotation}deg)`;
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 2000);  // Wait for the spin to finish before showing the question
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").innerText = question.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';  // Clear previous options
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    timerValue = 30;
    document.getElementById("timer").innerText = timerValue;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerValue--;
        document.getElementById("timer").innerText = timerValue;
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        showResult();
    } else {
        spinWheel(); // Spin the wheel again to move to the next question
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = `${studentName}: ${score} / ${questions.length}`;
}
