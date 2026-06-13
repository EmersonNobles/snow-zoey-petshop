/* ============================================
   Snow e Zoey Petshop — Funções JavaScript
   Autor: Emerson Ricardo da Silva Nobles
   ADS PUC — Fase 2
   ============================================ */

/* --- Função 1: Relógio em tempo real no header --- */
function atualizarRelogio() {
  const el = document.getElementById('relogio-header');
  if (!el) return;
  const agora = new Date();
  const horas   = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  el.textContent = horas + ':' + minutos + ':' + segundos;
}
setInterval(atualizarRelogio, 1000);

/* --- Função 2: Saudação dinâmica por período do dia --- */
function saudacaoDinamica() {
  const el = document.getElementById('saudacao-dinamica');
  if (!el) return;
  const hora = new Date().getHours();
  let msg = '';
  if (hora >= 5 && hora < 12)  msg = '☀️ Bom dia! Seu pet merece o melhor hoje!';
  else if (hora >= 12 && hora < 18) msg = '🌤️ Boa tarde! Cuide bem do seu bichinho!';
  else msg = '🌙 Boa noite! Seu pet descansa com amor aqui!';
  el.textContent = msg;
}

/* --- Função 3: Contador de visitas (localStorage) --- */
function contadorVisitas() {
  const el = document.getElementById('contador-visitas');
  if (!el) return;
  let visitas = parseInt(localStorage.getItem('visitas') || '0') + 1;
  localStorage.setItem('visitas', visitas);
  el.textContent = 'Você já nos visitou ' + visitas + ' vez(es)!';
}

/* --- Função 4: Validação do formulário de cadastro --- */
function validarFormCadastro(event) {
  event.preventDefault();
  const nome  = document.getElementById('nome-cliente');
  const cpf   = document.getElementById('cpf-cliente');
  const email = document.getElementById('email-cliente');
  const nomePet = document.getElementById('nome-pet');

  /* Limpa mensagens anteriores */
  document.querySelectorAll('.erro-campo').forEach(el => el.remove());

  let valido = true;

  function mostrarErro(campo, msg) {
    campo.classList.add('is-invalid');
    const div = document.createElement('div');
    div.className = 'invalid-feedback erro-campo';
    div.textContent = msg;
    campo.parentNode.appendChild(div);
    valido = false;
  }

  if (nome && nome.value.trim().length < 3) {
    mostrarErro(nome, 'Nome deve ter pelo menos 3 caracteres.');
  } else if (nome) nome.classList.remove('is-invalid');

  if (cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.value)) {
    mostrarErro(cpf, 'CPF deve estar no formato 000.000.000-00.');
  } else if (cpf) cpf.classList.remove('is-invalid');

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    mostrarErro(email, 'Informe um e-mail válido.');
  } else if (email) email.classList.remove('is-invalid');

  if (nomePet && nomePet.value.trim().length < 2) {
    mostrarErro(nomePet, 'Informe o nome do pet.');
  } else if (nomePet) nomePet.classList.remove('is-invalid');

  if (valido) {
    const alerta = document.getElementById('alerta-sucesso-cadastro');
    if (alerta) {
      alerta.classList.remove('d-none');
      alerta.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/* --- Função 5: Seleção de serviço no agendamento --- */
function selecionarServico(tipo) {
  document.querySelectorAll('.card-servico').forEach(c => c.classList.remove('selecionado'));
  const card = document.getElementById('servico-' + tipo);
  if (card) {
    card.classList.add('selecionado');
    const inputHidden = document.getElementById('servico-selecionado');
    if (inputHidden) inputHidden.value = tipo;
  }
}

/* --- Função 6: Validação do formulário de agendamento --- */
function validarFormAgendamento(event) {
  event.preventDefault();
  const servico = document.getElementById('servico-selecionado');
  const metodo  = document.querySelector('input[name="metodo"]:checked');
  const data    = document.getElementById('data-agendamento');
  const hora    = document.getElementById('hora-agendamento');

  let valido = true;

  const erroServico = document.getElementById('erro-servico');
  if (!servico || servico.value === '') {
    if (erroServico) erroServico.classList.remove('d-none');
    valido = false;
  } else {
    if (erroServico) erroServico.classList.add('d-none');
  }

  if (!metodo) {
    const erroMetodo = document.getElementById('erro-metodo');
    if (erroMetodo) erroMetodo.classList.remove('d-none');
    valido = false;
  }

  if (data && !data.value) {
    data.classList.add('is-invalid');
    valido = false;
  } else if (data) data.classList.remove('is-invalid');

  if (hora && !hora.value) {
    hora.classList.add('is-invalid');
    valido = false;
  } else if (hora) hora.classList.remove('is-invalid');

  if (valido) {
    const alerta = document.getElementById('alerta-sucesso-agendamento');
    if (alerta) {
      alerta.classList.remove('d-none');
      alerta.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/* --- Inicialização quando o DOM estiver pronto --- */
document.addEventListener('DOMContentLoaded', function () {
  atualizarRelogio();
  saudacaoDinamica();
  contadorVisitas();

  /* Formulário de cadastro */
  const formCadastro = document.getElementById('form-cadastro');
  if (formCadastro) formCadastro.addEventListener('submit', validarFormCadastro);

  /* Formulário de agendamento */
  const formAgendamento = document.getElementById('form-agendamento');
  if (formAgendamento) formAgendamento.addEventListener('submit', validarFormAgendamento);
});
