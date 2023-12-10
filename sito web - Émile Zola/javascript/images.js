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
  
    // Get the <span> element that closes the modal
    var span = $(".close");
  
    // When the user clicks on <span> (x), close the modal
    span.on("click", function() {
      modal.css("display", "none");
    });
});