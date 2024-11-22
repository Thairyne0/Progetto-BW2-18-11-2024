

/// ID artista da recuperare 
let artistId = localStorage.getItem("idAlbumElement")
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
        console.log("Dati ricevuti dall'API:", data); // Log della risposta completa dell'API
  
        // Verifica la struttura dei dati
        if (!data || !data.name) {
          console.error("Dati non corretti nell'API:", data);
          return;
        }
  
        const artistName = data.name;
        const artistListeners = data.nb_fan;  // Proviamo a prendere 'nb_fan'
        const artistImage = data.picture_xl || data.picture_big || data.picture_medium || data.picture_small;
  
        // Se nb_fan non è presente, cerchiamo alternative o mettiamo un fallback
        let formattedListeners = 'Dati non disponibili';
        if (artistListeners && !isNaN(artistListeners) && artistListeners > 0) {
          formattedListeners = artistListeners.toLocaleString();
        } else {
          // Aggiungi una condizione per verificare se 'nb_fan' è effettivamente presente
          console.warn("Campo nb_fan non valido o mancante:", artistListeners);
        }
  
        // Log dei dettagli estratti
        console.log(`Nome artista: ${artistName}`);
        console.log(`Ascoltatori: ${formattedListeners}`);
        
        // Aggiornare l'HTML dinamicamente
        document.getElementById("artist-name").innerHTML = artistName;
        document.getElementById("artist-listeners").innerHTML = `${formattedListeners} ascoltatori mensili`;
        document.getElementById("artist-banner").src = artistImage;
  
        // Aggiorna l'immagine dei "Brani che ti piacciono"
        const artistImageElement = document.getElementById("artist-photo");
        artistImageElement.src = data.picture_small;
  
        // Aggiorna eventuali altri dettagli come i "Brani che ti piacciono"
        updatePopularTracks(data.id, artistImage);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati:", error);
        document.getElementById("artist-name").innerText = "Errore nel caricamento";
        document.getElementById("artist-listeners").innerText = "Errore nel caricamento ascoltatori";
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

 // Funzione per creare e aggiornare la playlist
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
    const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=playlist";
  
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
  
  document.addEventListener("DOMContentLoaded", () => {
    // Seleziona i bottoni prev e next
    const prevButton = document.getElementById("carousel-prev");
    const nextButton = document.getElementById("carousel-next");
  
    if (prevButton) {
      // Aggiungi un evento al bottone prev per tornare alla pagina precedente
      prevButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evita comportamenti predefiniti
        window.history.back(); // Torna alla pagina precedente
      });
    }
  
    if (nextButton) {
      // Disabilita il bottone next
      nextButton.disabled = true;
      nextButton.style.cursor = "not-allowed"; // Cambia il cursore per indicare che il bottone è disabilitato
    }
  });
  