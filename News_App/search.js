let keywords = JSON.parse(localStorage.getItem("search"))

console.log(keywords)

async function Serach_Results(){
    // let res = fetch(`https://newsapi.org/v2/everything?q=${keywords}&from=2021-10-18&sortBy=popularity&apiKey=d6c0274eac024061a5186b86884dfc6b
    // `)

    let res = await fetch(`https://newsapi.org/v2/everything?q=${keywords}&apiKey=d6c0274eac024061a5186b86884dfc6b`)

    let data = await res.json()
    Show_news(data)
}


Serach_Results()

function Show_news({articles}){
    let container = document.getElementById("container")
    document.getElementById("length").innerText = "(" + articles.length + ")"
    // console.log(articles.length)
    articles.forEach(news => {
        let title = document.createElement("p");
        title.innerText = news.title;
        title.className = "title"

        let desc = document.createElement("p");
        desc.innerText = news.description;
        desc.className = "desc";

        let img = document.createElement("img")
        img.src = news.urlToImage;
        img.className = "news_img"

        let news_box = document.createElement("div")
        news_box.onclick = function(){
            details(news)
        }

        news_box.append(title, desc, img)

        container.append(news_box)
    });
}

function details(news){
    localStorage.setItem("news",JSON.stringify(news))
    location.href = "news.html"
}