const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

function salvarAgendamentos() {
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

function renderizarAgendamentos() {
  lista.innerHTML = "";
  agendamentos.forEach((ag, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${ag.nome}</strong> - ${ag.servico} - ${new Date(ag.data).toLocaleString()}
      <button onclick="editarAgendamento(${index})">Editar</button>
      <button onclick="excluirAgendamento(${index})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

function editarAgendamento(index) {
  const ag = agendamentos[index];
  document.getElementById("nome").value = ag.nome;
  document.getElementById("servico").value = ag.servico;
  document.getElementById("data").value = ag.data;

  agendamentos.splice(index, 1);
  salvarAgendamentos();
  renderizarAgendamentos();
}

function excluirAgendamento(index) {
  if (confirm("Tem certeza que deseja excluir esse agendamento?")) {
    agendamentos.splice(index, 1);
    salvarAgendamentos();
    renderizarAgendamentos();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;

  agendamentos.push({ nome, servico, data });
  salvarAgendamentos();
  renderizarAgendamentos();
  form.reset();
});

renderizarAgendamentos();