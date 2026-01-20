const questions = [
    {
        question: "What is the brain of the Computer?",
        answers: [
            { text: "Desktop" ,correct: false},
            {text: "Keyboard" ,correct: false},
            {text: "CPU" ,correct: true},
            {text: "Mouse" ,correct: false},
            
        ]
    },
    {
        question: "What device inputs text?",
        answers: [
            { text: "keyboard" ,correct: true},
            { text: "Printer" ,correct: false},
            { text: "monitor" ,correct: false},
            { text: "Desktop" ,correct: false},
        ]
    },
    {
        question: "What stores data Temporarily?",
        answers: [
            { text: "ROM" ,correct: false},
            { text: "RAM" ,correct: true},
            { text: "DVD" ,correct: false},
            { text: "Hard Drive" ,correct: false},
            
        ]
    },
    {
        question: "Name a programming Language?",
        answers: [
            { text: "Python" ,correct: true},
            { text: "English" ,correct: false},
            { text: "Hindi" ,correct: false},
            { text: "Tamil" ,correct: false},
        ]
    },
    {
        question: "Which of the following is an example of secondary memory?",
        answers: [
            { text:"Cache Memory" ,correct: false},
            { text:"Register" ,correct: false},
            { text:"RAM" ,correct: false},
            { text: "Pen Drive" ,correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton= document.getElementById("answer-button");
const nextButton= document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "."+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();