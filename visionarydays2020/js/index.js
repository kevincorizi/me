$ = jQuery;
let _width;
let _height;

let app;
let img;

let speed = 1;

let IS_MOBILE = 1;
let CANVAS_ENABLED = 0;
let SKIPPED_ANIMATION = 0;

let POPUP_SHOWED = 0;

function animateImage() {
  if (IS_MOBILE === 0) {
    $('#section-title .content').velocity(
      {
        marginLeft: '3.25rem',
      },
      {
        easing: 'easeOutCubic',
        duration: 1400,
        queue: false,
        complete: function () {
          //$('#section-title .content').removeAttr('style');
        },
      }
    );

    $('#section-title').velocity(
      {
        marginLeft: '-15px',
        marginRight: '-15px',
        marginTop: '0px',
        width: _width,
        height: _height,
      },
      {
        easing: 'easeOutCubic',
        duration: 1401,
        queue: false,
        complete: function () {
          // Animation complete.
          $('html').css('overflow', 'auto');
          $('body').addClass('no-animation');

          $('#section-title').removeClass('pre-animation');
          /* Remove animation style rules */
          $('#section-title').removeAttr('style');
        },
      }
    );
  }

  setTimeout(function () {
    if (POPUP_SHOWED == 0) {
      if (window.popupcookie && window.popupcookie.getStatus() === undefined) {
        window.popupcookie.open();
        POPUP_SHOWED++;
      }
    }
  }, 2000);
}

// Resize function window
function resize() {
  if (CANVAS_ENABLED === 1) {
    // Get the p
    const parent = app.view.parentNode;

    // Resize the renderer
    app.renderer.resize(parent.clientWidth, parent.clientHeight);

    // Resize the image
    let _old = img.width;
    img.width = parent.clientWidth;
    img.height = (img.height * img.width) / _old;

    // Setup the position of the image
    img.x = 0;
    img.y = (parent.clientHeight / 2 - img.height / 2) / 2;

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    img.position.set(0, 0);
  }

  if ($(window).width() < 650) {
    $('.select-selected').text('CITTÀ');
  } else {
    $('.select-selected').text('Seleziona la città a cui sei interessato');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));

  if ('IntersectionObserver' in window) {
    var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  window.addEventListener(
    'load',
    function () {
      let $body = $('body');
      let $html = $('html');

      let canvas_container = $('#section-image').get(0);

      if (window.innerWidth > 650) {
        IS_MOBILE = 0;
      }

      let $headline_section = $('#headline-section');
      // let $hidden_sections = $('header, #first-section, #second-section, #third-section,#fourth-section,#fifth-section,#review-section,#img-paint, #form-intro, #form, #form_news, footer');
      // if (IS_MOBILE === 1) {
      let $hidden_sections_grid = $('#first-section, #second-section,#third-section, #fourth-section,#fifth-section');
      let $hidden_sections = $('header, #sixth-section, #review-section,#img-paint, #form-intro, #godown_container, #form_news, footer');
      // }

      /* iOS re-orientation fix */
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        /* iOS hides Safari address bar */
      }

      /* Prepare animation var */
      if (window.innerWidth > 1600) {
        _width = window.innerWidth - 175;
        _height = window.innerHeight - 185;
      } else if (window.innerWidth > 1200) {
        _width = window.innerWidth - 95;
        _height = window.innerHeight - 185;
      } else {
        _width = window.innerWidth - 40;
        _height = window.innerHeight - 105;
      }

      /* MOBILE: PREPARE FOR ANIMATION */
      if (IS_MOBILE === 0 && CANVAS_ENABLED === 1) {
        // The application will create a renderer using WebGL, if possible,
        // with a fallback to a canvas render. It will also setup the ticker
        // and the root stage PIXI.Container
        app = new PIXI.Application({
          view: canvas_container,
          width: window.innerWidth,
          height: window.innerHeight,
          autoResize: true,
          antialias: true,
          resolution: devicePixelRatio,
        });

        app.loader
          .add('image', '../assets/header_img_full.jpg')
          .add('filter', '../assets/filter.png')
          .load((loader, resources) => {
            img = new PIXI.Sprite(resources.image.texture);

            // Get the p
            const parent = app.view.parentNode;

            img.interactive = true;

            // Resize the image
            let _old = img.width;
            img.width = parent.clientWidth;
            img.height = (img.height * parent.clientWidth) / _old;

            // Setup the position of the image
            img.x = 0;
            img.y = (parent.clientHeight / 2 - img.height / 2) / 2;

            // Add the image to the scene we are building
            app.stage.addChild(img);

            $('#section-image').css('visibility', 'visible');

            // Listen for frame updates
            app.ticker.add(function (delta) {
              img.mousemove = function (mouseData) {};
            });
          });
      } else if (IS_MOBILE === 1) {
        $('#section-title .content').hide();
        $('#form').hide();
        $hidden_sections.css('display', 'flex').hide();
        $hidden_sections_grid.css('display', 'flex').hide();
      }

      // Listen for window resize events
      window.addEventListener('resize', resize);

      /* DESKTOP: HIDE SKIP ANIMATION AND PAGE SECTIONS */
      setTimeout(function () {
        if (!$body.hasClass('no-animation')) {
          if (IS_MOBILE === 0) {
            $('#section-title .content').hide();
            $hidden_sections.css('display', 'flex').hide();
            $hidden_sections_grid.css('display', 'grid').hide();
          }
          $('#skip-intro').css('display', 'none');
        }
      }, 2600);

      /* ANIMATE IMAGE */
      setTimeout(function () {
        if (!$body.hasClass('no-animation')) {
          animateImage();
        }
      }, 5600);

      /* SHOW AGAIN PAGE SECTIONS */
      setTimeout(function () {
        /* List of sections to show */

        // $hidden_sections.css('display', 'block');
        // $('#hero-action button').css('cursor', 'pointer');

        if (!$body.hasClass('no-animation')) {
          $hidden_sections.fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });

          $hidden_sections_grid.fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });

          $('#section-title .content').fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });
        }
      }, 4000);

      /* ANIMATION OUT HEADLINE */
      setTimeout(function () {
        if (!$body.hasClass('no-animation')) {
          $('#headline-section .col-12 #hero-date').velocity(
            {
              marginLeft: '8rem',
            },
            {
              easing: 'ease-out',
              duration: 700,
              queue: false,
              complete: function () {
                //$('#section-title .content').removeAttr('style');
              },
            }
          );
          $('#headline-section .col-12 #hero-text').velocity(
            {
              marginLeft: '3.25rem',
            },
            {
              easing: 'ease-out',
              duration: 700,
              queue: false,
              complete: function () {
                //$('#section-title .content').removeAttr('style');
              },
            }
          );
          $('#hero-action button').css('transition', 'none');
          $('#hero-action button').velocity(
            {
              marginLeft: '4rem',
              backgroundPositionX: '0%',
            },
            {
              easing: 'ease-out',
              duration: 700,
              queue: false,
            }
          );
        }
      }, 4300);

      /* FADE OUT HEADLINE */
      setTimeout(function () {
        if (!$body.hasClass('no-animation')) {
          $headline_section.fadeOut(1400);
          // $('#hero-action button').css('cursor', 'pointer');
        }
      }, 5600);

      /* HIDE COMPLETELY HEADLINE */
      setTimeout(function () {
        if (!$body.hasClass('no-animation')) {
          $headline_section.css('display', 'none');
          // $('#hero-action button').css('cursor', 'pointer');
        }
      }, 7100);

      /* Skip animation */
      $('#skip-intro').click(function () {
        if (SKIPPED_ANIMATION === 0) {
          SKIPPED_ANIMATION++;
          skipAnimation();
        }
      });

      function skipAnimation() {
        $('#section-title .content').velocity('finish');

        $headline_section.fadeOut({
          duration: 700,
          queue: false,
          complete: function () {
            //$headline_section.css('display', 'none');
          },
        });

        $hidden_sections.css('display', 'flex').hide();

        $hidden_sections_grid.css('display', 'grid').hide();

        $('#section-title .content').hide();
        // $hidden_sections.css('opacity', '1');

        setTimeout(function () {
          $hidden_sections.fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });
          $hidden_sections_grid.fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });

          $('#section-title .content').fadeIn({
            duration: 400,
            queue: false,
            complete: function () {
              // $body.addClass('no-animation');
            },
          });
        }, 400);

        animateImage();
      }

      /* Prevent newline in form textarea */
      $('textarea').keypress(function (e) {
        $('textarea').val($('textarea').val().replace(/\n/g, ''));
        if (e.which !== 13) return;
        return false;
      });

      /* Clear newlines even after copy paste */
      /*
        $("textarea").get(0).oninput = function (e) {
                $("textarea").val($("textarea").val().replace(/\n/g, ""));
            };

         */

      /* Select source based on mobile or desktop */

      /* VIDEO HANDLERS */

      var first_video = document.querySelector('#first-section video');

      var video_1 = document.querySelector('#second-section video');
      var video_2 = document.querySelector('#fourth-section video');

      if (video_1 && video_2) {
        /*
            if ($(document).width() < 768 + 1) {
                // Mobile
                video_1.removeChild(video_1.querySelector('source:last-child'));
                video_2.removeChild(video_2.querySelector('source:last-child'));
            } else {
                // Desktop
                video_1.removeChild(video_1.querySelector('source:first-child'));
                video_2.removeChild(video_2.querySelector('source:first-child'));
            }
            /* Handlde video autoplay */
        try {
          var promise_1 = video_1.play();
          var promise_2 = video_2.play();

          if (promise_1 !== undefined) {
            promise_1
              .then(_ => {
                // Autoplay started!
              })
              .catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
              });
          }
          if (promise_2 !== undefined) {
            promise_2
              .then(_ => {
                // Autoplay started!
              })
              .catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
              });
          }
        } catch (e) {
          console.log(e);
        }
      }

      $('#sesso-input span#uomo').click(sesso_uomo);

      $('#sesso-input span#donna').click(sesso_donna);

      $('#privacy-1').change(privacy_1_click);

      $('#privacy-2').change(privacy_2_click);

      $('#submit_flex_container .privacy-container').change(privacy_container_click);

      let form_completed =
        '<div id="form-sent"><div class="content"><h2 class="title">BENVENUTO NELLA COMMUNITY VISIONARY</h2><p class="text">Entro 48 ore riceverai una mail di conferma dell’avvenuta presa in carico della tua candidatura. ' +
        'Se non l’hai ancora fatto entra in contatto con la realtà Visionary attraverso i social.</p></div></div>';

      /* Form submit */
      $('#subscribe-form').submit(submit_subscribe_form);

      $('#attesa-form').submit(submit_attesa_form);

      // Error signaling
      age_error();

      // Initialize the video player
      // Get the modal
      var video_modal = $('#video-modal')[0];

      let video_index = $('#video-modal video')[0];

      // Get the button that opens the modal
      var video_btn = $('#video-button')[0];

      // Get the <span> element that closes the modal
      var video_close = document.getElementsByClassName('close')[0];

      if (video_btn && video_modal && video_index && video_close) {
        // When the user clicks on the button, open the modal
        video_btn.onclick = function () {
          video_modal.style.display = 'block';
          video_index.play();
          $('html').css('overflow', 'hidden');
        };

        // When the user clicks on <span> (x), close the modal
        video_close.onclick = function () {
          video_modal.style.display = 'none';
          video_index.pause();
          $('html').css('overflow', 'auto');
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target == video_modal) {
            video_modal.style.display = 'none';
            video_index.pause();
            $('html').css('overflow', 'auto');
          }
        };
      }

      /* Dots handler */

      var carousel = document.querySelector('#review-section');
      var indicator = document.querySelector('#indicator');
      var elements = document.querySelectorAll('#review-section > .review-col.mobile');
      var currentIndex = 0;

      function renderIndicator() {
        // this is just an example indicator; you can probably do better
        indicator.innerHTML = '';
        for (var i = 0; i < elements.length; i++) {
          var _dot = document.createElement('span');
          _dot.className = i === currentIndex ? 'dot' : 'dot-empty';
          (function (i) {
            _dot.onclick = function () {
              elements[i].scrollIntoView();
            };
          })(i);
          indicator.appendChild(_dot);
        }
      }

      var observer = new IntersectionObserver(
        function (entries, observer) {
          // find the entry with the largest intersection ratio
          var activated = entries.reduce(function (max, entry) {
            return entry.intersectionRatio > max.intersectionRatio ? entry : max;
          });
          if (activated.intersectionRatio > 0) {
            currentIndex = elementIndices[activated.target.getAttribute('id')];
            renderIndicator();
          }
        },
        {
          root: carousel,
          threshold: 0.5,
        }
      );
      var elementIndices = {};
      for (var i = 0; i < elements.length; i++) {
        elementIndices[elements[i].getAttribute('id')] = i;
        observer.observe(elements[i]);
      }

      /* GRADIENT ANIMATIONS */

      //basic gradient demo using webkit gradient + ColorPropsPlugin
      const iOS = /iPad|iPhone|iPod/.test(navigator.platform),
        isChrome_iOS = false;

      let isChromium = window.chrome,
        vendorName = window.navigator.vendor,
        isOpera = window.navigator.userAgent.indexOf('OPR') > -1,
        isChrome = false;
      if (isChromium !== null && isChromium !== undefined && vendorName === 'Google Inc.' && isOpera == false) {
        isChrome = true;
      }

      //var tween = TweenMax.to("#box", 1, {backgroundImage: "linear-gradient(to top,#CC0000,#F3F30B)", paused:true});

      let tween;
      let colors = ['#123AB9', '#5DBCDA', '#7A24B6', '#DE39C1'];
      gsap.registerPlugin(CSSRulePlugin);

      colorize();

      function colorize() {
        //apply the colors to the element
        tween = TweenMax.to('html', 1, {
          '--first-color': colors[3],
          '--second-color': colors[2],
          '--third-color': colors[1],
          '--fourth-color': colors[0],
          yoyo: true,
          ease: Linear.easeNone,
          repeat: -1,
        });
      }

      //});

      let params;

      if (IS_MOBILE) {
        params = '&byline=false&loop=true&responsive=true&playsinline=true&title=false&portrait=false&muted=false&color=7A24B6';
      } else {
        params = '&byline=false&loop=true&responsive=true&playsinline=true&title=false&portrait=false&muted=true&color=7A24B6';
      }

      /* VIDEO */
      $.get({
        url: 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent('https://vimeo.com/393263482') + params,
        success: function (res) {
          $('#first-section .section-video').html(res.html);

          var iframe = document.querySelector('#first-section iframe');
          var _video = document.querySelector('#first-section .section-video');
          var player = new Vimeo.Player(iframe);

          VisSense.VisMon.Builder(VisSense(_video))
            .on('fullyvisible', function () {
              try {
                player.play();
              } catch (e) {
                console.log(e);
              }
            })
            .on('hidden', function () {
              try {
                player.pause();
              } catch (e) {
                console.log(e);
              }
            })
            .build()
            .start();
        },
        error: function (res) {
          console.log(res);
        },
      });

      var x, i, j, selElmnt, a, b, c;
      /* Look for any elements with the class "custom-select": */
      x = document.getElementsByClassName('form-select-custom');
      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName('select')[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement('DIV');
        a.setAttribute('class', 'select-selected');
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement('DIV');
        b.setAttribute('class', 'select-items select-hide');
        for (j = 1; j < selElmnt.length; j++) {
          /* For each option in the original select element,
                create a new DIV that will act as an option item: */
          c = document.createElement('DIV');
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener('click', function (e) {
            /* When an item is clicked, update the original select box,
                    and the selected item: */
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName('select')[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName('same-as-selected');
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute('class');
                }
                this.setAttribute('class', 'same-as-selected');
                break;
              }
            }
            h.click();
            $('.select-selected').css('color', '#FFF');
            $('.select-selected').css('text-transform', 'uppercase');
            $('.select-selected').css('font-size', '2.1875rem');
            $('.select-selected').css('font-weight', '900');
            $('.select-selected').css('min-height', 'auto');
            $('.select-selected').css('line-height', 'inherit');
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener('click', function (e) {
          /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle('select-hide');
          this.classList.toggle('select-arrow-active');
        });
      }

      if ($(window).width() < 650) {
        $('.select-selected').text('CITTÀ');
      }

      function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
            except the current select box: */
        var x,
          y,
          i,
          arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        for (i = 0; i < y.length; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i);
          } else {
            y[i].classList.remove('select-arrow-active');
          }
        }
        for (i = 0; i < x.length; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add('select-hide');
          }
        }
      }

      /* If the user clicks anywhere outside the select box,
        then close all select boxes: */
      document.addEventListener('click', closeAllSelect);

      /* Adding class start animation */
      setTimeout(function () {
        $body.addClass('active');
        if (!$body.hasClass('no-animation')) {
          if (IS_MOBILE === 0) {
            $html.css('overflow', 'hidden');
            $('#section-title').addClass('pre-animation');
          }
        }
      }, 500);
    },
    false
  );
});

function submit_subscribe_form(e) {
  e.preventDefault();

  //@done Disabilitare pulsante invio
  $('#subscribe-form button').attr('disabled', true);

  let _sex_m = $('#sesso-input span#uomo');
  let _sex_f = $('#sesso-input span#donna');

  let url_iscrizione = 'subscribe.php';
  let _form_el = $('#subscribe-form, #form, #form-intro');
  let _intro = $('#form-intro');
  let _form = $('#subscribe-form');

  let height = _form.height();

  _form.addClass('loading');

  $.ajax({
    type: 'POST',
    url: url_iscrizione,
    data: $(this).serialize(),
    success: function (data) {
      if (data == '401') {
        $('#form-loaded').addClass('error');
        form_completed =
          '<div id="form-sent"><div class="content"><h3 class="title">LA REGISTRAZIONE NON È ANDATA A BUON FINE.</h3>' + '<p class="text">La tua mail o il tuo numero di telefono risultano già utilizzati. Per problemi puoi contattare <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
      } else if (data == '402') {
        $('#form-loaded').addClass('error');
        form_completed = '<div id="form-sent"><div class="content"><h3 class="title">I BIGLIETTI PER TORINO DI QUESTO DROP SONO ESAURITI.</h3>' + '<p class="text">Le iscrizioni riapriranno Giovedì 24 Ottobre alle 14:00, altri 200 biglietti, solo per 24h.</p></div></div>';
      } else if (data != '200') {
        $('#form-loaded').addClass('error');
        form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA RICHIESTA NON È ANDATA A BUON FINE.</h3>' + '<p class="text">SE L\'ERRORE PERSISTE SCRIVICI A <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
      } else {
        form_completed =
          '<div id="form-sent"><div class="content"><h2 class="title">BENVENUTO NELLA COMMUNITY VISIONARY</h2><p class="text">Entro 48 ore riceverai una mail di conferma dell’avvenuta presa in carico della tua candidatura. ' +
          'Se non l’hai ancora fatto entra in contatto con la realtà Visionary attraverso i social.</p></div></div>';
      }

      _form.removeClass('loading');
      _form.addClass('finished');

      _form_el.fadeOut('slow', function () {
        $('#form').css('padding', '0');
        _form_el.hide('slow');
        let _text = $($.parseHTML(form_completed));
        let _h = '200px';

        _text.height(height);
        _intro.replaceWith(_text);

        $('#form-sent').fadeIn('slow', function () {
          $(this).height(_h);
        });

        document.querySelector('#img-paint').scrollIntoView({
          behavior: 'smooth',
        });
      });
    },
    error: function (data) {
      if (data == '401') {
        $('#form-loaded').addClass('error');
        form_completed =
          '<div id="form-sent"><div class="content"><h3 class="title">LA REGISTRAZIONE NON È ANDATA A BUON FINE.</h3>' + '<p class="text">La tua mail o il tuo numero di telefono risultano già utilizzati. Per problemi puoi contattare <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
      } else if (data == '402') {
        $('#form-loaded').addClass('error');
        form_completed = '<div id="form-sent"><div class="content"><h3 class="title">I BIGLIETTI PER TORINO DI QUESTO DROP SONO ESAURITI.</h3>' + '<p class="text">Le iscrizioni riapriranno Giovedì 24 Ottobre alle 14:00, altri 200 biglietti, solo per 24h.</p></div></div>';
      } else if (data != '200') {
        $('#form-loaded').addClass('error');
        form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA RICHIESTA NON È ANDATA A BUON FINE.</h3>' + '<p class="text">SE L\'ERRORE PERSISTE SCRIVICI A <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
      }

      _form.removeClass('loading');
      _form.addClass('finished');

      _form_el.fadeOut('slow', function () {
        $('#form').css('padding', '0');
        _form_el.hide('slow');
        let _text = $($.parseHTML(form_completed));
        let _h = '100px';

        _text.height(height);
        _intro.replaceWith(_text);

        $('#form-sent').fadeIn('slow', function () {
          $(this).height(_h);
        });
      });
    },
  });
}

function submit_attesa_form(e) {
  e.preventDefault();

  //@done Disabilitare pulsante invio
  $('#attesa-form button').attr('disabled', true);

  let url_attesa = 'sub_newsletter.php';
  let _form_el = $('#attesa-form, #form_news, #form-intro');
  let _intro = $('#form-intro');
  let _form = $('#attesa-form');

  let height = _form.height();

  _form.addClass('loading');

  let _data = $(this).serialize();
  // let _data = $(this).serialize() + '&privacy=' + NonFormValue;

  $.ajax({
    type: 'POST',
    url: url_attesa,
    data: _data,
    success: function (data) {
      setTimeout(function () {
        if (data == '409') {
          $('#form-loaded').addClass('error');
          form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA TUA MAIL RISULTA GIÀ REGISTRATA</h3></div></div>';
        } else {
          form_completed = '<div id="form-sent"><div class="content"><h2 class="title" style="margin-bottom: 2rem;">Benvenuto, presto riceverai nostre news!</h2></div></div>';
        }

        _form.removeClass('loading');
        _form.addClass('finished');

        $('#godown_container').fadeOut('slow', function () {
          $('#godown_container').html('');
        });

        _form_el.fadeOut('slow', function () {
          $('#form_news').css('padding', '0');
          _form_el.hide('slow');
          let _text = $($.parseHTML(form_completed));
          let _h = '100px';

          _text.height(height);
          _intro.replaceWith(_text);

          $('#form-sent').fadeIn('slow', function () {
            $(this).height(_h);
          });

          /*document.querySelector('#img-paint').scrollIntoView({
                        behavior: 'smooth'
                    });*/
        });
      }, 200);
    },
    error: function (data) {
      form_completed = '<div id="form-sent"><div class="content"><h3 class="title">I DATI INSERITI NON SONO VALIDI. TI INVITIAMO A RIPROVARE.</h3></div></div>';

      _form.removeClass('loading');
      _form.addClass('finished');

      $('#godown_container').fadeOut('slow');

      _form_el.fadeOut('slow', function () {
        $('#form').css('padding', '0');
        _form_el.hide('slow');
        let _text = $($.parseHTML(form_completed));
        let _h = '100px';

        _text.height(height);
        _intro.replaceWith(_text);

        $('#form-sent').fadeIn('slow', function () {
          $(this).height(_h);
        });
      });
    },
  });
}

function sesso_uomo() {
  if ($(this).hasClass('chosen')) {
    $('#sesso-input span.selectable').removeClass('chosen');
    $('input#empty_sex').val('');
    $('input#sesso').val('');
  } else {
    $('#sesso-input span.selectable').removeClass('chosen');
    $(this).addClass('chosen');
    $('input#empty_sex').val('M');
    $('input#sesso').val('M');
  }
}

function sesso_donna() {
  if ($(this).hasClass('chosen')) {
    $('#sesso-input span.selectable').removeClass('chosen');
    $('input#empty_sex').val('');
    $('input#sesso').val('');
  } else {
    $('#sesso-input span.selectable').removeClass('chosen');
    $(this).addClass('chosen');
    $('input#empty_sex').val('F');
    $('input#sesso').val('F');
  }
}

function privacy_1_click() {
  $('#empty_privacy').toggleClass('on');

  if ($('#empty_privacy').hasClass('on')) {
    $('#empty_privacy').val('on');
    document.getElementById('empty_privacy').value = 'on';
  } else {
    $('#empty_privacy').val('');
    document.getElementById('empty_privacy').value = '';
  }
}

function privacy_2_click() {
  $('#empty_privacy-news').toggleClass('on');

  if ($('#empty_privacy-news').hasClass('on')) {
    $('#empty_privacy-news').val('on');
    document.getElementById('empty_privacy-news').value = 'on';
  } else {
    $('#empty_privacy-news').val('');
    document.getElementById('empty_privacy-news').value = '';
  }
}

function privacy_container_click() {
  $('#empty_privacy-2').toggleClass('on');

  if ($('#empty_privacy-2').hasClass('on')) {
    $('#empty_privacy-2').val('on');
    document.getElementById('empty_privacy-2').value = 'on';
  } else {
    $('#empty_privacy-2').val('');
    document.getElementById('empty_privacy-2').value = '';
  }
}

function age_error() {
  let age = document.getElementById('anno_nascita');
  if (age != undefined) {
    age.addEventListener('input', age_input);
  }
}

function age_input() {
  let age = document.getElementById('anno_nascita');

  if (age.validity.rangeUnderflow) {
    age.setCustomValidity("Ci dispiace, l'evento è riservato ad under 35");
  } else if (age.validity.rangeOverflow) {
    age.setCustomValidity('Ops, il tuo anno di nascita sembra sbagliata');
  } else {
    age.setCustomValidity('');
  }
}
