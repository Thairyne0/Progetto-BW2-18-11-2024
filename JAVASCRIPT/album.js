const albumId = localStorage.getItem("idAlbumElement") // Recupera l'albumId salvato
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
      // Imposta immagine album
      const albumImage = document.getElementById("albumImage")
      albumImage.src = data.cover_medium

      // Nome album
      const albumName = document.getElementById("albumName")
      albumName.textContent = data.title

      // Nome artista
      const artistName = document.getElementById("artistName")
      artistName.textContent = data.artist.name + " •"

      // Immagine artista
      const artistImg = document.getElementById("artistImg")
      artistImg.src = data.artist.picture_small

      // Data di uscita
      const releaseDate = document.getElementById("dateArtistLg")
      releaseDate.textContent = data.release_date + " •"

      // Numero di brani
      const numTracks = document.getElementById("braniArtistLg")
      numTracks.textContent = data.nb_tracks + " brani •"

      // Durata totale album
      const duration = document.getElementById("timeArtistLg")
      duration.textContent = formatDuration(data.duration)

      // Popolamento della tabella
      const trackTable = document.getElementById("trackTable")
      trackTable.innerHTML = "" // Pulisce la tabella esistente

      data.tracks.data.forEach((track, index) => {
        const row = document.createElement("tr")

        // Numero traccia
        const trackNumberCell = document.createElement("td")
        trackNumberCell.textContent = index + 1
        row.appendChild(trackNumberCell)

        // Titolo traccia
        const trackTitleCell = document.createElement("td")
        trackTitleCell.textContent = track.title
        row.appendChild(trackTitleCell)

        // Numero riproduzioni
        const trackPlaysCell = document.createElement("td")
        trackPlaysCell.textContent = track.rank
        row.appendChild(trackPlaysCell)

        // Durata
        const trackDurationCell = document.createElement("td")
        trackDurationCell.textContent = formatDuration(track.duration)
        row.appendChild(trackDurationCell)

        trackTable.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'album:", error)
    })
}

// Funzione per formattare la durata in minuti:secondi
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

window.onload = loadAlbumData
