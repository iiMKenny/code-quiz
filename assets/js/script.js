// DECOLRATIONS

// VAR FOR TIMER   (global) 
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 90;

//VAR FOR BUTTONS (global )
const start = document.querySelector("#start");

// VAR FOR INTRO/START
const codersIntro = document.querySelector("#challenge-begins");

//CALL END LOAD EMLEMENT VAR
var questionsEl = document.querySelector(".all-question");

// ELEMENT LOCATIONS VAR
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// FINAL SCORE VAR
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// HIGHSCORE VAR 
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// CALL OUT THE ANSWER CLASS BUTTON ASSHOLE
const ansBtn = document.querySelectorAll("button.answer-btn")

// VAR SUBMITINT, GO, CLEAR, VIEW
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// VAR ANSER CALL
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// ARRAY OF FIVE QUESTION, ZERO BASED, NUMBER CORRECTLY. 
const questions = [ 
    {
        question: "Where is the correct place to insert JavaScript?",
        answers: ["1.  Both the <head> and <body>", "2. The <head> section", "3. The <body> section", "4. You don't put it in HTML"],
        correctAnswer: "0"
    },
    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        answers: ["1. <script src= >", "2. <script href= >", "3. <script name= >", "4. <script= >"],
        correctAnswer: "0"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function = myFunction()", "2. function myFunction()", "3. function:myFunction()", "4. function x"],
        correctAnswer: "0"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?:",
        answers: ["1. <script>", "2. <scripting>", "3. <javascript>", "4. <js>"],
        correctAnswer: "0"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. quotes", "2. curly brackets", "3. paraentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: ["1. You Can't", "2. 'This is a comment'", "3. <!--This is a comment-->", "4. //This is a comment"],
        correctAnswer: "3"
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: ["1. v carName;", "2. variable carName;", "3. var carName;", "4. var (carName)"],
        correctAnswer: "2"
    }
];

// TIMER FUNCTION STARTS PROCESS 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// QUIZ BEGIN FUNCTION
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// SET QUESTION FUNCTION
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
        ans5Btn.textContent = questions[id].answers[4];
        ans6Btn.textContent = questions[id].answers[5];
        ans7Btn.textContent = questions[id].answers[6];
        ans8Btn.textContent = questions[id].answers[7];
        ans9Btn.textContent = questions[id].answers[8];
        ans10Btn.textContent = questions[id].answers[9];
    }
}

// EVENT FUNCTION CHECK ANSWERS BEGING PROCESS
function checkAnswer(event) {
    event.preventDefault();

    //CREATING ELEMENT OF RIGHT OR WRONG
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // DISPLAY NEW ELEMENT FOR X AMOUNR OF TIME
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS CORRECT
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS WRONG
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // HIGH SCORE SORTING LIST
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // STORAGE OF SCORE 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // WHEN RETREIVED FROM LOCAL, ARRAY
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// CLEAR THE STORE
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// START OFF ALL EVENT 
// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// CHECK ANSER LISTENER EVENT
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// ADDING A SCORE EVENT
submitScrBtn.addEventListener("click", addScore);

// GO BACK LISTENER EVENT FUNCTIN 
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 90;
    time.textContent = `Time:${secondsLeft}s`;
});

// CLEAR SCORE
clearScrBtn.addEventListener("click", clearScores);

// HIGH SCORE BUTTON ALERT AND DISPLAY LISTENER EVENT
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Hey. Take the Quiz. There's no high score recorded!");
    }
});