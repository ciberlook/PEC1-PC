const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const loader = document.getElementById('loading');

//Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;


    showLoading();
    fetch(`https://v6.exchangerate-api.com/v6/d7e5572616b37260972fdaca/latest/${currency_one}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Error, Server response", { cause: response })
            } else {
                return res.json()
            }
        })
        .then(data => {
            hideLoading();
            const rate = data.conversion_rates[currency_two];
            amountEl_one.value = (amountEl_one.value < 0) ? 0 : amountEl_one.value;

            rateEl.innerText = `1 ${currency_one}=${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
        .catch((err) => {
            console.log("Network connection error:" + err.message);
        })
}

//Loader functions
function showLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove('display');
    }, 5000);
}

function hideLoading() {
    loader.classList.remove('display');
}

//Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();