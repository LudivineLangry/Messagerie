// Configuration du serveur, et des modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
let PORT = 8080;

// Port d'écoute
server.listen(PORT, () => {
  console.log('Serveur démarré sur le port :'+PORT);
});

// Route page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Route script partie client
app.get('/client',(req, res) =>{
  res.sendFile(__dirname + '/client.js');
});

// Route script CSS
app.get('/style.css',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','/css/style.css'));
});

// Lancement du gestionnaire d'événements, qui va gérer notre Socket
io.on('connection',(socket)=>{
  // Socket de saisie du pseudo
  socket.on('set-pseudo',(pseudo)=>{
    console.log(pseudo + " vient de se connecter à "+new Date());
    socket.nickname = pseudo;

    //Récupération de la liste des utilisateurs (Sockets) connectés
    io.fetchSockets().then((room)=> {
      var utilisateurs=[];
      room.forEach((item) => {
        socket.pseudo = pseudo;
        utilisateurs.push({
          id_client : item.id,
          pseudo_client : item.pseudo,
        });
      });
      io.emit('reception_utilisateur',utilisateurs);
    });

  });

  // Socket pour l'émission/reception des messages
  socket.on('emission_message',(message)=>{
    io.emit("reception_message",{
      pseudo : socket.nickname,
      msg : message
    });
  });



  
  // Socket log serveur pour la déconnexion
  socket.on('disconnect',()=>{
    console.log(socket.nickname+ " s'est déconnecté");
  });
});
