const albumId = localStorage.getItem("idAlbumElement")
console.log(albumId)
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`

function loadAlbumData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      const albumImage = document.getElementById("albumImage")
      albumImage.src = data.cover_medium

      const albumName = document.getElementById("albumName")
      albumName.textContent = data.title

      const artistName = document.getElementById("artistName")
      artistName.textContent = data.artist.name + " •"

      const releaseDate = document.getElementById("dateArtistLg")
      releaseDate.textContent = data.release_date + " •"

      const numTracks = document.getElementById("braniArtistLg")
      numTracks.textContent = data.nb_tracks + " brani •"

      const duration = document.getElementById("timeArtistLg")
      duration.textContent = data.duration

      const trackList = document.getElementById("trackList")
      trackList.innerHTML = ""

      data.tracks.data.forEach((track) => {
        const listItem = document.createElement("li")
        listItem.textContent = track.title

        const duration = document.createElement("span")
        duration.textContent = track.duration

        const record = document.createElement("span")
        record.textContent = track.rank

        listItem.appendChild(duration)
        listItem.appendChild(record)
        trackList.appendChild(listItem)
      })
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'album:", error)
    })
}

window.onload = loadAlbumData
