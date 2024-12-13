const colors = [
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "salmon",
    "aqua", "navy", "lime", "gray"
];
const pairs = colors.length; 
const gameContainer = document.getElementById("game-container");
const modal = document.getElementById("dynamic-modal");
const modalClose = document.getElementById("close-modal");
const dynamicImage = document.getElementById("dynamic-image");
const dynamicText = document.getElementById("dynamic-text");

let selectedDots = [];
let matchedPairs = 0;
let score = 0;

const images = [
    "dots1.png", "dots2.png", "dots3.png", "dots4.jpg", "dots5.jpg", "dots6.png",
    "dots7.jpg", "dots8.jpg", "dots9.png", "dots10.png", "dots11.png", "dots12.png"
];

const messages = [
    "You’re capable of amazing things—never stop believing in yourself!",
    "Every small step brings you closer to greatness.",
    "Success is not final; keep striving for your dreams.",
    "Every challenge is an opportunity to grow stronger.",
    "The journey may be tough, but the reward is worth it.",
    "You have the power to create something extraordinary today.",
    "Keep going—your best moments are still ahead.",
    "When you believe in yourself, everything becomes possible.",
    "Your hard work will always pay off in the end.",
    "Greatness lies in the courage to keep moving forward.",
    "Mistakes are proof that you’re trying—keep learning and improving.",
    "The best version of you is just one step away."
];

function initGame() {
    resetTimer();
    startTimer();
    matchedPairs = 0;
    score = 0;
    selectedDots = [];
    gameContainer.innerHTML = "";
    document.getElementById("score").textContent = "Score: 0";

    const allColors = [...colors, ...colors];
    shuffleArray(allColors);

    allColors.forEach(color => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.backgroundColor = color;
        dot.dataset.color = color;
        dot.addEventListener("click", () => handleDotClick(dot));
        gameContainer.appendChild(dot);
    });


    modal.style.display = "none";
    dynamicImage.style.display = "none";
    dynamicImage.src = "";
    dynamicText.textContent = "";
}

function handleDotClick(dot) {
    if (selectedDots.length === 2 || dot.classList.contains("matched")) return;

    dot.classList.add("selected");
    selectedDots.push(dot);

    if (selectedDots.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [dot1, dot2] = selectedDots;

    if (dot1.dataset.color === dot2.dataset.color) {
        dot1.classList.add("matched");
        dot2.classList.add("matched");
        matchedPairs++;
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;
        showDynamicContent();

        if (matchedPairs === pairs) {
            stopTimer();
            setTimeout(() => {
                alert("Congratulations! You've matched all the dots!");
            }, 500);
        }
    } else {
        setTimeout(() => {
            dot1.classList.remove("selected");
            dot2.classList.remove("selected");
        }, 500);
    }

    selectedDots = [];
}

function showDynamicContent() {
    const randomImage = images[matchedPairs % images.length];
    const randomMessage = messages[matchedPairs % messages.length];

    dynamicImage.src = randomImage;
    dynamicImage.style.display = "block"; 
    dynamicText.textContent = randomMessage;

    modal.style.display = "flex"; 
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let timerInterval;
let timeElapsed = 0;

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeElapsed = 0;
    document.getElementById("timer").textContent = "Time: 0s";
}


document.getElementById("restart-button").addEventListener("click", initGame);


modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

initGame();
