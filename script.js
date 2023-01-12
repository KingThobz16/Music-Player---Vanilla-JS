// Select music, previous, play and next elements
const music = document.querySelector('audio');
const prevBtn = document.getElementById('previous')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// To check if playing or not
// On page load it will initially be false
let isPlaying = false;

// Play Song Function
const playSong = () => {
    // When we want to play song, set isPlaying to true and play song
    isPlaying = true;
    // To replace the play button icon with the pause button icon and change title attribute to pause
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// Pause Song Function
const pauseSong = () => {
    // When we are paused, set isPlaying to false and pause song
    isPlaying = false;
    // To replace the pause button icon with the play button icon and change title attribute to play
    playBtn.classList.replace('fa-pause', 'fa-play')   
    playBtn.setAttribute('title', 'Play')
    music.pause();
}


// Play or Pause event listener
playBtn.addEventListener('click', () => {
    // If song is isPlaying is true and song is already playing. Pause the song, else play it
    isPlaying ? pauseSong() : playSong();
});
