// Dependencies
var util = require('util');
var io = require('socket.io');
var Player = require('./entities/Player');
var Bomb = require('./entities/Bomb');

// Game Variables
var socket;
var game;
var players = {};
var bombs = {};

init();

function init() {
	socket = io.listen(8120);

	// Begin listening for events.
	setEventHandlers();

	// Start game
	startGame();
};

function setEventHandlers () {
	socket.sockets.on("connection", function(client) {
		util.log("New player has connected: " + client.id);

		client.on("new player", onNewPlayer);

		client.on("move player", onMovePlayer);

		client.on("disconnect", onClientDisconnect);
	});
};

function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	delete players[this.id];

	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	// Create new player
	var newPlayer = new Player(data.x, data.y, data.facing, this.id);

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", newPlayer);

	// Notify existing players of the new player
	for(var i in players) {
		this.emit("new player", players[i]);
	}

	players[this.id] = newPlayer;
	bombs[this.id] = {};
};

function onMovePlayer(data) {
	var movingPlayer = players[this.id];

	movingPlayer.x = data.x;
	movingPlayer.y = data.y;
	movingPlayer.facing = data.facing;

	this.broadcast.emit("move player", {id: this.id, x: data.x, y: data.y, facing: data.facing});
};

function onPlaceBomb(data) {
	// bombs[this.id].push(new Bomb(data.x, data.y, data.id));

	// setTimeout(3000, function() {
	// 	var id = data.id;
	// 	bombs.splice(bombs.indexOf(findById(id, bombs)), 1);
	// 	util.log("deleting bomb " + bomb.id);
	// 	// detonate
	// });

	this.broadcast.emit("place bomb", {x: data.x, y: data.y, id: data.id});
};

function startGame() {

};