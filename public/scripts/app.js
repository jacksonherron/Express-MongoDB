// ------------------ GLOBAL VARIABLES ------------------ //
const BASE_URL = '/api/v1/cities';

// ------------------ DOM ELEMENTS ------------------ //
const $newCityForm = $('#newCityForm');
const $cities = $('#cities')

// ------------------ FUNCTIONS ------------------ //

function addNewCity(event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: BASE_URL,
        data: $newCityForm.serialize(),
        success: newCitySuccess,
        error: newCityError
    });
};

function newCitySuccess(response) {
    console.log('Success');
    $cities.append(`
        <div id="${response.data._id}" class="city">
            <div>
                <h4>${response.data.name}</h4>
                <p>${response.data.description}</p>
            </div>
            <button class="deleteBtn">&times;</button>
        </div>
    `);
};

function newCityError(err1, err2, err3) {
    alert(err2);
};

function getAllCities() {
    $.ajax({
        method: 'GET',
        url: BASE_URL,
        success: allCitiesSuccess,
        error: allCitiesError
    });
};

function allCitiesSuccess(response) {
    console.log('Success')
    response.data.forEach(city => $cities.append(cityTemplate(city)));
};

function allCitiesError(err1, err2, err3) {
    alert(err2);
};

function cityTemplate(city) {
    return `
    <div id="${city._id}" class="city">
        <div>
            <h4>${city.name}</h4>
            <p>${city.description}</p>
        </div>
        <button class="deleteBtn">&times;</button>
    </div>`;
};

function deleteCity(event) {
    if (event.target.tagName === 'BUTTON') {
        let id = event.target.parentNode.id;
        $.ajax({
            method: 'DELETE',
            url: `/api/v1/cities/delete/${id}`,
            success: deleteCitySuccess,
            error: deleteCityError
        });
    };
};

function deleteCityError(err1, err2, err3) {
    alert(err2);
};

function deleteCitySuccess(response) {
    console.log('Success');
    let id = response.data._id;
    let $city = $(`#${id}`);
    $city.remove();
};


// ------------------ Event Listeners ------------------ //
$newCityForm.on('submit', addNewCity);
$cities.on('click', deleteCity);





getAllCities();