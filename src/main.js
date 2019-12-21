const footer=document.querySelector("footer")
const clientList=document.querySelector("#lista-clientes")



async function loadClients(){
  if(!localStorage.getItem("lista_de_clientes")){
    await setLocalStorage()
  }
    document.querySelector(".spinner").remove()
    const data=JSON.parse(localStorage.getItem("lista_de_clientes"))
    renderClients(data)
    
}

async function setLocalStorage(){
  const response=await fetch("https://demo5283088.mockable.io/customers")
  clientes=await(response.json())
  localStorage.setItem("lista_de_clientes",JSON.stringify(clientes.data))
}

function genereateLi(clienteData){
  if (clienteData.status==="Aguardando ativação"){
    clienteData.status="Aguardando-ativação"
  }

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
</li>`
}

function renderClients(clientes){
  
  console.log(clientes.length)
  for(let i=0;i<clientes.length;i++){
    clientList.innerHTML+=genereateLi(clientes[i])
  }
  footer.innerText=`Exibindo ${clientes.length} clientes`

}


loadClients()







  