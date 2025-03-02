$ = jQuery;

$(document).ready(function () {
  $("body").addClass("active");

  if (!$("body").hasClass("no-animation")) {
    setTimeout(function () {
      $("#panoramica, #agenda, #partecipa, footer").css("display", "block");
      $("#hero-action button").css("cursor", "pointer");
    }, 5500);
  }

  // Initialize the fake input spans
  $(".input-wrapper").each(function (i, d) {
    var input = $(d).find("input").attr("placeholder");
    var span = $(d).find("span");
    span.html(input);
    span.css("min-width", span.outerWidth() + 2);
  });

  // Set the listener to update the fake inputs
  $(document).on("input", ".input-wrapper input", function (e) {
    var $this = $(this);
    var val = $this.val();
    var span = $($this.parent()).find("span");
    if (val == "") {
      span.html($(this).attr("placeholder"));
    } else {
      if (e.originalEvent.data == " ") {
        span.html(val + "|");
      } else {
        span.html(val);
      }
    }
  });

  // Initialize the video player
  new ModalVideo(".js-modal-btn", {
    channel: "youtube",
    controls: 0,
    showinfo: 0,
  });

  $("#button-menu").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("#mobile-menu a").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("form").submit(function (e) {
    var url =
      "https://script.google.com/macros/s/AKfycbwCFVgCpk0mCFu88JJfE2qww9bCz0lZXLZ-gz_p10wJe149bHMp/exec";

    $("form").addClass("loading");

    $.ajax({
      type: "GET",
      url: url,
      data: $(this).serialize(),
      dataType: "json",
      success: function (data) {
        setTimeout(function () {
          console.log(data.result);
          if (data.result != "success") {
            $("#form-loaded").addClass("error");
          }
          $("form").removeClass("loading");
          $("form").addClass("finished");
        }, 2000);
      },
    });
    e.preventDefault();
  });

  $("a[href*=\\#]").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") ||
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (this.hash.slice(1) !== "") {
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
      } else {
        target = $("body");
      }

      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    }
  });
});
