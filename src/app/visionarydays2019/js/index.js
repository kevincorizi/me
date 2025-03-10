$ = jQuery;
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

let FORM_ATTESA = true;

const FORM_TORINO_ATTESA = '<form id="attesa-form" class="drop-off"><div id="city-selector-container" style="margin-bottom: 3rem"> <div id="select-torino" class="selected"> <span class="city-name">Torino</span> <span class="location-name">Officine Grandi Riparazioni</span> </div> <div id="select-genova"> <span class="city-name">Genova</span> <span class="location-name">Palazzo Ducale</span> </div> </div> <p class="text" style="margin-bottom: 3rem;">I biglietti per Torino di questo drop sono esauriti.<br/>I prossimi 200 saranno rilasciati alle ore 14:00 del 24 ottobre. Compila il form sotto per ricevere un reminder per l\'online.</p> <div class="input-container"><label for="nome">Nome</label><input placeholder="Nome" type="text" name="nome" id="nome" required=""></div><div class="input-container"><label for="cognome">Cognome</label><input placeholder="Cognome" type="text" name="cognome" id="cognome" required=""></div><div class="input-container"><label for="email">Email</label><input placeholder="Email" type="email" name="email" id="email" required=""></div><div id="submit_flex_container" style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; margin-top: 5rem;"><div class="privacy-container"><label class="checkbox-container" for="privacy-2">Ho letto l\'<a href="./privacy">informativa privacy</a> in cui è spiegato come sono utilizzati i miei dati<input type="checkbox" name="privacy-2" id="privacy-2"><span class="checkmark"></span></label><input type="text" name="empty_privacy-2" id="empty_privacy-2" style="width: 1px; opacity: 0;height: 1px; padding-top: 1px"></div><div class="submit-container" style="flex-shrink: 0;width: auto; margin-left: 5rem; margin-top: 0;"><div><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1a3e536fdd1f8bd704427f555_a7df23a2d5" tabindex="-1" value=""></div><button type="submit" class="btn" value="Invia Candidatura" id="invia-candidatura"><span>Iscriviti alla Newsletter</span>\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" width="29.57" height="23.605" viewBox="0 0 29.57 23.605">\n' +
    '                                        <defs>' +
    '                                            <style>' +
    '                                                .cls-1, .cls-2 {' +
    '                                                    fill: none;' +
    '                                                    stroke: #d8d8d8;' +
    '                                                    stroke-linecap: round;' +
    '                                                    stroke-width: 2px;}' +
    '                                                .cls-1 {stroke-linejoin: round;}' +
    '                                            </style></defs><g transform="translate(-1549.605 -5766.115)"><path class="cls-1" d="M17263.8,5760.546l10.389,10.389-10.389,10.389" transform="translate(-15696.018 6.982)"></path><path class="cls-2" d="M17274.688,5777.917h-27.082" transform="translate(-15697)"></path></g></svg></button></div></div></div><hr></form>';

const FORM_TORINO_ISCRIZIONI = '<form id="subscribe-form"> <div id="city-selector-container"> <div id="select-torino" class="selected"> <span class="city-name">Torino</span> <span class="location-name">Officine Grandi Riparazioni</span> </div> <div id="select-genova"> <span class="city-name">Genova</span> <span class="location-name">Palazzo Ducale</span> </div> </div> <input type="hidden" name="location" id="location" value="Torino"> <div class="input-container"> <label for="nome">Nome</label> <input placeholder="Nome" type="text" name="nome" id="nome" required=""> </div> <div class="input-container"> <label for="cognome">Cognome</label> <input placeholder="Cognome" type="text" name="cognome" id="cognome" required=""> </div> <div class="input-container"> <label for="sesso">Sesso</label> <div id="sesso-input"><span class="selectable" id="uomo">M</span><span>/</span><span class="selectable" id="donna">F</span></div> <input type="hidden" name="sesso" id="sesso"> <input type="text" name="empty_sex" id="empty_sex" style="width: 1px; opacity: 0;height: 1px; padding-top: 1rem" required> </div> <div class="input-container"> <label for="anno_nascita">Anno di Nascita</label> <input placeholder="Anno di Nascita" type="number" name="anno_nascita" id="anno_nascita" step="1" required=""> </div> <div class="input-container"> <label for="luogo_domicilio">Vivo a</label> <input placeholder="Vivo a" type="text" name="luogo_domicilio" id="luogo_domicilio" required=""> </div> <div class="input-container"> <label for="occupazione">Occupazione</label> <input placeholder="Occupazione" type="text" name="occupazione" id="occupazione" required=""> </div> <div class="input-container"> <label for="email">Email</label> <input placeholder="Email" type="email" name="email" id="email" required=""> </div> <div class="input-container"> <label for="telefono">Telefono</label> <input placeholder="Telefono" type="tel" name="telefono" id="telefono" required=""> </div> <div class="motto-container"> <label for="motto">Il tuo Prossimo Pianeta</label> <span>max 100 caratteri</span> </div> <textarea placeholder="Il tuo Prossimo Pianeta" id="motto" name="motto" rows="3" maxlength="100" required=""></textarea> <div class="privacy-container"> <label class="checkbox-container" for="privacy-1">Ho letto <a href="./privacy">l\'informativa privacy</a> in cui è spiegato come vengono trattati i miei dati personali <input type="checkbox" name="privacy-1" id="privacy-1"> <span class="checkmark"></span> </label> <input type="text" name="empty_privacy" id="empty_privacy" style="width: 1px; opacity: 0;height: 1px; padding-top: 1px" required> <label class="checkbox-container" for="privacy-2">Voglio iscrivermi alla newsletter di Visionary <input type="checkbox" name="privacy-2" id="privacy-2"> <span class="checkmark"></span> </label> <input type="text" name="empty_privacy-news" id="empty_privacy-news" style="width: 1px; opacity: 0;height: 1px; padding-top: 1px" required> </div> <div class="submit-container"> <div> <h3 class="title">TORINO, 23 Nov 2019</h3> <div class="selected-city"> <span>OFFICINE GRANDI RIPARAZIONI</span> <span>9:00 — 21:00</span> </div> </div> <div> <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1a3e536fdd1f8bd704427f555_a7df23a2d5" tabindex="-1" value=""></div> <button type="submit" class="btn" value="Invia Candidatura" id="invia-candidatura"><span>Invia Candidatura</span> <svg xmlns="http://www.w3.org/2000/svg" width="29.57" height="23.605" viewBox="0 0 29.57 23.605"> <defs> <style>                                            .cls-1, .cls-2 {\n' +
    '                                                fill: none;' +
    '                                                stroke: #d8d8d8;' +
    '                                                stroke-linecap: round;' +
    '                                                stroke-width: 2px;' +
    '                                            } .cls-1 { stroke-linejoin: round; } </style> </defs> <g transform="translate(-1549.605 -5766.115)"> <path class="cls-1" d="M17263.8,5760.546l10.389,10.389-10.389,10.389" transform="translate(-15696.018 6.982)"></path> <path class="cls-2" d="M17274.688,5777.917h-27.082" transform="translate(-15697)"></path> </g> </svg> </button> </div> </div> <hr> </form>';


const FORM_GENOVA_ISCRIZIONI = '<form id="subscribe-form"> <div id="city-selector-container"> <div id="select-torino"> <span class="city-name">Torino</span> <span class="location-name">Officine Grandi Riparazioni</span> </div> <div id="select-genova" class="selected"> <span class="city-name">Genova</span> <span class="location-name">Palazzo Ducale</span> </div> </div> <input type="hidden" name="location" id="location" value="Genova"> <div class="input-container"> <label for="nome">Nome</label> <input placeholder="Nome" type="text" name="nome" id="nome" required=""> </div> <div class="input-container"> <label for="cognome">Cognome</label> <input placeholder="Cognome" type="text" name="cognome" id="cognome" required=""> </div> <div class="input-container"> <label for="sesso">Sesso</label> <div id="sesso-input"><span class="selectable" id="uomo">M</span><span>/</span><span class="selectable" id="donna">F</span></div> <input type="hidden" name="sesso" id="sesso"> <input type="text" name="empty_sex" id="empty_sex" style="width: 1px; opacity: 0;height: 1px; padding-top: 1rem" required> </div> <div class="input-container"> <label for="anno_nascita">Anno di Nascita</label> <input placeholder="Anno di Nascita" type="number" name="anno_nascita" id="anno_nascita" step="1" min="1979" max="2019" required=""> </div> <div class="input-container"> <label for="luogo_domicilio">Vivo a</label> <input placeholder="Vivo a" type="text" name="luogo_domicilio" id="luogo_domicilio" required=""> </div> <div class="input-container"> <label for="occupazione">Occupazione</label> <input placeholder="Occupazione" type="text" name="occupazione" id="occupazione" required=""> </div> <div class="input-container"> <label for="email">Email</label> <input placeholder="Email" type="email" name="email" id="email" required=""> </div> <div class="input-container"> <label for="telefono">Telefono</label> <input placeholder="Telefono" type="tel" name="telefono" id="telefono" required=""> </div> <div class="motto-container"> <label for="motto">Il tuo Prossimo Pianeta</label> <span>max 100 caratteri</span> </div> <textarea placeholder="Il tuo Prossimo Pianeta" id="motto" name="motto" rows="3" maxlength="100" required=""></textarea> <div class="privacy-container"> <label class="checkbox-container" for="privacy-1">Ho letto <a href="./privacy">l\'informativa privacy</a> in cui è spiegato come vengono trattati i miei dati personali <input type="checkbox" name="privacy-1" id="privacy-1"> <span class="checkmark"></span> </label> <input type="text" name="empty_privacy" id="empty_privacy" style="width: 1px; opacity: 0;height: 1px; padding-top: 1px" required> <label class="checkbox-container" for="privacy-2">Voglio iscrivermi alla newsletter di Visionary <input type="checkbox" name="privacy-2" id="privacy-2"> <span class="checkmark"></span> </label> <input type="text" name="empty_privacy-news" id="empty_privacy-news" style="width: 1px; opacity: 0;height: 1px; padding-top: 1px" required> </div> <div class="submit-container"> <div> <h3 class="title">GENOVA, 23 Nov 2019</h3> <div class="selected-city"> <span>PALAZZO DUCALE</span> <span>9:00 — 21:00</span> </div> </div> <div> <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1a3e536fdd1f8bd704427f555_a7df23a2d5" tabindex="-1" value=""></div> <button type="submit" class="btn" value="Invia Candidatura" id="invia-candidatura"><span>Invia Candidatura</span> <svg xmlns="http://www.w3.org/2000/svg" width="29.57" height="23.605" viewBox="0 0 29.57 23.605"> <defs> <style>                                            .cls-1, .cls-2 {\n' +
    '                                                fill: none;' +
    '                                                stroke: #d8d8d8;' +
    '                                                stroke-linecap: round;' +
    '                                                stroke-width: 2px;' +
    '                                            } .cls-1 { stroke-linejoin: round; } </style> </defs> <g transform="translate(-1549.605 -5766.115)"> <path class="cls-1" d="M17263.8,5760.546l10.389,10.389-10.389,10.389" transform="translate(-15696.018 6.982)"></path> <path class="cls-2" d="M17274.688,5777.917h-27.082" transform="translate(-15697)"></path> </g> </svg> </button> </div> </div> <hr> </form>';


function animateImage() {

    if (IS_MOBILE === 0) {
        $('#section-title .content').velocity(
            {
                marginLeft: '5.6rem'
            },
            {
                easing: 'easeOutCubic',
                duration: 1400,
                queue: false,
                complete: function () {
                    //$('#section-title .content').removeAttr('style');
                }
            }
        );

        /*
        $('#section-image').velocity(
            {
                marginTop: '225px'
            },
            {
                easing: 'easeOutQuad',
                duration: 1400,
                queue: false,
                complete: function () {
                    $('#section-image').css('margin-left', 0);
                    $('#section-image').css('margin-top', 0);
                    resize();
                }
            }
        );
        */

        $('#section-title').velocity(
            {
                marginLeft: '-15px',
                marginRight: '-15px',
                marginTop: '0px',
                width: _width,
                height: _height,
            }, {
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
                }
            }
        );
    }
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
}

$(document).ready(function () {

    $(window).bind("load", function () {


        let $body = $('body');
        let $html = $('html');

        let canvas_container = $('#section-image').get(0);

        if (window.innerWidth > 650) {
            IS_MOBILE = 0;
        }

        let $headline_section = $('#headline-section');
        let $hidden_sections = $('header, #first-section, #second-section, #third-section,#fourth-section,#fifth-section,#review-section,#img-paint, #form-intro, #form, #form_news, footer');
        if (IS_MOBILE === 1) {
            $hidden_sections = $('header, #first-section, #second-section, #third-section,#fourth-section,#fifth-section,#review-section,#img-paint, #form-intro,#form_news, footer');
        }

        /* iOS re-orientation fix */
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            /* @todo iOS hides Safari address bar */
        }

        // @todo Decido se visualizzare il form di iscrizione o no
        // in base a quanti posti sono disponibili

        if (window._on == 0) {
            $('#form').html(FORM_TORINO_ATTESA);
        } else {
            $('#form').html(FORM_TORINO_ISCRIZIONI);
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
                resolution: devicePixelRatio
            });

            app.loader.add('image', '../assets/header_img_full.jpg')
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

                    // get our displacement map (image)
                    //displacementSprite = new PIXI.Sprite(resources.image.filter);
                    // set to repeat in a tiled patern
                    //displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                    // set filter to sprite container
                    //displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

                    // Add our filter and sprites to stage
                    //app.stage.filters = [displacementFilter];
                    //app.stage.addChild(displacementSprite);

                    // Listen for frame updates
                    app.ticker.add(function (delta) {

                        // Optionally have a default animation
                        /*
                        img.width += 4 * delta;
                        img.height += 3 * delta;
                         */

                        //displacementSprite.x += speed;
                        //displacementSprite.y += speed;

                        img.mousemove = function (mouseData) {

                        };

                    });

                });

            // Listen for window resize events
            window.addEventListener('resize', resize);

        } else if (IS_MOBILE === 1) {
            $('#section-title .content').hide();
            $('#form').hide();
            $hidden_sections
                .css("display", "flex")
                .hide();
        }

        /*
        let base_img = new Image();
        base_img.src = '../assets/header_img.png';
        base_img.onload = function () {
            context.drawImage(base_img,
                0, 0, parseInt(_width) / 6, (parseInt(_width) / 6) * base_img.height / base_img.width);
        };
        */

        /* Adding class start animation */
        $body.addClass('active');
        if (!$body.hasClass('no-animation')) {
            if (IS_MOBILE === 0) {
                $html.css('overflow', 'hidden');
                $('#section-title').addClass('pre-animation');
            }
        }

        /* DESKTOP: HIDE SKIP ANIMATION AND PAGE SECTIONS */
        setTimeout(function () {
            if (!$body.hasClass('no-animation')) {

                if (IS_MOBILE === 0) {
                    $('#section-title .content').hide();
                    $hidden_sections
                        .css("display", "flex")
                        .hide();
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

                $hidden_sections
                    .fadeIn({
                        duration: 400,
                        queue: false,
                        complete: function () {
                            // $body.addClass('no-animation');
                        }
                    });

                $('#section-title .content').fadeIn({
                    duration: 400,
                    queue: false,
                    complete: function () {
                        // $body.addClass('no-animation');
                    }
                });
            }

        }, 4000);

        /* ANIMATION OUT HEADLINE */
        setTimeout(function () {
            if (!$body.hasClass('no-animation')) {
                $('#headline-section .col-12 #hero-date').velocity(
                    {
                        marginLeft: '8rem'
                    },
                    {
                        easing: 'ease-out',
                        duration: 700,
                        queue: false,
                        complete: function () {
                            //$('#section-title .content').removeAttr('style');
                        }
                    }
                );
                $('#headline-section .col-12 #hero-text').velocity(
                    {
                        marginLeft: '5.6rem'
                    },
                    {
                        easing: 'ease-out',
                        duration: 700,
                        queue: false,
                        complete: function () {
                            //$('#section-title .content').removeAttr('style');
                        }
                    }
                );
                $('#hero-action button').css('transition', 'none');
                $('#hero-action button').velocity(
                    {
                        marginLeft: '4rem',
                        backgroundPositionX: '0%'
                    },
                    {
                        easing: 'ease-out',
                        duration: 700,
                        queue: false
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
            $headline_section.fadeOut({
                duration: 700,
                queue: false,
                complete: function () {
                    //$headline_section.css('display', 'none');
                }
            });

            $hidden_sections
                .css("display", "flex")
                .hide();

            $('#section-title .content').hide();
            // $hidden_sections.css('opacity', '1');

            setTimeout(function () {
                $hidden_sections
                    .fadeIn({
                        duration: 400,
                        queue: false,
                        complete: function () {
                            // $body.addClass('no-animation');
                        }
                    });

                $('#section-title .content').fadeIn({
                    duration: 400,
                    queue: false,
                    complete: function () {
                        // $body.addClass('no-animation');
                    }
                });
            }, 400);

            animateImage();
        }

        /* Desktop form selector */
        $('#select-torino').click(select_torino_click);

        $('#select-genova').click(select_genova_click);

        /* Mobile form selector */
        $('#form-torino').click(form_torino_click);

        /* Mobile form selector */
        $('#form-genova').click(form_genova_click);

        /* Prevent newline in form textarea */
        $("textarea").keypress(function (e) {
            $("textarea").val($("textarea").val().replace(/\n/g, ""));
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
        var video_1 = document.querySelector('#second-section video');
        var video_2 = document.querySelector('#fourth-section video');

        if ($(document).width() < 768 + 1) {
            /* Mobile */
            video_1.removeChild(video_1.querySelector('source:last-child'));
            video_2.removeChild(video_2.querySelector('source:last-child'));
        } else {
            /* Desktop */
            video_1.removeChild(video_1.querySelector('source:first-child'));
            video_2.removeChild(video_2.querySelector('source:first-child'));
        }

        /* Handlde video autoplay */
        var promise_1 = video_1.play();
        var promise_2 = video_2.play();

        if (promise_1 !== undefined) {
            promise_1.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
        if (promise_2 !== undefined) {
            promise_2.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }

        $('#sesso-input span#uomo').click(sesso_uomo);

        $('#sesso-input span#donna').click(sesso_donna);

        $('#privacy-1').change(privacy_1_click);

        $('#privacy-2').change(privacy_2_click);

        $('#submit_flex_container .privacy-container').change(privacy_container_click);

        let form_completed = '<div id="form-sent"><div class="content"><h2 class="title">BENVENUTO NELLA COMMUNITY VISIONARY</h2><p class="text">Entro 48 ore riceverai una mail di conferma dell’avvenuta presa in carico della tua candidatura. ' +
            'Se non l’hai ancora fatto entra in contatto con la realtà Visionary attraverso i social.</p></div></div>';

        /* Form submit */
        $('#subscribe-form').submit(submit_subscribe_form);

        $('#attesa-form').submit(submit_attesa_form);

        // Error signaling
        age_error();

        // Initialize the video player
        // Get the modal
        var video_modal = $("#video-modal")[0];

        let video_index = $("#video-modal video")[0];

        // Get the button that opens the modal
        var video_btn = $("#video-button")[0];

        // Get the <span> element that closes the modal
        var video_close = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        video_btn.onclick = function () {
            video_modal.style.display = "block";
            video_index.play();
            $('html').css('overflow', 'hidden');
        };

        // When the user clicks on <span> (x), close the modal
        video_close.onclick = function () {
            video_modal.style.display = "none";
            video_index.pause();
            $('html').css('overflow', 'auto');
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == video_modal) {
                video_modal.style.display = "none";
                video_index.pause();
                $('html').css('overflow', 'auto');
            }
        }

    });

});

function select_genova_click(e) {

    // Se Genova non era ancora selezionata
    if (!$('#select-genova').hasClass('selected')) {
        $('#select-torino').removeClass('selected');
        $('#select-genova').addClass('selected');

        // @todo Decido se il form di iscrizione c'era già o no
        // in base a quanti posti sono disponibili
        if (window._on === 1) {
            // form già presente
            //@todo Aggiungo validazione età
            $('#anno_nascita').attr('min', '1979');
            $('#anno_nascita').attr('max', '2019');
            age_input();
        } else if (window._on === 0) {
            $('#form').slideUp({
                duration: 600,
                easing: 'easeOutSine',
                complete: function () {
                    $('#form').html(FORM_GENOVA_ISCRIZIONI);

                    $('#select-torino').click(select_torino_click);
                    $('#subscribe-form').submit(submit_subscribe_form);

                    $('#sesso-input span#uomo').click(sesso_uomo);
                    $('#sesso-input span#donna').click(sesso_donna);

                    $('#privacy-1').change(privacy_1_click);
                    $('#privacy-2').change(privacy_2_click);

                    age_error();

                    $('#form').slideDown();
                }
            });
        }

        /* Aggiorno riepilogo a fine form*/
        $('.submit-container .title').text('GENOVA, 23 Nov 2019');
        $('.submit-container .selected-city span:first-child').text('PALAZZO DUCALE');
        $('.submit-container .selected-city span:last-child').text('9:00 — 21:00');
    }
    /* Aggiorno input hidden */
    $('input#location').val('Genova');
}

function select_torino_click(e) {

    // Se Torino non era ancora selezionata
    if (!$('#select-torino').hasClass('selected')) {

        // Attivo Torino
        $('#select-genova').removeClass('selected');
        $('#select-torino').addClass('selected');

        // @todo Decido se visualizzare il form di iscrizione o no
        // in base a quanti posti sono disponibili
        if (window._on === 1) {
            //@todo Rimuovo validazione età
            $('#anno_nascita').removeAttr('min');
            $('#anno_nascita').removeAttr('max');
            age_input();
        } else if (window._on === 0) {
            $('#form').slideUp({
                duration: 600,
                easing: 'easeOutSine',
                complete: function () {
                    $('#form').html(FORM_TORINO_ATTESA);

                    $('#attesa-form').submit(submit_attesa_form);
                    $('#privacy-2').change(privacy_container_click);
                    $('#select-genova').click(select_genova_click);

                    $('#form').slideDown();
                }
            });
        }

        // Aggiorno riepilogo a fine form
        $('.submit-container .title').text('TORINO, 23 Nov 2019');
        $('.submit-container .selected-city span:first-child').text('OFFICINE GRANDI RIPARAZIONI');
        $('.submit-container .selected-city span:last-child').text('9:00 — 21:00');

    }

    /* Aggiorno input hidden */
    $('input#location').val('Torino');
}

function form_torino_click(e) {
    if ($('#form-torino').hasClass('active')) {
        $('#form').slideUp();
        $('#form-torino').removeClass('active');
    } else {
        if ($('#form-genova').hasClass('active')) {
            $('#form').slideUp();
        }

        // @todo Decido se visualizzare il form di iscrizione o no
        // in base a quanti posti sono disponibili
        if (window._on === 1) {
            $('#form').slideDown();
            $('#anno_nascita').removeAttr('min');
            $('#anno_nascita').removeAttr('max');
            age_input();
        } else if (window._on === 0) {
            $('#form').slideUp({
                duration: 600,
                easing: 'easeOutSine',
                complete: function () {
                    $('#form').html(FORM_TORINO_ATTESA);
                    $('#attesa-form').submit(submit_attesa_form);
                    $('#privacy-2').change(privacy_container_click);
                    $('#form').slideDown();
                }
            });
        }

        $('#form-genova').removeClass('active');
        $('#form-torino').addClass('active');

        /* Aggiorno riepilogo a fine form*/
        $('.submit-container .title').text('TORINO, 23 Nov 2019');
        $('.submit-container .selected-city span:first-child').text('OFFICINE GRANDI RIPARAZIONI');
        $('.submit-container .selected-city span:last-child').text('9:00 — 21:00');

        /* Aggiorno input hidden */
        $('input#location').val('Torino');
    }
}

function form_genova_click(e) {
    if ($('#form-genova').hasClass('active')) {
        $('#form').slideUp();
        $('#form-genova').removeClass('active');
    } else {
        if ($('#form-torino').hasClass('active')) {
            $('#form').slideUp();
        }
        // @todo Decido se il form di iscrizione c'era già o no
        // in base a quanti posti sono disponibili
        if (window._on === 1) {
            //@todo Aggiungo validazione età
            $('#anno_nascita').attr('min', '1979');
            $('#anno_nascita').attr('max', '2019');
            age_input();
            $('#form').slideDown();
        } else if (window._on === 0) {
            $('#form').slideUp({
                duration: 600,
                easing: 'easeOutSine',
                complete: function () {
                    $('#form').html(FORM_GENOVA_ISCRIZIONI);
                    $('#subscribe-form').submit(submit_subscribe_form);

                    $('#sesso-input span#uomo').click(sesso_uomo);
                    $('#sesso-input span#donna').click(sesso_donna);

                    $('#privacy-1').change(privacy_1_click);
                    $('#privacy-2').change(privacy_2_click);

                    age_error();

                    $('#form').slideDown();
                }
            });
        }

        $('#form-torino').removeClass('active');
        $('#form-genova').addClass('active');

        /* Aggiorno riepilogo a fine form*/
        $('.submit-container .title').text('GENOVA, 23 Nov 2019');
        $('.submit-container .selected-city span:first-child').text('PALAZZO DUCALE');
        $('.submit-container .selected-city span:last-child').text('9:00 — 21:00');

        /* Aggiorno input hidden */
        $('input#location').val('Genova');
    }
}

function submit_subscribe_form(e) {

    e.preventDefault();

    //@done Disabilitare pulsante invio
    $('#subscribe-form button').attr('disabled', true);

    let _sex_m = $('#sesso-input span#uomo');
    let _sex_f = $('#sesso-input span#donna');

    let url_iscrizione = './subscribe.php';
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

            if (data == "401") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA REGISTRAZIONE NON È ANDATA A BUON FINE.</h3>' +
                    '<p class="text">La tua mail o il tuo numero di telefono risultano già utilizzati. Per problemi puoi contattare <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
            } else if (data == "402") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">I BIGLIETTI PER TORINO DI QUESTO DROP SONO ESAURITI.</h3>' +
                    '<p class="text">Le iscrizioni riapriranno Giovedì 24 Ottobre alle 14:00, altri 200 biglietti, solo per 24h.</p></div></div>';
            } else if (data != "200") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA RICHIESTA NON È ANDATA A BUON FINE.</h3>' +
                    '<p class="text">SE L\'ERRORE PERSISTE SCRIVICI A <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
            } else {
                form_completed = '<div id="form-sent"><div class="content"><h2 class="title">BENVENUTO NELLA COMMUNITY VISIONARY</h2><p class="text">Entro 48 ore riceverai una mail di conferma dell’avvenuta presa in carico della tua candidatura. ' +
                    'Se non l’hai ancora fatto entra in contatto con la realtà Visionary attraverso i social.</p></div></div>';
            }

            _form.removeClass('loading');
            _form.addClass('finished');

            _form_el.fadeOut("slow", function () {
                $('#form').css('padding', '0');
                _form_el.hide("slow");
                let _text = $($.parseHTML(form_completed));
                let _h = '200px';

                _text.height(height);
                _intro.replaceWith(_text);

                $('#form-sent').fadeIn("slow", function () {
                    $(this).height(_h);
                });

                document.querySelector('#img-paint').scrollIntoView({
                    behavior: 'smooth'
                });
            });

        },
        error: function (data) {
            if (data == "401") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA REGISTRAZIONE NON È ANDATA A BUON FINE.</h3>' +
                    '<p class="text">La tua mail o il tuo numero di telefono risultano già utilizzati. Per problemi puoi contattare <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
            } else if (data == "402") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">I BIGLIETTI PER TORINO DI QUESTO DROP SONO ESAURITI.</h3>' +
                    '<p class="text">Le iscrizioni riapriranno Giovedì 24 Ottobre alle 14:00, altri 200 biglietti, solo per 24h.</p></div></div>';
            } else if (data != "200") {
                $('#form-loaded').addClass('error');
                form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA RICHIESTA NON È ANDATA A BUON FINE.</h3>' +
                    '<p class="text">SE L\'ERRORE PERSISTE SCRIVICI A <a href="mailto:info@visionarydays.com">info@visionarydays.com</a></p></div></div>';
            }

            _form.removeClass('loading');
            _form.addClass('finished');

            _form_el.fadeOut("slow", function () {
                $('#form').css('padding', '0');
                _form_el.hide("slow");
                let _text = $($.parseHTML(form_completed));
                let _h = '100px';

                _text.height(height);
                _intro.replaceWith(_text);

                $('#form-sent').fadeIn("slow", function () {
                    $(this).height(_h);
                });
            });
        }
    });
}

function submit_attesa_form(e) {

    e.preventDefault();

    //@done Disabilitare pulsante invio
    $('#attesa-form button').attr('disabled', true);

    let url_attesa = './subscribe_newsletter.php';
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

                if (data != "200") {
                    $('#form-loaded').addClass('error');
                    form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA TUA MAIL RISULTA GIÀ REGISTRATA</h3></div></div>';
                } else {
                    form_completed = '<div id="form-sent"><div class="content"><h2 class="title" style="margin-bottom: 2rem;">BENVENUTO NELLA COMMUNITY VISIONARY DAYS</h2><p class="text">' +
                        'Se non l’hai ancora fatto entra in contatto con la realtà Visionary Days attraverso i social.</p></div></div>';
                }

                _form.removeClass('loading');
                _form.addClass('finished');

                _form_el.fadeOut("slow", function () {
                    $('#form_news').css('padding', '0');
                    _form_el.hide("slow");
                    let _text = $($.parseHTML(form_completed));
                    let _h = '100px';

                    _text.height(height);
                    _intro.replaceWith(_text);

                    $('#form-sent').fadeIn("slow", function () {
                        $(this).height(_h);
                    });

                    document.querySelector('#img-paint').scrollIntoView({
                        behavior: 'smooth'
                    });
                });

            }, 200);
        },
        error: function (data) {
            form_completed = '<div id="form-sent"><div class="content"><h3 class="title">LA TUA MAIL RISULTA GIÀ REGISTRATA</h3></div></div>';

            _form.removeClass('loading');
            _form.addClass('finished');

            _form_el.fadeOut("slow", function () {
                $('#form').css('padding', '0');
                _form_el.hide("slow");
                let _text = $($.parseHTML(form_completed));
                let _h = '100px';

                _text.height(height);
                _intro.replaceWith(_text);

                $('#form-sent').fadeIn("slow", function () {
                    $(this).height(_h);
                });
            });
        }
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
        document.getElementById("empty_privacy").value = "on";
    } else {
        $('#empty_privacy').val('');
        document.getElementById("empty_privacy").value = "";
    }
}

function privacy_2_click() {
    $('#empty_privacy-news').toggleClass('on');

    if ($('#empty_privacy-news').hasClass('on')) {
        $('#empty_privacy-news').val('on');
        document.getElementById("empty_privacy-news").value = "on";
    } else {
        $('#empty_privacy-news').val('');
        document.getElementById("empty_privacy-news").value = "";
    }
}

function privacy_container_click() {
    $('#empty_privacy-2').toggleClass('on');

    if ($('#empty_privacy-2').hasClass('on')) {
        $('#empty_privacy-2').val('on');
        document.getElementById("empty_privacy-2").value = "on";
    } else {
        $('#empty_privacy-2').val('');
        document.getElementById("empty_privacy-2").value = "";
    }
}

function age_error() {
    let age = document.getElementById("anno_nascita");
    if (age != undefined) {
        age.addEventListener("input", age_input);
    }
}

function age_input() {
    let age = document.getElementById("anno_nascita");

    if (age.validity.rangeUnderflow) {
        age.setCustomValidity("Ci dispiace, l'evento è riservato ad under 35");
    } else if (age.validity.rangeOverflow) {
        age.setCustomValidity("Ops, il tuo anno di nascita sembra sbagliata");
    } else {
        age.setCustomValidity("");
    }
}