const questions = [
    // Level 1: Basic (0-3)
    { q: "Baaby khit va kh muk kin y?", options: ["teen", "mu", "hxm", "khaophut"], correct: 1 },
    { q: "Where would I love to travel?", options: ["Paris", "Tokyo", "New York", "Maldives"], correct: 0 },
    { q: "What is my favorite food?", options: ["Pizza", "Sushi", "Burgers", "Pasta"], correct: 1 },
    { q: "Which movie can I watch forever?", options: ["Titanic", "The Notebook", "Marvel Movies", "Harry Potter"], correct: 1 },
    // Level 2: Intermediate (4-6)
    { q: "What is my hidden talent?", options: ["Singing", "Cooking", "Sleeping", "Drawing"], correct: 2 },
    { q: "What kind of gifts do I like?", options: ["Expensive ones", "Handmade", "Flowers", "Chocolates"], correct: 1 },
    { q: "Who said 'I love you' first?", options: ["You", "Me", "We said it together", "Text message"], correct: 1 },
    // Level 3: Hard (7-9)
    { q: "What is my astrological sign?", options: ["Leo", "Cancer", "Libra", "Scorpio"], correct: 0 },
    { q: "What fits me best?", options: ["Cute", "Hot", "Smart", "All of the above"], correct: 3 },
    { q: "How much do I love you?", options: ["A little", "Too much", "Infinity", "Depends on the day"], correct: 2 }
];

let currentQuestionIndex = 0;
let userAnswers = []; // Store indices of user choices
let attempts = 3;

document.addEventListener('DOMContentLoaded', () => {
    // Check Permanent Success
    if (localStorage.getItem('quiz_success_lock') === 'true') {
        showSuccessScreen();
        return;
    }

    // Check Permanent Lock
    if (localStorage.getItem('quiz_fatal_lock') === 'true') {
        showFatalLock();
        return;
    }

    // Load Attempts
    const storedAttempts = localStorage.getItem('quiz_attempts');
    if (storedAttempts) {
        attempts = parseInt(storedAttempts);
    }
    updateAttemptsDisplay();

    if (attempts <= 0) {
        showFatalLock();
        return;
    }

    if (attempts <= 0) {
        showFatalLock();
        return;
    }

    loadQuestion(); // Start immediately
});

function updateAttemptsDisplay() {
    document.getElementById('attempts-val').innerText = attempts;
}

function loadQuestion() {
    // Level Checks removed - just continuous flow

    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = `${currentQuestionIndex + 1}. ${q.q}`;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index) {
    userAnswers.push(index);
    currentQuestionIndex++;
    setTimeout(loadQuestion, 300);
}

function finishQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const resultMsg = document.getElementById('result-msg');
    const wrongContainer = document.getElementById('wrong-answers-container');
    const homeBtn = document.getElementById('home-btn');
    const retryBtn = document.getElementById('retry-btn');

    quizContent.classList.add('hidden');
    resultSection.classList.remove('hidden');

    let wrongDetails = [];
    userAnswers.forEach((ans, i) => {
        if (ans !== questions[i].correct) {
            wrongDetails.push({
                q: questions[i].q,
                yours: questions[i].options[ans],
                correct: questions[i].options[questions[i].correct],
                index: i + 1
            });
        }
    });

    if (wrongDetails.length === 0) {
        // Success
        localStorage.setItem('quiz_success_lock', 'true');
        showSuccessScreen();
        sessionStorage.setItem('envelopeOpened', 'true');
    } else {
        // Fail
        attempts--;
        localStorage.setItem('quiz_attempts', attempts);
        updateAttemptsDisplay();

        resultTitle.innerText = "Incorrect Answers";
        resultMsg.innerText = `You made mistake(s). Attempts left: ${attempts}`;

        wrongContainer.innerHTML = "";
        wrongContainer.classList.remove('hidden');

        wrongDetails.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('wrong-item');
            div.innerHTML = `
                <div style="font-weight:bold; color:#fff">Q${item.index}: ${item.q}</div>
                <div style="color: #ff8fa3;">This question was answered incorrectly.</div>
                <div style="color: #90ee90; margin-top:5px;">Correct Answer: ${item.correct}</div>
            `;
            wrongContainer.appendChild(div);
        });

        if (attempts > 0) {
            retryBtn.classList.remove('hidden');
            retryBtn.onclick = retryQuiz;
        } else {
            // Fatal Lock
            retryBtn.classList.add('hidden');
            setTimeout(showFatalLock, 3000); // Give them a moment to realize they failed
        }
    }
}

function retryQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    loadQuestion();
}

function showFatalLock() {
    localStorage.setItem('quiz_fatal_lock', 'true');
    document.querySelector('.quiz-container').classList.add('hidden');
    document.getElementById('lock-screen').classList.remove('hidden');
}

function showSuccessScreen() {
    document.querySelector('.quiz-container').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
}
