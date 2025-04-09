# Password Generator
 
On this page you can generate 4-word pass phrases from a list of 30,557 Danish words. 

<a href="wordlist.txt">Here is the complete word list</a>, if you're curious.

Each word adds log2(30,557) ~= 14.899 bits of entropy for a total of ~ 74.496 bits of entropy. 30,557<sup>5</sup> = 26,641,187,000,017,024,344,557
combinations.

That's *26 sextillion 641 quintillion 187 quadrillion 17 billion 24 million 344 thousand 557* different combinations, or roughly 3,500 times the number of grains of sand on Earth (~ 7.5 x 10<sup>18</sup>).

The random number generator used to select words from the list is cryptographically secure, and nothing ever leaves your computer. All computations
are done locally on your computer.

<script type="text/javascript">
	let file = "wordlist.txt"
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

		console.log(randomNumber);
		
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
</script>

<div>
<button type="button" onclick="generatePassphrase()">Generate a pass phrase</button>
<b>&rarr;</b>
<code><span id="passphrase"></span></code>
