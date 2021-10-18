let details = JSON.parse(localStorage.getItem("news"))

let details_box = document.getElementById("news_details");

let title = document.createElement("h1");
title.innerText = details.title;

let img = document.createElement("img");
img.src = details.urlToImage;

let desc = document.createElement("p");
desc.innerText = details.description;


details_box.append(title, img, desc)

console.log(details)