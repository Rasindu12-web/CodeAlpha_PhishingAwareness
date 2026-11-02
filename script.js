
const themeButton = document.getElementById("theme-toggle");

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeButton();

// Switch theme when button is clicked
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
});

/* Phishing Awareness Interactive Quiz */

const questions = [
    {
        question: "What is phishing?",
        answers: [
            "A method of protecting networks",
            "A scam used to steal sensitive information",
            "A software update",
            "A type of computer hardware"
        ],
        correct: 1
    },
    {
        question: "Which is a warning sign of phishing?",
        answers: [
            "An unexpected urgent request",
            "An email from a known friend",
            "A normal website layout",
            "A regular security update"
        ],
        correct: 0
    },
    {
        question: "What should you do with a suspicious link?",
        answers: [
            "Click it immediately",
            "Share it with friends",
            "Verify it through an official channel",
            "Enter your password"
        ],
        correct: 2
    },
    {
        question: "What does MFA stand for?",
        answers: [
            "Multi-Factor Authentication",
            "Main File Access",
            "Multiple Firewall Application",
            "Managed File Authentication"
        ],
        correct: 0
    },
    {
        question: "How can you avoid fake login websites?",
        answers: [
            "Trust every search result",
            "Check the domain and use official bookmarks",
            "Ignore browser warnings",
            "Enter passwords on unfamiliar pages"
        ],
        correct: 1
    }
];

const quizBox = document.getElementById("quiz-box");
const quizResult = document.getElementById("quiz-result");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    quizResult.textContent = "";
    quizBox.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const questionText = document.createElement("p");
    questionText.textContent = q.question;

    quizBox.appendChild(heading);
    quizBox.appendChild(questionText);

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.type = "button";

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        quizBox.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    const q = questions[currentQuestion];

    if (selectedIndex === q.correct) {
        score++;
        quizResult.textContent = "Correct answer!";
        quizResult.style.color = "#16a34a";
    } else {
        quizResult.textContent =
            `Incorrect. Correct answer: ${q.answers[q.correct]}`;
        quizResult.style.color = "#dc2626";
    }

    const buttons = quizBox.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    const nextButton = document.createElement("button");
    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Show Final Score"
        : "Next Question";

    nextButton.addEventListener("click", () => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showFinalScore();
        }
    });

    quizBox.appendChild(nextButton);
}

function showFinalScore() {
    quizBox.innerHTML = "";
    quizResult.textContent = "";

    const heading = document.createElement("h3");
    heading.textContent = `Your Score: ${score}/${questions.length}`;

    const percentage = (score / questions.length) * 100;

    const message = document.createElement("p");
    message.textContent = percentage >= 80
        ? "Excellent! You have strong phishing awareness."
        : "Good effort! Review the lessons and try again.";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Try Again";

    restartButton.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });

    quizBox.append(heading, message, restartButton);
}

// Start the quiz
showQuestion();
