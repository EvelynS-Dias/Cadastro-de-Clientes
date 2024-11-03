class Usuario {
  constructor(id,name,phone,gmail) { 
    this.id= id;
    this.name = name;
    this.phone = phone;
    this.gmail = gmail; 
  }
    static salvarUsuario(novoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    showUsers(usuarios);
    }
    static deletarUsuario(idUsuario){
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      let usuariosFiltrados = usuarios.filter(usuario => usuario.id !== idUsuario);
      console.log(usuariosFiltrados);
      localStorage.setItem("usuarios", JSON.stringify(usuariosFiltrados));
      showUsers(usuariosFiltrados);
    }
    static editarUsuario(idSelectedButton){
      let usuarios = localStorage.getItem("usuarios", JSON.parse(usuarios));
      let usuario = usuarios.find(usuario => usuario.id === idSelectedButton);
      
      modal.showModal();

      let nome = document.querySelector(".inputInformations.name").value;
      let gmail = document.querySelector(".inputInformations.gmail").value;
     let phone =  document.querySelector(".inputInformations.phone").value;
  
     usuarios.forEach(usuario =>{
      if(nome === "" || gmail ==="" || phone === "") { 
        alert("Por favor, insira todos os seus dados!");
      }
      else if(usuario.gmail  === gmail) {
        alert("Já tem um usuário com esse gmail");
      }
      else if(usuario.phone  === phone) {
        alert("Já tem um usuário com esse telefone");
      }
    })
  }
  }


window.onload = function() {
  showUsers();
};

//DOM 
const addClientBtn = document.getElementById("addClientBtn");
const sectionAddClient = document.getElementById("sectionAddClient");
const insertInformations = document.querySelectorAll(".insertInformations");
const tbody = document.querySelector("tbody");
const thead = document.querySelector("thead");
const modal = document.querySelector(".modal");
const sendBtn = document.querySelector("#sendBtn");
const closeAddClient = document.querySelector("#closeAddClient");
const searchName = document.querySelector(".searchBar.name").value;
const searchGmail = document.querySelector(".searchBar.gmail").value;
const searchPhone = document.querySelector(".searchBar.phone").value;

if(searchName !== '' || searchGmail !== '' || searchPhone !== '') {
  search();
}
let id = 0;


function showUsers(users) {
  tbody.innerHTML = '';
  users = users || JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Para cada usuário, cria uma nova linha na tabela
  users.forEach(user => {
  const spaceTable = document.createElement("tr");
  spaceTable.classList.add("spaceTable");
  tbody.appendChild(spaceTable);

  const spaceTableId = document.createElement("td");
  const idTable = document.createElement("p");
  idTable.innerText = user.id;
  spaceTable.appendChild(spaceTableId);
  spaceTableId.appendChild(idTable);


  const spaceTableName = document.createElement("td");
  const userNameTable = document.createElement("p");
  userNameTable.innerText = user.name;
  spaceTable.appendChild(spaceTableName);
  spaceTableName.appendChild(userNameTable);


  const spaceTableGmail = document.createElement("td");
  const userGmailTable = document.createElement("p");
  userGmailTable.innerText = user.gmail;
  spaceTable.appendChild(spaceTableGmail);
  spaceTableGmail.appendChild(userGmailTable);

  const spaceTablePhone = document.createElement("td");
  const userPhoneTable = document.createElement("p");
  userPhoneTable.innerText = user.phone;
  spaceTable.appendChild(spaceTablePhone);
  spaceTablePhone.appendChild(userPhoneTable);


  const spaceTableButton = document.createElement("td");
  spaceTable.appendChild(spaceTableButton);
  
  const editBtn = document.createElement("button");
  editBtn.classList.add("actionBtn");
  editBtn.id = "editBtn";
  editBtn.innerText = "Editar";
  const idUsuario = user.id;
  editBtn.setAttribute("data-id", idUsuario);
  spaceTableButton.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("actionBtn");
  deleteBtn.id = "deleteBtn";
  deleteBtn.innerText = "Deletar";
  deleteBtn.setAttribute("data-id", idUsuario);
  spaceTableButton.appendChild(deleteBtn);


editBtn.addEventListener("click", (event)=>{
let idSelectedButton = event.currentTarget;
console.log(idSelectedButton);
Usuario.editarUsuario(idSelectedButton);
});


deleteBtn.addEventListener("click", (event)=>{
let idSelectedButton = event.currentTarget;
idSelectedButton = parseInt(idSelectedButton.getAttribute("data-id"));
 Usuario.deletarUsuario(idSelectedButton);
  });

}
)}



function gerarId() {

  return id++

}


addClientBtn.addEventListener("click", novoUsuario)

  function novoUsuario() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  modal.showModal();

  closeAddClient.onclick = function() { 
    modal.close();
  }

  sendBtn.onclick = function()  { 


    let nome = document.querySelector(".inputInformations.name").value;
    let gmail = document.querySelector(".inputInformations.gmail").value;
   let phone =  document.querySelector(".inputInformations.phone").value;

   if(nome === "" || gmail ==="" || phone === "") { 
    alert("Por favor, insira todos os seus dados!");
    return;
  }
  
  const emailExist = usuarios.some(usuario => usuario.gmail === gmail);
  const phoneExist = usuarios.some(usuario => usuario.phone === phone);
    if(emailExist) {
      alert("Já tem um usuário com esse gmail");
      return;
    }
    if(phoneExist) {
      alert("Já tem um usuário com esse telefone");
      return;
    }
  }
   
      const idUsuario = gerarId();
      const novoUsuario = new Usuario(idUsuario,nome,gmail,phone);
    Usuario.salvarUsuario(novoUsuario);
      showUsers();
      modal.close();
    }
    
function search() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
 let usersFound = usuarios.filter(usuario => usuario.nome === searchName);
if(usersFound.length > 0  ) {
  showUsers(usersFound);
}
else {
  showUsers(usuarios);
}
}
