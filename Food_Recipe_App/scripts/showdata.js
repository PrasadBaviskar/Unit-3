async function showData(url){ 
    let res = await fetch(url);
    let data = await res.json(); 
    // console.log(data)    
    return data;
}

function appendData(data, container){    
    console.log(data)
    data.meals.forEach(({strMeal,strMealThumb,idMeal}) => {
        let div =document.createElement("div");
        div.className = "card col-md-3 m-2 p-3 bg-self text-black"
        div.style.width = "16rem"
        div.onclick = function(){
            getrec(idMeal)
        }
        
        let img = document.createElement("img")
        img.src = strMealThumb;

        let cart_body = document.createElement("div");
        cart_body.className = "card-body text-center"
        
        let title = document.createElement("h5")
        title.innerText = strMeal;
        title.className = ""

        cart_body.append(title)

        div.append(img, cart_body)

        container.append(div);
    });
    // console.log(data.meals)
}

function Get_Receipe({meals}){
    localStorage.setItem("receipe",JSON.stringify(meals))
    location.href = "Search_Result.html"
}

function Show_Receipe(){
    
   let data = JSON.parse(localStorage.getItem("receipe"))

   data.forEach(({strMeal, strCategory, strMealThumb, strInstructions,strIngredient1,strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6}) => {
       let img = document.createElement("img");
       img.src = strMealThumb;
       img.className = "w-100 rounded";

       let img_box = document.getElementById("image")
       img_box.append(img)

        let details_box = document.getElementById("details")

        let name = document.createElement("h3");
        name.innerText = strMeal;
        name.className = "mb-4"

        let cat = document.createElement("h6");
        cat.innerText = "Category : " +strCategory;

        let instruction = document.createElement("p");
        instruction.innerText = "Instructions : " +strInstructions;
        instruction.className = "instr overflow-auto p-2"

        details_box.append(name, cat, instruction)

        let ing_box = document.getElementById("ingredients");
        let list = document.createElement("ul");

        let i1 = document.createElement("li");
        let i2 = document.createElement("li");
        let i3 = document.createElement("li");
        let i4 = document.createElement("li");
        let i5 = document.createElement("li");
        let i6 = document.createElement("li");

        i1.innerText = strIngredient1;
        i2.innerText = strIngredient2;
        i3.innerText = strIngredient3;
        i4.innerText = strIngredient4;
        i5.innerText = strIngredient5;
        i6.innerText = strIngredient6;

        list.append(i1,i2,i3,i4,i5,i6)

        ing_box.append(list)

        // console.log(strIngredient1)
        
   });
}
// strCategory

function Search(){
    let key = document.getElementById("keyword").value;
    let data = showData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    data.then((res)=>{
        Get_Receipe(res)
    })
    // console.log(data)
}

async function getrec(idMeal){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let data = await res.json()
    localStorage.setItem("receipe",JSON.stringify(data.meals))
    location.href = "Search_Result.html"
}

export {showData, appendData, Get_Receipe, Show_Receipe, Search}

