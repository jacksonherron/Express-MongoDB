// ------------------ GLOBAL VARIABLES ------------------ //
const BASE_URL = '/api/v1/cities';

// ------------------ DOM ELEMENTS ------------------ //
const $newCityForm = $('#newCityForm');
const $cities = $('#cities')



// ------------------ FUNCTIONS ------------------ //


// ------------------ CREATE ------------------ //
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
            <div class="buttons">
                <button class="deleteBtn">&times;</button>
                <button class="editBtn">edit</button>
            </div>
        </div>`
    );
};

function newCityError(err1, err2, err3) {
    alert(err2);
};


// ------------------ READ ------------------ //
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


// ------------------ UPDATE ------------------ //
function editCity(event) {
    $(this).prop('disabled', true);
    const $cityName = event.target.parentNode.parentNode.childNodes[1].childNodes[1];
    const $cityDescription = event.target.parentNode.parentNode.childNodes[1].childNodes[3];
    console.log($cityName, $cityDescription);
    $(`<form id="editCityForm">
            <input type="text" id="name" name="name" placeholder="${$cityName.innerHTML}" class="input"/>
            <input type="text" id="description" name="description" placeholder=${$cityDescription.innerHTML} class="input"/>
            <button type="submit" id="editBtn">Edit City</button>
        </form>`).insertAfter(event.target.parentNode.parentNode);
    const $editCityForm = $(`#editCityForm`);
    console.log($editCityForm);
    $editCityForm.on('submit', () => {
        event.preventDefault();
        $.ajax({
            method: 'PUT',
            url: `${BASE_URL}/${event.target.parentNode.parentNode.id}`,
            data: $editCityForm.serialize(),
            success: editCitySuccess,
            error: editCityError
        });
    });
};

function editCityError(err1, err2, err3) {
    alert(err2);
};

function editCitySuccess(response) {
    console.log('Success');
};


// ------------------ DESTROY ------------------ //
function deleteCity(event) {
    let id = event.target.parentNode.parentNode.id;
    $.ajax({
        method: 'DELETE',
        url: `/api/v1/cities/delete/${id}`,
        success: deleteCitySuccess,
        error: deleteCityError
    });
};

function cityTemplate(city) {
    return `
    <div id="${city._id}" class="city">
        <div>
            <h4>${city.name}</h4>
            <p>${city.description}</p>
        </div>
        <div class="buttons">
            <button class="deleteBtn">&times;</button>
            <button class="editBtn">edit</button>
        </div>
    </div>`;
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
$cities.on('click', '.deleteBtn', deleteCity);
$cities.on('click', '.editBtn', editCity);


// Append cities to DOM
getAllCities();