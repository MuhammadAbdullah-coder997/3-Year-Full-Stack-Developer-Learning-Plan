const flashcardsContainer = document.getElementById("flashcards");
const addBtn = document.getElementById("addBtn");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function renderFlashcards() {
  flashcardsContainer.innerHTML = "";

  flashcards.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <div class="question">${card.question}</div>
      <div class="answer">${card.answer}</div>
      <button class="delete-btn" onclick="deleteCard(${index})">×</button>
    `;

    cardEl.addEventListener("click", () => {
      cardEl.classList.toggle("show");
    });

    flashcardsContainer.appendChild(cardEl);
  });
}

function addFlashcard() {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) return alert("Please fill out both fields");

  flashcards.push({ question, answer });
  localStorage.setItem("flashcards", JSON.stringify(flashcards));

  questionInput.value = "";
  answerInput.value = "";

  renderFlashcards();
}

function deleteCard(index) {
  flashcards.splice(index, 1);
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  renderFlashcards();
}

addBtn.addEventListener("click", addFlashcard);
renderFlashcards();
