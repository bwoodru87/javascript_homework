
// Get references to the tbody element, input field and button
var tbody = d3.select("tbody");
var dateInput = d3.select("#date");
var cityInput = d3.select("#city");
var stateInput = d3.select("#state");
var countryInput = d3.select("#country");
var shapeInput = d3.select("#shape");
var searchButton = d3.select("#search");

var ufoData = data;

function renderTable() {
    data.forEach((ufoSighting) => {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
};

function handleClick() {
    // Format user search input by eliminating whitespace and turning input into lowercase
    var inputDate = dateInput.value.trim();
    var inputCity = cityInput.value.trim().toLowerCase();
    var inputState = stateInput.value.trim().toLowerCase();
    var inputCountry = countryInput.value.trim().toLowerCase();
    var inputShape = shapeInput.value.trim().toLowerCase();
    // Set ufoData to array of ufo sightings to match the filter
    ufoData = data.filter(function(ufoSighting) {
        var searchDate = ufoSighting.datetime;
        var searchCity = ufoSighting.city.toLowerCase();
        var searchState = ufoSighting.state.toLowerCase();
        var searchCountry = ufoSighting.country.toLowerCase();
        var searchShape = ufoSighting.shape.toLowerCase();
        // If statements to match search criteria with filtered criteria
        if (
            (searchDate === inputDate || filterDate === "") &&
            (searchCity === inputCity || filterCity === "") &&
            (searchState === inputState || filterState === "") &&
            (searchCountry === inputCountry || filterCountry === "") &&
            (searchShape === inputShape || filterShape === "")
        ) {
            return true;
        }
        return false;
    });
    renderTable();

    // Clear input fields
    dateInput.value = "";
    cityInput.value = "";
    stateInput.value = "";
    countryInput.value = "";
    shapeInput.value = "";
};

// Add event listener to the search button, call handleSearchClick
searchButton.on("click", handleClick);
// Render the table for the first time on page load
renderTable();
