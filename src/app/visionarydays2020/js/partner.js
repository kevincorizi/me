$(document).ready(function () {
  $('#privacy').change(privacy_click);

  // $('#submit_flex_container .privacy-container').change(privacy_click);

  function privacy_click() {
    $('#empty_privacy').toggleClass('on');

    if ($('#empty_privacy').hasClass('on')) {
      $('#empty_privacy').val('on');
      document.getElementById('empty_privacy').value = 'on';
    } else {
      $('#empty_privacy').val('');
      document.getElementById('empty_privacy').value = '';
    }
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

  $('form#partner-form').submit(submit_partner_form);

  function submit_partner_form(e) {
    e.preventDefault();

    //@done Disabilitare pulsante invio
    $('form button').attr('disabled', true);

    let url_partner = 'sub_partner.php';
    //let _form_el = $('#attesa-form, #form_news, #form-intro');
    //let _intro = $('#form-intro');
    let _form = $('form');

    let height = _form.height();
    let width = _form.width();

    _form.addClass('loading');

    let _data = _form.serialize();

    $.ajax({
      type: 'POST',
      url: url_partner,
      data: _data,
      success: function (data) {
        setTimeout(function () {
          if (data == '409') {
            $('#form-loaded').addClass('error');
            form_completed = '<div id="form-sent"><div class="content" style="text-align: center"><h3 class="title" style="width: 100%;">Ti abbiamo mandato una mail, grazie per averci contattato</h3></div></div>';
          } else {
            form_completed = '<div id="form-sent"><div class="content" style="text-align: center"><h2 class="title" style="margin-bottom: 2rem;">Ti abbiamo mandato una mail, grazie per averci contattato</h2>' + '<p class="text"></p></div></div>';
          }

          _form.removeClass('loading');
          _form.addClass('finished');

          _form.fadeOut('slow', function () {
            let _text = $($.parseHTML(form_completed));
            let _h = '100px';

            _text.height(height);
            _text.css('max-width', '600px');
            _text.css('margin', '0 auto');
            _form.replaceWith(_text);

            _form.fadeIn('slow', function () {
              $(this).height(_h);
            });
          });
        }, 200);
      },
      error: function (data) {
        form_completed = '<div id="form-sent"><div class="content"><h3 class="title" style="width: 100%;">I DATI INSERITI NON SONO VALIDI. TI INVITIAMO A RIPROVARE.</h3></div></div>';

        _form.removeClass('loading');
        _form.addClass('finished');

        _form.fadeOut('slow', function () {
          $('#form').css('padding', '0');
          let _text = $($.parseHTML(form_completed));
          let _h = '100px';

          _text.height(height);
          _form.replaceWith(_text);

          _form.fadeIn('slow', function () {
            $(this).height(_h);
          });
        });
      },
    });
  }
});
