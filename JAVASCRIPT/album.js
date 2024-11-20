const albumId = 75621062
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`

// Funzione per caricare i dati dell'album
async function loadAlbumData() {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    // Aggiorna l'immagine dell'album
    const albumImage = document.getElementById("albumImage")
    albumImage.src = data.cover_medium // L'URL dell'immagine di copertura

    // Aggiorna il nome dell'album
    const albumName = document.getElementById("albumName")
    albumName.textContent = data.title

    // Aggiorna il nome dell'artista
    const artistName = document.getElementById("artistName")
    artistName.textContent = data.artist.name

    // Aggiungi i brani alla lista
    const trackList = document.getElementById("trackList")
    trackList.innerHTML = "" // Pulisce la lista precedente, se c'era

    data.tracks.data.forEach((track) => {
      const listItem = document.createElement("li")
      listItem.textContent = track.title
      trackList.appendChild(listItem)
    })
  } catch (error) {
    console.error("Errore nel recuperare i dati dell'album:", error)
  }
}

window.onload = loadAlbumData
