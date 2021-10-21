// var block;

let videos = document.getElementById("videos");

async function Search_Video(){
    videos.innerHTML = null
    

    let text = document.getElementById("query").value;

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${text}&type=video&key=AIzaSyDZjqIoVMz-8Q00wTrZCus02h-a0QfICps&maxResults=20`)

    let data = await res.json()

    console.log(data)
    
    appendVideo(data.items)
}


function appendVideo(video_data){
  videos.style.marginBottom = "17%";

    video_data.forEach(({id : {videoId} }) => {
        
        let div = document.createElement("div");

        div.innerHTML = `<iframe width="auto" height="auto" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

        videos.append(div)
    });
}



async function popular_videos(){

  let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyDZjqIoVMz-8Q00wTrZCus02h-a0QfICps&maxResults=8`)

  let data = await res.json();

  append_popular_list(data.items)

  

  // console.log(data);

}

let popular_videos_list = document.getElementById("popular_videos");

function append_popular_list(popular_list){

  // console.log(popular_list)

  popular_list.forEach(({ id }) => {

      console.log(id)
      let div = document.createElement("div");

      div.innerHTML = `<iframe width="auto" height="auto" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

      popular_videos_list.append(div)
    });
    // blck.style.position = ""

    if(block){
        let blck = document.getElementById("block")
        
        blck.append(popular_videos_list)
        // blck.style.position = "absolute"
    }
}
  
popular_videos();

document.getElementById("user_form").style.visibility = "hidden";
document.getElementById("user_form").style.position = "absolute";

function signin_page(){
    document.getElementById("block").innerHTML = null;
    document.getElementById("user_form").style.visibility = ""
    document.getElementById("user_form").style.position = "relative"
}


function Register(e){
  e.preventDefault()

  let form = document.getElementById("sign_up_form");


  let user_data = {
      "name": form.uname.value,
      "email": form.email.value,
      "password": form.password.value,
      "username": form.username.value,
      "mobile": form.mobile.value,
      "description": form.description.value 
    }

    user_data = JSON.stringify(user_data);

    let res = fetch("https://masai-api-mocker.herokuapp.com/auth/register",{
        method:"post",
        body:user_data,
        headers:{
          "Content-Type":"application/json",
        },
    })
    .then((res)=>{
      return res.json();
    })
    .then((res)=>{
        console.log(res)
        document.getElementById("msg_success").innerText = res.message;
    })
    .catch((err)=>{
        console.log(err);
    })
}

function Sigh_in(e){
  e.preventDefault()

  let form = document.getElementById("sign_in_form");

  let credentials = {
      "password": form.unm.value,
      "username": form.pwd.value,
  }

  credentials = JSON.stringify(credentials);

  let res = fetch("https://masai-api-mocker.herokuapp.com/auth/login",{

          method:"POST",

          body: credentials,

          headers:{
              "Content-Type":"application/json",
          },
  })
  .then((res)=>{
      return res.json()
  })
  .then((res)=>{
      console.log(form.unm.value,res)
      fetch_data(form.unm.value,res.token)
  })
}


function fetch_data(username, token){
  fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{

      headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
      },
  })
  .then((res)=>{
      return res.json()
  })
  .then(({username})=>{
      // console.log(res)
      document.getElementById("user_form").innerHTML = null;
      document.getElementById("sbtn").style.visibility = "hidden"
      document.getElementById("u").innerText = "Welcome, "+username;
      document.getElementById("block").innerHTML = "";
    //   block=1;
      popular_videos();
      
  })

}