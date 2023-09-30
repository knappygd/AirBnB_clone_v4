$(document).ready(function () {
    let amenityIDs = {};

    $('input[type="checkbox"]').change(function () {
        let $checkbox = $(this);
        let amenityID = $checkbox.data("id");

        if ($checkbox.is(":checked")) {
            amenityIDs[amenityID] = true;
        } else {
            delete amenityIDs[amenityID];
        }

        let selectedAmenities = Object.keys(amenityIDs).map(function (id) {
            return amenityIDs[id];
        });

        $('div.Amenities h4').text(selectedAmenities.join(', '));
    });


});

$.ajax({
    method: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    success: function (data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        }
        else {
            $('div#api_status').removeClass();
        }
    }
});


fetch('http://0.0.0.0:5001/api/v1/places_search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
}).then(response => response.json()).then(data => {
    data.forEach((place) => {
        const article = document.createElement('article');
        article.innerHTML = `
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest}</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">${place.description}</div>
      `;
        $('section.places').append(article);
    });
});

$('button').click(function () {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      method: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      success: (data) => {
          $('section.places').empty();
          data.forEach((place) => {
          const article = document.createElement('article');
          article.innerHTML = `
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest}</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">${place.description}</div>
        `;
        $('section.places').append(article);
        });
      }
    });
  });
});
