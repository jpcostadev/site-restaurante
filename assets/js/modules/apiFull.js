export function apiFull() {
  const url = "http://menufood.test/json/api/pratos";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVudWZvb2QudGVzdCIsImlhdCI6MTcwNjcxNjk4MiwibmJmIjoxNzA2NzE2OTgyLCJleHAiOjE3MDY4MDMzODIsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.kkm4WGHbHn96sezg9YwIvNx3f9o1vKIAF80fiJsMon8";
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
    const lista = json.pratos;

    const menuContainer = document.getElementById("menuContainer");

    if (lista && lista.length > 0) {
      lista.forEach((element) => {
        console.log(element);
        const divPrato = document.createElement("div");
        divPrato.className = "prato";

        // Adicione informações do prato à div
        divPrato.innerHTML = `
          <h3>${element.title}</h3>
          <p>${element.ingredientes}</p>
          <p>Preço: ${element.valor}</p>
          <p>${element.categoria}</p>
          <!-- Adicione mais informações conforme necessário -->
        `;

        menuContainer.appendChild(divPrato);
      });
    } else {
      // Caso não haja pratos, você pode exibir uma mensagem ou tomar outra ação
      const divMensagem = document.createElement("div");
      divMensagem.innerHTML = `<p>Nenhum prato encontrado</p>`;
      menuContainer.appendChild(divMensagem);
    }
  }

  buscarMenu();
}
