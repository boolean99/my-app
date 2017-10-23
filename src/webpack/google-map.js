function initMap() {
  var uluru = {lat: 37.503399, lng: 126.882017},
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
      }),
      marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
}