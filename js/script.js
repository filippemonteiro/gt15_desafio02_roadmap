const githubInput = document.getElementById("github-link");
const saveLinkBtn = document.getElementById("save-link");
const addTaskBtn = document.getElementById("add-task");
const timeline = document.getElementById("timeline");

let tasks = JSON.parse(localStorage.getItem("roadmap-tasks")) || [];
let repoLink = localStorage.getItem("github-repo") || "";

githubInput.value = repoLink;

// Salva link do GitHub
saveLinkBtn.addEventListener("click", () => {
  const url = githubInput.value;
  localStorage.setItem("github-repo", url);
  alert("Link salvo com sucesso!");
});

// Adiciona nova tarefa
addTaskBtn.addEventListener("click", () => {
  const description = prompt("Descrição da tarefa:");
  if (!description) return;

  const status = prompt("Status (Pendente, Em andamento, Concluído):") || "Pendente";
  const deadline = prompt("Prazo estimado:") || "Sem prazo";
  const owner = prompt("Responsável:") || "Não definido";

  const task = {
    id: Date.now(),
    description,
    status,
    deadline,
    owner,
  };

  tasks.push(task);
  saveTasks();
  addTaskToDOM(task);
});

// Atualiza o localStorage
function saveTasks() {
  localStorage.setItem("roadmap-tasks", JSON.stringify(tasks));
}

// Adiciona tarefa visualmente
function addTaskToDOM(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  card.innerHTML = `
    <h2>${task.description}</h2>
    <p><strong>Status:</strong> <span class="status">${task.status}</span></p>
    <p><strong>Prazo:</strong> <span class="deadline">${task.deadline}</span></p>
    <p><strong>Responsável:</strong> <span class="owner">${task.owner}</span></p>
    <button class="edit-task">Editar</button>
  `;

  card.querySelector(".edit-task").addEventListener("click", () => {
    const status = prompt("Novo status:", task.status) || task.status;
    const deadline = prompt("Novo prazo:", task.deadline) || task.deadline;
    const owner = prompt("Novo responsável:", task.owner) || task.owner;

    task.status = status;
    task.deadline = deadline;
    task.owner = owner;

    card.querySelector(".status").textContent = status;
    card.querySelector(".deadline").textContent = deadline;
    card.querySelector(".owner").textContent = owner;

    saveTasks();
  });

  timeline.appendChild(card);
}

// Inicializa com tarefas já salvas
tasks.forEach(task => addTaskToDOM(task));
