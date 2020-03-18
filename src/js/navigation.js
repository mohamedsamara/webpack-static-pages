export function navigation() {
  $('li.nav-item').click(function() {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
  });

  $('#search-icon').click(function() {
    $('#hidden-search-bar').slideToggle();
  });
}
