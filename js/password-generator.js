let file = "https://petervilshansen.github.io/web/js/wordlist.txt"
var wordList

var amount = 5
var seperator = '-'

function getRandomNumberInRange(min, max) {
	const range = max - min + 1;
	const maxValidValue = Math.floor(0xFFFFFFFF / range) * range;
	let randomValue;

	do {
		randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
	} while (randomValue >= maxValidValue);

	return min + (randomValue % range);
}

// Returns random word from wordlist
// Trims before return
function randomWord(array){
	// Access the random number
	const randomNumber = getRandomNumberInRange(0, wordList.length);

	return array[randomNumber].trim();
}

// Select and transform word if required
function generateWord(array){
	word = randomWord(array)
	return word.toLowerCase()
}

// Generate full passphrase
function generatePassphrase(){
	var randomWordPosition //Random position to add number
	var phrase = ""

	// For required amount of words in passphrase, loop word generation
	for (let i = 0; i < amount; i++) {

		result = generateWord(wordList)

		phrase += result

		if(i<amount-1){
			phrase += seperator
		}
	}
	document.getElementById("passphrase").innerHTML = phrase;
}

async function getText(file) {
	let x = await fetch(file);
	let y = await x.text();

	wordList = y.split('\n');
    generatePassphrase()
}

getText(file)
