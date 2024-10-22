class Client {
  constructor(name, phone, gmail) {
      this.name = name;
      this.phone = phone;
      this.gmail = gmail;
  }
}

window.onload = function() {
  showUsers();
};

const addClientBtn = document.getElementById("addClientBtn");
const sectionAddClient = document.getElementById("sectionAddClient");
const insertInformations = document.querySelectorAll(".insertInformations");
const tbody = document.querySelector("tbody");

const createElement = (nome,gmail,phone) => { 
  const newUser = new Client(nome, gmail, phone);
   const myUsers = JSON.parse(localStorage.getItem('usuarios') ?? "[]");
   myUsers.push(newUser);
   localStorage.setItem('usuarios', JSON.stringify(myUsers));
   let usuarios = JSON.parse(localStorage.getItem('usuarios'));
   return usuarios;
  }

function showUsers() {
  tbody.innerHTML = '';
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Para cada usuário, cria uma nova linha na tabela
  usuarios.forEach(user => {
  const spaceTable = document.createElement("tr");
  spaceTable.classList.add("spaceTable");
  tbody.appendChild(spaceTable);

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
  spaceTableButton.appendChild(editBtn);

  editBtn.onclick = function(e) {
    const currentTarget = e.currentTarget.getAttribute("id");
    console.log(currentTarget);

  }

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("actionBtn");
  deleteBtn.id = "deleteBtn";
  deleteBtn.innerText = "Deletar";
  spaceTableButton.appendChild(deleteBtn);


})}

const deleteElement = (nome,gmail,phone) => {

}

const modal = document.querySelector(".modal");
const sendBtn = document.querySelector("#sendBtn");

addClientBtn.onclick = function() {
  modal.showModal();
}

  sendBtn.onclick = function()  { 
    let nome = document.querySelector(".inputInformations.name").value;
  let gmail = document.querySelector(".inputInformations.gmail").value;
  let phone = document.querySelector(".inputInformations.phone").value;

  if(nome === "" || nome === null ) {
    alert("Por favor, insira seu nome!");
  }
  else if(gmail === "" || gmail === null) {
    alert("Por favor, insira seu gmail!");
  }
  else if(phone === "" || phone === null) {
    alert("Por favor, insira seu telefone!");
  }
  else{
  createElement(nome,gmail,phone);
  showUsers();
    modal.close();

    
  }

}
;