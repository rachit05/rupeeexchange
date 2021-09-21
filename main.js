let fromAmount = document.querySelector('#fromAmount');

let fromCurrency = document.querySelector('#fromCurrencySelect');
let toCurrency = document.querySelector('#toCurrencySelect');
let convertButton = document.querySelector('#convertButton');
let resultSection = document.querySelector('#resultSection');

let date = document.querySelector('#date');

date.innerHTML = new Date().toDateString();


fetch('/list.json')
	.then(res => res.json())
	.then(data => {

		let values = Object.values(data);
		let fromCodes = Object.keys(data).map((key, index) => `<option value='${key}' ${(key == "USD") ? "selected" : ""}>${key} - ${values[index]}</option>`).join('');
		let toCodes = Object.keys(data).map((key, index) => `<option value='${key}' ${(key == "INR") ? "selected" : ""}>${key} - ${values[index]}</option>`).join('');

		fromCurrency.innerHTML = fromCodes;
		toCurrency.innerHTML = toCodes;
	})
	.then(() => {
		fetchRates('USD', 'INR', 1);
		convertButton.addEventListener('click', function (e) {
			e.preventDefault();
			fetchRates(fromCurrency.value, toCurrency.value, fromAmount.value);
		})
	})



function fetchRates(from, to, amount) {
	fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${from}&to=${to}&amount=${amount}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "currency-converter5.p.rapidapi.com",
				"x-rapidapi-key": "28f56d8bfamshc3aa08cacfe0d69p1cad9ejsn3266ba09789e"
			}
		})
		.then(response => response.json())
		.then(data => {
			let rate = data.rates[`${to}`].rate;
			let result = data.rates[`${to}`].rate_for_amount;
			resultSection.innerHTML = `
						<b>${amount} ${from}</b> = <b><span>${result} ${to}</span></b>
						<p>AND &nbsp; <span>${amount} ${to} = ${(amount / rate).toPrecision(3)} ${from}</span></p>
					`
		})
		.catch(err => {
			console.error(err);
		});
}