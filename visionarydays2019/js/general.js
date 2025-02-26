$(document).ready(function () {
  /**
   * Button menu handlers
   */
  $("#button-menu").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  $("#close-menu, #close-desktop").click(function () {
    $("#button-menu").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });

  /**
   * Footer newsletter subscription
   */
  let $input_newsletter = $("#newsletter-email");
  let $button_newsletter = $("#newsletter-subscribe");

  $button_newsletter.click(subscribe_newsletter);

  $input_newsletter.on("keypress", function (e) {
    if (e.which === 13) {
      subscribe_newsletter();
    }
  });

  function subscribe_newsletter() {
    let email = $input_newsletter.val();
    let hidden_val = $(
      "#footer-bottom #b_1a3e536fdd1f8bd704427f555_740590d793",
    ).val();

    let url_newsletter = "./subscribe_user.php";

    let _info = $("#newsletter-info");
    _info.addClass("loading");

    let _height = _info.height();

    $input_newsletter.val("");

    $.ajax({
      type: "POST",
      url: url_newsletter,
      data: {
        email: email,
        b_1a3e536fdd1f8bd704427f555_740590d793: hidden_val,
      },
      success: function (data) {
        setTimeout(function () {
          console.log(data.result);

          if (data != "200") {
            $("#form-loaded").addClass("error");
          }

          _info.removeClass("loading");
          _info.addClass("finished");

          _info.velocity({ opacity: 0 }, function () {
            let _text = "Iscrizione avvenuta con successo!";

            // _text.height(height);
            _info.text(_text);
            _info.height(_height + "px");

            _info.velocity({ opacity: 1 }, function () {
              // $(this).height(_h);
            });
          });
        }, 200);
      },
    });
  }

  $("#footer-fixed-mobile, #partecipa-button, #footer-partecipa").click(
    function (e) {
      if ($("#form-intro").offset() != undefined) {
        if ($("#mobile-menu").hasClass("active")) {
          $("#button-menu").toggleClass("active");
          $("#mobile-menu").toggleClass("active");
        }
        $("html,body").animate(
          { scrollTop: $("#img-paint").position().top },
          2000,
        );
      } else window.location.href = "./#form-intro";
    },
  );

  $("#partecipa-link").click(function (e) {
    if ($("#form-intro").offset() != undefined) {
      if ($("#mobile-menu").hasClass("active")) {
        $("#button-menu").toggleClass("active");
        $("#mobile-menu").toggleClass("active");
      }
    }
  });

  $("a[href*=\\#]:not(.mobile-only)").click(function () {
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
          1500,
        );
        return false;
      }
    }
  });

  /* click su domande */
  $(
    "#mobile-menu-only span:first-child, #mobile-menu-header .menu-header-text span",
  ).click(function () {
    window.location.href = "./domande.php";
  });

  /* click su privacy */
  $("#mobile-menu-only span:last-child").click(function () {
    window.location.href = "./privacy.php";
  });

  $("#link-teaser").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($("#first-section").offset() != undefined) {
      // Scroll fino a pulsante video
      $("html,body").animate(
        {
          scrollTop: $("#first-section").position().top,
        },
        {
          duration: 1500,
          complete: function () {
            $("#video-button").click();
            $("#video-modal video")[0].play();
          },
        },
      );
    } else {
      window.location.href = "./#first-section";
    }
  });

  /* Preload img */
  /*
    Array.from(objects).map((item) => {
        // Start loading image
        const img = new Image();
        img.src = item.dataset.src;
        // Once image is loaded replace the src of the HTML element
        img.onload = () => {
            item.classList.remove('asyncImage');
            return item.nodeName === 'IMG' ?
                item.src = item.dataset.src :
                item.style.backgroundImage = `url(${item.dataset.src})`;
        }
    });
    */

  if (window.cookieconsent !== undefined) {
    window.cookieconsent.initialise(
      {
        palette: {
          popup: {
            background: "#000",
            text: "#CCCCCC",
          },
          button: {
            background: "#000",
            text: "#CCCCCC",
          },
        },
        content: {
          message:
            "Questo sito utilizza cookie di terze parti per analisi statistiche e condivisione dei contenuti." +
            "<br/> Procedendo con la navigazione acconsenti all'uso di tutti i cookie. Se vuoi saperne di più su cosa sono i cookies e come cancellarli, ",
          dismiss: "HO CAPITO",
          link: "fai click qui",
          href: "cookie.php",
        },
        onPopupOpen: function () {
          //workaround for issue on ipad
          let el = $(".cc-floating");
          if (el) {
            el.removeClass("cc-floating");
            el.addClass("cc-banner");
          }
        },
        autoOpen: false,
      },
      function (popup) {
        window.popupcookie = popup;
      },
    );

    window.cookieconsent.utils.isMobile = () => false;
  }
});
