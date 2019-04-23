
// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchButton = document.querySelector("#search");

// Add event listener to the search button, call handleSearchClick
$searchButton.addEventListener("click", handleSearchClick);

// Set ufoData to data
var ufoData = data;

// renderTable renders the ufoData to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < ufoData.length; i++) {
        // Get current ufo info object and its fields
        var info = ufoData[i];
        var fields = Object.keys(info);
        // Create a new row in the tbody
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in info object, create new cell and set its inner
            // text to be the current value at the current info field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = info[field];
        }
    }
}

function handleSearchClick() {
    // Format user search input by eliminating whitespace and turning input into lowercase
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();
    // Set ufoData to array of ufo sightings to match the filter
    ufoData = dataSet.filter(function(ufoSighting) {
        var searchDate = ufoSighting.datetime;
        var searchCity = ufoSighting.city.toLowerCase();
        var searchState = ufoSighting.state.toLowerCase();
        var searchCountry = ufoSighting.country.toLowerCase();
        var searchShape = ufoSighting.shape.toLowerCase();
        // If statements to match search criteria with filtered criteria
        if (
            (searchDate === filterDate || filterDate === "") &&
            (searchCity === filterCity || filterCity === "") &&
            (searchState === filterState || filterState === "") &&
            (searchCountry === filterCountry || filterCountry === "") &&
            (searchShape === filterShape || filterShape === "")
        ) {
            return true;
        }
        return false;
    });
    renderTable();

    // Clear input fields
    $dateInput.value = "";
    $cityInput.value = "";
    $stateInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";
}

// Render the table for the first time on page load
renderTable();