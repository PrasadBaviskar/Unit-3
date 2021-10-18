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
    console.log(articles)

    articles.forEach(news => {
        let div = document.createElement("")
    });
}

