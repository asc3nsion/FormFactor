
var ngApp = angular.module('ngApp', [
	'ngRoute',
	'formCtrl',
	'angular-svg-round-progress',
	]);

ngApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/checkout', {
            templateUrl: 'partials/checkout.html',
            controller: 'CheckoutCtrl'
        }).
        otherwise({
            redirectTo: '/checkout'
        });
    }
]);

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var autocompletes = ['addressEnter', 'billingEnter'];
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('addressEnter')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  var formatAdr = "";

  document.getElementById('addressEnter').value = place.formatted;
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).focus();
      document.getElementById(addressType).value = val;
      $('#'+addressType).removeClass('ng-pristine');
      $('#'+addressType).removeClass('ng-empty');
      $('#'+addressType).removeClass('ng-invalid').addClass('ng-valid');
      $('#'+addressType).removeClass('ng-invalid-required').addClass('ng-dirty');
      document.getElementById(addressType).blur();
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

//Need to drop maps api script after document load to ensure all form html is there first
$( document ).ready(function() {
    console.log( "document ready!" );
    var mapApi = document.createElement('script');
    mapApi.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDT17-lzcn3eIJI_-CkXIyMUgxkS0IFT5I&signed_in=true&libraries=places&callback=initAutocomplete";
    document.getElementsByTagName('body')[0].appendChild(mapApi);

});