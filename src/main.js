import './style/style.scss'; // Import SCSS
import { questions } from './arrays';


const gameDescText = 'Welcome! Please choose your preferred quiz-topic and enter your name!'; // Game description when you arrive
const gameDescription = document.querySelector('#gameDescription');
const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');
const shuffled = questions.sort(() => Math.random() - 0.5) // Variable for shuffling array questions

let boxingQuestions = questions.filter(boxingCategory) // Fråga jenni om hjälp!
let muaythaiQuestions = questions.filter(muaythaiCategory)
let mmaQuestions = questions.filter(mmaCategory)

gameDescription.innerHTML = gameDescText;

document.querySelector('#startGameBtn').addEventListener('click', startQuiz); // Button for starting quiz
document.querySelector('#restartBtn').addEventListener('click', restartQuiz); // Button for restarting quiz

answer1Btn.addEventListener('click', checkAnswer);
answer2Btn.addEventListener('click', checkAnswer);
answer3Btn.addEventListener('click', checkAnswer);


let playerName = '';
let currentQuestion = 0;
let points = 0;


function boxingCategory(category) { // Fråga jenni om hjälp
  if (document.getElementById('boxing').checked) {
    return category === 'Boxing';
  }
}

function muaythaiCategory(category) {
  if (document.getElementById('muaythai').checked) {
    return category === 'Muay thai';
  }
}

function mmaCategory(category) {
  if (document.getElementById('mma').checked) {
    return category === 'MMA';
  }
}


function startQuiz() {
  playerName = document.querySelector('#playerInput').value; // Saving players name

  gameDescription.style.display = 'none'; // Hide HTML
  document.querySelector('#playerDetails').style.display = 'none';


  shuffled();
  nextQuestion();
}


function checkAnswer(e) {
  const userAnswer = e.currentTarget.innerHTML;

  const correctAnswer = questions[currentQuestion - 1].correctAnswer;
  if (userAnswer == correctAnswer) {
      points++;
  } else if (userAnswer != correctAnswer) {
    points--;
  }

  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= questions.length) {
      gameOver();
      return;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answer1Btn.innerHTML = questions[currentQuestion].answerOptions[0];
  answer2Btn.innerHTML = questions[currentQuestion].answerOptions[1];
  answer3Btn.innerHTML = questions[currentQuestion].answerOptions[2];

  currentQuestion++;
}


function restartQuiz() {
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').classList.remove('hidden');
  currentQuestion = 0;
  nextQuestion();
  points = 0;
}



function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#questionContainer').classList.add('hidden');
  document.querySelector('#pointsContainer').innerHTML = `Grattis, ${playerName}, du fick ${points} poäng!`;
}



