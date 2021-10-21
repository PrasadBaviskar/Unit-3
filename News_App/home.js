// d6c0274eac024061a5186b86884dfc6b
let container = document.getElementById("container");
async function All_News(){
   let res = await fetch(`http://newsapi.org/v2/everything?q=world&from=2021-10-18&sortBy=popularity&apiKey=d6c0274eac024061a5186b86884dfc6b`)

   let data = await res.json()

    data = data.articles;
    console.log(data)

    data.forEach((news)=>{
        console.log(news)
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
    })
}

All_News()

// https://newsapi.org/v2/top-headlines/sources?category=businessapiKey=API_KEY

function details(news){
    localStorage.setItem("news",JSON.stringify(news))
    location.href = "news.html"
}

function Search(){
    let keywords = document.getElementById("search").value;

    console.log(keywords)
    
    localStorage.setItem("search",JSON.stringify(keywords))

    location.href = "search.html"
}

// https://newsapi.org/v2/top-headlines\apiKey=d6c0274eac024061a5186b86884dfc6b