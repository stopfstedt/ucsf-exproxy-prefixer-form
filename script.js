$(function() {
  var $form = $("#form");
  var $resetBtn  = $("#form button.reset");
  var $input = $("#form input");
  var $output = $("#output");
  var $originalUrl = $("#output .original");
  var $generatedUrl = $("#output .generated");

  var PREFIX = "https://ucsf.idm.oclc.org/login?url=";

  $form.submit(function(event) {
    var url = $input.val();
    $originalUrl.html(url);
    $generatedUrl.html(PREFIX + url);
    $output.show();
    event.preventDefault();
  });

  $resetBtn.click(function() {
    $output.hide();
    $originalUrl.html("");
    $generatedUrl.html("");
  });
});
