const audio = document.getElementById('audio')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const trackTitle = document.getElementById('track-title')
const currentTimeDisplay = document.getElementById('current-time')
const durationDisplay = document.getElementById('duration')

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

// Update time display
function updateTimeDisplay() {
  const currentTime = Math.floor(audio.currentTime)
  const duration = Math.floor(audio.duration)
  currentTimeDisplay.textContent = formatTime(currentTime)
  durationDisplay.textContent = formatTime(duration)
}

// Format time in MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

// Play track
playButton.addEventListener('click', () => {
  audio.play()
})

// Pause track
pauseButton.addEventListener('click', () => {
  audio.pause()
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

// Update time display as the track plays
audio.addEventListener('timeupdate', updateTimeDisplay)

// Load the first track on page load
loadTrack(currentTrackIndex)
