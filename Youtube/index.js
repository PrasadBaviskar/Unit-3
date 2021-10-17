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
}
  
popular_videos();