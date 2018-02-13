;(function () {
  console.log('slider');

  var separator = document.querySelector('.slider__bar > span');
  var sliderBar = document.querySelector('.slider__bar');
  var imgBefore = document.querySelector('.slider__img--before');
  var imgAfter = document.querySelector('.slider__img--after');
  var flag = false;

  function changeeSlider(proc) {
      imgBefore.style.width = proc + '%';
      imgAfter.style.width = 100 - proc + '%';
  }

  separator.addEventListener('mousedown', function(event) {
    event.preventDefault();
    flag = true;

    console.log('mousedown');
  }, false);

  document.addEventListener('mouseup', function(event) {
    flag = false;

    console.log('mouseup');
    separator.style.borderColor = 'green';
  }, false);

  window.addEventListener('mousemove', function(event) {
    var res = event.pageX - sliderBar.getBoundingClientRect().left//this.offsetLeft;

    if (flag && (res > 0) && (res < sliderBar.offsetWidth)) {
      separator.style.left = res + 'px';
      var proc = res/sliderBar.offsetWidth*100;
      if (proc > 97) {
        proc = 100;
      }
      if (proc < 3) {
        proc = 0;
      }
      console.log('res!! ' + res);
      console.log('proc = ' + proc);

      separator.style.borderColor = 'red';
      changeeSlider(proc);
    }

  }, false);

})();
