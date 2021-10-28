async function Translate(){
        
    let src = document.getElementById("src").value;
    let target = document.getElementById("target").value;
    let text = document.getElementById("text").value;
    let output = document.getElementById("output");

    console.log(src, target)

    let res = await fetch("https://libretranslate.de/translate",{
        method: "POST",
        body : JSON.stringify({
            q : text,
            source : src,
            target : target
        }),

        headers: { "Content-Type": "application/json" }
    })

    let ans = await res.json();
    console.log(ans.translatedText)

    output.innerText = ans.translatedText
}

function runSpeechRecognition(){
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
            
    recognition.onspeechend = function() {
        recognition.stop();
    }

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        let text = document.getElementById("text");
        text.innerText = transcript;
        Translate()
        // console.log(transcript)
    };
          
    // start recognition
    recognition.start();
}
