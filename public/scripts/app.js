console.log('Up and running!');

// ------------------ GLOBAL VARIABLES ------------------ //
const BASE_URL = '/api/v1/cities';

// ------------------ DOM ELEMENTS ------------------ //
const $newCityForm = $('#newCityForm');

function addNewCity(event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: BASE_URL,
        data: $newCityForm.serialize(),
        success: newCitySuccess,
        error: newCityError
    });
}

function newCitySuccess(response) {
    console.log(response);
}

function newCityError(err1, err2, err3) {
    alert(err2);
}

// ------------------ Event Listeners ------------------ //
$newCityForm.on('submit', addNewCity);