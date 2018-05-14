//window.alert("hfhhf");
(function(){
	let player = 1 // to see whose turn is it play
	const board = document.querySelector("#board");
	const startGameButton = document.querySelector("#start .button");
	const newGameButton= document.querySelector("#finish .button");
	const startPage = document.querySelector("#start");
	const finishPage = document.querySelector("#finish");
	const player1 = document.querySelector("#player1");
	const player2 = document.querySelector("#player2");
	const boxes = document.querySelector(".boxes");
	const box = document.querySelectorAll(".box");
	const message = document.querySelector(".message")

	//initial things
	//Hide the board and the winning page
	finishPage.style.display = "none"
	board.style.display = "none"
	//console.log(newGameButton)

	//to initially start the game
	startGameButton.addEventListener("click", function(){
		finishPage.style.display = "none"
		startPage.style.display = "none"
		board.style.display = ""
		player1.classList.add('active')
	})

	//add event listener to the start a new game when the game finishes or ties
	newGameButton.addEventListener("click", function(){
		//console.log("unhuu")
		finishPage.style.display = "none"
		board.style.display = ""
		player1.classList.add('active')

	})

	//-------------add the hover effect on the boxes----------
	//Add image to the boxes when mouse is on a box
	for (var i = 0; i < box.length; i++) {
		box[i].addEventListener("mouseover", function(){
			let current = this;
			//if the box is empty
			if (!current.classList.contains("box-filled-1") && !current.classList.contains("box-filled-2") ) {
				//if its player 1's turn to play
				if (player === 1) {
					current.style.backgroundColor =  "#FFA000"
					current.style.backgroundImage = "url(img/o.svg)"
				}else{
					current.style.backgroundColor = " #3688C3"
					current.style.backgroundImage = "url(img/x.svg)"
				}
			}
		});
	};
	//remove image to the boxes when mouse leaves a box
	for (var i = 0; i < box.length; i++) {
		box[i].addEventListener("mouseout", function(){
			const current = this;
				this.style.backgroundColor = ""
				this.style.backgroundImage = ""
		});
	};

	// Game play
	for (var i = 0; i < box.length; i++) {
		//when a box is clicked on
		box[i].addEventListener("click", function(){
			const current = this;

			//check to see if the box is empty
			if (!current.classList.contains("box-filled-1") && !current.classList.contains("box-filled-2") ) {
				//if player is player 1, add box filled 1
				//check to see what to fill the boxes with and whose turnnis it to play.
				if (player === 1) {
					// put this whole as a function
					current.classList.add("box-filled-1")
					player2.classList.add('active')
					player1.classList.remove('active')

				}else{
					current.classList.add("box-filled-2")
					player1.classList.add('active')
					player2.classList.remove('active')
				}

				//if the play results to a win
				if (isWin()) {
					console.log(player)
					message.textContent="Winner"
					board.style.display = "none"
					finishPage.style.display = ""
					if (player === 1) { // means the winner is player 1
						finishPage.classList.remove("screen-win-two")
						finishPage.classList.add("screen-win-one")
					}else{
						finishPage.classList.remove("screen-win-one")
						finishPage.classList.add("screen-win-two")
					}
					reset();
				}else if(isGameOver()) {
					message.textContent="It's a Tie"
					board.style.display = "none"
					finishPage.style.display = ""
					finishPage.classList.remove("screen-win-one");
					finishPage.classList.remove("screen-win-two");
					finishPage.classList.add("screen-win-tie");
					reset();
					//player = 1;
				}
				//isGameOver will check if all boxes are filled ---- is there a win should come first
				else{ // change players turn
					player = player == 1 ? 2 : 1;
				}
			}
		})
	}


	//CHECK TO SEE IF THE HORIZONTAL BOXES MATCHES FOR A WIN
	function horizantalTesting(x){
		//i could put value instead of innerhtml to compare
		if (box[x].classList.contains("box-filled-1") || box[x].classList.contains("box-filled-2")){
			if(box[x].classList.value == box[x+1].classList.value && box[x+1].classList.value == box[x+2].classList.value) {
				return true;
			}
		else{

			return false;
			}
		}
	}
	//CHECK TO SEE IF THE vERTICAL BOXES MATCHES FOR A WIN
	function verticalTesting(x){
		//i could put value instead of innerhtml to compare
		if (box[x].classList.contains("box-filled-1") || box[x].classList.contains("box-filled-2")){
			if(box[x].classList.value == box[x+3].classList.value && box[x+3].classList.value == box[x+6].classList.value) {
				//console.log("dama sonna")
				return true;
			}
		else{
			return false;
			}
		}
	}
	//CHECK TO SEE IF THE DIAGONAL FROM LEFT TO RIGHT BOXES MATCHES FOR A WIN
	function diagonalTestinLR(x){
		//i could put value instead of innerhtml to compare
		if (box[x].classList.contains("box-filled-1") || box[x].classList.contains("box-filled-2")){
			if(box[x].classList.value == box[x+4].classList.value && box[x+4].classList.value == box[x+8].classList.value) {
				return true;
			}
		else{
			return false;
			}
		}
	}
	//CHECK TO SEE IF THE DIAGONAL FROM RIGHT TO LEFT BOXES MATCHES FOR A WIN
	function diagonalTestinRL(x){
		//i could put value instead of innerhtml to compare
		if (box[x].classList.contains("box-filled-1") || box[x].classList.contains("box-filled-2")){
			if(box[x].classList.value == box[x+2].classList.value && box[x+2].classList.value == box[x+4].classList.value) {
				return true;
			}
		else{
			return false;
			}
		}
	}
	//CHECK TO SEE OF THERE IS ANY WINS
	function isWin(){
		if (verticalTesting(0)) {
			return true;
		}else if (verticalTesting(1)) {
			return true;
		}else if (verticalTesting(2)) {
			return true;
		}else if (horizantalTesting(0)) {
			return true;
		}else if (horizantalTesting(3)) {
			return true;
		}else if (horizantalTesting(6)) {
			return true;
		}else if (diagonalTestinRL(2)) {
			return true;
		}else if (diagonalTestinLR(0)) {
			return true;
		}else{
			return false;
			//console.log("anhaa")
		}

	}


	function isGameOver(){ //maybe it should be named is isTie //makes more sence
		for (var i = 0; i < box.length; i++) {
			if(!box[i].classList.contains("box-filled-1") && !box[i].classList.contains("box-filled-2")){ //or just put!box[i].innerHTML
				//console.log("checking gmeover vvvvvv");
				//if there is any empty box, game is not over yet(its not a tie yet)
				return false;
			}
		}
		// if no empty space to play, then its true(isgameOver or its a tie)
		return true;
	}

	function reset(){
		for (var i = 0; i < box.length; i++) {
			box[i].classList.remove("box-filled-2", "box-filled-1");
			player1.classList.remove('active');
			player2.classList.remove('active');
		}
		player = 1;
		//link the screen back to how it use to look before as the original
	}
}())
