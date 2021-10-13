async function GetMoviesList(){
    
    try{
        let movie = document.getElementById("movie").value;

        let res = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=aa32cd90`);

        let data = await res.json();

        ShowMoviesList(data.Search)
    }
    catch{
        document.getElementById("list").innerHTML = null;

        let notfound = document.getElementById("list");
        
        notfound.onclick = function(){
            location.reload()
        }

        let img = document.createElement("img")
        img.src = "https://cdn.dribbble.com/users/2353504/screenshots/7498453/media/6b9d2cecfe00f117222162cfd943e17d.gif";
        img.className = "notfound"

        notfound.append(img)
    }
    
}

let parent = document.getElementById("list");

function ShowMoviesList(movies){
    document.getElementById("list").innerHTML = null;
    document.getElementById("details").innerHTML = null;
    movies.forEach(async function(movie){
        
        
        let res = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=aa32cd90`);
        let details = await res.json()
        

        // console.log(movie)
        let div = document.createElement("div");
        console.log(details.imdbRating);

        

        div.onclick = function(){
            getmoviedetails(movie.Title);
        }

        let poster_div = document.createElement("div");
        if(movie.Poster == "N/A"){
            poster_div.style.backgroundImage = `url("https://www.kirkstall.com/wp-content/uploads/2020/04/image-not-available-png-8.png")`;
        }
        else{
            poster_div.style.backgroundImage = `url(${movie.Poster})`;
        }
        
        poster_div.className = "poster"
        poster_div.style.backgroundSize = "cover"
    
        // let img = document.createElement("img");
        // img.src = movie.Poster;

        // poster_div.append(img);

        if(details.imdbRating > 7.5){
            let recmnd = document.createElement("p")
            recmnd.innerText = "Recommended "
            recmnd.className = "recommanded";
            poster_div.append(recmnd)
        }

        let title_div = document.createElement("div");

        let title = document.createElement("p");
        title.innerText = movie.Title;
        title.className = "title"

        title_div.append(title);

        div.append(poster_div , title_div)

        parent.append(div)
    })
}

async function getmoviedetails(title){
    
    let res = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=aa32cd90`)

    let data = await res.json();

    document.getElementById("details").innerHTML = null;

    show_movie(data)
    
}

let details = document.getElementById("details");

function show_movie(data){
    console.log(data)
    document.getElementById("list").innerHTML = null;
    

    let img_div = document.createElement("div");

    let details_div = document.createElement("div");

    let img = document.createElement("img");

    if(data.Poster == "N/A"){
        img.src = "https://www.kirkstall.com/wp-content/uploads/2020/04/image-not-available-png-8.png";
        img.className = "notfound_img";
    }
    else{
        img.src = data.Poster;
    }
    

    let title = document.createElement("p");
    title.innerText = data.Title; 
    title.className = "title2";

    let lang = document.createElement("p");
    lang.innerText = "Language : " +  data.Language;

    let duration = document.createElement("p");
    duration.innerText = "Duration : " +  data.Runtime;

    let year = document.createElement("p");
    year.innerText = "Year : " +  data.Year;

    let released = document.createElement("p");
    released.innerText = "Released Date : " + data.Released;

    let actors = document.createElement("p");
    actors.innerText = "Actors : " + data.Actors;

    let director = document.createElement("p");
    director.innerText = "Director : " +  data.Director;

    let imdbrating = document.createElement("p");
    imdbrating.innerText = "IMDb Rating : " + data.imdbRating;

    let back_link = document.createElement("a");
    back_link.src = "";
    back_link.textContent = "Back";
    back_link.className = "backlink"
    back_link.onclick = function(){
        GetMoviesList();
    }

    img_div.append(img)

    details_div.append(back_link, title,lang, duration, year, released, actors, director, imdbrating);

    details.append(img_div, details_div);
    
}

  