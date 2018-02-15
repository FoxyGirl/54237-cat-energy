/** @function initMap
 *  Init Google Map with custom marker.
 *  Change marker size and map's center depending on window width.
 */
function initMap() {
  var uluru = {lat: 59.938821, lng: 30.323040};
  var centerNew = {lat: 59.938934, lng: 30.319371};
  var windowWidth = window.innerWidth;
  var TABLE_WIDTH = 768;
  var DESKTOP_WIDTH = 1300;
  var centerDesktop = windowWidth >= DESKTOP_WIDTH ? centerNew : uluru;

  var markerWidth = windowWidth < DESKTOP_WIDTH ? (windowWidth < TABLE_WIDTH ? 60 : 100) : 124;
  var markerHeight = windowWidth < DESKTOP_WIDTH ? (windowWidth < TABLE_WIDTH ? 51 : 85) : 106;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: centerDesktop,
    zoom: 17
  });

  var marker = new google.maps.Marker({
    position: uluru,
    icon: {
      url: 'img/map-pin.png',
      scaledSize: new google.maps.Size(markerWidth, markerHeight)
    },
    map: map
  });
}

/** @function debounce
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param {function} func : function for execute one time in wait milliseconds
 * @param {Number} wait : milliseconds
 * @param {Boolean} immediate : trigger the function on the leading edge,
 * instead of the trailing
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;(function() {

  var debounceResizeMap = debounce(initMap, 200, false);
  window.addEventListener('resize', debounceResizeMap);

})();
