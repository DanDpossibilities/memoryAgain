var cheer = document.createElement('audio');
cheer.setAttribute('src', 'static/sounds/cheermp3.mp3');


var arrOfImages = ["BadToTheBone.jpg", "Bass.jpg", "ClubCamo.jpg", "Glass.jpg", "Hypnotize.jpg", "Pinky.jpg", "Puffer.jpg", "Puffy.jpg", "Warpaint.jpg", "Bonehead.jpg", "Dancer.jpg", "Disquised.jpg", "PrettyPurple.jpg", "Lurking.jpg", "Boo!.jpg"];

function doubleImages(arr){
	for(var i = arr.length - 1; i >= 0; i--){
		arr.push(arr[i]);
	}
	return arr;
}
console.log(doubleImages(arrOfImages));

function displayCards(arr){
	var container = document.getElementById("container");

	for(var i = 0; i < arr.length; i++){
		var newImgElement = document.createElement("img");
		newImgElement.src = "static/images/" + arr[i];
		newImgElement.id = i;
		newImgElement.className = "card";
		container.appendChild (newImgElement);
	}
}

function shuffleCards(arr){
	for(var i = 0; i < arr.length; i++){
		var idx1 = Math.floor(Math.random()*arr.length);
		var idx2 = Math.floor(Math.random()*arr.length);

		var temp = arr[idx1];
		arr[idx1] = arr[idx2];
		arr[idx2] = temp;
	}
	return arr;
}

shuffleCards(arrOfImages);
displayCards(arrOfImages);

function hideACard(idx) {
    // get the image with the specified idx/id
    var specificCard = document.getElementById(idx);
    // set the image's source to the question mark
    specificCard.src = "static/images/questionmark.jpg";
}
    
// call on the hideACard function for each card in our array of images
for(var i = 0; i < arrOfImages.length; i++){
    // let's call on the hideACard function we just made
    hideACard(i);
}

// outside the function, we'll keep track of which cards have been picked
var cardsPicked = [];

function revealCard(event) {     // this time, the click event is going to be the input
    // the event actually contains the element (and all its attributes)
    // we'll use it to get the id of the element that was clicked
    var clickedImageId = event.target.id;

    // grab the element that was clicked on
    var clickedImage = document.getElementById(clickedImageId);
    // update the image's source to show a different picture
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];
    // add the clicked image to our array
    cardsPicked.push(clickedImageId);
    // if 2 cards have been picked
    if (cardsPicked.length == 2) {
    	// if the 2 selected images are the same
    	if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
    		// resets the cards picked
    		cardsPicked = [];
            cheer.play();
            if(cardsPicked.length == arrOfImages.length){
                alert("You Win!");
            }
    	} else {
    		// make a function that will flip the cards back over
    		var hidePickedCards = function() {
    			hideACard(cardsPicked[0]); // remember this from earlier?
    			hideACard(cardsPicked[1]);
    			cardsPicked = [];
    		}
    		window.setTimeout(hidePickedCards, 1000);
    	}
    }
}

var cards = document.getElementsByClassName("card"); // grab all the cards
for (var i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", revealCard);
}

if(cardsPicked.length == arrOfImages.length){
    alert("You Win!");
}