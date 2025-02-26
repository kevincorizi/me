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

$("a[href='http://']").click(function (e) {
  e.preventDefault();
});
