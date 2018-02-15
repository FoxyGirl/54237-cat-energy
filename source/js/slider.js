;(function () {
  var separator = document.querySelector('.slider__bar > span');
  var sliderBar = document.querySelector('.slider__bar');
  var imgRight = document.querySelector('.slider__img--right');
  var imgLeft = document.querySelector('.slider__img--left');
  var controlBefore = document.querySelector('.slider__control--before');
  var controlAfter = document.querySelector('.slider__control--after');
  var flag = false;
  var SEPARATOR_BEFORE = 3;
  var SEPARATOR_AFTER = 43;
  var TABLET_WIDTH = 768;

  function changeeSlider(proc) {
    imgLeft.style.width = proc + '%';
    imgRight.style.width = 100 - proc + '%';
  }

  separator.addEventListener('mousedown', function(event) {
    event.preventDefault();
    flag = true;
  }, false);

  document.addEventListener('mouseup', function(event) {
    flag = false;
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

      changeeSlider(proc);
    }

  }, false);

  var debounceResizeSlider = debounce(initSlider, 200, false);
  window.addEventListener('resize', debounceResizeSlider);

  function initSlider() {
    var proc = parseInt(imgLeft.style.width, 10);
    if (isNaN(proc)) {
      proc = 50;
    }

    if (window.innerWidth < TABLET_WIDTH) {
      var newRes = proc <= 50 ? SEPARATOR_BEFORE : SEPARATOR_AFTER;
      proc = proc <= 50 ? 0 : 100;
      separator.style.left = newRes + 'px';
      changeeSlider(proc);
    } else {
      separator.style.left = imgLeft.style.width;
      changeeSlider(proc);
    }
  }

  var beforeSlide = function() {
    if (window.innerWidth < TABLET_WIDTH) {
      separator.style.left = SEPARATOR_BEFORE + 'px';
    } else {
      separator.style.left = '0%';
    }
    changeeSlider(0);
  };

  var afterSlide = function() {
    if (window.innerWidth < TABLET_WIDTH) {
      separator.style.left = SEPARATOR_AFTER + 'px';
    } else {
      separator.style.left = '100%';
    }

    changeeSlider(100);
  };

  controlBefore.addEventListener('click', beforeSlide);
  controlAfter.addEventListener('click', afterSlide);

  if (window.innerWidth < TABLET_WIDTH) {
    controlBefore.click();
  }

})();
