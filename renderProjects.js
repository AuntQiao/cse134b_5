import "./projectCard.js";

const projects = [
  {
    title: "Vision-Based Liquid Extraction",
    description: "Computer vision + YOLOv8 system for high-throughput liquid extraction at Berkeley Lab.",
    img: "images/LLM.jpg",
    imgSm: "images/LLM-small.jpg",
    alt: "Diagram showing a brain with LLM inside",
    link: "projects.html#vision"
  },
  {
    title: "Quantum Circuit Scheduler",
    description: "A compiler optimization tool for Qiskit circuits, including trapped-ion gate mapping.",
    img: "images/quantum.png",
    imgSm: "images/quantum-small.png",
    alt: "Visualization of a quantum circuit with multiple gates, representing Qiskit scheduling and trapped-ion compiler optimization",
    link: "projects.html#quantum"
  },
  {
    title: "Escape Game – Sequence Rush",
    description: "A math-learning mini-game built using Konva.js and a full MVC architecture.",
    img: "images/game.png",
    imgSm: "images/game-small.png",
    alt: "Escape game interface with login and sign up options",
    link: "projects.html#game"
  }
];

const container = document.querySelector("#project-list");

projects.forEach(project => {
  const card = document.createElement("project-card");
  card.data = project;
  container.appendChild(card);
});
