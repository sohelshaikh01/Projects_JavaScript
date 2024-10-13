// News WebApp.
// JSON: Javascript Object Notation.
// To stop finish the api call limit use auto save in off mode.

const API_KEY = "decfb26949ae4129a410a56d97ba2456";
const url1 = "https://newsapi.org/v2/everything?q=";
const url2 = "https://newsapi.org/v2/top-headlines?q=";

// https://newsapi.org/v2/everything?q=tesla&from=2024-06-04&sortBy=publishedAt&apiKey=decfb26949ae4129a410a56d97ba2456


window.addEventListener('load', () => fetchNews('India'));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url1}${query}&apiKey=${API_KEY}`);
        if(!res.ok) {
            throw new Error(`Error fetching news: ${res.statusText}`);
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error(error);
    }
    // To fetch Url and return data;  
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    
    // Get container elements.
    cardsContainer.innerHTML = "";

    //filling data for each card
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Fill data to container
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

// Fetching data by category.
let curSelectorNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    // For its active state.
    const navItem = document.getElementById(id);
    curSelectorNav?.classList.remove('active');
    curSelectorNav = navItem;
    curSelectorNav.classList.add('active');
    searchText.value = "";
}

// Search button functionality.
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectorNav?.classList.remove('active');
});
