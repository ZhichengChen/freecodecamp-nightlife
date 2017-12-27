$( function() {
    var availableTags = [
      "London",
      "New York",
      "Singapore",
      "Hong Kong",
      "Paris",
      "Tokyo",
      "Dubayy",
      "Sydney",
      "St Paul",
      "Milan",
      "Chigaco",
      "Mexico",
      "Mumbai",
      "Moscow",
      "Frankfurt",
      "Madrid",
      "Warsaw",
      "Johannesburg",
      "Toronto",
      "Seoul",
      "Istanbul",
      "Kuala Lumpur",
      "Jakarta",
      "Amsterdam",
      "Brussels",
      "Los Angeles"
    ];
    $( "#citys" ).autocomplete({
      source: availableTags
    });
  } );