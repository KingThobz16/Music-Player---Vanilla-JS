// Select music, previous, play and next elements
const music = document.querySelector('audio');
const prevBtn = document.getElementById('previous')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Select image, title and artist element
const image = document.querySelector('img');
const title = document.querySelector('.title')
const artist = document.querySelector('.artist')

// Select progress container and progress element
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

// Select current time and duration element
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.song-duration');


// An array of objects with all the information about our songs
const songs = [
    {
        // To use the name property as a source for the audio element and image element
        name: 'track1',
        title: 'Song Title 1',
        artist: 'Artist 1',
        cover: 'image1'
    },
    {
        // To use the name property as a source for the audio element and image element
        name: 'track2',
        title: 'Song Title 2',
        artist: 'Artist 2',
        cover: 'image2'
    },
    {
        // To use the name property as a source for the audio element and image element
        name: 'track3',
        title: 'Song Title 3',
        artist: 'Artist 3',
        cover: 'image3'
    },
    {
        // To use the name property as a source for the audio element and image element
        name: 'track4',
        title: 'Song Title 4',
        artist: 'Artist 4',
        cover: 'image4'
    },
];


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

// Function that adds the music items to our DOM elements.
const loadsong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    image.src = `/img/${song.cover}.jpg`;
    music.src = `/music/${song.name}.mp3`;
}

// To track the current song
let currentSongIndex = 0;

// next song function
const nextSong = () => {
    // Increment the song index by 1, load the next song and play the song
    currentSongIndex++;
    // if the song index value is higher then the last song index, change it to equal the fist song index
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadsong(songs[currentSongIndex]);
    playSong();
};

// next song function
const prevSong = () => {
    // derement the song index by 1, load the next song and play the song
    currentSongIndex--;
    // if the song index value is less than 0, change it to equal the last song index
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; 
    }
    loadsong(songs[currentSongIndex]);
    playSong();
};

// Onload select first song
loadsong(songs[currentSongIndex]);

// To update progress bar and time
const updateProgressBar = (e) => {
    // Update progreass bar only if something is playing
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        
        // Calculate and update progress bar with width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        
        // Calculate duration in minutes and seconds
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay swiching the duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // 
        // 
        // 
        // 

        // Calculate currentTime in minutes and seconds
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
};

const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    
    // Pull the duration from the music element
    const { duration } = music;

    // Setting current time on progress bar click
    music.currentTime = (clickX / width) * duration;
};

// Previous and Next button event listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', setProgressBar)