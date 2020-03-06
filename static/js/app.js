// from data.js
const tableData = data;

// finding unique values for each filter category (date, city, state, country and shape)
const dateList = tableData.map(item => item.datetime)
    .filter((value, index, self) => self.indexOf(value) === index);
const cityList = tableData.map(item => item.city)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const stateList = tableData.map(item => item.state)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const countryList = tableData.map(item => item.country)
    .filter((value, index, self) => self.indexOf(value) === index).sort();
const shapeList = tableData.map(item => item.shape)
    .filter((value, index, self) => self.indexOf(value) === index).sort();

// adding unique values to drop down list options for each filter category on the page (date, city, state, country and shape)
dateList.forEach(item => {
    d3.select("#datetime_list").append("option").append("value").text(item)
})
cityList.forEach(item => {
    d3.select("#city_list").append("option").append("value").text(item)
})
stateList.forEach(item => {
    d3.select("#state_list").append("option").append("value").text(item)
})
countryList.forEach(item => {
    d3.select("#country_list").append("option").append("value").text(item)
})
shapeList.forEach(item => {
    d3.select("#shape_list").append("option").append("value").text(item)
})

// constant decalartions for data table creation
const table = d3.select("#ufo-table");
const tbody = table.select("tbody");
const inputDate = d3.select("#datetime");
const inputCity = d3.select("#city");
const inputState = d3.select("#state");
const inputCountry = d3.select("#country");
const inputShape = d3.select("#shape");
const filterButton = d3.select("#filter-btn");
const resetButton = d3.select("#clear-filter-btn");

// function for adding the table of data based on the filter criteria
const handler = function() {

    tbody.html("");

    let filterDate = inputDate.property("value").trim()
    let filterCity = inputCity.property("value").toLowerCase().trim();
    let filterState = inputState.property("value").toLowerCase().trim();
    let filterCountry = inputCountry.property("value").toLowerCase().trim();
    let filterShape = inputShape.property("value").toLowerCase().trim();

    let filteredData = [];

    if (filterDate !== "") {
        filteredData = tableData.filter(dataRow => dataRow.datetime === filterDate)
    } else filteredData = tableData;
    if (filterCity !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.city === filterCity)
    };
    if (filterState !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.state === filterState)
    };
    if (filterCountry !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.country === filterCountry)
    };
    if (filterShape !== "") {
        filteredData = filteredData.filter(dataRow => dataRow.shape === filterShape)
    };

    filteredData.forEach(dataRow => {
        let row = tbody.append("tr");
        row.append("td").text(dataRow.datetime);
        row.append("td").text(dataRow.city);
        row.append("td").text(dataRow.state);
        row.append("td").text(dataRow.country);
        row.append("td").text(dataRow.shape);
        row.append("td").text(dataRow.durationMinutes);
        row.append("td").text(dataRow.comments);
    });
};

const clearTable = function() {
    window.location.reload();
    // tbody.html("");
    // d3.select("#datetime").property("value") = "";
    // test = "";
}

// calling the function to add data table on the web page when the filter button is clicked or enter key is pressed
inputDate.on("change", handler);
inputCity.on("change", handler);
inputState.on("change", handler);
inputCountry.on("change", handler);
inputShape.on("change", handler);
filterButton.on("click", handler);
resetButton.on("click", clearTable)