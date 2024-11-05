class Usuario {
  constructor(id,name,phone,gmail) { 
    this.id= id;
    this.name = name;
    this.phone = phone;
    this.gmail = gmail; 
  }
    static createUser (novoUsuario) {
    let usuarios = getLocalStorage();
    usuarios.push(novoUsuario);
    setLocalStorage(usuarios);
    }
    static deleteUser(index){
      let usuarios = getLocalStorage();
      usuarios.splice(index,1); //a partir do index, tirar só um
      setLocalStorage(usuarios);
    }
    static editUser(index, usuario){
      let usuarios = getLocalStorage();
      modal.showModal();
      usuario.name = document.querySelector(".inputInformations.name").value;
      usuario.gmail = document.querySelector(".inputInformations.gmail").value;
      usuario.phone =  document.querySelector(".inputInformations.phone").value;
      usuarios[index]  = usuario;
      setLocalStorage(usuarios);
      updateTable();
      modal.close();
    }

  }


//DOM 
const addClientBtn = document.getElementById("addClientBtn");
const sectionAddClient = document.getElementById("sectionAddClient");
const insertInformations = document.querySelectorAll(".insertInformations");
const tbody = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const sendBtn = document.querySelector("#sendBtn");
const closeAddClient = document.querySelector("#closeAddClient");

const getLocalStorage = () =>JSON.parse(localStorage.getItem('usuarios')) || [];
const setLocalStorage = (usuarios) => localStorage.setItem('usuarios', JSON.stringify(usuarios));


/*searchPhone.addEventListener('input', (e) => {
let inputSearchName = e.target.value;

const search = () => { 
console.log(inputSearchName);
if(inputSearchName !== '' || searchGmail !== '' || searchPhone !== '') {
FormatString(inputSearchName);
search(inputSearchName);
}}) 

function FormatString(inputSearch) {
  return inputSearch.toLowerCase().trim();
} */

let id = 0;

addClientBtn.addEventListener("click", () =>{
  modal.showModal();

  closeAddClient.onclick = function() { 
    modal.close();
  }} )

  sendBtn.onclick = saveUser;
     
  
  
function gerarId() {
  return id++;
}
/*
function search(input) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usersFound = usuarios.filter(usuario => usuario.name === input);
    if(usersFound.length > 0  ) {
    }
    else {
      const noFound = document.createElement("p") 
      noFound.innerText =  "No User Found! :("
    }
    } */

  function sendInformations(nome,gmail,phone){
  const idUsuario = gerarId();
  const novoUsuario = new Usuario(idUsuario,nome,gmail,phone);
  Usuario.createUser(novoUsuario);
  createTable(novoUsuario);
  modal.close();
  }


  const updateTable = () => {
    const usuarios = getLocalStorage();
    tbody.innerHTML ="";
    usuarios.forEach(createTable);
  }
  
function createTable(user) {
  user = user || getLocalStorage();
  
  // Para cada usuário, cria uma nova linha na tabela
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
idSelectedButton = parseInt(idSelectedButton.getAttribute("data-id"));
console.log(idSelectedButton);
Usuario.editUser(idSelectedButton, usuario);
});


deleteBtn.addEventListener("click", (event)=>{
let idSelectedButton = event.currentTarget;
idSelectedButton = parseInt(idSelectedButton.getAttribute("data-id"));
 Usuario.deleteUser(idSelectedButton);
  });

}

const saveUser = () => {
  let nome = document.querySelector(".inputInformations.name").value;
  let gmail = document.querySelector(".inputInformations.gmail").value;
  let phone =  document.querySelector(".inputInformations.phone").value;

  if(nome === "" || gmail === "" || phone === "") { 
    alert("Por favor, insira todos os seus dados!");
    return;
  }

let usuarios = getLocalStorage();
gmailExisted = usuarios.some(usuario => usuario.gmail === gmail);
phoneExisted = usuarios.some(usuario => usuario.phone === phone);
  if(gmailExisted) {
    alert("Já tem um usuário com esse gmail");
    return;
  }
  if(phoneExisted) {
    alert("Já tem um usuário com esse telefone");
    return;
  }

  sendInformations(nome,gmail,phone);
}
