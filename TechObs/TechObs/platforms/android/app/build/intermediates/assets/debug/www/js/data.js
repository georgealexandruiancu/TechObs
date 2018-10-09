var obj;
var allLoaded = 0;
var lis;
var audio = document.getElementById('techMusic');
var source = document.getElementById('techSource');

fetch('https://9735dff3.ngrok.io')
    .then(res => res.json())
    .then(data => obj = _.values(data))
    .then(() => console.log(obj))
    .then(() => {
        for(let i=0;i<obj.length;i++)
        {
            $("#tracks-holder").append(
                `
                <li onclick=(playMusic('${obj[i].urlSong}',${i})) data-ref="${i}" id="songsInTrack">
                    <div class="playBtn">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="trackName">
                        ${obj[i].song}
                </div>
                    <div class="artistName">
                        - ${obj[i].artist}
                </div>
                </li>
                `
            );
        }
    })
    .then(() => {
        lis = document.getElementsByTagName("li");
        console.log(lis.length - 3);
        source.src = obj[0].urlSong;
        audio.load();
        $("#trackNameView").html(obj[0].song);
        $("#artistNameView").html("-" + obj[0].artist);
    });
$(document).ready(function(){
    document.getElementById("nextMiniBtn").setAttribute("data-value", 0);
    var nextSong = document.getElementById("nextMiniBtn").getAttribute("data-value"); 
    console.log(nextSong);
    
});

function playMusic(param, index) {
    source.src = param;
    document.getElementById("nextMiniBtn").setAttribute("data-value", index + 1);
    console.log("Next search: " + document.getElementById("nextMiniBtn").getAttribute("data-value"));
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
}
function nextSong(){
    var nextIndexString = document.getElementById("nextMiniBtn").getAttribute("data-value");
    var nextIndexInt = parseInt(nextIndexString);
    if(nextIndexInt == obj.length){
        nextIndexInt = 0;
    }
    for(let i = 0 ;i<obj.length;i++){
        if (i == nextIndexInt){
            console.log(obj[i], nextIndexInt);
            playMusic(obj[i].urlSong, nextIndexInt);
            $("#trackNameView").html(obj[i].song);
            $("#artistNameView").html("-" + obj[i].artist);
        }
    }
    removeAllClasses();
    changeColor();
}
function removeAllClasses(){
    for (let i = 1; i < lis.length; i++) {
          $('#tracks-holder li').removeClass('active');
    }
}
function changeColor(){
   console.log(lis);
   for(let i = 1;i<lis.length;i++){
       var nextIndexString = document.getElementById("nextMiniBtn").getAttribute("data-value");
       var nextIndexInt = parseInt(nextIndexString);
       if(nextIndexInt-1 == i){  
          $('li[data-ref=' + i + ']').addClass('active');
       }
   }
}
