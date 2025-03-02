$(document).ready(function () {
  let _width = $(document).width();

  if (_width < 500) team_mobile();

  $('#names').height($('.names-wrapper').innerHeight());

  $('.team-switch').click(function (e) {
    let el = $(this);
    if (!el.hasClass('active') && !el.hasClass('disabled')) {
      let _team = el.text().toLowerCase();
      let _old_team = $('#section-team').data('team');
      $('.team-switch.active').removeClass('active');
      $('#section-team').data('team', _team);
      el.addClass('active');
      $('#team-' + _old_team).fadeOut({
        duration: 500,
        complete: function () {
          $('#team-' + _team).fadeIn({
            duration: 500,
            complete: function () {},
          });
        },
      });
    }
  });
});

function team_mobile() {
  let $images_container = $('.team-row .team-images-container');
}
