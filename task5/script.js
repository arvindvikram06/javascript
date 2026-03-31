let currentIndex = 0;
let score = 0;
let selectedOption = null;

const progress = JSON.parse(localStorage.getItem("quiz-progress")) || {currentIndex: 0 , score: 0};


const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");


var questions = null;


async function getQuizData(){
    const list = await fetch("questions.json")

    const data = await list.json();

    // console.log("data")

    questions = data; 

    loadQuestion();
}

function loadQuestion() {
    const q = questions[progress.currentIndex];
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";
    selectedOption = null;

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.textContent = opt;
        div.classList.add("option");

        div.addEventListener("click", () => {
            document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
            div.classList.add("selected");
            selectedOption = index;
        });

        optionsEl.appendChild(div);
    });
}


nextBtn.addEventListener("click", () => {
    if (selectedOption === null) {
        alert("Please select an option");
        return;
    }

    if (selectedOption === questions[progress.currentIndex].answer) {
        progress.score++;
    }

    progress.currentIndex++;

    localStorage.setItem("quiz-progress",JSON.stringify(progress))

    if (progress.currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});


function showResult() {
    questionEl.classList.add("hidden");
    optionsEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    resultEl.classList.remove("hidden");

    let feedback = "";

    if (progress.score === questions.length) {
        feedback = "outstanding!";
    } else if (progress.score >= 7) {
        feedback = "great";
    } else {
        feedback = "Keep learning";
    }
    console.log('last index');
    resultEl.innerHTML = `
    <h2>Your Score: ${progress.score}/${questions.length}</h2>
    <p>${feedback}</p>
    <button onclick="retry()">Retry</button>
  `;
}

function retry() {
    progress.currentIndex = 0;
    progress.score = 0;

    localStorage.removeItem("quiz-progress");
    
    questionEl.classList.remove("hidden");
    optionsEl.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    resultEl.classList.add("hidden");
    loadQuestion();
}


getQuizData();