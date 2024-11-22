const searchBar = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

/*

 _._     _,-'""`-._
(,-.`._,'(       |\`-/|
    `-.-' \ )-`( , o o)
          `-    \`_`"'-

W         T          F
*/

searchButton.addEventListener("click", () => {
  let searchUserInput = searchBar.value;

  let stringaRicerca = searchUserInput.replaceAll(" ", "/");

  let numeri = Array.from({ length: 25 }, (_, i) => i);

  // Mescola l'array in ordine casuale usando il metodo Fisher-Yates
  for (let i = numeri.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
  }

  const mainContainer = document.getElementById("main-container");

  mainContainer.classList.remove("d-none");

  console.log("valore inserito dall'utente: " + "" + stringaRicerca);

  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
      stringaRicerca
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((product) => {
      console.log("Product", product);

      for (let i = 0; i < 20; i++) {
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
    });
});

const albumContainerLogic = document.getElementsByClassName("albumContainer");

const artistaAlbumContainer = document.getElementsByClassName(
  "descrizione-album-contenitore"
);
