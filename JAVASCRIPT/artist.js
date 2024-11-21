

/// ID artista da recuperare (esempio: Pinguini Tattici Nucleari)
const artistId = localStorage.getItem("idAlbumElement")
console.log(artistId) // Modifica con l'ID dell'artista
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId;

// Funzione per recuperare i dati dell'artista e aggiornare il DOM
function fetchArtistDetails() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Estrarre dati dall'oggetto ricevuto
      const artistName = data.name;
      const artistListeners = data.nb_fan;
      const artistImage = data.picture_xl;

      // Aggiornare l'HTML dinamicamente
      document.getElementById("artist-name").innerHTML = artistName;
      document.getElementById("artist-listeners").innerHTML = `${artistListeners.toLocaleString()} ascoltatori mensili`;
      document.getElementById("artist-banner").src = artistImage;

      // Aggiorna l'immagine dei "Brani che ti piacciono"
      const artistImageElement = document.getElementById("artist-photo");
      artistImageElement.src = data.picture_small; // Imposta l'immagine dell'artista

      // Aggiorna eventuali altri dettagli come i "Brani che ti piacciono"
      updatePopularTracks(data.id);
    })
    .catch((error) => {
      console.error("Errore nel recupero dei dati:", error);
      document.getElementById("artist-name").innerText = "Errore nel caricamento";
    });
}

// Funzione per recuperare i brani popolari dell'artista
function updatePopularTracks(artistId) {
  const tracksApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=8`;
  fetch(tracksApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const tracks = data.data;
      const tracksContainer = document.getElementById("popular-tracks");

      // Rimuove contenuto precedente (se esiste) e aggiunge i nuovi brani
      tracksContainer.innerHTML = `
        <section class="col-12">
          <h3 class="fs-5">Popolari</h3>
        </section>
      `;
      
      tracks.forEach((track, index) => {
        const trackElement = document.createElement("div");
        trackElement.classList = " col-lg-6 d-flex align-items-center mb-3";
        trackElement.innerHTML = `
          <span class="me-3">${index + 1}</span>
          <img src="${track.album.cover_small}" alt="${track.title}" 
               class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <h6 class="mb-0">${track.title}</h6>
            <small>${(track.duration / 60).toFixed(2)} min</small>
          </div>
        `;
        tracksContainer.appendChild(trackElement);
      });
    })
    .catch((error) => {
      console.error("Errore nel recupero dei brani:", error);
      const tracksContainer = document.getElementById("popular-tracks");
      tracksContainer.innerHTML = `<p class="text-danger">Errore nel caricamento dei brani</p>`;
    });
}

// Avvio del caricamento quando la pagina è pronta
document.addEventListener("DOMContentLoaded", fetchArtistDetails);
