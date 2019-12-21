const criar=document.querySelector("#criar")

const data=JSON.parse(localStorage.getItem("lista_de_clientes"))

function criarCliente(response){

    let clienteId=response.length

    const nome=document.querySelector("#nome").value
    const email=document.querySelector("#email").value
    const cpf=document.querySelector("#cpf").value
    const telefone=document.querySelector("#telefone").value
    const status=document.querySelector("#form-select").value

    console.log(nome)
    console.log(email)
    console.log(cpf)
    console.log(telefone)
    console.log(status)
  
    if(!isValid(nome,email,cpf,telefone,status)) {return}


    clienteId++

    const cliente={      
        "_id": clienteId,
        "name": nome,
        "cpf": cpf,
        "contact": {
            "email": email,
            "tel": telefone
        },
        "status": status		
    }




    data.push(cliente)
    console.log(data)
    document.querySelector("#nome").value=""
    document.querySelector("#email").value=""
    document.querySelector("#cpf").value=""
    document.querySelector("#telefone").value=""
    document.querySelector("#form-select").value="Status"
    alert("cliente criado com sucesso")

}


function isValid(nome,email,cpf,telefone,status){
    if(nome.length<2 || nome===""){
        alert("Digite um nome válido");
        return false
    }
    console.log(email)
    if(email!==""){
        if(email.indexOf("@")===-1|| email.indexOf(".")===-1){
            alert("Digite um email válido")
            return false
        }
    }else{
        alert("Digite um email válido")
            return false
    }
    if(cpf==="" || cpf.indexOf(".")===-1 ||  cpf.indexOf("-")===-1){
        alert("Digite um cpf válido")
        return false
    }


    if(telefone.length<10 || typeof(Number(telefone))!=="number" || isNaN(Number(telefone))===true){
        alert("Digite um telefone válido");
        return false
    }
    if(status==="Status"){alert('Escolha um "Status" válido');return false}
    return true
}

function clicar(){
    console.log("entrou na função clicar")
    criarCliente(data)
    console.log("criar cliente finalizada")
    localStorage.setItem("lista_de_clientes",JSON.stringify(data))
    console.log("data salvo no localstorage")    
}



criar.onclick=clicar