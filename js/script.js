const githubInput = document.getElementById("github-link");
const saveLinkBtn = document.getElementById("save-link");
const addTaskBtn = document.getElementById("add-task");
const timeline = document.getElementById("timeline");

let tasks = JSON.parse(localStorage.getItem("roadmap-tasks")) || [];

githubInput.value = "";

// Adiciona nova etapa
addTaskBtn.addEventListener("click", () => {
  const description = prompt("Descrição da tarefa:");
  if (!description) return;

  const status =
    prompt("Status (Pendente, Em andamento, Concluído):") || "Pendente";
  const deadline = prompt("Prazo estimado:") || "Sem prazo";
  const owner = prompt("Responsável:") || "Não definido";
  const repoLink = prompt("Link do repositório para esta etapa:");

  if (!repoLink)
    return alert("Por favor, insira o link do repositório para esta etapa.");

  const task = {
    id: Date.now(),
    description,
    status,
    deadline,
    owner,
    repoLink,
  };

  tasks.push(task);
  saveTasks();
  addTaskToDOM(task);
});

function saveTasks() {
  localStorage.setItem("roadmap-tasks", JSON.stringify(tasks));
}

function addTaskToDOM(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  card.innerHTML = `
    <h2>${task.description}</h2>
    <p><strong>Status:</strong> <span class="status">${task.status}</span></p>
    <p><strong>Prazo:</strong> <span class="deadline">${task.deadline}</span></p>
    <p><strong>Responsável:</strong> <span class="owner">${task.owner}</span></p>
    <p><strong>Repositório:</strong> <a href="${task.repoLink}" target="_blank" class="repo-link">${task.repoLink}</a></p>
    <button class="edit-task">Editar</button>
  `;

  card.querySelector(".edit-task").addEventListener("click", () => {
    const status = prompt("Novo status:", task.status) || task.status;
    const deadline = prompt("Novo prazo:", task.deadline) || task.deadline;
    const owner = prompt("Novo responsável:", task.owner) || task.owner;
    const repoLink =
      prompt("Novo repositório:", task.repoLink) || task.repoLink;

    task.status = status;
    task.deadline = deadline;
    task.owner = owner;
    task.repoLink = repoLink;

    card.querySelector(".status").textContent = status;
    card.querySelector(".deadline").textContent = deadline;
    card.querySelector(".owner").textContent = owner;
    card.querySelector(".repo-link").href = repoLink;
    card.querySelector(".repo-link").textContent = repoLink;

    saveTasks();
  });

  timeline.appendChild(card);
}

// Inicialização
tasks.forEach((task) => addTaskToDOM(task));
