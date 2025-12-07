// Default proposals (10 items)
const defaultProposals = [
  "Improve model accuracy for liquid interface detection.",
  "Build a visualization dashboard for extraction experiment results.",
  "Add anomaly detection for faulty liquid-level measurements.",
  "Develop a mini-game to teach chemical extraction concepts.",
  "Integrate real-time progress monitoring for experiments.",
  "Benchmark different vision models on transparent liquids.",
  "Add noise-robust preprocessing for blurry lab images.",
  "Research latency reduction techniques for ML inference.",
  "Create a small dataset labeling pipeline for new solvents.",
  "Investigate cross-model generalization on unseen glassware."
];

// Initialize on first load
if (!localStorage.getItem("proposals")) {
  localStorage.setItem("proposals", JSON.stringify(defaultProposals));
}

function loadProposals() {
  return JSON.parse(localStorage.getItem("proposals")) || [];
}

function saveProposals(arr) {
  localStorage.setItem("proposals", JSON.stringify(arr));
  displayProposals();
}

function displayProposals() {
  const list = document.getElementById("proposal-list");
  const arr = loadProposals();
  list.innerHTML = "";
  arr.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${p}`;
    list.appendChild(li);
  });
}

document.getElementById("create-btn").addEventListener("click", () => {
  const text = document.getElementById("proposal-text").value.trim();

  if (!text) {
    setStatus("Proposal text cannot be empty!", true);
    return;
  }

  const arr = loadProposals();
  arr.push(text);
  saveProposals(arr);
  setStatus("Proposal created successfully!");
});

document.getElementById("update-btn").addEventListener("click", () => {
  const indexInput = document.getElementById("index").value;
  const userIndex = Number(indexInput);
  const realIndex = userIndex - 1;

  const text = document.getElementById("proposal-text").value.trim();
  const arr = loadProposals();

  if (!Number.isInteger(userIndex) || userIndex <= 0 || realIndex >= arr.length) {
    setStatus("Invalid index. Index must start from 1.", true);
    return;
  }

  if (!text) {
    setStatus("Proposal text cannot be empty.", true);
    return;
  }

  arr[realIndex] = text;
  saveProposals(arr);

  setStatus(`Updated proposal #${userIndex}.`);
});

document.getElementById("delete-btn").addEventListener("click", () => {
  const indexInput = document.getElementById("index").value;
  const replacement = document.getElementById("proposal-text").value.trim();

  const userIndex = Number(indexInput);
  const realIndex = userIndex - 1;   
  const arr = loadProposals();

  if (!Number.isInteger(userIndex) || userIndex <= 0 || realIndex >= arr.length) {
    setStatus("Invalid index. Please enter a valid number starting from 1.", true);
    return;
  }

 
  if (arr.length <= 10 && !replacement) {
    setStatus("Please provide a replacement proposal before deleting (required when total ≤ 10).", true);
    return;
  }

  arr.splice(realIndex, 1);

  if (arr.length < 10 && replacement) {
    arr.push(replacement);
  }

  saveProposals(arr);

  if (arr.length >= 10) {
    setStatus(`Deleted proposal #${userIndex}. No replacement needed.`);
  } else {
    setStatus(`Deleted proposal #${userIndex} and added your replacement.`);
  }
});
// Status helper
function setStatus(msg, error = false) {
  const s = document.getElementById("status");
  s.textContent = msg;
  s.style.color = error ? "red" : "green";
}
// Character countdown
const textArea = document.getElementById("proposal-text");
const counter = document.getElementById("char-remaining");
const max = 100;  
textArea.setAttribute("maxlength", max); 

textArea.addEventListener("input", () => {
  const len = textArea.value.length;
  const remaining = max - len;

  counter.textContent = `${remaining} characters remaining`;

  if (remaining <= 10) {
    counter.style.color = "red";
  } else {
    counter.style.color = "blue";
  }
});

// my project summary toggle
const summaryBtn = document.getElementById("toggle-summary-btn");
const summaryBox = document.getElementById("project-summary");

const projectSummaries = [
  "1. Vision-Based Liquid Extraction — Computer vision + YOLOv8 system for detecting phase boundaries in liquid-liquid extraction experiments.",
  "2. Quantum Circuit Scheduler — A Python tool optimizing Qiskit circuits for trapped-ion architectures.",
  "3. Sequence Rush — A math-learning mini-game built in Konva.js with an MVC architecture."
];

function renderSummary() {
  summaryBox.innerHTML = projectSummaries
    .map(text => `<p style="text-align:left; margin:0.5rem 0;">${text}</p>`)
    .join("");
}

summaryBtn.addEventListener("click", () => {
  if (summaryBox.style.display === "none") {
    renderSummary();
    summaryBox.style.display = "block";
    summaryBtn.textContent = "Hide My Previous Projects";
  } else {
    summaryBox.style.display = "none";
    summaryBtn.textContent = "Show My Previous Projects";
  }
});


displayProposals();
