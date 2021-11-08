function signup(e){
    e.preventDefault();
    let form = document.getElementById("form");

    let userdata = {
        "name": form.name.value,
        "email": form.email.value,
        "password": form.password.value,
        "username": form.username.value,
        "mobile": form.mob.value,
        "description": form.desc.value,
    }

    userdata = JSON.stringify(userdata)

    let res = fetch(`https://masai-api-mocker.herokuapp.com/auth/register`,{
        method:"POST",
        body:userdata,
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res)
        alert(res.message)
    })
    // console.log(userdata)
}

function signin(e){
    e.preventDefault();

    let form = document.getElementById("form");

    let login_data = {
        "password": form.pwd.value,
        "username": form.unm.value,
      }

    login_data = JSON.stringify(login_data)

    let res = fetch(`https://masai-api-mocker.herokuapp.com/auth/login`,{
        method:"POST",
        body:login_data,
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res)
        fetchData(form.unm.value,res.token)
    })
    .catch((err)=>{
        console.log(err)
    })
}

function fetchData(unm, token){
    let res = fetch(`https://masai-api-mocker.herokuapp.com/user/${unm}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        alert(`Welcome ${res.username}`)
        localStorage.setItem("profile",JSON.stringify(res))
        location.href = "menu.html"
    })
}


async function Menu(){
    let res = await fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`)

    data = await res.json()

    let list = document.getElementById("list")

    data.meals.forEach(({strMealThumb,strMeal}) => {
        let div = document.createElement("div")
        // console.log(strMealThumb,strMeal)
        let img = document.createElement("img")
        img.src = strMealThumb;
        img.className = "thumb";

        let title = document.createElement("h3");
        title.innerText = strMeal;

        let btn = document.createElement("button")
        btn.innerText = "Add To Cart";
        btn.className = "btn"

        btn.onclick = function(){
            addToCart(strMealThumb,strMeal)
        }

        div.append(img, title, btn)

        list.append(div)
    });

    // 
}

Menu()


function addToCart(strMealThumb,strMeal){
    let cart_list = JSON.parse(localStorage.getItem("cart"))
    console.log(strMealThumb,strMeal)
    console.log(cart_list)
    item = {
        "photo":strMealThumb,
        "title":strMeal
    }

    cart_list.push(item)

    localStorage.setItem("cart",JSON.stringify(cart_list))
}