

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope:'/'})
        .then((registration) => {
			console.log('[Service Worker] Registered successfully',registration.scope);
            const data = {
                type: 'CACHE_URLS',
                payload: [
                    location.href,
                    ...performance.getEntriesByType('resource').map((r) => r.name)
                ]
            };
			console.log(data)
        })
        .catch((err) => console.log('SW registration FAIL:', err));
}



const fromCurrency = document.querySelector('#fromCurrencySelect');
const toCurrency = document.querySelector('#toCurrencySelect');
const fromAmount = document.querySelector('#fromAmount');
const convertButton = document.querySelector('#convertButton');
const resultSection = document.querySelector('#resultSection');
const hueBar = document.querySelector('#hueBar');

const date = document.querySelector('#date');

date.innerHTML = new Date().toDateString();


hueBar.addEventListener('input', function (e) {
	let {
		value
	} = e.target;
	document.getElementById('container').style = `filter:hue-rotate(${value}deg)`
})

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
						<p class="shadow-2xl bg-blue-300 w-full h-full grid place-content-center text-white text-sm p-5 md:text-xl font-bold lg:rounded-lg">
							<span>
								${amount} ${from}</b> = ${result} ${to}
							</span>
						</p>
						<p class="shadow-2xl bg-blue-900 w-full h-full grid place-content-center text-blue-300 text-sm p-5 md:text-xl font-bold lg:rounded-lg">
							<span>
								${amount} ${to} = ${(amount / rate).toPrecision(3)} ${from}
							</span>
						</p>
					`
		})
		.catch(err => {
			console.error(err);
		});
}