

/// ID artista da recuperare 
const artistId = localStorage.getItem("idAlbumElement")
console.log(artistId) // Modifica con l'ID dell'artista
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId;

// Funzione per recuperare i dati dell'artista e aggiornare il DOM
function fetchArtistDetails() {
  fetch(apiUrl)
    .then((response) => {
        console.log("Status API:", response.status);
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Estrarre dati dall'oggetto ricevuto
      const artistName = data.name;
      const artistListeners = data.nb_fan;
      const artistImage = data.picture_xl || data.picture_big || data.picture_medium || data.picture_small;

      // Aggiornare l'HTML dinamicamente
      document.getElementById("artist-name").innerHTML = artistName;
      document.getElementById("artist-listeners").innerHTML = `${artistListeners.toLocaleString()} ascoltatori mensili`;
      document.getElementById("artist-banner").src = artistImage;

      // Aggiorna l'immagine dei "Brani che ti piacciono"
      const artistImageElement = document.getElementById("artist-photo");
      artistImageElement.src = data.picture_small; // Imposta l'immagine dell'artista

      // Aggiorna eventuali altri dettagli come i "Brani che ti piacciono"
      updatePopularTracks(data.id, artistImage);
    
     
    })
    .catch((error) => {
      console.error("Errore nel recupero dei dati:", error);
      document.getElementById("artist-name").innerText = "Errore nel caricamento";
    });
}

// Funzione per recuperare i brani popolari dell'artista
function updatePopularTracks(artistId, artistImage) {
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
      
        // Costruisci l'intero contenuto HTML per i brani
        let tracksHTML = `
          <section class="col-7">
            <h5 class="fs-5">Popolari</h5>
          </section>
          <section class="col-5 d-none d-lg-block d-flex align-items-center mb-3">
                <h5 class="mb-4">Brani che ti piacciono</h5>
                 
              </section>
        `;
       let tracksHTML2 = `
        
        <div class=" col-lg-5 liked-tracks-icon d-none d-lg-block d-flex align-items-center mb-3">
               <img
               id="liked-tracks-img"
               src="${artistImage}"
               alt="Artist"
               class="rounded-circle me-3"
               style="width: 50px; height: 50px; object-fit: cover;"
             />
               <small id="liked-tracks-count">Hai messo Mi piace a 8 brani</small>
              
             </div>
     `;
        tracks.forEach((track, index) => {
          // Calcola la durata in formato mm:ss
          const minutes = Math.floor(track.duration / 60);
          const seconds = track.duration % 60;
          const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
          // Aggiungi il brano all'HTML
          tracksHTML += `
            <div class="col-lg-7 d-flex align-items-center mb-3">
              <span class="me-3">${index + 1}</span>
              <img src="${track.album.cover_small}" alt="${track.title}" 
                   class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
              <div>
                <h6 class="mb-0">${track.title}</h6>
                <small>${formattedDuration}</small>
              </div>
            </div>
             
          `+tracksHTML2;
          tracksHTML2=""
        });
       
        // Aggiorna il contenitore dei brani con il nuovo contenuto
        tracksContainer.innerHTML = tracksHTML;
      })
      .catch((error) => {
        console.log("Errore nel recupero dei brani:", error);
        const tracksContainer = document.getElementById("popular-tracks");
        tracksContainer.innerHTML = `<p class="text-danger">Errore nel caricamento dei brani</p>`;
      });
  }
  
  // Avvio del caricamento quando la pagina è pronta
  document.addEventListener("DOMContentLoaded", fetchArtistDetails);