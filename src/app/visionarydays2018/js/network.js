function isVisible(row, container) {
  var elementTop = $(row).offset().top,
    elementHeight = $(row).height(),
    containerTop = container.scrollTop(),
    containerHeight = container.height();

  return (
    elementTop - containerTop + elementHeight > 0 &&
    elementTop - containerTop < containerHeight
  );
}

$(window).scroll(function () {
  $(".logo-content img").each(function () {
    if (isVisible($(this), $(window))) {
      $(this).css("filter", "opacity(1)");
    } else $(this).css("filter", "opacity(0)");
  });
});

$("a[href='http://']").click(function (e) {
  e.preventDefault();
});
