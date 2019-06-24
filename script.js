$(function() {
  var $form = $(".form");
  var $resetBtn  = $(".form button.reset");
  var $input = $(".form input");
  var $output = $(".output");
  var $generatedUrl = $(".generated");
  var $copied = $(".copied");
  var clipboard;

  var PREFIX = "https://ucsf.idm.oclc.org/login?url=";

  var DOI_DOT_ORG = "https://doi.org/";

  // @link https://www.crossref.org/blog/dois-and-matching-regular-expressions/
  var DOI_PATTERNS = [
    new RegExp("^10.\\d{4,9}/[-._;()/:A-Z0-9]+$", "i"),
    new RegExp("^10.1002/[^\\s]+$", "i"),
    new RegExp("^10.\\d{4}/\\d+-\\d+X?(\\d+)\\d+<[\\d\\w]+:[\\d\\w]*>\\d+.\\d+.\\w+;\\d$", "i"),
    // The original pattern is /^10.1021/\w\w\d++$/i, however JavaScript does not support possessive quantifiers.
    // So we have to emulate this by using LookAhead, which is supported.
    // @link https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead
    // @link https://www.regular-expressions.info/possessive.html
    new RegExp("^10.1021/\\w\\w(?=(\\d+))\\1$", "i"),
    new RegExp("^10.1207/[\\w\\d]+&\\d+_\\d+$", "i")
  ];

  var resetOutput = function() {
    $output.hide();
    $copied.hide();
    $generatedUrl.text("");
    $generatedUrl.attr('href', "");
  };

  var isDOI = function(text) {
      var matches = false;
      var i = 0;
      var n = DOI_PATTERNS.length;
      while (false === matches && i < n) {
        matches = DOI_PATTERNS[i].test(text);
        i++;
      }
      return matches;
  };

  if (ClipboardJS.isSupported()) {
    $(".copy").show();
    clipboard = new ClipboardJS(".copy");
    clipboard.on('success', function(e) {
      $copied.show();
      e.clearSelection();
    });
  }

  $form.submit(function(event) {
    var generatedUrl;
    var input = $input.val().trim();

    resetOutput();

    if (isDOI(input)) {
      input = DOI_DOT_ORG + input;
    }

    generatedUrl = PREFIX + input;

    $generatedUrl.text(generatedUrl);
    $generatedUrl.attr('href', generatedUrl);

    $output.show();
    event.preventDefault();
  });

  $resetBtn.click(function() {
    resetOutput();
  });
});
