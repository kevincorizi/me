$(document).ready(function () {
  $("#ospiti-2018-carousel").swipe({
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction == "left") $(this).carousel("next");
      if (direction == "right") $(this).carousel("prev");
    },
    allowPageScroll: "vertical",
  });
  $("#ospiti-2017-carousel").swipe({
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction == "left") $(this).carousel("next");
      if (direction == "right") $(this).carousel("prev");
    },
    allowPageScroll: "vertical",
  });

  $("#button-menu").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("#mobile-menu a").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });
});
