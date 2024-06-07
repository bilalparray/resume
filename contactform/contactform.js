jQuery(document).ready(function ($) {
  "use strict";

  // Contact form validation and submission
  $("form.contactForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input, textarea").each(function () {
      var i = $(this); // current input/textarea
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input/textarea
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });

    if (ferror) return false;

    // Extract form data
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $('textarea[name="message"]').val();

    // Create the WhatsApp message text
    var whatsappMessage = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;

    // WhatsApp URL
    var whatsappURL = `https://api.whatsapp.com/send?phone=919682318133&text=${whatsappMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    return false;
  });
});
