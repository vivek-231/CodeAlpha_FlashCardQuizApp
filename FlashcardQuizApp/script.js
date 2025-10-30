let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {question: "What is HTML?", answer: "A markup language for creating web pages"},
    {question: "What is CSS?", answer: "Styles for web pages"},
];

let current = 0;

function loadCard() {
    document.getElementById("question").innerText = flashcards[current].question;
    document.getElementById("answer").innerText = flashcards[current].answer;
    document.getElementById("answer").style.display = "none";
}

document.getElementById("showAnswerBtn").onclick = () =>
    document.getElementById("answer").style.display = "block";

document.getElementById("nextBtn").onclick = () => {
    current = (current + 1) % flashcards.length;
    loadCard();
};

document.getElementById("prevBtn").onclick = () => {
    current = (current - 1 + flashcards.length) % flashcards.length;
    loadCard();
};

document.getElementById("addBtn").onclick = () => openPopup("Add");
document.getElementById("editBtn").onclick = () => openPopup("Edit");
document.getElementById("deleteBtn").onclick = () => {
    flashcards.splice(current, 1);
    save();
    loadCard();
};

function openPopup(type) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("formTitle").innerText = type + " Flashcard";

    if (type === "Edit") {
        document.getElementById("newQuestion").value = flashcards[current].question;
        document.getElementById("newAnswer").value = flashcards[current].answer;
    } else {
        document.getElementById("newQuestion").value = "";
        document.getElementById("newAnswer").value = "";
    }

    document.getElementById("saveBtn").onclick = () => {
        let q = document.getElementById("newQuestion").value;
        let a = document.getElementById("newAnswer").value;

        if (type === "Add") flashcards.push({question: q, answer: a});
        else flashcards[current] = {question: q, answer: a};

        save();
        loadCard();
        closePopup();
    };
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("closeBtn").onclick = closePopup;

function save() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

loadCard();
