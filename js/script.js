async function carregarComponente(caminho, destino) {
    const resposta = await fetch(caminho);
    const html = await resposta.text();
    document.querySelector(destino).innerHTML = html;
  }
  
  async function iniciarApp() {
    const app = document.getElementById('app');
  
    app.innerHTML = `
      <div id="login-container"></div>
      <div id="reset-container"></div>
      <div id="dashboard-container"></div>
    `;
  
    await carregarComponente('./components/login-page.html', '#login-container');
    await carregarComponente('./components/reset-page.html', '#reset-container');
    await carregarComponente('./components/dashboard-page.html', '#dashboard-container');
  
    document.querySelector('#reset-container').style.display = 'none';
    document.querySelector('#dashboard-container').style.display = 'none';
  }
  
  iniciarApp();
  