export function menu() {
  // Seleciona todos os botões dentro da classe "menu2"
  const btns = document.querySelectorAll(".menu2 button");

  // Seleciona o botão de menu principal
  const btnMenu = document.querySelector(".btnMenu");

  // Seleciona o menu de categorias
  const menuCategoria = document.querySelector(".menu2");

  // Função para lidar com o clique em um botão
  async function handleClick(event) {
    const btnClicado = event.target;

    // Adiciona ou remove a classe 'active' no botão clicado
    btnClicado.classList.toggle("active");

    // Verifica se o botão clicado está ativo
    if (btnClicado.classList.contains("active")) {
      // Se estiver ativo, adiciona a classe 'active' ao menuCategoria
      menuCategoria.classList.add("active");
    } else {
      // Se não estiver ativo, remove a classe 'active' do menuCategoria
      menuCategoria.classList.remove("active");
    }
  }

  // Função para lidar com cliques fora do botão de menu e do menuCategoria
  async function clickfora(event) {
    if (
      !btnMenu.contains(event.target) &&
      !menuCategoria.contains(event.target)
    ) {
      // Se o clique for fora do btnMenu e menuCategoria, remove a classe 'active' de ambos
      btnMenu.classList.remove("active");
      menuCategoria.classList.remove("active");
    }
  }

  // Adiciona um ouvinte de evento de clique ao botão de menu principal
  btnMenu.addEventListener("click", handleClick);

  // Adiciona um ouvinte de evento de clique em todo o documento para lidar com cliques fora
  document.addEventListener("click", clickfora);

  // Adiciona um ouvinte de evento de clique a cada botão do menu
  btns.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      // Chama a função handleClick ao clicar em um botão do menu
      handleClick(event);

      // Remove a classe 'active' do menuCategoria e do btnMenu
      menuCategoria.classList.remove("active");
      btnMenu.classList.remove("active");
    });
  });
}
