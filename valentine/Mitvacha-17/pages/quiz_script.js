const questions = [
    {
        question: "What is my favorite color?",
        options: ["Blue", "Pink", "Black", "Red"],
        correct: 1 // Index of correct answer (Pink)
    },
    {
        question: "Where would I love to travel?",
        options: ["Paris", "Tokyo", "New York", "Maldives"],
        correct: 0
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Sushi", "Burgers", "Pasta"],
        correct: 1
    },
    {
        question: "Which movie can I watch forever?",
        options: ["Titanic", "The Notebook", "Marvel Movies", "Harry Potter"],
        correct: 1
    },
    {
        question: "What is my hidden talent?",
        options: ["Singing", "Cooking", "Sleeping", "Drawing"],
        correct: 2
    },
    {
        question: "What kind of gifts do I like?",
        options: ["Expensive ones", "Handmade", "Flowers", "Chocolates"],
        correct: 1
    },
    {
        question: "Who said 'I love you' first?",
        options: ["You", "Me", "We said it together", "Text message"],
        correct: 1
    },
    {
        question: "What is my astrological sign?",
        options: ["Leo", "Cancer", "Libra", "Scorpio"],
        correct: 0
    },
    {
        question: "What fits me best?",
        options: ["Cute", "Hot", "Smart", "All of the above"],
        correct: 3
    },
    {
        question: "How much do I love you?",
        options: ["A little", "Too much", "Infinity", "Depends on the day"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
    // Check if already taken
    if (localStorage.getItem('quizTaken') === 'true') {
        showAlreadyTaken();
        return;
    }

    loadQuestion();

    document.getElementById('next-btn').addEventListener('click', () => {
        const selectedOption = document.querySelector('.option-btn.selected');
        if (selectedOption) {
            checkAnswer(parseInt(selectedOption.dataset.index));
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        }
    });
});

function showAlreadyTaken() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('already-taken').style.display = 'block';
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = `${currentQuestionIndex + 1}. ${q.question}`;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    document.getElementById('next-btn').style.display = 'none';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.dataset.index = index;
        btn.onclick = () => selectOption(btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(btn) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('next-btn').style.display = 'inline-block';
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    } else {
        wrongAnswers.push({
            question: questions[currentQuestionIndex].question,
            yourAnswer: questions[currentQuestionIndex].options[selectedIndex],
            correctAnswer: questions[currentQuestionIndex].options[correctIndex]
        });
    }
}

function finishQuiz() {
    // Set flag in localStorage
    localStorage.setItem('quizTaken', 'true');

    document.getElementById('quiz-content').style.display = 'none';
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';

    document.getElementById('score').innerText = score;

    let message = "";
    if (score < 5) {
        message = "You are not interested in me. 😢";
    } else if (score > 7 && score < 10) {
        message = "You know me so well! Love you! ❤️";
    } else if (score === 10) {
        message = "You are very interested in me! Perfect match! 💍";
    } else {
        message = "Not bad, but you can do better! 😉";
    }
    document.getElementById('message').innerText = message;

    if (wrongAnswers.length > 0) {
        const wrongContainer = document.getElementById('wrong-answers-container');
        wrongContainer.style.display = 'block';
        wrongAnswers.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('wrong-item');
            div.innerHTML = `<strong>Q: ${item.question}</strong><br>
                             <span style='color:red'>Your Answer: ${item.yourAnswer}</span><br>
                             <span style='color:green'>Correct: ${item.correctAnswer}</span>`;
            wrongContainer.appendChild(div);
        });
    }
}
