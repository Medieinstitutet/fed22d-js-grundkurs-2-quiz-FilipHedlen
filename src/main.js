import './style/style.scss'; // Import SCSS
import { questions } from './arrays'; // Import array of questions


const gameDescText = 'Welcome! Please enter your name and proceed with the quiz!'; // Variables of different sorts
const gameDescription = document.querySelector('#gameDescription');
const questionTextDiv = document.querySelector('#questionText');
const answer1Radio = document.querySelector('#answer1');
const answer2Radio = document.querySelector('#answer2');
const answer3Radio = document.querySelector('#answer3');
const nextQuestionBtn = document.querySelector('#nextQuestionBtn');




gameDescription.innerHTML = gameDescText;


document.querySelector('#startGameBtn').addEventListener('click', startQuiz); // Button for starting quiz
document.querySelector('#restartBtn').addEventListener('click', restartQuiz); // Button for restarting quiz
document.querySelector('#nextQuestionBtn').addEventListener('click', nextQuestion); // Button for next question

answer1Radio.addEventListener('change', checkAnswer);
answer2Radio.addEventListener('change', checkAnswer);
answer3Radio.addEventListener('change', checkAnswer);


document.querySelectorAll('.answer-radio').forEach(function(radioButton) {
  radioButton.style.display = 'none';
}); // Hide buttons when quiz is not in action

let playerName = '';
let currentQuestion = 0;
let points = 0;
let selectedAnswer;

questions.sort(() => Math.random() - 0.5) // Shuffling questions

function startQuiz() {
  playerName = document.querySelector('#playerInput').value; // Saving players name
  gameDescription.style.display = 'none'; // Hide HTML
  document.querySelector('#playerDetails').style.display = 'none';
  document.querySelectorAll('.answer-radio').forEach(function(radioButton) {
    radioButton.style.display = 'inline-block'; // Show radiobuttons 
  });

  nextQuestion();
}



function checkAnswer(e) {
  const userAnswer = e.currentTarget.nextSibling.nodeValue; // Gets the text value of the radio button
  selectedAnswer = userAnswer; // Store the selected answer with users answer
  nextQuestionBtn.removeAttribute('disabled'); // Enable the next question button

  const correctAnswer = questions[currentQuestion].correctAnswer; // Gives a point and deducts a point depending on wrong or right answer
  if (userAnswer == correctAnswer) {
    points += 1;
  } else {
    points -= 1;
  }
 
}


function nextQuestion() {
  currentQuestion++;  // Increment currentQuestion before displaying the current question

  if (currentQuestion >= questions.length) {
      gameOver();
      return;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  document.querySelector('label[for="answer1"]').textContent = questions[currentQuestion].answerOptions[0];
  document.querySelector('label[for="answer2"]').textContent = questions[currentQuestion].answerOptions[1];
  document.querySelector('label[for="answer3"]').textContent = questions[currentQuestion].answerOptions[2];
  document.querySelector('.nextquestionbtn').style.display = 'inline-block';
}


function restartQuiz() {
  document.querySelector('#questionContainer').style.display = 'block';
  document.querySelector('#pointsContainer').innerHTML = ''; // Hides the pointsContainer after restarting quiz
  document.querySelector('#gameOver').style.display = 'none';

  questions.sort(() => Math.random() - 0.5); // Shuffle the questions array

  points = 0;
  currentQuestion = 0;
  nextQuestion();
}



function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#questionContainer').style.display = 'none';
  document.querySelector('#pointsContainer').innerHTML = `Grattis, ${playerName}, du fick ${points} poäng!`;
}



