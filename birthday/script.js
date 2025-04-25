const quizData = [
  {
    question: "Bilakah waktu dan first place kita pergi 💑",
    options: ["Bulan 10 di Pantai Tanjung Dawai", "Bulan 11 di Pantai Tanjung Dawai", "Bulan 11 di Dobi", "Bulan 10 di Pantai Merdeka"],
    correct: 0,
    img: "images/1.gif",
    successImg: "images/i2.jpeg",
    successText: "Yes! bulan 10 dkt tanjung dawai, waktu bermula segalanya kisah kita! ❤️"
  },
  {
    question: "Cuba teka sayang akan dapat hadiah apa tahun ni? 🤪",
    options: ["Handbag", "Kasut", "Cincin", "Jam"],
    correct: 1,
    img: "images/2.gif",
    successImg: "images/i7.jpeg",
    successText: "Oopss mana boleh bagitahu. Kan rahsiaaaaa! 🥰"
  },
  {
    question: "Selama kita kenal, tempat makan mana jadi port favourite kita? 🍽️",
    options: ["Chagee", "Family Mart", "Kopi Bunga", "Nasi Kandar"],
    correct: 2,
    img: "images/3.gif",
    successImg: "images/i3.jpeg",
    successText: " Tepat, tapi i rasa semua tempat jadi port favourite asalkan dapat spend time togehter ⏰💘"
  },
  {
    question: "Apa gelaran manja I untuk you? 🥺",
    options: ["Sayang", "Baby", "B", "My Angel"],
    correct: 2,
    img: "images/4.gif",
    successImg: "images/i8.jpeg",
    successText: "Of course... B! 💕"
  },
  {
    question: "Siapa confess dulu? 😳",
    options: ["You", "I", "Kawan kita", "Tak ingat"],
    correct: 1,
    img: "images/7.gif",
    successImg: "images/i4.jpeg",
    successText: "Hehe I yang berani dulu 😎 Baru gentlemen kan. Walaupun lambat declare HAHAHAH 🥹❤️"
  },
  {
    question: "Tempat impian kita untuk travel sama? ✈️",
    options: ["Bali", "Korea", "Switzerland", "Japan"],
    correct: 2,
    img: "images/6.gif",
    successImg: "images/i9.jpeg",
    successText: "Swiss + You = My dream trip 🇨🇭💕"
  }
];

let currentQ = 0;
let score = 0;
let allowNext = false; // ➕ Tambah flag untuk kontrol bila boleh terus

function loadQuestion() {
  const qData = quizData[currentQ];
  document.getElementById("questionImage").src = qData.img;
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `<h2>${qData.question}</h2>` +
    qData.options.map((opt, i) =>
      `<div><input type="radio" name="answer" id="opt${i}" value="${i}">
       <label for="opt${i}">${opt}</label></div>`
    ).join("");
  allowNext = false; // Reset flag setiap kali load soalan baru
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Pilih jawapan dulu sayang 🥺");
    return;
  }

  const qData = quizData[currentQ];
  const isCorrect = parseInt(selected.value) === qData.correct;

  if (isCorrect) {
    score++;
    showPopup(qData.successImg, qData.successText, true);
    allowNext = true; // ➕ Hanya boleh next kalau betul
  } else {
    showPopup("images/bear.gif", "Oops salah sayang 😢 Cuba lagi okay 🧸", false);
    allowNext = false; // Kekal kat soalan ni
  }
}

function showPopup(img, text, correct) {
  document.getElementById("popupImg").src = img;
  document.getElementById("popupText").innerText = text;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  if (allowNext) {
    currentQ++;
    if (currentQ < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  } else {
    // Tak buat apa-apa, stay kat soalan yang sama
  }
}

function showResult() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("quizMusic").pause();
  document.getElementById("endingMusic").play();
  document.getElementById("scoreMessage").innerText =
    `You got ${score} out of ${quizData.length} correct! You're amazing 💖`;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("welcomeContainer").classList.add("hidden");
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("quizMusic").play();
    loadQuestion();
  });

  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("okBtn").addEventListener("click", closePopup);
});
