function adicionarTarefa() {
  const descricao = prompt("Descrição da tarefa:");
  if (!descricao) return;

  const status = prompt(
    "Status atual da tarefa (ex: Em andamento, Concluído, Pendente):"
  );
  if (!status) return;

  const prazo = prompt("Prazo estimado de entrega (ex: 20/04/2025):");
  if (!prazo) return;

  const responsavel = prompt("Responsável pela tarefa:");
  if (!responsavel) return;

  const repositorio = prompt("Link do repositório no GitHub:");
  if (!repositorio) return;

  const novaTarefa = {
    descricao,
    status,
    prazo,
    responsavel,
    repositorio,
  };

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  exibirTarefas();
}

function exibirTarefas() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach((tarefa, index) => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h2>${tarefa.descricao}</h2>
      <p class="status">Status: ${tarefa.status}</p>
      <p class="deadline">Prazo: ${tarefa.prazo}</p>
      <p class="owner">Responsável: ${tarefa.responsavel}</p>
      <p><a href="${tarefa.repositorio}" class="repo-link" target="_blank">Ver repositório</a></p>
      <button class="edit-task" onclick="editarTarefa(${index})">Editar</button>
    `;

    timeline.appendChild(card);
  });
}

function editarTarefa(index) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const tarefa = tarefas[index];

  const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
  if (!novaDescricao) return;

  const novoStatus = prompt("Editar status:", tarefa.status);
  if (!novoStatus) return;

  const novoPrazo = prompt("Editar prazo:", tarefa.prazo);
  if (!novoPrazo) return;

  const novoResponsavel = prompt("Editar responsável:", tarefa.responsavel);
  if (!novoResponsavel) return;

  const novoRepositorio = prompt(
    "Editar link do repositório:",
    tarefa.repositorio
  );
  if (!novoRepositorio) return;

  tarefas[index] = {
    descricao: novaDescricao,
    status: novoStatus,
    prazo: novoPrazo,
    responsavel: novoResponsavel,
    repositorio: novoRepositorio,
  };

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  exibirTarefas();
}

// Ao carregar a página
window.onload = exibirTarefas;
