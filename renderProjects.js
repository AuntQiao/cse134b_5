import "./projectCard.js";

// const projects = [
//   {
//     title: "Vision-Based Liquid Extraction",
//     description: "Computer vision + YOLOv8 system for high-throughput liquid extraction at Berkeley Lab.",
//     img: "images/LLM.jpg",
//     imgSm: "images/LLM-small.jpg",
//     alt: "Diagram showing a brain with LLM inside",
//     link: "projects.html#vision"
//   },
//   {
//     title: "Quantum Circuit Scheduler",
//     description: "A compiler optimization tool for Qiskit circuits, including trapped-ion gate mapping.",
//     img: "images/quantum.png",
//     imgSm: "images/quantum-small.png",
//     alt: "Visualization of a quantum circuit with multiple gates, representing Qiskit scheduling and trapped-ion compiler optimization",
//     link: "projects.html#quantum"
//   },
//   {
//     title: "Escape Game – Sequence Rush",
//     description: "A math-learning mini-game built using Konva.js and a full MVC architecture.",
//     img: "images/game.png",
//     imgSm: "images/game-small.png",
//     alt: "Escape game interface with login and sign up options",
//     link: "projects.html#game"
//   }
// ];

// const container = document.querySelector("#project-list");

// projects.forEach(project => {
//   const card = document.createElement("project-card");quantumgam
//   card.data = project;
//   container.appendChild(card);
// });

// hw5 - part 2
const container = document.querySelector("#project-list");
const localBtn = document.querySelector("#load-local");
const remoteBtn = document.querySelector("#load-remote");

function renderCards(dataArray) {
  container.innerHTML = ""; // remove existing cards
  dataArray.forEach(p => {
    const card = document.createElement("project-card");
    card.data = p;
    container.appendChild(card);
  });
}

// Load Local
localBtn.addEventListener("click", () => {
  const stored = localStorage.getItem("projectData");
  if (!stored) {
    alert("No local data found! Please run localSetup.js first.");
    return;
  }
  const data = JSON.parse(stored);
  renderCards(data);
});

// Load Remote
remoteBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/6934fc9fd0ea881f4017f053");
    
    const json = await res.json();
    console.log("Remote JSON:", json);

    const dataArray = json.record;
    console.log("Data Array:", dataArray);

    if (!Array.isArray(dataArray)) {
      alert("Remote data is not an array!");
      return;
    }

    renderCards(dataArray);

  } catch (err) {
    console.error(err);
    alert("Failed to load remote data.");
  }
});
