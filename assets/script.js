var timerDiv = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var startContainer = document.getElementById("startCont");
var scoreFinal = document.getElementById("scoreF");

var quizCont = document.getElementById("quiz");
var headerQuiz = document.getElementById("headQ");
var questionEl = document.querySelector("#questions");
var questionCount = 0;
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var resultCorrect = document.getElementById("result");
var choiceBtn = document.querySelectorAll(".choice_btn");

var finalScrCont = document.getElementById("finalScore");
var initial = document.getElementById("init");
var submitScore = document.getElementById("subScore");

var highScoreCont = document.getElementById("highScore");
var highScoreList = document.getElementById("highScore_list");
var highscoreName = document.getElementById("highscore-initials");
var highscoreRecord = document.getElementById("highscore-score");
var highList = [];
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");

var viewScrHigh = document.getElementById("viewHigh");

//quiz questions object
var questionQuiz = [
  {
    question: "Javascript is an _______ language?",
    choices: [
      "a) Object-Oriented",
      "b) Object-Based",
      "c) Procedural",
      "d) None of the above",
    ],
    correct: "0",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["a) var", "b) let", "c) Both A and B", "d) None of the above"],
    correct: "2",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    choices: [
      "a) getElementById()",
      "b) getElementByClassName()",
      "c) Both A and B",
      "d) None of the above",
    ],
    correct: "2",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["a) <js>", "b) <script>", "c) <javascript>", "d) <scripting>"],
    correct: "1",
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    choices: [
      "a) document.write()",
      "b) console.log()",
      "c) window.alert()",
      "d) All of the above",
    ],
    correct: "3",
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["a) const", "b) var", "c) let", "d) constant"],
    correct: "0",
  },
  {
    question: "How to stop an interval timer in Javascript?",
    choices: [
      "a) clearInterval",
      "b) clearTimer",
      "c) intervalOver",
      "d) None of the above",
    ],
    correct: "0",
  },
  {
    question: "How do we write a comment in javascript?",
    choices: ["a) /* */", "b) //", "c) #", "d) $ $"],
    correct: "1",
  },
];

var secondsLeft = 76;
var scoreH = 0;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerDiv.textContent = "Time:" + secondsLeft;
    if (secondsLeft === 0 || questionCount === questionQuiz.length) {
      clearInterval(timerInterval);
      quizCont.style.display = "none";
      finalScrCont.style.display = "block";

      scoreFinal.textContent = scoreH;
    }
  }, 1000);
}

//function to start quiz
function startQuiz() {
  startContainer.style = "display: none";
  quizCont.style = "display: block";
  headerQuiz.style = "display: block";
  questionCount = 0;

  setTime();
  setQuestion(questionCount);
}

// function to generate questions and answers
function setQuestion(id) {
  if (id < questionQuiz.length) {
    questionEl.textContent = questionQuiz[id].question;
    buttonA.textContent = questionQuiz[id].choices[0];
    buttonB.textContent = questionQuiz[id].choices[1];
    buttonC.textContent = questionQuiz[id].choices[2];
    buttonD.textContent = questionQuiz[id].choices[3];
  }
}

// function to check answer and show result in append message
function checkAnswer(event) {
  event.preventDefault();

  resultCorrect.style.display = "block";
  var p = document.createElement("p");
  resultCorrect.appendChild(p);

  // time out after 1 second
  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  // check answer and collect score
  if (
    questionQuiz[questionCount].correct === event.target.value &&
    questionCount < questionQuiz.length
  ) {
    scoreH++;
    p.textContent = "Correct!";
    questionCount++;
    setQuestion(questionCount);
  } else if (
    questionQuiz[questionCount].correct !== event.target.value &&
    questionCount < questionQuiz.length
  ) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
    questionCount++;
    setQuestion(questionCount);
  }
}

// highscres results function
function highscore() {
  if (initial.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = initial.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: scoreH,
    };

    finalScrCont.style.display = "none";
    highScoreCont.style.display = "block";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
}

// function to generate highscores
function generateHighscores() {
  highscoreName.innerHTML = "";
  highscoreRecord.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreName.appendChild(newNameSpan);
    highscoreRecord.appendChild(newScoreSpan);
  }
}

function storeScores() {
  localStorage.setItem("highList", JSON.stringify(highList));
}

function displayScores() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScoreList = JSON.parse(localStorage.getItem("highList"));

  // If scores were retrieved from localStorage, update the scorelist array to it
  if (storedScoreList !== null) {
    highList = storedScoreList;
  }
}

// clear scores
function clearScores() {
  localStorage.clear();
  highscoreName.innerHTML = "";
  highscoreRecord.innerHTML = "";
}

// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
choiceBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

//submit the score to initial
submitScore.addEventListener("click", highscore);

// Go Back Button
backBtn.addEventListener("click", function () {
  highScoreCont.style.display = "none";
  startContainer.style.display = "block";
  headerQuiz.style = "display: none";
  secondsLeft = 76;
  questionCount = 0;
  scoreH = 0;
});

// Clear the scores
clearBtn.addEventListener("click", clearScores);

// View/Hide Highscores
viewScrHigh.addEventListener("click", function () {
  if (highScoreCont.style.display === "none") {
    highScoreCont.style.display = "block";
  } else if (highScoreCont.style.display === "block") {
    highScoreCont.style.display = "none";
  } else {
    return alert("No scores to show.");
  }
});
