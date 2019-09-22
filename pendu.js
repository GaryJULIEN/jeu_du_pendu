(function(){
	//variables globales
	let count_wrong_letters = 0;
	let count_good_letters = 0;
	let max_wrong_letters = 6;
	let nb_win_games = 0;
	let old_word_to_find = "";
	let current_word_to_find = "";
	let yet_played_letters = [];
	let date_start_game = 0;

	function refreshGlobals(){
		date_start_game = Date.now();
		count_wrong_letters = 0;
		count_good_letters = 0;
		yet_played_letters = [];
		// refreshConsoleLog();
	}

	function startGame(){
		refreshGlobals();
		refreshScore();
		restoreWrongLetters();
		restoreTitle();
		restoreConsigne();
		initializeRoundsWrongLetters();
		startGameButton.style.display = "none";
		composingWord(getRamdomWord(words));
	}

	startGameButton.addEventListener("click", startGame);

	function yetPlayedLetter(key){
		let nbYetPlayedLetters = 0;
		for (var i = 0; i < yet_played_letters.length; i++) {
			yet_played_letters[i] == key ? nbYetPlayedLetters ++ : nbYetPlayedLetters = nbYetPlayedLetters;
		}
		return nbYetPlayedLetters > 0 ? true : false;

	}

	function compareLetter(key){

		let lettersWordToFind = wordToFind.children;
		let goodChoice = 0;

		for (var i = 0; i < lettersWordToFind.length; i++) {
			if (lettersWordToFind[i].getAttribute("data-name") == key) {
				displayGoodLetter(key, lettersWordToFind[i]);
				goodChoice++;
				count_good_letters++;
				yet_played_letters.push(key.toLowerCase());
				if(count_good_letters == wordToFind.children.length) {
					winGame();	
				}
			}
		}

		if (goodChoice == 0) {
			yet_played_letters.push(key.toLowerCase());
			displayWrongLetter(key);
			count_wrong_letters++;	

			if (count_wrong_letters == max_wrong_letters) {
				losingGame();
			}
		}
	}

	function isSpecialChar(e){
		return e.keyCode < 65 || e.keyCode > 90 ? true : false;
	}


	document.addEventListener("keydown", function(e){
		if(!isSpecialChar(e)){
	  		console.log("TOUCHE : " + e.key);
			if (yetPlayedLetter(e.key)) {
				consigne.textContent = "Lettre déjà jouée !"
				setTimeout(function(){
					consigne.textContent = "Choisissez une lettre !";
				},400);
			}
			else{
				compareLetter(e.key);
				// refreshConsoleLog();
			}
	  	}else{
	  		console.error("TOUCHE : " + e.key);
	  	}
		
		
	});



	function displayGoodLetter(letter, elt){
		elt.textContent = letter.toUpperCase();
	}

	function displayWordToFind(){
		wrongLetters.innerHTML = "Le mot était " + current_word_to_find.toUpperCase();
	}

	function displayWrongLetter(letter){
		let roundWrong = wrongLetters.children[count_wrong_letters];
		roundWrong.textContent = letter;
		roundWrong.classList.add("roundWrongChecked");			
	}

	function winGame(){
		let dateWinGame = Date.now();
		console.log("Partie terminée en " + (dateWinGame - date_start_game)/1000 + "s");
		setTimeout(function(){
			wrongLetters.style.display = "none";
			consigne.textContent = "BRAVO VOUS AVEZ GAGNÉ !";
			consigne.style.display = "block";
		},700);
		setTimeout(function(){
			wordToFind.style.display = "none";
		},1300);
		setTimeout(function(){
			startGameButton.style.display = "block";
			nb_win_games++;
			refreshScore();
		},2500);

	}

	function losingGame(){
		consigne.style.display = "none";
		setTimeout(function(){
			displayWordToFind();
			endGameAnimation();				
		},1000);
		setTimeout(function(){
			letterN.textContent = "R";

		},4750);
		setTimeout(function(){
			wrongLetters.style.display = "none";
			startGameButton.style.display = "block";

		},6000);
		nb_win_games = 0;
		restoreWordToFind();
		refreshScore();
	}

	function endGameAnimation(){
		titleAnime.style.animation = "fallingTitle 4s ease-in-out forwards";
		letterP.style.animation    = "transformP 4s ease-in-out forwards";
		letterE.style.animation    = "transformE 4s ease-in-out forwards";
		letterN.style.animation    = "transformN 4s ease-in-out forwards";
		letterD.style.animation    = "transformD 4s ease-in-out forwards";
		letterU.style.animation    = "transformU 4s ease-in-out forwards";
	}

	function restoreTitle(){
		letterN.textContent = "N";
		titleAnime.style.animation = "none";
		letterP.style.animation    = "none";
		letterE.style.animation    = "none";
		letterN.style.animation    = "none";
		letterD.style.animation    = "none";
		letterU.style.animation    = "none";
	}

	function initializeRoundsWrongLetters(){
		for (var i = 0; i < max_wrong_letters; i++) {
			let roundWrong = document.createElement("span");
			roundWrong.classList.add("roundWrong");
			wrongLetters.append(roundWrong);
		}
	}

	function restoreWordToFind(){
		wordToFind.innerHTML = "";
		wordToFind.style.display = "flex";
	}

	function restoreConsigne(){
		consigne.textContent = "Choisissez une lettre !";
		consigne.style.display = "block";
	}

	function restoreWrongLetters(){
		wrongLetters.innerHTML = "";
		wrongLetters.style.display = "flex";
	}

	function refreshScore(){
		scorePlayer.style.display = "block";
		let score = document.querySelector("#scorePlayer span");
		score.textContent = nb_win_games;
	}

	function composingWord(word){
		restoreWordToFind();
		for (var i = 0; i < word.length; i++) {
			let letterSpanElt = document.createElement("span");
			let letterLower = word[i].toLowerCase();
			letterSpanElt.setAttribute("data-name", letterLower);
			letterSpanElt.classList.add("lettreMotCache");
			wordToFind.append(letterSpanElt);
		}
	}

	function getRamdomWord(table){
		let random = Math.floor(Math.random()*table.length);
		let word = table[random];
		old_word_to_find == word ? getRamdomWord(table) : current_word_to_find = word;
		old_word_to_find = current_word_to_find;

		//gestionconsolelog
		// motMystere.textContent = word;
		// longueurMotMystere.textContent = word.length;
		return word;
	}

	let words = ["taxi", "chien", "vehicule", "dormir", "klaxon", "sinus", "drap", "quiche", 
				 "loup", "briquet", "poignet", "foret", "tibia", "marque", "sac", "dix", "pendule", 
				 "addition", "ampoule", "coccinelle", "president", "kangourou", "dessiner", "touche",
				 "alcool", "virgule", "sportif", "enceinte", "partie", "manteau", "chaise", "vache",
				 "bougeoir", "cartable", "cahier", "operation", "candidat", "pompier", "formation",
				 "cafe", "pays", "politique","argent", "petrole", "guerre", "enfant", "biberon", "tuile",
				 "toilette", "shampoing", "carton", "boite", "entreprise", "patron", "cigarette",
				 "medicament", "emission", "jury", "chanteur", "equipe", "reussite", "resilience"];

})()

//  GESTION CONSOLE LOG
//  function refreshConsoleLog(){
//    	pointsPerdus.textContent = count_wrong_letters;
// 	    maxPointsPerdus.textContent = max_wrong_letters;
// 	    lettresTrouvees.textContent = count_good_letters;
//  }

