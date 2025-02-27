/* Author: Kevin Corizi */
/* kevincorizi@outlook.com */

var OpenTab = null;
var Tab1, Tab2, Tab3, Tab4; // All of them are needed to face the issue of differently sized tabs
var HeaderHeight = null;
var FirstOffset = null;
var IsMobile = null;
var IsTablet = null;

$(window).on("load", function () {
  RefreshSizes();
  IsMobile = $("#isMobile").css("color") == "rgb(255, 255, 255)" ? true : false;
  IsTablet = $("#isTablet").css("color") == "rgb(255, 255, 255)" ? true : false;
  if (!IsMobile) {
    SwitchToDesktop();
  } else {
    SwitchToMobile();
  }
});

function SwitchToDesktop() {
  RefreshSizes();
  $(window).scroll();
}

function SwitchToMobile() {
  $(".tab").css("opacity", 1);
  $(window).scroll();
}

/* INITIALIZATION OF VARIABLES NEEDED IN FADING AND SCROLLING ANIMATION */
function RefreshSizes() {
  Tab1 = $(".tab:nth-child(1)").outerHeight(true);
  Tab2 = $(".tab:nth-child(2)").outerHeight(true);
  Tab3 = $(".tab:nth-child(3)").outerHeight(true);
  Tab4 = $(".tab:nth-child(4)").outerHeight(true);
  Tab5 = $(".tab:nth-child(5)").outerHeight(true);
  HeaderHeight = $("header > nav").outerHeight() / 2;
  FirstOffset = $(".tab:first-child").offset().top;
}

/* SCROLLING FADE ANIMATION (DESKTOP ONLY) */
$(window).scroll(function () {
  if (!IsMobile) {
    var Span = 0.5 * Tab1 - HeaderHeight;
    $(".tab:nth-child(1)").css(
      "opacity",
      1 - ($(window).scrollTop() - 0.5 * Tab1) / Span
    );
    $(".tab:nth-child(2)").css(
      "opacity",
      1 - ($(window).scrollTop() - (0.5 * Tab1 + Tab2)) / Span
    );
    $(".tab:nth-child(3)").css(
      "opacity",
      1 - ($(window).scrollTop() - (0.5 * Tab1 + Tab2 + Tab3)) / Span
    );
    $(".tab:nth-child(4)").css(
      "opacity",
      1 - ($(window).scrollTop() - (0.5 * Tab1 + Tab2 + Tab3 + Tab4)) / Span
    );
    $(".tab:nth-child(5)").css(
      "opacity",
      1 -
        ($(window).scrollTop() - (0.5 * Tab1 + Tab2 + Tab3 + Tab4 + Tab5)) /
          Span
    );
  } else if (!IsTablet) {
    // la current è l'unica che deve essere al 100%
    var center = FirstOffset; // Misuro l'opacità in base alla distanza da center: quando coincidono, opacità massima
    var tabs = $(".tab");
    tabs.each(function (index) {
      var offset = -1 * ($(window).scrollTop() - $(this).offset().top);
      var distance = Math.abs(offset - center);
      $(this).css("opacity", 1 - distance / center / 2.5);
    });
  }
});

/* TAB OPENING WITH CLICK ON TITLE (DESKTOP ONLY) */
$(document).on("click", ".tab-main", function () {
  if (!IsMobile) {
    var target = $(this).closest(".tab").find("a").prop("name");
    // Disabilita i click sui tab per evitare cose strane
    $(".tab").addClass("tab-disable");
    var next = function () {
      $(".tab").removeClass("tab-disable");
    };
    GoToOpenTab(target, this, next);
  }
});

/* FUNCTION TO GO TO AND OPEN TAB, USED BOTH BY CLICK AND HEADER */
function GoToOpenTab(tab, clicked, next) {
  if (typeof clicked === "undefined") clicked = null;
  if (typeof next === "undefined") next = null;
  // If any tab is open, close it
  if (OpenTab !== null) {
    OpenTab.addClass("tab-collapsed");
  }
  // If the clicked link is the one to the previously close tab, do not reopen it
  if (OpenTab !== null && OpenTab.is($($(clicked).closest(".tab")))) {
    OpenTab = null;
    if (typeof next === "function") next();
    return;
  }
  var CloseWait = 0;
  var OpenWait = 0;
  if (OpenTab !== null) {
    CloseWait = IsMobile ? 500 : 0;
    OpenWait = IsMobile ? 1000 : 500;
  }
  // THEN, scroll to the anchor
  if (!IsMobile || clicked == null) {
    // Do not scroll when clicking on title
    setTimeout(function () {
      switch (tab) {
        case "mission":
          scrollTo(0, 500);
          break;
        case "evento":
          scrollTo(Tab1, 500);
          break;
        case "esponi":
          scrollTo(Tab1 + Tab2, 500);
          break;
        case "network":
          scrollTo(Tab1 + Tab2 + Tab3, 500);
          break;
        case "tab5":
          scrollTo(Tab1 + Tab2 + Tab3 + Tab4, 500);
          break;
      }
    }, CloseWait);
  }
  // THEN, open the anchored tab
  setTimeout(function () {
    //window.location = window.location.href.split("#")[0] + "#" + tab;
    switch (tab) {
      case "mission":
        $(".tab:nth-child(1)").removeClass("tab-collapsed");
        OpenTab = $(".tab:nth-child(1)");
        break;
      case "evento":
        $(".tab:nth-child(2)").removeClass("tab-collapsed");
        OpenTab = $(".tab:nth-child(2)");
        break;
      case "esponi":
        $(".tab:nth-child(3)").removeClass("tab-collapsed");
        OpenTab = $(".tab:nth-child(3)");
        break;
      case "network":
        $(".tab:nth-child(4)").removeClass("tab-collapsed");
        OpenTab = $(".tab:nth-child(4)");
        break;
      case "tab5":
        $(".tab:nth-child(5)").removeClass("tab-collapsed");
        OpenTab = $(".tab:nth-child(5)");
        break;
    }
    // Esegui next solo dopo che l'animazione è finita
    if (next !== null) {
      setTimeout(function () {
        next();
      }, 500);
    }
  }, OpenWait);
}

/* RESIZE HANDLER TO MANAGE CHANGES TO LAYOUT */
$(window).resize(function () {
  IsMobile = $("#isMobile").css("color") == "rgb(255, 255, 255)" ? true : false;
  IsTablet = $("#isTablet").css("color") == "rgb(255, 255, 255)" ? true : false;
  if (!IsMobile) {
    SwitchToDesktop();
  } else {
    SwitchToMobile();
  }
});

/* IMPLEMENTS SMOOTH SCROLLING TO A DESTINATION */
function scrollTo(to, duration) {
  var scrolling = document.scrollingElement || document.documentElement;
  to = Math.floor(to);
  if (scrolling.scrollTop == to) return;
  var toTop = scrolling.scrollTop >= to ? true : false;
  var diff = to - scrolling.scrollTop;
  var scrollStep = Math.PI / (duration / 10);
  var count = 0,
    currPos;
  start = scrolling.scrollTop;
  scrollInterval = setInterval(function () {
    var isBottom = false;
    if (
      !toTop &&
      scrolling.scrollTop + window.innerHeight >= $(document).height()
    ) {
      isBottom = true;
    }
    if (scrolling.scrollTop != to && !isBottom) {
      count = count + 1;
      currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
      scrolling.scrollTop = currPos;
    } else {
      clearInterval(scrollInterval);
    }
    // Necessario per evitare flicker per errori di arrotondamento
    if (Math.abs(scrolling.scrollTop - to) < 1) {
      clearInterval(scrollInterval);
    }
  }, 10);
}
