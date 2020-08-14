const url = "https://api.exchangerate-api.com/v4/latest/";
const currencyvalueEl = document.querySelector("#currencyvalue");
let currencyvalue = currencyvalueEl.value;
const maincurrencyEl = document.querySelector("#maincurrency");
let maincurrency = maincurrencyEl.value
const datenowEl = document.querySelector("#datenow");
const othercurrencys = document.querySelector("#othercurrencys");
const errmsg = document.querySelector("#errmsg");
let rates = "";
const currencynames = {
	ARS: "Argentine peso",
	AUD: "Australain dollar",
	BSD: "Bahamian dollar",
	BRL: "Brazilian real ",
	GBP: "British pound ",
	BGN: "Bulgarian lev",
	CAD: "Canadian dollar",
	CLP: "Chilean peso",
	CNY: "Chinese yuan",
	COP: "Colombian peso",
	CZK: "Czech koruna",
	DKK: "Danish krone",
	DOP: "Dominican peso",
	EGP: "Egyptian pound",
	EUR: "euro",
	FJD: "Falkland Islands pound",
	GTQ: "Guatemalan quetzal",
	HKD: "Hong Kong dollar",
	HRK: "Croatian kuna",
	HUF: "Hungarian forint",
	ISK: "Icelandic króna",
	IDR: "Indonesian rupiah",
	INR: "Indian rupee",
	ILS: "Israeli new shekel",
	JPY: "Japanese yen",
	KZT: "Kazakhstani tenge",
	MYR: "Malayasian ringgi",
	MVR: "Maldivian rufiyaa",
	MXN: "Mexican peso",
	NOK: "Norwegian krone",
	TWD: "New Taiwan dollar",
	NZD: "New Zealand dollar",
	PKR: "Pakistani rupee",
	PAB: "Panamanian balboa",
	PYG: "Paraguayan guaraní",
	PEN: "Peruvian sol",
	PHP: "Philippine peso",
	PLN: "Polish złoty",
	RON: "Romanian leu",
	RUB: "Russian ruble",
	SAR: "Saudi riyal",
	SGD: "Singapore dollar",
	ZAR: "South African rand",
	KRW: "South Korea won",
	SEK: "Swedish krona",
	CHF: "Swiss franc",
	THB: "Thai baht",
	TRY: "Turkish lira",
	AED: "UAE dirham",
	UAH: "Ukrainian hryvnia",
	USD: "US dollar",
	UYU: "Uruguayan peso"
}
async function getexchange() {
	await fetch(`${url}${maincurrency}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			rates = data.rates;
			datenowEl.innerHTML = `(${data.date})`;
			let sortedrates = {};

			Object.keys(rates).sort().forEach(function (key) {
				sortedrates[key] = rates[key];
			});



			writecurrency(sortedrates);
		})
}
maincurrencyEl.addEventListener("change", () => {
	maincurrency = maincurrencyEl.value;
	getexchange();
});

currencyvalueEl.addEventListener("input", () => {
	currencyvalue = currencyvalueEl.value;
	console.log(isNaN(currencyvalue));
	if (!isNaN(parseFloat(currencyvalue)) && !isNaN(currencyvalue - 0)) {
		errmsg.classList = "";
		errmsg.innerHTML = "";
		getexchange();
	} else {
		errmsg.classList = "errmsg";
		errmsg.innerHTML = "Write a number";
		othercurrencys.innerHTML = "";
	}

});
function writecurrency(rates) {
	othercurrencys.innerHTML = "";
	Object.keys(rates).forEach((key) => {
		// console.log(`${currencynames[key]} : ${rates[key]}`);
		let eachcurrency = document.createElement("div");
		eachcurrency.classList = "scurrency";

		let eachcurrencycountry = document.createElement("span");
		eachcurrencycountry.innerHTML = currencynames[key];
		eachcurrency.append(eachcurrencycountry);

		let eachcurrencysymbol = document.createElement("span");
		eachcurrencysymbol.innerHTML = key;
		eachcurrency.append(eachcurrencysymbol);

		let eachcurrencyrate = document.createElement("span");
		eachcurrencyrate.innerHTML = (rates[key] * currencyvalue).toFixed(2);
		eachcurrency.append(eachcurrencyrate);

		othercurrencys.append(eachcurrency);
	});
}

getexchange();