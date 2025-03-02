$(document).on("click", "button.navbar-toggle", function () {
  if ($("body").hasClass("noscroll")) {
    $("body").removeClass("noscroll");
  } else {
    $("body").addClass("noscroll");
  }
});
