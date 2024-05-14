import {API_KEY_GBOOKS} from './config.js';

$(document).ready(function () {
  //ESTRAZIONE LIBRI CON API di Google Books
  const apiKey = API_KEY_GBOOKS;

  // Funzione per ottenere informazioni (json) su vari libri di Émile Zola
  function getBookInfo(author) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(author)}&key=${apiKey}&maxResults=20`;

    // Restituisce una nuova Promise
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
              const books = data.items.map(item => {
                const book = item.volumeInfo;
                if (book.imageLinks && book.imageLinks.thumbnail) {
                    return {
                        title: book.title,
                        author: book.authors.join(','),
                        description: book.description,
                        infoLink: book.infoLink,
                        thumbnail: book.imageLinks.thumbnail
                    };
                }
                return null;
            }).filter(book => book !== null); // Rimuovi gli elementi null dalla lista
            resolve(books);
          } else {
            resolve('Nessun risultato trovato.');
          }
        })
        .catch(error => {
          reject(`Errore nella richiesta API: ${error.message}`);
        });
    });
  }

  //funzione per inserire i libri nella hompage del sito
  function renderBooks(books) {
    const sezione_libri = $("#libri_vendita");

    books.forEach(libro => {
      const nuovoDiv = $("<div>").addClass("libro");

      const imgElement = $("<img>")
        .attr("src", libro.thumbnail)
        .attr("alt", libro.title);
      nuovoDiv.append(imgElement);

      const button = $("<button>")
        .text("Vai al libro")
        .addClass("btn btn-primary")
        .attr("type", "button")
        .on("click", function() {
          window.open(libro.infoLink, "_blank");
        });
      nuovoDiv.append(button);

      $('#messaggio_ricerca').remove();
      sezione_libri.append(nuovoDiv);
    });

    // Configurazione del carousel Owl dopo aver aggiunto gli elementi
    sezione_libri.owlCarousel({
      loop: false,
      margin: 15,
      autoplay: false,
      nav: false,
      dots: true,
      responsive: {
        0: { items: 2 },
        575: { items: 3 },
        768: { items: 4 },
        991: { items: 5 },
        1199: { items: 7 }
      }
    });
  }

  //getBookInfo di Émile Zola
  const authorName = 'Émile Zola';
  getBookInfo(authorName)
    .then(renderBooks)
    .catch(error => {
      console.error(error);
      console.log('error');
      $('#messaggio_ricerca').remove();
      $('#libri_vendita_general').append('<p>Non è possibile ottenere i libri in vendita su Google Books X_X</p>');
  });



  //inserimento Citazioni
  fetch('javascript/quotes.json')//faccio una fetch del file quotes.json
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( json => initialize(json) )
  .catch( err => {
    console.error(`Fetch problem: ${err.message}`);
    $('#sezione_cit').append('<p>Non è possibile caricare le citazioni :( </p>');
  });

  function initialize(elements){
      const sezioneCit = $("#sezione_cit");
      let index = 0;

      function mostraCitazione() {
          const paragrafoCit = $("<p>")
              .attr("id", "citazione")
              .html(`<em>"${elements[index].cit}"</em>`);

          const ParagrafoCtxt = $("<p>")
              .attr("id", "contesto")
              .text(elements[index].context);

          sezioneCit.empty();
          sezioneCit.append(paragrafoCit, ParagrafoCtxt);

          index = (index + 1) % elements.length;
      }

      // inizia mostrando la prima citazione
      mostraCitazione();

      // intervallo per cambiare la citazione ogni 5,5 secondi
      setInterval(mostraCitazione, 5500);
  }

});