class Usuario {
  constructor(id,name,phone,gmail) { 
    this.id= id;
    this.name = name;
    this.phone = phone;
    this.gmail = gmail; 
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


addClientBtn.addEventListener("click", () =>{
  modal.showModal();

  closeAddClient.onclick = function() { 
    modal.close();
  }} )


  function gerarId() {
    const usuarios = getLocalStorage();
    if(usuarios.length === 0 ) return 1;
    
    const maxId = Math.max(...usuarios.map(usuario => usuario.id));
    return maxId + 1;
  }

  function sendInformations(nome,gmail,phone){
  const id = gerarId();
  const novoUsuario = new Usuario(id,nome,gmail,phone);
  createUser(novoUsuario);
  updateTable();
  modal.close();
  }


  const updateTable = () => {
    const usuarios = getLocalStorage();
    tbody.innerHTML ="";
    usuarios.forEach(createTable);
  };
  
function createTable(user) {
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${user.id}</td>
  <td>${user.name}</td>
  <td>${user.gmail}</td>
  <td>${user.phone}</td>
  <td>
    <button class="actionBtn" data-id="${user.id}" onclick="editUser(${user.id})">Editar</button>
    <button class="actionBtn" data-id="${user.id}" onclick="deleteUser(${user.id})">Deletar</button>
  </td>
`;

tbody.appendChild(row);
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
let gmailExisted = usuarios.some(usuario => usuario.gmail === gmail);
let phoneExisted = usuarios.some(usuario => usuario.phone === phone);
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


const createUser  = (novoUsuario) => {
  let usuarios = getLocalStorage();
  usuarios.push(novoUsuario);
  setLocalStorage(usuarios);
  updateTable();
  }
  const  deleteUser = (id) => {
    let usuarios = getLocalStorage();
    const index = usuarios.findIndex(usuario => usuario.id === id);

    if(index !== -1) {
      usuarios.splice(index,1); 
      setLocalStorage(usuarios);
      updateTable();
    }
    else{
      alert("Usuário não encontrado!");
    }
  }

   const editUser = (id) => {
    let usuarios = getLocalStorage();
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if(index !== -1) {
      const usuario = usuarios[index];
      modal.showModal();
       document.querySelector(".inputInformations.name").value = usuario.name;
      document.querySelector(".inputInformations.gmail").value = usuario.gmail;
      document.querySelector(".inputInformations.phone").value = usuario.phone;

      sendBtn.onclick = () => { 
        usuario.name = document.querySelector(".inputInformations.name").value; 
        usuario.gmail = document.querySelector(".inputInformations.gmail").value; 
        usuario.phone = document.querySelector(".inputInformations.phone").value;
        usuarios[index]  = usuario;
      setLocalStorage(usuarios);
      updateTable();
      modal.close();

      sendBtn.onclick = saveUser;
    };
    }
    else{
      alert("Falha para editar o usuário, por favor, tente mais tarde!");
    }
    
  };

  sendBtn.onclick = saveUser;

  updateTable
