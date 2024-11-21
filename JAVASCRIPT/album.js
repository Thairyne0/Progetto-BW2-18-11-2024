const albumId = localStorage.getItem("idAlbumElement");
console.log(albumId);
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

// Funzione per caricare i dati dell'album
async function loadAlbumData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Aggiorna l'immagine dell'album
    const albumImage = document.getElementById("albumImage");
    albumImage.src = data.cover_medium; // L'URL dell'immagine di copertura

    // Aggiorna il nome dell'album
    const albumName = document.getElementById("albumName");
    albumName.textContent = data.title;

    // Aggiorna il nome dell'artista
    const artistName = document.getElementById("artistName");
    artistName.textContent = data.artist.name + " •";

    const releaseDate = document.getElementById("dateArtistLg");
    releaseDate.textContent = data.release_date + " •";

    const numTracks = document.getElementById("braniArtistLg");
    numTracks.textContent = data.nb_tracks + " brani •";

    const duration = document.getElementById("timeArtistLg");
    duration.textContent = data.duration;
    // Aggiungi i brani alla lista
    const trackList = document.getElementById("trackList");
    trackList.innerHTML = "";

    data.tracks.data.forEach((track) => {
      const listItem = document.createElement("li");
      listItem.textContent = track.title;
      const duration = document.createElement("span");
      duration.textContent = track.duration;
      const record = document.createElement("span");
      record.textContent = track.rank;
      listItem.appendChild(duration);
      listItem.appendChild(record);
      trackList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Errore nel recuperare i dati dell'album:", error);
  }
}

// window.onload = loadAlbumData;
