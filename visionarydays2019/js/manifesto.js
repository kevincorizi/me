function openThemeContent(themeId, contentId) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = $("." + themeId + " .tabcontent");
  tabcontent.hide();
  /*for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }*/

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = $("." + themeId + " .tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(contentId).style.display = "block";
  event.currentTarget.className += " active";
}

function closeThemeContent(themeId, contentId) {
  // Get all elements with class="tabcontent" and hide them
  tabcontent = $("." + themeId + " .tabcontent");
  tabcontent.hide();

  tablinks = $("." + themeId + " .tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
}

$(document).ready(function () {
  // Initialize the video player
  // Get the modal
  var video_modal = $("#manifesto-video-modal-0, #manifesto-video-modal-1");

  var video_modal_0 = $("#manifesto-video-modal-0")[0];
  var video_modal_1 = $("#manifesto-video-modal-1")[0];

  var video_0 = $("#manifesto-video-modal-0 video")[0];
  var video_1 = $("#manifesto-video-modal-1 video")[0];

  // Get the button that opens the modal
  var video_btn_0 = $(".manifesto-video-button-0")[0];
  var video_btn_1 = $(".manifesto-video-button-1")[0];

  // Get the <span> element that closes the modal
  var video_close = $(".close");

  // When the user clicks on the button, open the modal
  video_btn_0.onclick = function () {
    video_modal_0.style.display = "block";
    video_0.play();
  };

  // When the user clicks on the button, open the modal
  video_btn_1.onclick = function () {
    video_modal_1.style.display = "block";
    video_1.play();
  };

  // When the user clicks on <span> (x), close the modal
  video_close.click(function () {
    video_modal_0.style.display = "none";
    video_modal_1.style.display = "none";
    video_0.pause();
    video_1.pause();
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == video_modal_0 || event.target == video_modal_1) {
      video_modal_0.style.display = "none";
      video_modal_1.style.display = "none";
      video_0.pause();
      video_1.pause();
    }
  };

  $(".tablinks.text.mobile-only").click(function () {
    $(this).toggleClass("active");
  });
});
