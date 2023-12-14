$(document).ready(function() {
    //per le modal images
    var modal = $("#myModal");
    var modalImg = $("#img01");
    var captionText = $("#caption");
  
    $(".immagine_modal").on("click", function() {
      modal.css("display", "block");
      modalImg.attr("src", $(this).attr("src"));
      captionText.html($(this).attr("alt"));
    });
  
    // ottengo l'elemento <span> di classe .close (la X)
    var span = $(".close");
  
    // quando schiaccio la X il modal viene chiuso
    span.on("click", function() {
      modal.css("display", "none");
    });
});