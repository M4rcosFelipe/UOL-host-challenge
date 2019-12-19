function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const footer = document.querySelector("footer");
const clientList = document.querySelector("#lista-clientes");

function loadClients() {
  return _loadClients.apply(this, arguments);
}

function _loadClients() {
  _loadClients = _asyncToGenerator(function* () {
    if (!localStorage.getItem("lista_de_clientes")) {
      yield setLocalStorage();
    }

    const data = JSON.parse(localStorage.getItem("lista_de_clientes"));
    console.log("dados buscados do local storage e passados para renderClients");
    renderClients(data);
  });
  return _loadClients.apply(this, arguments);
}

function setLocalStorage() {
  return _setLocalStorage.apply(this, arguments);
}

function _setLocalStorage() {
  _setLocalStorage = _asyncToGenerator(function* () {
    const response = yield fetch("https://demo5283088.mockable.io/customers");
    clientes = yield response.json();
    localStorage.setItem("lista_de_clientes", JSON.stringify(clientes.data));
    console.log("local storage setado");
  });
  return _setLocalStorage.apply(this, arguments);
}

function genereateLi(clienteData) {
  if (clienteData.status === "Aguardando ativação") {
    clienteData.status = "Aguardando-ativação";
  }

  console.log("linha gerada");
  return `<li class="cliente">

  <div class="user-name cliente-component">
      <h3 class="nome">${clienteData.name}</h3>
      <h4 class="email">${clienteData.contact.email}</h4>
  </div>

  <div class="usertel cliente-component">
      <p class="cpf">${clienteData.cpf}</p>
      <p class="telefone">${clienteData.contact.tel}</p>
  </div>

  <div class="status-data cliente-component">
      <div class="status ${clienteData.status}"></div>
      <span class="status-text">${clienteData.status}</span>
  </div>

  <div class="editar cliente-component">Editar</div>
</li>`;
}

function renderClients(clientes) {
  console.log(clientes.length);

  for (let i = 0; i < clientes.length; i++) {
    clientList.innerHTML += genereateLi(clientes[i]);
  }

  footer.innerText = `Exibindo ${clientes.length} clientes`;
  console.log("clientes renderizados");
}

loadClients();
