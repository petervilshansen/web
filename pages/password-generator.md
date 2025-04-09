# Password Generator
 
On this page you can generate 4-word pass phrases from a list of 30,557 Danish words. 

<a href="js/wordlist.txt">Here is the complete word list</a>, if you're curious.

Each word adds log2(30,557) ~= 14.899 bits of entropy for a total of ~ 74.496 bits of entropy. 30,557<sup>5</sup> = 26,641,187,000,017,024,344,557
combinations.

That's *26 sextillion 641 quintillion 187 quadrillion 17 billion 24 million 344 thousand 557* different combinations, or roughly 3,500 times the number of grains of sand on Earth (~ 7.5 x 10<sup>18</sup>).

The random number generator used to select words from the list is cryptographically secure, and nothing ever leaves your computer. All computations
are done locally on your computer.

<div class="highlight-box" id="passphrase"></div>

<button onclick="generatePassphrase()" style="align: center;">Generate a pass phrase</button>
