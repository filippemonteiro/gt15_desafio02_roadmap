import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 Insira suas credenciais do Supabase aqui:
const supabaseUrl = "https://zkjaegcczqwfthdhxvmr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpramFlZ2NjenF3ZnRoZGh4dm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4Mjk1MzcsImV4cCI6MjA2MDQwNTUzN30.-hdIO7jPw07RIW2UorOZduB-5UrvmcwVb3-VyQbAH2U";
const supabase = createClient(supabaseUrl, supabaseKey);

const githubInput = document.getElementById("github-link");
const saveLinkBtn = document.getElementById("save-link");
const addTaskBtn = document.getElementById("add-task");
const timeline = document.getElementById("timeline");

async function loadGithubLink() {
  const { data, error } = await supabase
    .from("github_links")
    .select("url")
    .limit(1)
    .single();
  if (data) githubInput.value = data.url;
}

async function saveGithubLink() {
  const url = githubInput.value;
  await supabase.from("github_links").delete();
  const { error } = await supabase.from("github_links").insert([{ url }]);
  if (!error) alert("Link salvo com sucesso!");
}

async function loadTasks() {
  const { data, error } = await supabase.from("tasks").select("*");
  data.forEach((task) => addTaskToDOM(task));
}

async function addTaskToSupabase(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select()
    .single();
  if (!error) addTaskToDOM(data);
}

async function updateTaskInSupabase(task) {
  await supabase.from("tasks").update(task).eq("id", task.id);
}

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

  card.querySelector(".edit-task").onclick = async () => {
    const status = prompt("Novo status:", task.status) || task.status;
    const deadline = prompt("Novo prazo:", task.deadline) || task.deadline;
    const owner = prompt("Novo responsável:", task.owner) || task.owner;

    task.status = status;
    task.deadline = deadline;
    task.owner = owner;

    card.querySelector(".status").textContent = status;
    card.querySelector(".deadline").textContent = deadline;
    card.querySelector(".owner").textContent = owner;

    await updateTaskInSupabase(task);
  };

  timeline.appendChild(card);
}

// EVENTOS
saveLinkBtn.addEventListener("click", saveGithubLink);

addTaskBtn.addEventListener("click", async () => {
  const description = prompt("Descrição da tarefa:");
  if (!description) return;

  const status =
    prompt("Status (Pendente, Em andamento, Concluído):") || "Pendente";
  const deadline = prompt("Prazo estimado (ex: 25/04/2025):") || "Sem prazo";
  const owner = prompt("Responsável:") || "Não definido";

  const task = { description, status, deadline, owner };
  await addTaskToSupabase(task);
});

// Carrega tudo ao abrir
loadGithubLink();
loadTasks();
