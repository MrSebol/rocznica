// ================== QUIZ ==================

const slides = [
    {
        type: "question",
        question: "Kto pierwszy napisał?",
        answers: ["Sebastianuch", "Karolinka"],
        correct: ["Karolinka"],
        image: "100.jpg"
    },
    {
        type: "memory",
        image: "1.jpg",
        text: "To był moment, kiedy bardziej ciebie poznałem 💕"
    },
    {
        type: "question",
        question: "Kto się pierwszy przywitał?",
        answers: ["Sebastianuch", "Karolinka"],
        correct: ["Karolinka"],
        image: "pisanie.jpg"
    },
    {
        type: "question",
        question: "Gdzie było pierwsze wspólne wyjście?",
        answers: ["Galeria Bałtycka", "Park", "Forum"],
        correct: ["Forum"],
        image: "randka.jpg"
    },
    {
        type: "memory",
        image: "3.jpg",
        text: "Drugi raz wersja galowa nasza ❤️❤️❤️"
    },
    {
        type: "question",
        question: "Gdzie byliśmy na naszej pół rocznicy?",
        answers: ["Forum", "Kózki w Bojanie", "Spacer w parku"],
        correct: ["Kózki w Bojanie"],
        image: "koza.jpg"
    },
    {
        type: "memory",
        image: "4.jpg",
        text: "Nasza pół rocznica i najlepsze kózki 🐐💗"
    },
    {
        type: "memory",
        image: "ja.jpg",
        text: "Bo jesteś najpiękniejsza ❤️"
    },
    {
        type: "question",
        question: "Kiedy był pierwszy pocałunek?",
        answers: ["13 Kwietnia 2025", "23 Kwietnia 2025", "15 Marca 2025"],
        correct: ["23 Kwietnia 2025"],
        image: "całus.jpg"
    },
    {
        type: "memory",
        image: "2.jpg",
        text: "Uwielbiam nasze całowania i to były moje najlepsze urodziny w życiu 💗"
    },
    {
        type: "question",
        question: "Gdzie był nasz pierwszy raz?",
        answers: ["Hagen Niemcy", "Gdańsk", "Polska"],
        correct: ["Hagen Niemcy"],
        image: "Hagen.jpg"
    },
    {
        type: "memory",
        image: "5.jpg",
        text: "Wspólne spanie i maseczki ❤️"
    },
    {
        type: "memory",
        image: "motlawa.jpg",
        text: "Zamarznięta Motława ❄️"
    },
    {
        type: "memory",
        image: "bałtyk.jpg",
        text: "Zamarznięty Bałtyk i Twój rekord wejścia do morza 💙"
    },
    {
        type: "memory",
        image: "ślub.jpg",
        text: "Chciałbym żeby nasz związek tak się zakończył"
    },
    {
        type: "memory",
        image: "7.jpg",
        text: "Najlepszy sylwester w życiu ❤️❤️❤️❤️"
    },
     {
        type: "memory",
        image: "6.jpg",
        text: "KOCHAM CIĘ MOJA KAROLINKO ❤️❤️❤️❤️"
    }
];

let current = 0;

function startQuiz() {
    document.querySelector(".hero").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    loadSlide();
}

function loadSlide() {
    if (current >= slides.length) {
        showAlbum();
        return;
    }

    const slide = slides[current];
    const container = document.getElementById("quiz-section");

    if (slide.type === "question") {
        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-image">
                    <img src="${slide.image}">
                </div>
                <div class="quiz-box">
                    <h2>${slide.question}</h2>
                    <div id="answers"></div>
                    <p id="feedback"></p>
                </div>
            </div>
        `;

        const answersDiv = document.getElementById("answers");

        slide.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.innerText = answer;
            btn.onclick = () => checkAnswer(answer);
            answersDiv.appendChild(btn);
        });

    } else {
        container.innerHTML = `
            <div class="memory-container">
                <img src="${slide.image}">
                <div class="memory-text">
                    <p>${slide.text}</p>
                    <button onclick="nextSlide()">Dalej ➡</button>
                </div>
            </div>
        `;
    }
}

function checkAnswer(answer) {
    const slide = slides[current];
    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach(btn => {
        if (slide.correct.includes(btn.innerText)) {
            btn.classList.add("correct");
        }
        if (btn.innerText === answer && !slide.correct.includes(answer)) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (slide.correct.includes(answer)) {
        setTimeout(() => {
            current++;
            loadSlide();
        }, 800);
    } else {
        document.getElementById("feedback").innerText =
            "Oj nieee 😘 Spróbuj jeszcze raz!";
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove("wrong");
                btn.disabled = false;
            });
        }, 800);
    }
}

function nextSlide() {
    current++;
    loadSlide();
}

function showAlbum() {
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("album-section").style.display = "block";
}

function restartQuiz() {
    current = 0;
    document.getElementById("album-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    loadSlide();
}

// ================== LIGHTBOX + SWIPE + SERCA ==================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const photos = document.querySelectorAll(".gallery .photo");

let currentPhotoIndex = 0;

// otwieranie
photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
        currentPhotoIndex = index;
        openLightbox(photo.src);
        createHearts(5);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

closeBtn.onclick = () => {
    lightbox.style.display = "none";
};

function showPhoto(index) {
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;

    currentPhotoIndex = index;
    lightboxImg.src = photos[currentPhotoIndex].src;

    createHearts(3); // 💗 serduszka przy zmianie
}

// klawiatura
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") showPhoto(currentPhotoIndex + 1);
        if (e.key === "ArrowLeft") showPhoto(currentPhotoIndex - 1);
    }
});

// SWIPE
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            showPhoto(currentPhotoIndex + 1);
        } else {
            showPhoto(currentPhotoIndex - 1);
        }
    }
});

// ================== SERDUSZKA ==================

function createHearts(amount) {
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = window.innerHeight - 50 + "px";

        document.body.appendChild(heart);

        const randomX = (Math.random() - 0.5) * 200;
        const duration = 1000 + Math.random() * 1000;

        heart.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

        requestAnimationFrame(() => {
            heart.style.transform = `translate(${randomX}px, -300px) scale(1.5)`;
            heart.style.opacity = 0;
        });

        setTimeout(() => heart.remove(), duration);
    }
}
