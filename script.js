const resultForm = document.getElementById("resultForm");
const errorMessage = document.getElementById("errorMessage");
const resultBody = document.getElementById("resultBody");
const clearButton = document.getElementById("clearButton");

resultForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const markInputs = [
    document.getElementById("subject1").value,
    document.getElementById("subject2").value,
    document.getElementById("subject3").value
  ];

  if (!name) {
    errorMessage.textContent = "Please enter the student's name.";
    return;
  }

  if (markInputs.some((mark) => mark.trim() === "")) {
    errorMessage.textContent = "Please enter marks for all three subjects.";
    return;
  }

  const marks = markInputs.map(Number);
  if (marks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    errorMessage.textContent = "Please enter marks between 0 and 100 for all subjects.";
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / marks.length;
  let grade;

  if (percentage >= 90) {
    grade = "A";
  } else if (percentage >= 75) {
    grade = "B";
  } else if (percentage >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  const result = marks.every((mark) => mark >= 35) ? "Pass" : "Fail";
  const row = resultBody.insertRow();
  [name, total, `${percentage.toFixed(2)}%`, grade, result].forEach((value) => {
    row.insertCell().textContent = value;
  });

  errorMessage.textContent = "";
  resultForm.reset();
});

clearButton.addEventListener("click", function () {
  resultForm.reset();
  resultBody.replaceChildren();
  errorMessage.textContent = "";
});
