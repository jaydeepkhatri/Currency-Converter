const url = "https://api.exchangerate-api.com/v4/latest/";
const currencyvalueEl = document.querySelector("#currencyvalue");
let currencyvalue = currencyvalueEl.value;
const maincurrencyEl = document.querySelector("#maincurrency");
let maincurrency = maincurrencyEl.value
const datenowEl = document.querySelector("#datenow");
const othercurrencys = document.querySelector("#othercurrencys");
let rates = "";
// console.log(currencyvalue)
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
async function cal() {
    await fetch(`${url}${maincurrency}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            rates = data.rates;
            datenowEl.innerHTML = `(${data.date})`;
            consolefname(rates);
        })
}
maincurrencyEl.addEventListener("change", () => {
    maincurrency = maincurrencyEl.value;
    cal();
})
currencyvalueEl.addEventListener("input", () => {
    currencyvalue = currencyvalueEl.value;
    cal();
});
function consolefname(rates) {
    othercurrencys.innerHTML = "";

    console.log(rates)
    Object.keys(rates).forEach((key) => {
        // console.log(`${currencynames[key]} : ${rates[key]}`);
        let eachcurrency = document.createElement("div");
        eachcurrency.classList = "scurrency";
        eachcurrency.innerHTML = `${currencynames[key]} : ${(rates[key] * currencyvalue).toFixed(2)}`;
        othercurrencys.append(eachcurrency);
    });
}
cal();