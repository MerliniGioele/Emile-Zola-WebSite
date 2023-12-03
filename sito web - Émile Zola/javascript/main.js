
//ESTRAZIONE LIBRI CON API di Google Books
const apiKey = 'AIzaSyBYoh8bmeycS-MkfKcD-krgV6uVOO1sP40'; // Sostituisci con la tua chiave API

// Funzione per ottenere informazioni su un libro di Émile Zola
function getBookInfo(author) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(authorName)}&key=${apiKey}`;

  // Restituisci una nuova Promise
  return new Promise((resolve, reject) => {
    // Effettua una richiesta utilizzando Fetch
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Errore nella richiesta API: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Verifica se sono presenti risultati
        if (data.totalItems > 0) {
          const book = data.items[0].volumeInfo;
          resolve({
            title: book.title,
            author: book.authors.join(', '),
            description: book.description,
            infoLink: book.infoLink,
            thumbnail: book.imageLinks.thumbnail
          });
        } else {
          resolve('Nessun risultato trovato.');
        }
      })
      .catch(error => {
        reject(`Errore nella richiesta API: ${error.message}`);
      });
  });
}

// Esempio di utilizzo
const authorName = 'Émile Zola'; // Sostituisci con il nome dell'autore

// Utilizza la Promise restituita dalla funzione getBookInfo
getBookInfo(authorName)
  .then(result => {
    console.log(result);
    const sezione_libri = document.querySelector("#libri_vendita");
    const nuovoDiv = document.createElement("div");

    const imgElement = document.createElement("img");
    imgElement.src = result.thumbnail;
    imgElement.alt = result.title;
    nuovoDiv.append(imgElement);

    const button = document.createElement("button");
    button.textContent = "Vai al link";
    button.addEventListener("click", function() {
      window.open(result.infoLink, "_blank");
    });
    nuovoDiv.append(button);

    sezione_libri.append(nuovoDiv)

  })
  .catch(error => {
    console.error(error);
  });



//INSERIMENTO Citazioni
fetch('quotes.json')
.then( response => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})
.then( json => initialize(json) )
.catch( err => console.error(`Fetch problem: ${err.message}`) );

function initialize(elements){
    const sezioneCit = document.querySelector("#sezione_cit");
    let index = 0;

    function mostraCitazione() {
        const paragrafoCit = document.createElement("p");
        paragrafoCit.id="citazione"
        const ParagrafoCtxt = document.createElement("p");
        ParagrafoCtxt.id="contesto"

        paragrafoCit.innerHTML = `<em>"${elements[index].cit}"</em>`;
        ParagrafoCtxt.textContent = elements[index].context;

        sezioneCit.innerHTML='';

        sezioneCit.appendChild(paragrafoCit);
        sezioneCit.appendChild(ParagrafoCtxt);

        index = (index + 1) % elements.length;
    }

    //inizia mostrando la prima citazione
    mostraCitazione();

    //intervallo per cambiare la citazione ogni 6 secondi
    setInterval(mostraCitazione, 5500);
}