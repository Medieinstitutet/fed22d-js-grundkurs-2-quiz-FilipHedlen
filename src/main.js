import './style/style.scss'; // Import SCSS
import './arrays'; // Import arrays of questions


const gameDescText = 'Welcome! Please choose your preferred quiz-topic!'; // 
const gameDescription = document.querySelector('.gameDescription');

gameDescription.innerHTML = gameDescText;

document.querySelector('#startBoxingBtn').addEventListener('click', startGame); // Button for boxing quiz
document.querySelector('#startMtBtn').addEventListener('click', startGame); // Button for muay thai quiz
document.querySelector('#startMmaBtn').addEventListener('click', startGame); // Button for mma quiz

let playerName = '';

function startGame() {
  playerName = document.querySelector('#playerInput').value; // Save name of player
  
  const boxingQuiz = document.querySelector('#boxingQuestionContainer'); // Quiz about boxing
  const muayThaiQuiz = document.querySelector('#muayThaiQuestionContainer'); // Quiz about muay thai
  const mmaQuiz = document.querySelector('#mmaQuestionContainer'); // Quiz about mma
  
  gameDescription.style.display = 'none'; // Hide HTML-elements
  document.querySelector('#playerDetails').style.display = 'none'; // Hide HTML-elements

  if (startBoxingBtn === 'clicked') { // Pair boxingquiz button with boxing quiz
    boxingQuiz.startGame; // Start boxing quiz
    document.querySelector('#startMtBtn').style.display = 'none'; // Hide muay thai quiz button when selected
    document.querySelector('#startMmaBtn').style.display = 'none'; // Hide mma quiz button when selected
  } else if (startMtBtn === 'clicked') { // Pair muay thai quiz button with muay thai quiz
    muayThaiQuiz.startGame; // Start muay thai quiz
    document.querySelector('#startBoxingBtn').style.display = 'none'; // Hide boxing quiz button when selected
    document.querySelector('#startMmaBtn').style.display = 'none'; // Hide mma quiz button when selected
  } else if (startMmaBtn === 'clicked') { // Pair mma quiz button with mma quiz
    mmaQuiz.startGame; // Start mma quiz
    document.querySelector('#startBoxingBtn').style.display = 'none'; // Hide boxing quiz button when selected
    document.querySelector('#startMtBtn').style.display = 'none'; // Hide muay thai quiz button when selected
  };

  nextQuestion();
}

const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');

answer1Btn.addEventListener('click', checkAnswer);
answer2Btn.addEventListener('click', checkAnswer);
answer3Btn.addEventListener('click', checkAnswer);

let currentQuestion = 0;
let points = 0;

function checkAnswer(e) {
  const userAnswer = e.currentTarget.innerHTML; 

  const correctAnswer = questions[currentQuestion - 1].correctAnswer;

  if (userAnswer === correctAnswer) { // Compare the players answer to correct answer
    points++; // 1 point given
  } else {
    points -1; // 1 point deducted
  }
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= questions.length) { // If there is no more questions - game over
    gameOver();
    return;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answer1Btn.innerHTML = questions[currentQuestion].answerOptions[0];
  answer2Btn.innerHTML = questions[currentQuestion].answerOptions[1];
  answer3Btn.innerHTML = questions[currentQuestion].answerOptions[2];

  currentQuestion++; // += 1, currentQuestion = currentQuestion + 1;
}

document.querySelector('#restartBtn').addEventListener('click', restartGame);
document.querySelector('#startDifferentQuiz').addEventListener('click', startAnotherQuiz)

function restartGame() {
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').classList.remove('hidden');
  currentQuestion = 0;
  points = 0;
  nextQuestion();
}

function startAnotherQuiz() {
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').classList.remove('hidden');
  currentQuestion = 0;
  points = 0;
  nextQuestion();
}

function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#questionContainer').classList.add('hidden');
  document.querySelector('#pointsContainer').innerHTML = `Du fick ${points} poäng!`;
}


localStorage.setItem('Players', 
 JSON.stringify({playerName, pointsContainer})
); // Lägga till spelare + spelares poäng i highscore/localstorage


