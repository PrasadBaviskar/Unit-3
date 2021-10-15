let timerID;
let list = document.getElementById("movie")

async function Search(movie_name){
    try{
        let res = await fetch(`http://www.omdbapi.com/?s=${movie_name}&apikey=aa32cd90`)

        let data = await res.json()

        return data;
    }
    catch(e){
        console.log("ssss",e)
    }
}

function appendmovies(movies){
    if(movies == undefined){
        return false;
    }

    document.getElementById("movie").innerHTML= null;

    movies.forEach(function(movie){
        let div = document.createElement("div");
        div.className = "srch_item"
        div.onclick = function(){
            getMovie_data(movie.Title);
        }

        let poster = document.createElement("img");
        poster.className = "serch_poster"
        if(movie.Poster == "N/A"){
            poster.src = "https://www.kirkstall.com/wp-content/uploads/2020/04/image-not-available-png-8.png";
        }
        else{
            poster.src = movie.Poster;       
        }
        

        let p = document.createElement("p");

        p.innerText =movie.Title;

        // p.className = "srch_item";

        div.append(poster, p)

        list.append(div);
    })
}

async function main(){
    let name = document.getElementById("movie_name").value;

    if(name.length < 3){
        document.getElementById("movie").innerHTML= null;
        return false;
    }

    let res = await Search(name)

    let data = res.Search;

    if(data == undefined){
        document.getElementById("movie").innerHTML= null;
        let div = document.createElement("div");
        div.className = "srch_notfound"
        div.innerText = "Movie not found!";

        list.append(div);
    }
    else{
        appendmovies(data)
    }
    console.log(data)
}

function debounce(func, delay){
    if(timerID){
        clearTimeout(timerID)
    }

    timerID = setTimeout(function(){
        clearTimeout(timerID);

        func()
    },delay)
}

async function getMovie_data(movie){
    let movie_details = document.getElementById("movie_details");

    document.getElementById("movie_details").innerHTML = null;
    document.getElementById("movie").innerHTML= null;

    let res = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=aa32cd90`);

    let data = await res.json();

    Show_movie(data);

    }


let trending_movies_list = document.getElementById("trending_movies");


async function Trending_Movies(){
    let res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=6b408211f9be94f42f6a1d8b7a89c6ef`)

    let data = await res.json();

    data.results.forEach(function(movie){
        

        let movie_box = document.createElement("div");

        movie_box.onclick = function(){
            get_trnd_movie_data(movie.id)    
        }

        let poster = document.createElement("img")
        poster.src = `https://image.tmdb.org/t/p/w200/`+ movie.poster_path;
        
        let title = document.createElement("p");

        let released_date = document.createElement("p");

        // movie_box.style.backgroundImage = `url(https://image.tmdb.org/t/p/w200/${movie.poster_path})`;
        // movie_box.style.backgroundSize = "cover";
        title.innerText = movie.original_title;

        released_date.innerText = movie.release_date;

        

        // let img = document.createElement("img")
        // img.src = `https://image.tmdb.org/t/p/w200/`+ movie.poster_path;
        console.log(movie.vote_average)
        if(movie.vote_average > 8){
            
            let recc = document.createElement("span")
            recc.innerText = "Recommended ";
            recc.className = "recommanded";

            movie_box.append(poster, recc ,title,released_date)
        }
        else{
            movie_box.append(poster,title,released_date)
        }

        let a = document.createElement("a");
        a.href = "#container";

        a.append(movie_box)

        trending_movies_list.append(a)

        // console.log(movie.poster_path);
        // console.log(movie.original_title)
        // console.log(movie.release_date)     
    })
}

Trending_Movies()
 
async function get_trnd_movie_data(id){
    console.log("ji")
    let mdb_res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6b408211f9be94f42f6a1d8b7a89c6ef`)

    let mdb_data = await mdb_res.json();   

    let res = await fetch(`http://www.omdbapi.com/?i=${mdb_data.imdb_id}&apikey=aa32cd90`)

    let data = await res.json();

    Show_movie(data)
}


function Show_movie(data){
    document.getElementById("movie_name").value = null;
    document.getElementById("movie").innerHTML = null;
    document.getElementById("movie_details").innerHTML = null;

    let img_div = document.createElement("div");

    let details_div = document.createElement("div");

    let img = document.createElement("img");

    

    if(data.Poster == "N/A"){
        console.log("hii");
        img.src = "https://www.kirkstall.com/wp-content/uploads/2020/04/image-not-available-png-8.png";
        img.className = "notfound_img"
    }
    else{
        img.src = data.Poster;
    }

    let x = document.createElement("a");
    x.href = "#"
    x.onclick = function(){
        location.reload()
    }
    x.innerText = "x";
    x.className = "x_button"

    let title = document.createElement("p");
    title.innerText = data.Title; 
    title.className = "title";

    let year = document.createElement("p");
    year.innerText = "Year : " +  data.Year;
    
    let lang = document.createElement("p");
    lang.innerText = "Language : " +  data.Language;

    let duration = document.createElement("p");
    duration.innerText = "Duration : " +  data.Runtime;


    let released = document.createElement("p");
    released.innerText = "Released Date : " + data.Released;

    let actors = document.createElement("p");
    actors.innerText = "Actors : " + data.Actors;

    let director = document.createElement("p");
    director.innerText = "Director : " +  data.Director;

    let imdbrating = document.createElement("p");
    imdbrating.innerText = "IMDb Rating : " + data.imdbRating;

    img_div.append(img)

    details_div.append(x, title, year, lang, duration, released, actors, director, imdbrating);

    movie_details.append(img_div, details_div);

}

async function GetMovie(){
    let movie = document.getElementById("movie_name").value;

    if(movie == ""){
        return;
    }

    let res = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=aa32cd90`)

    let data = await res.json()

    Show_movie(data);
}