fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=playlist")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((product) => {
    console.log("Product", product);

    const buonaseraPlaceholder = document.getElementById(
      "buonasera-placeholder"
    );

    const buonaseraContainer = document.getElementById("buonasera-container");

    buonaseraPlaceholder.classList.add("d-none");

    buonaseraContainer.classList.remove("d-none");

    let numeri = Array.from({ length: 25 }, (_, i) => i);

    // Mescola l'array in ordine casuale usando il metodo Fisher-Yates
    for (let i = numeri.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    }

    for (let i = 0; i < 6; i++) {
      buonaseraContainer.innerHTML += `
    <div class="col rounded" style="background-color: #2d2d2d">
                <a href="#" class="text-decoration-none" id = "idMain_${
                  product.data[numeri[i]].id
                }">
                  <div class="row">
                    <div class="col col-3 p-0 d-flex">
                      <img
                        src=${product.data[numeri[i]].album.cover_medium}
                        class="img-fluid rounded-start"
                        alt="image"
                        style="width: 70px"
                      />
                    </div>
                    <div class="col col-9 d-flex align-items-center">
                      <h6
                        class="text-light fw-bold"
                      >
                        ${product.data[numeri[i]].title}
                      </h6>
                    </div>
                  </div>
                </a>
              </div>
    `;
    }

    const playlistPlaceholder = document.getElementById("playlist-placeholder");
    const containerPlaylist = document.getElementById("playlist-container");

    playlistPlaceholder.classList.remove("d-lg-block");
    containerPlaylist.classList.remove("d-none");

    containerPlaylist.innerHTML += ` <h2 class="text-light ms-2">Le tue playlist</h2>
    <hr class="text-light" />`;

    for (let i = 0; i < 24; i++) {
      containerPlaylist.innerHTML += `
      
            <a
              href="#" id = "idPlaylist_${
                product.data[numeri[i]].id
              }" class="playlist-container text-light text-decoration-none d-block mb-2"
              >${product.data[i].title}</a
            >
            
      `;
    }
  })
  .catch((error) => {
    console.log(error);
  });

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=album")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((product) => {
    console.log("Product", product);

    let numeri = Array.from({ length: 25 }, (_, i) => i);

    // Mescola l'array in ordine casuale usando il metodo Fisher-Yates
    for (let i = numeri.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    }

    const mainContainer = document.getElementById("main-container");
    const placeholderMain = document.getElementById("main-placeholder");

    mainContainer.classList.remove("d-none");
    placeholderMain.classList.add("d-none");

    for (let i = 0; i < 8; i++) {
      mainContainer.innerHTML += `
           <div class="col rounded p-3" style="background-color: #171717">
                <a href="#" class="text-decoration-none" id = "idAlbumContainer_${
                  product.data[numeri[i]].id
                }">
                  <img
                    src=${product.data[numeri[i]].album.cover_medium}
                    class="contenitore-img-album w-100 img-fluid mb-2 rounded"
                    alt="image"
                    style="width: 200px"
                  />
                  <h6
                    class="nome-album-contenitore text-light fw-bold "
                  >
                  ${product.data[numeri[i]].title}
                  </h6>
                  <p
                    class="descrizione-album-contenitore text-light mb-0 "
                  >
                  ${product.data[numeri[i]].artist.name}
                  </p>
                </a>
              </div>
        `;
    }
  })
  .catch((error) => {
    console.log(error);
  });

//   NON TOCCCARE
