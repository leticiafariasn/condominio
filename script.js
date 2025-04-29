let usuarios = [];

async function carregarUsuarios() {
  const resposta = await fetch('./data/usuarios.json');
  usuarios = await resposta.json();
}

async function iniciarApp() {
  await carregarUsuarios();

  document.getElementById('reset-page').style.display = 'none';
  document.getElementById('dashboard-container').style.display = 'none';

  const formLogin = document.querySelector('#login-form');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      await login();
    });
  }
}

async function login() {
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-password').value;

  const usuario = usuarios.find(user => user.email === email && user.senha === senha);

  if (usuario) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';

    document.getElementById('user-name').textContent = usuario.nome;
    carregarCards(usuario);
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}

function carregarCards(user) {
  document.getElementById('rent-status').textContent = user.aluguel_pago ? "Pago" : "Em aberto";
  document.getElementById('condo-status').textContent = user.condominio_pago ? "Pago" : "Em aberto";
  document.getElementById('discount-value').textContent = `${user.desconto}%`;
}

window.addEventListener('DOMContentLoaded', iniciarApp);
