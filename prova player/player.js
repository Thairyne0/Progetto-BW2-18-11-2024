const audio = document.getElementById('audio')
const playButton = document.getElementById('play')
const likeButton = document.getElementById('like')
const trackTitle = document.getElementById('track-title')
const artist = document.getElementById('artist')

// Array of tracks
const tracks = [
  { title: 'Track 1', src: 'track1.mp3' },
  { title: 'Track 2', src: 'track2.mp3' },
  { title: 'Track 3', src: 'track3.mp3' },
]

let currentTrackIndex = 0

// Load the current track
function loadTrack(index) {
  audio.src = tracks[index].src
  trackTitle.textContent = tracks[index].title
  audio.load()
}

// // Play track
// playButton.addEventListener('click', () => {
//   audio.play()
// })

// // Pause track
// pauseButton.addEventListener('click', () => {
//   audio.pause()
// })

likeButton.addEventListener('click', () => {
  likeButton.innerHTML = '<i class="bi bi-heart-fill mx-2 text-success"></i>'
})

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    playButton.innerHTML =
      '<i class="bi bi-pause-fill mx-2 fs-1 text-white"></i>'
  } else {
    audio.pause()
    playButton.innerHTML =
      '<i class="bi bi-play-fill mx-2 fs-1 text-white"></i>'
  }
})

// Previous track
prevButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
  loadTrack(currentTrackIndex)
  audio.play()
})

// Next track
nextButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length
  loadTrack(currentTrackIndex)
  audio.play()
})

// Load the first track on page load
loadTrack(currentTrackIndex)

const audio2 = document.getElementById('audio-player') // Your audio element
const volumeSlider = document.getElementById('volume-slider')

volumeSlider.addEventListener('input', function () {
  audio.volume = volumeSlider.value / 100 // Set volume between 0 and 1
})
