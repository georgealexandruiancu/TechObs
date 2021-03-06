var obj;
var allLoaded = 0;
var lis;
var audio = document.getElementById('techMusic');
var source = document.getElementById('techSource');
var shuffleActive = 0;
var repeatActive = 0;
var currentParam;
var currentIndex;
fetch('https://9735dff3.ngrok.io')
    .then(res => res.json())
    .then(data => obj = _.values(data))
    .then(() => {
        var currentIndex = obj.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = obj[currentIndex];
            obj[currentIndex] = obj[randomIndex];
            obj[randomIndex] = temporaryValue;
        }

        return obj;
    })
    .then(() => {
        for(i=0;i<obj.length;i++)
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
function toggleAll(){
    shuffleActive = 0;
    repeatActive = 0;
    console.log("all states are reseted");
}
function playMusic(param, index) {
    source.src = param;
    document.getElementById("nextMiniBtn").setAttribute("data-value", index + 1);
    console.log("Next search: " + document.getElementById("nextMiniBtn").getAttribute("data-value"));
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
    currentIndex = index;
    currentParam = param;
    for (let i = 0; i < obj.length; i++) {
        if (i == index) {
            $("#trackNameView").html(obj[i].song);
            $("#artistNameView").html("-" + obj[i].artist);
        }
    }
    removeAllClasses();
    changeColor();
    console.log(currentIndex + " " + currentParam);
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
    shuffleActive = 0;
    repeatActive = 0;
    console.log("shuffle active: " + shuffleActive);
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
function changeStateShuffle(){
    shuffleActive = 1;
    repeatActive = 0;
    console.log("shuffle active: " + shuffleActive);
}
function changeStateRepeat() {
    repeatActive = 1;
    shuffleActive = 0;
    console.log("repeat active: " + repeatActive);
}
function repeatMusic(index, param){
    playMusic(param, index);
}
function shuffleMusic(){
    index = _.random(0, obj.length);
    console.log("MUSIC SEARCH: " + obj[index-1].urlSong);
    // shuffleActive = 1;
    playMusic(obj[index-1].urlSong, index-1);
}
audio.onended = function(){
    if(shuffleActive == 1){
        shuffleMusic();
    }else if(repeatActive == 1){
        repeatMusic(currentIndex, currentParam);
    }else{
        nextSong();
    }
}



// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {

//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }
// objShu = shuffle(obj);
// console.log(objShu);