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
    var generatedUrl = PREFIX + url;

    $originalUrl.text(url);
    $originalUrl.attr('href', url);
    $generatedUrl.text(generatedUrl);
    $generatedUrl.attr('href', generatedUrl);

    $output.show();
    event.preventDefault();
  });

  $resetBtn.click(function() {
    $output.hide();
    $originalUrl.html("");
    $generatedUrl.html("");
  });
});
