export function apiFull() {
  // Seleciona todos os botões dentro da classe "menu2"
  const btns = document.querySelectorAll(".menu2 button");

  // Função para lidar com o clique em um botão
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

  // Adiciona um ouvinte de evento de clique a cada botão
  btns.forEach((e) => {
    e.addEventListener("click", handleClick);
  });

  // URL da API de pratos
  const url = "http://menufood.test/json/api/pratos";

  // Token de autorização
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVudWZvb2QudGVzdCIsImlhdCI6MTcwNjg5MTg5NywibmJmIjoxNzA2ODkxODk3LCJleHAiOjE3MDY5NzgyOTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.5cpZUE6rhp2zwW0nTrxXt6ZF5FP0fwbNej7A2LV9728"; // Substitua pelo seu token

  // Opções para a requisição fetch
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Função assíncrona para buscar os pratos da API
  async function buscarMenu() {
    const response = await fetch(url, options);
    const json = await response.json();
    return json.pratos || [];
  }

  // Função assíncrona para exibir os pratos de uma categoria específica
  async function exibirPratosPorCategoria(categoria) {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = ""; // Limpa o conteúdo anterior

    const lista = await buscarMenu();
    console.log(lista);

    if (lista && lista.length > 0) {
      // Itera sobre a lista de pratos
      lista.forEach((element) => {
        // Verifica se a categoria do prato corresponde à categoria do botão clicado
        if (element.categoria === categoria) {
          // Cria um elemento div para exibir as informações do prato
          const divPrato = document.createElement("div");
          divPrato.className = "prato";

          // Adiciona informações do prato à div
          divPrato.innerHTML = `
         <h3>${element.title}</h3>
         <p>Categoria: ${element.categoria}</p>
         <p>${element.ingredientes}</p>
         <span><p>Preço: ${element.valor}</p></span></>
         <button>Ver Prato</button>
         
          `;

          // Adiciona a div do prato ao container principal
          menuContainer.appendChild(divPrato);
        }
      });
    } else {
      // Se não houver pratos, exibe uma mensagem
      const divMensagem = document.createElement("div");
      divMensagem.innerHTML = `<p>Nenhum prato encontrado</p>`;
      menuContainer.appendChild(divMensagem);
    }
  }

  // Inicializa o processo buscando e exibindo os pratos
  buscarMenu();
  exibirPratosPorCategoria("Massas");

  function gustavo() {
    const sentar = true;
    const caiu = false;

    if (sentar && caiu) {
      console.log("Ele sentou ");
    } else {
      console.log("Ele não sentou");
    }
  }
  gustavo();
}
