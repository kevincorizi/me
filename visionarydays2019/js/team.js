$(document).ready(function () {
  let _width = $(document).width();

  if (_width < 500) team_mobile();

  $("#names").height($(".names-wrapper").innerHeight());
});

function team_mobile() {
  let $images_container = $(".team-row .team-images-container");
  let offset_x = parseInt($images_container.position().left);
  let width = parseInt($images_container.outerWidth());

  //$images_container.kinetic({
  //    x: true,
  //    y: false,
  //    triggerHardware: true
  //});

  $images_container.mousemove(function (event) {
    /*
        if (event.pageX - offset_x < width / 3) {
            $(event.target).closest('.team-row:not(#team-hr) .team-images-container').css('cursor', 'w-resize');
        } else if (event.pageX - offset_x > width * 2 / 3) {
            $(event.target).closest('.team-row:not(#team-hr) .team-images-container').css('cursor', 'e-resize');
        } else {
            $(event.target).closest('.team-row:not(#team-hr) .team-images-container').css('cursor', 'default');
        }
         */
  });

  // how many milliseconds is a long press?
  let longpress = 500;
  // holds the start time
  let start,
    mutex = 0;

  /*

    $images_container.mousedown(function (event_down) {

        start = new Date().getTime();
        mutex++;

        setTimeout(function () {
            if (start !== 0 && mutex === 1) {

                if (event_down.pageX - offset_x < width / 3) {
                    $(event_down.target).closest('.team-row .team-images-container')
                        .kinetic('start',
                            {velocity: -10});
                } else if (event_down.pageX - offset_x > width * 2 / 3) {
                    $(event_down.target).closest('.team-row .team-images-container')
                        .kinetic('start',
                            {velocity: 10});
                }
            }
            mutex--;
        }, longpress);

        $images_container.mouseup(function (event_up) {

            if (new Date().getTime() >= (start + longpress) && start > 0) {
                $(event_up.target).closest('.team-row .team-images-container')
                    .kinetic('end');
            } else {
                start = 0;

                if (Math.abs(event_down.pageX - event_up.pageX) < 3 &&
                    Math.abs(event_down.pageY - event_up.pageY) < 3) {

                    let $el = $(event_up.target).closest('.team-row .team-images-container');

                    if (event_up.pageX - offset_x > width * 2 / 3) {
                        $el.animate({
                            scrollLeft: $el.scrollLeft() + 150
                        }, {
                            duration: 300,
                            queue: false
                        });
                    } else if (event_up.pageX - offset_x < width / 3) {
                        $el.animate({
                            scrollLeft: $el.scrollLeft() - 150
                        }, {
                            duration: 300,
                            queue: false
                        });
                    }
                }

            }
        });
    });

    $images_container.mouseleave(function () {
        start = 0;
    });

    */
}
