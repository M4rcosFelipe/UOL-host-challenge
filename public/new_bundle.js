const criar = document.querySelector("#criar");
const data = JSON.parse(localStorage.getItem("lista_de_clientes"));

function criarCliente(response) {
  console.log("entrou na funcao criarCliente");
  let clienteId = response.length;
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const cpf = document.querySelector("#cpf").value;
  const telefone = document.querySelector("#telefone").value;
  const status = document.querySelector("#form-select").value;
  clienteId++;
  const cliente = {
    "_id": clienteId,
    "name": nome,
    "cpf": cpf,
    "contact": {
      "email": email,
      "tel": telefone
    },
    "status": status
  };
  console.log("criou cliente");
  console.log("cliente");
  data.push(cliente);
  console.log(data);
  console.log("push cliente em data");
}

function clicar() {
  console.log("entrou na função clicar");
  criarCliente(data);
  console.log("criar cliente finalizada");
  localStorage.setItem("lista_de_clientes", JSON.stringify(data));
  console.log("data salvo no localstorage");
}

criar.onclick = clicar;
