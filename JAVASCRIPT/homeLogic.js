fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=rock")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((product) => {
    console.log("Product", product);

    console.log(product.data[0].album.id);

    const buonaseraPlaceholder = document.getElementById(
      "buonasera-placeholder"
    );

    const buonaseraContainer = document.getElementById("buonasera-container");

    buonaseraPlaceholder.classList.add("d-none");

    buonaseraContainer.classList.remove("d-none");

    let numeri = Array.from({ length: 25 }, (_, i) => i);

    for (let i = numeri.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    }

    for (let i = 0; i < 6; i++) {
      buonaseraContainer.innerHTML += `
      <a class="mainElement text-decoration-none" href="./albumPage.html" >
    <div class="col rounded" style="background-color: #2d2d2d">
                
                  <div class="row">
                    <div class="col col-3 p-0 d-flex" id = "idMainDivMini_${
                      product.data[numeri[i]].album.id
                    }">
                      <img
                        src=${product.data[numeri[i]].album.cover_medium}
                        class="img-fluid rounded-start"
                        alt="image"
                        style="width: 70px"
                        id = "idMainImg_${product.data[numeri[i]].album.id}"
                      />
                    </div>
                    <div class="col col-9 d-flex align-items-center" id = "idMainDiv_${
                      product.data[numeri[i]].album.id
                    }">
                      <h6
                        class="text-light fw-bold"
                        id = "idMainH6_${product.data[numeri[i]].album.id}"
                      >
                        ${product.data[numeri[i]].title}
                      </h6>
                    </div>
                  </div>
                
              </div>
              </a>
    `;
    }

    for (let i = 0; i < mainElement.length; i++) {
      mainElement[i].addEventListener("click", function (event) {
        event.defaultPrevented;
        let posizioneTratto = event.target.id.indexOf("_");
        let idProdotto = event.target.id.slice(posizioneTratto + 1);
        localStorage.setItem("idAlbumElement", idProdotto);
        console.log(localStorage.getItem("idAlbumElement"));
      });
    }

    const playlistPlaceholder = document.getElementById("playlist-placeholder");
    const containerPlaylist = document.getElementById("playlist-container");

    playlistPlaceholder.classList.remove("d-lg-block");
    containerPlaylist.classList.add("d-lg-block");

    containerPlaylist.innerHTML += ` <h2 class="text-light ms-2">Le tue playlist</h2>
    <hr class="text-light" />`;

    for (let i = 0; i < 24; i++) {
      containerPlaylist.innerHTML += `
      
            <a
              href="./albumPage.html" id = "idPlaylist_${
                product.data[numeri[i]].album.id
              }" class="playlistContainer playlist-container text-light text-decoration-none d-block mb-2"
              >${product.data[i].title}</a
            >
            
      `;
    }

    console.log(playlistContainer[0].id);

    for (let i = 0; i < playlistContainer.length; i++) {
      playlistContainer[i].addEventListener("click", function (event) {
        console.log(event);
        event.defaultPrevented;
        console.log(event.target.id);
        let posizioneTratto = event.target.id.indexOf("_");
        let idProdotto = event.target.id.slice(posizioneTratto + 1);
        localStorage.setItem("idAlbumElement", idProdotto);
        console.log(localStorage.getItem("idAlbumElement"));
      });
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

    console.log("MANNAGGIA TUTTO");

    console.log(product.data[0].album.id);

    let numeri = Array.from({ length: 25 }, (_, i) => i);

    // Mescola l'array in ordine casuale usando il metodo Fisher-Yates
    for (let i = numeri.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    }

    const carouselPlaceholder = document.getElementById("carousel-placeholder");
    const carouselContainer = document.getElementById("carousel-container");

    carouselPlaceholder.classList.add("d-none");
    carouselContainer.classList.remove("d-none");

    const mainContainer = document.getElementById("main-container");
    const placeholderMain = document.getElementById("main-placeholder");

    mainContainer.classList.remove("d-none");
    placeholderMain.classList.add("d-none");

    let q = Math.floor(Math.random() * 25);

    carouselContainer.innerHTML = `
                <div class="carousel-item active">
                    <!-- inizio elemento carousel -->
                    <div class="row p-3">
                      <div class="col col-3">
                        <img
                          src=${product.data[q].album.cover_medium}
                          class="img-fluid"
                          alt="img-album"
                          id="img-album"
                          style="width: 200px"
                        />
                      </div>
                      <div class="col col-8">
                        <h2
                          id="nome-album"
                          class="text-light fs-1 fw-bolder"
                        >
                        ${product.data[q].title}
                        </h2>
                        <p
                          class="text-light d-block"
                          id="nome-artista"
                        >
                        ${product.data[q].artist.name}
                        </p>
                        <p class="text-light d-block">
                          Ascoltalo subito!
                        </p>
                        <button
                          class="btn rounded-pill text-black px-4 me-2"
                          style="background-color: #1ed760"
                        >
                          Play
                        </button>
                        <button class="btn btn-outline-light rounded-pill px-4">
                          Salva
                        </button>
                      </div>
                    </div>
                    <!-- fine elemento carousel -->
                </div>
     
                <div class="carousel-item">
                  
    
                    <!-- inizio elemento carousel -->
                    <div class="row p-3">
                      <div class="col col-3">
                        <img
                          src=${product.data[q].album.cover_medium}
                          class="img-fluid"
                          alt="img-album"
                          id="img-album"
                          style="width: 200px"
                        />
                      </div>
                      <div class="col col-8">
                        <h2
                          id="nome-album"
                          class="text-light fs-1 fw-bolder"
                        >
                        ${product.data[q].title}
                        </h2>
                        <p
                          class="text-light d-block"
                          id="nome-artista"
                        >
                        ${product.data[q].artist.name}
                        </p>
                        <p class="text-light d-block">
                          Ascoltalo subito!
                        </p>
                        <button
                          class="btn rounded-pill text-black px-4 me-2"
                          style="background-color: #1ed760"
                        >
                          Play
                        </button>
                        <button class="btn btn-outline-light rounded-pill px-4">
                          Salva
                        </button>
                      </div>
                    </div>
                    <!-- fine elemento carousel -->
                 
                </div>
                <div class="carousel-item">
                  
    
                    <!-- inizio elemento carousel -->
                    <div class="row p-3">
                      <div class="col col-3">
                        <img
                          src=${product.data[q].album.cover_medium}
                          class="img-fluid"
                          alt="img-album"
                          id="img-album"
                          style="width: 200px"
                        />
                      </div>
                      <div class="col col-8">
                        <h2
                          id="nome-album"
                          class="text-light fs-1 fw-bolder"
                        >
                        ${product.data[q].title}
                        </h2>
                        <p
                          class="text-light d-block"
                          id="nome-artista"
                        >
                        ${product.data[q].artist.name}
                        </p>
                        <p class="text-light d-block">
                          Ascoltalo subito!
                        </p>
                        <button
                          class="btn rounded-pill text-black px-4 me-2"
                          style="background-color: #1ed760"
                        >
                          Play
                        </button>
                        <button class="btn btn-outline-light rounded-pill px-4">
                          Salva
                        </button>
                      </div>
                    </div>
                    <!-- fine elemento carousel -->
                 
                </div>
   `;

    for (let i = 0; i < 8; i++) {
      mainContainer.innerHTML += `
           <div class="col rounded p-3" style="background-color: #171717" id = "idAlbumContainerDiv_${
             product.data[numeri[i]].id
           }">
                <a href="./albumPage.html" class="albumContainer text-decoration-none" >
                  <img
                    src=${product.data[numeri[i]].album.cover_medium}
                    class="contenitore-img-album w-100 img-fluid mb-2 rounded"
                    alt="image"
                    style="width: 200px"
                    id = "idAlbumContainerImg_${
                      product.data[numeri[i]].album.id
                    }"
                  />
                  <h6
                    class="nome-album-contenitore text-light fw-bold "
                    id = "idAlbumContainerH6_${
                      product.data[numeri[i]].album.id
                    }"
                  >
                  ${product.data[numeri[i]].album.title}
                  </h6>
                  
                  <a href="./artist.html" class=" text-decoration-none">
                  <p
                    class="descrizione-album-contenitore text-light mb-0 "
                    id = "idAlbumContainerH6D_${
                      product.data[numeri[i]].artist.id
                    }"
                  >
                  ${product.data[numeri[i]].artist.name}
                  </p>
                  </a>
                </a>
              </div>
        `;
      console.log(product.data[numeri[i]].id);
    }

    console.log(albumContainerLogic[0].id);

    for (let i = 0; i < albumContainerLogic.length; i++) {
      albumContainerLogic[i].addEventListener("click", function (event) {
        console.log(event);
        event.defaultPrevented;
        console.log(event.target.id);
        let posizioneTratto = event.target.id.indexOf("_");
        let idProdotto = event.target.id.slice(posizioneTratto + 1);
        localStorage.setItem("idAlbumElement", idProdotto);
        console.log(localStorage.getItem("idAlbumElement"));
      });
    }

    for (let i = 0; i < artistaAlbumContainer.length; i++) {
      artistaAlbumContainer[i].addEventListener("click", function (event) {
        console.log(event);
        event.defaultPrevented;
        console.log(event.target.id);
        let posizioneTratto = event.target.id.indexOf("_");
        let idProdotto = event.target.id.slice(posizioneTratto + 1);
        localStorage.setItem("idAlbumElement", idProdotto);
        console.log(localStorage.getItem("idAlbumElement"));
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

//   NON TOCCCARE
const mainElement = document.getElementsByClassName("mainElement");

const playlistContainer = document.getElementsByClassName("playlistContainer");

const albumContainerLogic = document.getElementsByClassName("albumContainer");

const artistaAlbumContainer = document.getElementsByClassName(
  "descrizione-album-contenitore"
);
