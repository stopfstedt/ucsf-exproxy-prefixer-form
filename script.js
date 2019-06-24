$(function() {
  var $form = $(".form");
  var $resetBtn  = $(".form button.reset");
  var $input = $(".form input");
  var $output = $(".output");
  var $originalUrl = $(".original");
  var $generatedUrl = $(".generated");
  var $copied = $(".copied");
  var clipboard;

  if (ClipboardJS.isSupported()) {
    $(".copy").show();
    clipboard = new ClipboardJS(".copy");
    clipboard.on('success', function(e) {
      $copied.show();
      e.clearSelection();
    });
  }

  var PREFIX = "https://ucsf.idm.oclc.org/login?url=";

  var resetOutput = function() {
    $output.hide();
    $copied.hide();
    $originalUrl.text("");
    $originalUrl.attr('href', "");
    $generatedUrl.text("");
    $generatedUrl.attr('href', "");
  };

  $form.submit(function(event) {
    resetOutput();
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
    resetOutput();
  });
});
