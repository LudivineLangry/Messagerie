var socket = io();

//Variable qui va définir un destinataire, par défaut le salon général
var id_salon ='salon';
//Tableau qui va contenir l'ensemble des messages envoyés (semi-persistance)
var lesMessages = [];

// Selection pseudo
socket.emit('set-pseudo',prompt("Pseudo ?"));

// Variables pour récupérer les éléments HTML
var messages = document.getElementById('messages');
var pseudo = document.getElementById('pseudo');
var form = document.getElementById('form');
var input = document.getElementById('input');

// Écouteur et envoi du message du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('emission_message', input.value);
    input.value = '';
  }
});

// Réception et affichage du message
socket.on('reception_message', (contenu) => {
  var item = document.createElement('li');
  item.textContent = contenu.pseudo+" : "+contenu.msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  
  var lesMessages = lesMessages + 'reception_message';
});

// Réception et affichage de l'user
socket.on('reception_utilisateur', (contenu) => {
  pseudo.innerHTML = "";
  contenu.forEach((item) => {
    const li = document.createElement('li');
    console.log(item.pseudo_client);
    id1 = item.id_client;
    li.innerText = item.pseudo_client;
    pseudo.appendChild(li);
    console.log(id1);
  });
});






// Affichage des messages en fonction du choix de l'utilisateur :
// Soit les messages du salon général ;
// Soit les messages d'une conversation privée avec un autre utilisateur
function salon(id){
  /* A compléter */
}




// Vérifie les messages non-lus, puis affiche un badge de notification incrémenté à côté de l'utilisateur en question
function check_unread(){
  /* A compléter */
}