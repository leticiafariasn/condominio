let usuarios = [];

async function carregarUsuarios() {
  const resposta = await fetch('./data/usuarios.json');
  usuarios = await resposta.json();
}

async function carregarComponente(caminho, destino) {
  const resposta = await fetch(caminho);
  const html = await resposta.text();
  document.querySelector(destino).innerHTML = html;

  if (caminho.includes('login-page')) {
    const formLogin = document.querySelector('#login-form');
    if (formLogin) {
      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        await login();
      });
    } else {
      console.error("Formulário de login não encontrado!");
    }
  }
}

async function iniciarApp() {
  await carregarUsuarios();
  await carregarComponente('./components/login-page.html', '#login-container');
  await carregarComponente('./components/reset-page.html', '#reset-container');
  document.querySelector('#reset-container').style.display = 'none';
  document.querySelector('#dashboard-container').style.display = 'none';
}

async function login() {
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-password').value;

  const usuario = usuarios.find(user => user.email === email && user.senha === senha);

  if (usuario) {
    document.getElementById('login-container').style.display = 'none';

    await carregarComponente('./components/dashboard-page.html', '#dashboard-container');
    document.getElementById('dashboard-container').style.display = 'block';

    document.getElementById('user-name').textContent = usuario.nome;
    await carregarCards(usuario);
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}

async function carregarCards(user) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  const cards = [
    './components/rent-card.html',
    './components/condo-card.html',
    './components/discount-card.html'
  ];

  for (const path of cards) {
    const res = await fetch(path);
    const html = await res.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    container.appendChild(wrapper.firstElementChild);
  }

  document.getElementById('rent-status').textContent = user.aluguel_pago ? "Pago" : "Em aberto";
  document.getElementById('condo-status').textContent = user.condominio_pago ? "Pago" : "Em aberto";
  document.getElementById('discount-value').textContent = `${user.desconto}%`;
}

window.addEventListener('DOMContentLoaded', iniciarApp);
