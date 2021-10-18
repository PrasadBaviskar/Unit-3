// d6c0274eac024061a5186b86884dfc6b

async function All_News(){
   let res = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=d6c0274eac024061a5186b86884dfc6b`)

   let data = await res.json()
   
   data = data.sources;

   let news_box = document.createElement("div")

   

    data.forEach((news=>{
        console.log(news)
        let title = document.createElement("h3");
        // title.innerText = news.
    }))
}

All_News()