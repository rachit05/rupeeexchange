let fromAmount = document.querySelector('#from');
let toAmount = document.querySelector('#to');

let fromCurrency = document.querySelector('#fromCurrencySelect');
let toCurrency = document.querySelector('#toCurrencySelect');

// fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromAmount}&to=${toAmount}&amount=1`, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "currency-converter5.p.rapidapi.com",
// 		"x-rapidapi-key": "28f56d8bfamshc3aa08cacfe0d69p1cad9ejsn3266ba09789e"
// 	}
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => {
// 	console.error(err);
// });

fetch('/list.json')
	.then(res => res.json())
	.then(data => {
		let codes = Object.keys(data).map(key => `<option>${key}</option>`).join('');
		fromCurrency.innerHTML = codes;
		toCurrency.innerHTML = codes;
	});