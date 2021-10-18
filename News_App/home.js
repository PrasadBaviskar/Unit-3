// d6c0274eac024061a5186b86884dfc6b
let container = document.getElementById("container");
async function All_News(){
   let res = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2021-10-18&sortBy=popularity&apiKey=d6c0274eac024061a5186b86884dfc6b`)

   let data = await res.json()
   

    data = data.articles;
    console.log(data)

    data.forEach((news=>{
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
            details(news.id)
        }

        news_box.append(title, desc, img)

        container.append(news_box)
    }))
}

All_News()

// https://newsapi.org/v2/top-headlines/sources?category=businessapiKey=API_KEY

async function details(id){
    let res = fetch(`https://newsapi.org/v2/top-headlines/sources?id=${id}Key=d6c0274eac024061a5186b86884dfc6b`)

    // let data = res.json()

    console.log(res)
}