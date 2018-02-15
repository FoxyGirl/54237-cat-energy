/**
 * Created by FoxyGirl on 14.02.2018.
 */

;(function () {
  var formProgram = document.getElementById('formProgram');
  var formSubmit = document.getElementById('formSubmit');

  if (formSubmit) {
    formSubmit.addEventListener('click', function (event) {
      event.preventDefault();

      var validInputs = document.querySelectorAll('input:valid');
      [].forEach.call(validInputs, function (item) {
        item.classList.remove('form__input--error');
      });

      var invalidInputs = document.querySelectorAll('input:invalid');
      if (invalidInputs.length > 0) {
        [].forEach.call(invalidInputs, function (item) {
          item.classList.add('form__input--error');
        });
        invalidInputs[0].focus();
      } else {
        formProgram.submit();
      }
    })
  }

})();
