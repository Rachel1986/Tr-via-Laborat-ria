import questions from '../questions.js';
const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const spnQtd = document.querySelector('.spnQtd');
const content = document.querySelector('.content');
const contentFinish = document.querySelector('.finish');
const nextButton = document.querySelector('.next-button');
const welcomePage = document.querySelector('.welcome-page');
const startButton = document.querySelector('.start-button');
const nameInput = document.querySelector('.name-input');
const mainContent = document.querySelector('main');
const restartButton = document.querySelector('.restart-button');

let currentIndex = 0;
let questionsCorrect = 0;
let userName = '';

startButton.addEventListener('click', () => {
  userName = nameInput.value.trim();
  if (userName !== '') {
    welcomePage.style.display = 'none';
    mainContent.style.display = 'block';
    loadQuestion();
  } else {
    alert('Por favor, digite o seu nome.');
  }
});

restartButton.addEventListener('click', () => {
  currentIndex = 0;
  questionsCorrect = 0;
  userName = '';
  nameInput.value = '';

  document.querySelectorAll('.answer').forEach(button => {
    button.classList.remove('correct-answer');
    button.style.backgroundColor = '';
    button.disabled = false;
  });
  location.reload();
});

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.getAttribute('data-correct') === 'true';
  selectedButton.style.backgroundColor = isCorrect ? 'green' : 'red';

  if (!isCorrect) {
    const correctAnswerButton = document.querySelector('.correct-answer');
    correctAnswerButton.style.backgroundColor = 'green';
  }

  document.querySelectorAll('.answer').forEach(button => {
    button.disabled = true;
  });

  if (isCorrect) {
    questionsCorrect++;
  }
  nextButton.style.display = 'block';
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = '';
  question.innerHTML = item.question;

  item.answers.forEach(answer => {
    const div = document.createElement('div');

    div.innerHTML = `
    <button class="answer ${
      answer.correct ? 'correct-answer' : ''
    }" data-correct="${answer.correct}">
    ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click', selectAnswer);
  });
  nextButton.style.display = 'none';
}

nextButton.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
});

function finish() {
  const textFinish = document.querySelector('.finish span');
  textFinish.innerHTML = `${userName}, você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = 'none';
  contentFinish.style.display = 'flex';
}

loadQuestion();
