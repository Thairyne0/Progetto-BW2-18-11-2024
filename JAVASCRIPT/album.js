const albumId = localStorage.getItem("idAlbumElement"); // Recupera l'albumId salvato
const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

function loadAlbumData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Imposta immagine album
      const albumImage = document.getElementById("albumImage");
      albumImage.src = data.cover_medium;

      // Nome album
      const albumName = document.getElementById("albumName");
      albumName.textContent = data.title;

      // Nome artista
      const artistName = document.getElementById("artistName");
      artistName.textContent = data.artist.name + " •";

      // Immagine artista
      const artistImg = document.getElementById("artistImg");
      artistImg.src = data.artist.picture_small;

      // Data di uscita
      const releaseDate = document.getElementById("dateArtistLg");
      releaseDate.textContent = data.release_date + " •";

      // Numero di brani
      const numTracks = document.getElementById("braniArtistLg");
      numTracks.textContent = data.nb_tracks + " brani •";

      // Durata totale album
      const duration = document.getElementById("timeArtistLg");
      duration.textContent = formatDuration(data.duration);

      // Popolamento della tabella
      const trackTable = document.getElementById("trackTable");
      trackTable.innerHTML = ""; // Pulisce la tabella esistente

      data.tracks.data.forEach((track, index) => {
        const row = document.createElement("tr");

        // Numero traccia
        const trackNumberCell = document.createElement("td");
        trackNumberCell.textContent = index + 1;
        row.appendChild(trackNumberCell);

        // Titolo traccia
        const trackTitleCell = document.createElement("td");
        trackTitleCell.textContent = track.title;
        row.appendChild(trackTitleCell);

        // Numero riproduzioni
        const trackPlaysCell = document.createElement("td");
        trackPlaysCell.textContent = track.rank;
        row.appendChild(trackPlaysCell);

        // Durata
        const trackDurationCell = document.createElement("td");
        trackDurationCell.textContent = formatDuration(track.duration);
        row.appendChild(trackDurationCell);

        trackTable.appendChild(row);
      });

      const arrayTable = document.querySelectorAll("td");

      for (let i = 0; i < arrayTable.length; i++) {
        arrayTable[i].style.backgroundColor = "#0e0e0e";
        arrayTable[i].style.color = "white";
      }
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'album:", error);
    });
}

// Funzione per formattare la durata in minuti:secondi
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updatePlaylist(tracks) {
  const playlistPlaceholder = document.getElementById("playlist-placeholder");

  // Rimuovi i contenuti placeholder
  playlistPlaceholder.innerHTML = `
    <h2 class="text-light ms-2">Le tue playlist</h2>
    <hr class="text-light" />
  `;

  // Aggiungere dinamicamente le tracce
  tracks.forEach((track, index) => {
    playlistPlaceholder.innerHTML += `
      <a
        href="#"
        id="playlist_${track.id}"
        class="playlist-container text-light text-decoration-none d-block mb-2"
      >
        ${index + 1}. ${track.title}
      </a>
    `;
  });

  // Aggiungere gli event listener per ogni elemento della playlist
  const playlistItems = document.getElementsByClassName("playlist-container");
  Array.from(playlistItems).forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const idProdotto = event.target.id.split("_")[1]; // Estrai l'ID della traccia
      localStorage.setItem("idAlbumElement", idProdotto); // Salva l'ID nel LocalStorage
      console.log("Playlist cliccata, ID salvato:", idProdotto);
    });
  });
}

// Funzione per recuperare e gestire i dati della playlist
function fetchPlaylist() {
  const apiUrl =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=playlist";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const tracks = data.data; // Ottieni i brani dalla risposta
      updatePlaylist(tracks); // Aggiorna la sezione playlist con i dati
    })

    .catch((error) => {
      console.error("Errore nel recupero della playlist:", error);
      playlistPlaceholder.innerHTML = `<p class="text-danger">Errore nel caricamento della playlist</p>`;
    });
}

// Avvio del caricamento della playlist
document.addEventListener("DOMContentLoaded", fetchPlaylist);

window.onload = loadAlbumData;
