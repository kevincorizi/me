$ = jQuery;

$(document).ready(function () {
  /* mobile menu */

  $("#button-menu").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("#mobile-menu a").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("#names").height($(".names-wrapper").innerHeight());
});
