console.log("Welcome to Spotify");

let sIndex = 1;
let audioElement=new Audio("songs/2.mp3");
let volume =0.4;

let currentPlayCover = document.getElementById("currentPlayCover");
let currentPlayName = document.getElementById("currentPlayName");
let masterPlayButton = document.getElementById("masterPlayButton");
let previousButton = document.getElementById("previousButton");
let nextButton = document.getElementById("nextButton");
let progressBar = document.getElementById("progressBar");
let volumeUp = document.getElementById("volumeUp");
let volumeDown = document.getElementById("volumeDown");
let volumeRange = document.getElementById("volumeRange");

let songs = [
    {songName: "WAVY - Karan Aujla", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ON TOP - Karan Aujla", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "WHO THEY? - Karan Aujla", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "GOIN OFF - Karan Aujla", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "WINNING SPEECH - Karan Aujla", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "CLASH - Diljit Dosanjh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "JAIL 2 - Mankirt", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "GANGLAND - Mankirt", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "JAIL - Mankirt", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "PAAPI MUNDA - Mankirt", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]


let songBars = Array.from(document.getElementsByClassName("songBar"));

songBars.forEach((element,i)=>{
    element.querySelector("img").src= songs[i].coverPath;
    element.querySelector("span").textContent = songs[i].songName;
});

function playSong(songIndex){
    currentPlayCover.src = `covers/${songIndex+1}.jpg`;
    currentPlayName.textContent = songs[songIndex].songName;
    
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.load();

    if(masterPlayButton.classList.contains("fa-play-circle")){
        masterPlayButton.classList.remove("fa-play-circle");
        masterPlayButton.classList.add("fa-pause-circle");
    }
    progressBar.value = 0;
    songBars[sIndex].querySelector("i").classList.remove("fa-pause-circle");
    songBars[sIndex].querySelector("i").classList.add("fa-play-circle");
    
    sIndex = songIndex;
    
    songBars[sIndex].querySelector("i").classList.remove("fa-play-circle");
    songBars[sIndex].querySelector("i").classList.add("fa-pause-circle");


    audioElement.play();
}

function pauseSong(){
    masterPlayButton.classList.remove("fa-pause-circle");
    masterPlayButton.classList.add("fa-play-circle");
    
    songBars[sIndex].querySelector("i").classList.remove("fa-pause-circle");
    songBars[sIndex].querySelector("i").classList.add("fa-play-circle");
    
    audioElement.pause();
}

function resume(){
    masterPlayButton.classList.remove("fa-play-circle");
    masterPlayButton.classList.add("fa-pause-circle");
    
    songBars[sIndex].querySelector("i").classList.remove("fa-play-circle");
    songBars[sIndex].querySelector("i").classList.add("fa-pause-circle");
    
    audioElement.play();
}




// events

masterPlayButton.addEventListener('click',()=>{
    if(audioElement.paused){
        resume();
    }else{
        pauseSong();
    }
})

let playButtons = Array.from(document.getElementsByClassName("playButton"));
playButtons.forEach((element)=>{
    element.addEventListener('click',(event)=>{
       if(element.classList.contains("fa-play-circle")){
        if(sIndex == event.target.parentElement.id) 
            resume();
        else
            playSong(parseInt(event.target.parentElement.id));
       }else{
        pauseSong();
       }
    })
})

audioElement.addEventListener('timeupdate',()=>{
    let progress = (audioElement.currentTime/audioElement.duration)* 100; 
    progressBar.value = progress;
})

audioElement.addEventListener('ended',()=>{
    audioElement.currentTime=0;
    pauseSong();
})

nextButton.addEventListener('click',()=>{
    let temp = sIndex +1;
    playSong(temp>9?0:temp);
})

previousButton.addEventListener('click',()=>{
    let temp = sIndex - 1;
    playSong(temp<0?9:temp);
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

volumeDown.addEventListener('click',()=>{
    volume = audioElement.volume || 0.4;
    audioElement.volume=0;
})

volumeUp.addEventListener('click',()=>{
    audioElement.volume = volume;
})

volumeRange.addEventListener('change', ()=>{
   volume = audioElement.volume = volumeRange.value/100;
})

