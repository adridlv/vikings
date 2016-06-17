

//Función constructor Vikingo
var Viking = function (name, health, strength) {
	this.name = name,
	this.health = health,
	this.strength = strength;
}

//Prototipos de Vikingo
Viking.prototype.hurt = function(damage){
	this.health -= damage;
}

Viking.prototype.generateDamage = function () {
	var damage = generateRandom(this.strength-2, this.strength+2);
	return damage;
}

//Función constructor Saxon 
var Saxon = function (health, strength, defense) {
	this.name = "Saxon",
	this.health = health,
	this.strength = strength,
	this.defense = defense;
}

//Prototipos de Saxon 
Saxon.prototype.generateDamage = function () {
	var damage = generateRandom(this.strength-2, this.strength+2);
	return damage;
}

Saxon.prototype.hurt = function(damage){
	this.health -= damage;
}

function fight(character1, character2, training){
	var finish = false;
	var turn;
	var training;
	var winner = 0;

	if(training)
		console.log("////////////////START TRAINING////////////////");	
	else
		console.log("////////////////START FIGHTING////////////////");	

	while(winner == 0){
		turn = generateRandom(1,2);

		if(turn === 1){
			winner = turnHit(character1,character2,training);
		}
		else if(turn === 2){
			winner = turnHit(character2,character1,training);
		}	
		
	}

	return winner;

}

//Función constructor Pit
var Pit = function(viking1, viking2){
	this.viking1 = viking1,
	this.viking2 = viking2;
}

//Prototipos de Pit
Pit.prototype.startFight = function(){
	var finish = false;
	var turn;
	var training = false;

	fight(this.viking1,this.viking2,true);
}

//Función constructor War
var War = function(){
	this.vikingArray = [],
	this.saxonArray = [];
}
//function createSoldier (name, penalty, type){
function generateArray(type,array,arrayLength, penalty=0 ){
	for(var i = 0; i<arrayLength; i++){
		if(type == "viking")
			var obj = createSoldier(undefined,0, "viking");
		else
			var obj = createSoldier(undefined, penalty, "saxon");
		array.push(obj);
	}
}

//Prototipos de War
War.prototype.generateArmy = function(){

	var randomVikingLength = generateRandom(100,150);
	var randomSaxonLength = generateRandom(300, 600);

	generateArray("viking", this.vikingArray, randomVikingLength,0);
	generateArray("saxon", this.saxonArray, randomSaxonLength,2);
}

War.prototype.startFight = function(){
	var turn = generateRandom(5,8);
	var indexViking = 0, indexSaxon = 0;
	var winner = 0;

	while(indexViking<this.vikingArray.length && indexSaxon<this.saxonArray.length){
		var viking = this.vikingArray[indexViking];
		var saxon = this.saxonArray[indexSaxon];
		winner = fight(viking,saxon,false);
		console.log(winner);
		if(winner==1){
			indexSaxon+=1;
			console.log("Saxon dead "+indexSaxon);
		}
		else if(winner == 2){
			indexViking+=1;
			console.log("Viking dead " +indexViking);
		}
	}		
}

War.prototype.counter = function (array,character) {
	var counter = 0;

	for (var i=0; i<array.length; i++) {
		if(array[i].health <= 0) {
			counter++;
		}
	}

	console.log(counter + " "+ character + " are dead!");
}

function generateRandom(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}

function createSoldier (name, penalty, type){
	var health = generateRandom(12-penalty,20-penalty);
	var strength = generateRandom(4-penalty,6-penalty);
	var obj;

	if(type == "viking"){
		var soldierName = name || "Viking";
		obj = new Viking (soldierName, health, strength);
	} else {
		var defense = generateRandom();
		obj = new Saxon (health, strength);
	}
	return obj;
}

function hitEnemy (attacker, defender, training) {
	var fightFinished = false;
	var damage = attacker.generateDamage();
	var healthDefender = defender.health;

	if(training){
		console.log("===== " + attacker.name +" turn =======");
		if(healthDefender - damage > 0){
			console.log("Damage Attacker: " +damage + " Health Defender: " + healthDefender);
			defender.hurt(damage);
			console.log("New health: "+defender.health);
		}
		else{
			console.log("Training finished");
			fightFinished = true;
		} 
	}else{

		console.log("===== " + attacker.name +" turn =======");
		console.log("Damage Attacker: " + damage + " Health Defender: " + healthDefender);

		defender.hurt(damage);

		if(defender.health <= 0){
			console.log("Fight finished");
			fightFinished = true;
		}

	}
	
	return fightFinished;
}

function turnHit(attacker, defender, training){
	var fightFinished = false;
	var winner = 0;

	fightFinished = hitEnemy(attacker,defender, training);
	if(fightFinished) winner = 1;

	if(!fightFinished){
		fightFinished = hitEnemy(defender,attacker, training);
		if(fightFinished)
			winner = 2;
	}

	return winner;
}

//LLamadas de funciones 
var viking1 = createSoldier("Ragnar", 0, "viking");
var viking2 = createSoldier("Uhtred", 0, "viking");

var pit = new Pit(viking1, viking2);
pit.startFight();

var war = new War();
war.generateArmy();

war.startFight();
war.counter(war.vikingArray, "vikings");
war.counter(war.saxonArray, "saxons");


