

const questions = [
    {
        question: "which is largest animal in world Q/1?",
        answers: [
            { text: "shark", correct: "false" },
            { text: "blue whale", correct: "true" },
            { text: "elephant", correct: "false" },
            { text: "giraffe", correct: "false" },
        ]
    },
    {
        question: "which is largest animal in world Q/2?",
        answers: [
            { text: "shark", correct: "true" },
            { text: "blue whale", correct: "false" },
            { text: "elephant", correct: "false" },
            { text: "giraffe", correct: "false" },
        ]
    },
    {
        question: "which is largest animal in world Q/3?",
        answers: [
            { text: "shark", correct: "false" },
            { text: "blue whale", correct: "false" },
            { text: "elephant", correct: "true" },
            { text: "giraffe", correct: "false" },
        ]
    },
    {
        question: "which is largest animal in world Q/4?",
        answers: [
            { text: "shark", correct: "false" },
            { text: "blue whale", correct: "false" },
            { text: "elephant", correct: "false" },
            { text: "giraffe", correct: "true" },
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let objOne = {
name : String,
age : Number,




};
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questioneNo = currentQuestionIndex + 1;

    questionelement.innerHTML = questioneNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); // Add the "btn" class
        answerbutton.appendChild(button);

        if (answer.correct === "true") { // Corrected from answe to answer
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++; 
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after an answer is selected
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
