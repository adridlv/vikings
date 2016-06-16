"use strict";

var minVikingHealth = 5;
var maxVikingHealth = 20;
var minVikingStrength = 4;
var maxVikingStrength = 7;

var Viking = function (name, health, strength) {
	this.name = name,
	this.health = health,
	this.strength = strength;
}

var Saxon = function (health, strength, defense) {
	this.name = "Saxon",
	this.health = health,
	this.strength = strength,
	this.defense = defense;
}


Saxon.prototype.generateDamage = function () {
	var damage = generateRandom(this.strength-2, this.strength+2);
	return damage;
}
/*
Saxon.prototype.attack = function(defender){
	var damage = this.generateDamage();
	var healthDefender = defender.health;
	var fightFinished = false;

	console.log("Damage Attacker: " +damage + " Health Defender: " + healthDefender);

	defender.hurt(damage);
	console.log("New health defender: " + defender.health);
	
	if(healthDefender - damage <= 0){
		console.log("A Viking is dead");
		fightFinished = true;
	}	
	
	return fightFinished;
}*/

Saxon.prototype.hurt = function(damage){
	this.health -= damage;
}

//funciones por prototipos
Viking.prototype.generateDamage = function () {
	var damage = generateRandom(this.strength-2, this.strength+2);
	return damage;
}

Viking.prototype.hurt = function(damage){
	this.health -= damage;
}

Viking.prototype.hit = function(defender){
	var damage = this.generateDamage();
	var healthDefender = defender.health;
	var fightFinished = false;

	console.log("Damage Attacker: "+ damage + " Health Defender: "+healthDefender);

	if(healthDefender - damage > 0){
		defender.hurt(damage);
		console.log("New health defender: "+ defender.health);
	}
	else{
		console.log("Training finished");
		fightFinished = true;
	}	
	
	return fightFinished;
}

//la función tiene dependecia de defender. Se utiliza en su lugar la función generateDamage que no hay que parámetro
/*
Viking.prototype.attack = function(defender){
	var damage = this.generateDamage();
	var healthDefender = defender.health;
	var fightFinished = false;

	console.log("Damage Attacker: " +damage + " Health Defender: " + healthDefender);

	defender.hurt(damage);
	console.log("New health defender: " + defender.health);
	
	if(healthDefender - damage <= 0){
		console.log("A saxon is dead");
		fightFinished = true;
	}	
	
	return fightFinished;
}*/

function generateRandom(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}

function createViking (vikingName) {
	var name = vikingName || "Viking";
	var health = generateRandom(minVikingHealth,maxVikingHealth);
	var strength = generateRandom(minVikingStrength,maxVikingStrength);
	var viking = new Viking (name, health, strength);
	return viking;
}

function createSaxon(){
	var health = generateRandom(minVikingHealth-2 , maxVikingHealth-2);
	var strength = generateRandom(minVikingStrength-2,maxVikingStrength-2);
	var defense = generateRandom()
	var saxon = new Saxon (health, strength);
	return saxon;
}


function hitEnemyTraining (attacker, defender) {
	var fightFinished = false;
	var damage = attacker.generateDamage();
	var healthDefender = defender.health;

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

	return fightFinished;
}

function turnHitTraining(attacker, defender){
	var fightFinished = false;

	fightFinished = hitEnemyTraining(attacker,defender);
	
	if(!fightFinished){
		fightFinished = hitEnemyTraining(defender,attacker);
	}

	return fightFinished;
}


function hitEnemy (attacker, defender) {
	var fightFinished = false;
	var damage = attacker.generateDamage();
	var healthDefender = defender.health;

	console.log("===== " + attacker.name +" turn =======");

	console.log("Damage Attacker: " + damage + " Health Defender: " + healthDefender);
	
	defender.hurt(damage);
	
	if(defender.health <= 0){
		console.log("Fight finished");
		fightFinished = true;
	}

	return fightFinished;
}

function turnAttackFight(attacker, defender){
	var fightFinished = false;
	
	fightFinished = hitEnemy (attacker, defender);
	if (!fightFinished) {
		fightFinished = hitEnemy (defender, attacker);
	}

	return fightFinished;

}

function fighting(viking, saxon){
	var finish = false;
	var turn;

	while(!finish){
		turn = generateRandom(1,2);

		if(turn === 1){
			finish = turnAttackFight(viking, saxon);
		}
		else if(turn === 2){
			finish = turnAttackFight(saxon,viking);
		}
	}
}

var Pit = function(viking1, viking2){
	this.viking1 = viking1,
	this.viking2 = viking2;
}

Pit.prototype.vikingTraining = function(){
	var finish = false;
	var turn;

	console.log("////////////////START TRAINING////////////////");

	while(!finish){
		turn = generateRandom(1,2);

		if(turn === 1){
			finish = turnHitTraining(this.viking1,this.viking2);
		}
		else if(turn === 2){
			finish = turnHitTraining(this.viking2,this.viking1);
		}
		
	}
}


var Fight = function(){
	this.vikingArray = [],
	this.saxonArray = [];
}

Fight.prototype.generateArmy = function(){

	var randomVikingLength = generateRandom(20,30);
	var randomSaxonLength = generateRandom(40, 60);

	for(var i = 0; i<randomVikingLength; i++){
		var viking = createViking();
		this.vikingArray.push(viking);
	}

	for(var j = 0; j<randomSaxonLength; j++){
		var saxon = createSaxon();
		this.saxonArray.push(saxon);
	}
}

Fight.prototype.battle = function(){
	var turn = generateRandom(5,8);
	var indexArray = 0;

	for(var actualTurn = 0; actualTurn<turn; actualTurn++){
		var viking = this.vikingArray[indexArray];
		var saxon = this.saxonArray[indexArray];
		fighting(viking,saxon);
		indexArray++;
	}		
}

Fight.prototype.counter = function (array,character) {
	var counter = 0;

	for (var i=0; i<array.length; i++) {
		if(array[i].health <= 0) {
			counter++;
		}
	}

	console.log(counter + " "+ character + " are dead!");
}

var viking1 = createViking("Ragnar");
var viking2 = createViking("Uhtred");
var fight = new Fight();
fight.generateArmy();
fight.battle();
fight.counter(fight.vikingArray, "vikings");
fight.counter(fight.saxonArray, "saxons");


var pit = new Pit (viking1, viking2);
pit.vikingTraining();