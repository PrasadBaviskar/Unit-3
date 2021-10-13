async function GetMovie(){

    let movie = document.getElementById("movie").value;

    let res = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=aa32cd90`);

    let data = await res.json();

    if(data.Title == undefined){
        console.log("ssss")
        document.getElementById("details").innerHTML = null;

        console.log("123")
        let notfound = document.getElementById("details");
    
        notfound.onclick = function(){
            location.reload()
        }

        let img = document.createElement("img")
        img.src = "https://cdn.dribbble.com/users/2353504/screenshots/7498453/media/6b9d2cecfe00f117222162cfd943e17d.gif";
        img.className = "notfound"

        notfound.append(img)

    }
    else{
        show_movie(data)
    }

    

    



}
let parent = document.getElementById("details");

function show_movie(data){
document.getElementById("details").innerHTML = null;

let img_div = document.createElement("div");

let details_div = document.createElement("div");

let img = document.createElement("img");

img.src = data.Poster;

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

details_div.append(title, year, lang, duration, released, actors, director, imdbrating);

parent.append(img_div, details_div);

}