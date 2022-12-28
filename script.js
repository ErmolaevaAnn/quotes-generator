import {QuotesApi} from './quotesAPI.js';

let button = document.querySelector('.generator');
let quoteContainer = document.querySelector('.quote');
let quoteText = document.querySelector('.quote-text');
let quoteAuthor = document.querySelector('.quote-author');
let loadingIndicator = document.querySelector('.loading-indicator');
let body = document.querySelector('body');
let langButtonsContainer = document.querySelector('.lang-change');
let langButtons = document.querySelectorAll('.lang-change-button');

let currentLang = 'en';

let dictionary = {}

let quotesCollection = [];
let russianQuotesCollection = [];
let belarusianQuotesCollection = [];

function random(highestNumber) {
    return Math.floor(Math.random() * ( highestNumber + 1))
}

function toggleLanguage(event) {
    if (event.target.classList.contains('lang-change-button')) {
        //change color of buttons
        langButtons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        //set current language
        currentLang = event.target.textContent.toLowerCase();
        //change quote`s language
        generateQuote(dictionary[currentLang]);
    }
}

function changeBodyBackground() {
    body.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

function showLoading() {
    quoteContainer.style.display = 'none';
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    quoteContainer.style.display = 'block';
    loadingIndicator.style.display = 'none';
}

function generateQuote(source) {
    let {text, author} = source[random(source.length)];
            quoteText.textContent = text;
            quoteAuthor.textContent = author === null ? `© Somebody wise...` : `© ${author}`;
}

showLoading();

QuotesApi.getAllQuotes()
        .then((data) => {
            quotesCollection = data;
        })
        .then(() => {
            generateQuote(quotesCollection);
            //I create an object here because this async function is the longest to complete, as 
            //another two json files are local
            dictionary = {
                'en': quotesCollection,
                'ru': russianQuotesCollection,
                'by': belarusianQuotesCollection
            }
        })
        .catch((error) =>{
            console.error(error)
            quoteText.textContent = 'Failed loading English quotes!\nTry again later or switch to another language'
            dictionary = {
                'ru': russianQuotesCollection,
                'by': belarusianQuotesCollection
            }
        })

QuotesApi.getBelarusianQuotes()
        .then((data) => {
            hideLoading();
            belarusianQuotesCollection = data;
        })

QuotesApi.getRussianQuotes()
        .then((data) => {
            hideLoading();
            russianQuotesCollection = data;
        })

button.addEventListener('click', () => generateQuote(dictionary[currentLang]));
button.addEventListener('click', changeBodyBackground);

langButtonsContainer.addEventListener('click', toggleLanguage);
