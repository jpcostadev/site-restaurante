export function apiFull() {
  const btns = document.querySelectorAll(".menu2 button");

  function handleClick(event) {
    const clicado = event.target;

    // Desativa a classe 'active' em todos os botões
    btns.forEach((botao) => {
      if (botao !== clicado) {
        botao.classList.remove("active");
      }
    });

    // Ativa ou desativa a classe 'active' no botão clicado
    clicado.classList.toggle("active");

    // Chama a função para exibir os pratos com base na categoria do botão clicado
    exibirPratosPorCategoria(clicado.textContent);
  }

  btns.forEach((e) => {
    e.addEventListener("click", handleClick);
  });

  const url = "http://menufood.test/json/api/pratos";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVudWZvb2QudGVzdCIsImlhdCI6MTcwNjcxNjk4MiwibmJmIjoxNzA2NzE2OTgyLCJleHAiOjE3MDY4MDMzODIsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.kkm4WGHbHn96sezg9YwIvNx3f9o1vKIAF80fiJsMon8"; // Substitua pelo seu token
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  async function buscarMenu() {
    const response = await fetch(url, options);
    const json = await response.json();
    return json.pratos || [];
  }

  async function exibirPratosPorCategoria(categoria) {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = "";

    const lista = await buscarMenu();

    if (lista && lista.length > 0) {
      lista.forEach((element) => {
        if (element.categoria === categoria) {
          const divPrato = document.createElement("div");
          divPrato.className = "prato";

          divPrato.innerHTML = `
            <h3>${element.title}</h3>
            <p>${element.ingredientes}</p>
            <p>Preço: ${element.valor}</p>
            <p>Categoria: ${element.categoria}</p>
          `;

          menuContainer.appendChild(divPrato);
        }
      });
    } else {
      const divMensagem = document.createElement("div");
      divMensagem.innerHTML = `<p>Nenhum prato encontrado</p>`;
      menuContainer.appendChild(divMensagem);
    }
  }

  buscarMenu();
}
