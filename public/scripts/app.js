// ------------------ GLOBAL VARIABLES ------------------ //
const BASE_URL = '/api/v1/cities';

// ------------------ DOM ELEMENTS ------------------ //
const $newCityForm = $('#newCityForm');
const $cities = $('#cities')



// ------------------ FUNCTIONS ------------------ //


// ------------------ CREATE ------------------ //
const addNewCity = (event) => {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: BASE_URL,
        data: $newCityForm.serialize(),
        success: newCitySuccess,
        error: newCityError
    });
};

const newCitySuccess = (response) => {
    console.log('Success');
    $cities.append(cityTemplate(response.data));
};

const newCityError = (err1, err2, err3) => {
    alert(err2);
};


// ------------------ READ ------------------ //
const getAllCities = () => {
    $.ajax({
        method: 'GET',
        url: BASE_URL,
        success: allCitiesSuccess,
        error: allCitiesError
    });
};

const allCitiesSuccess = (response) => {
    console.log('Success')
    response.data.forEach(city => $cities.append(cityTemplate(city)));
};

const allCitiesError = (err1, err2, err3) => {
    alert(err2);
};


// ------------------ UPDATE ------------------ //
const editCity = (event) => {
    // First step: Deactivate the edit button so it can't be clicked more than once
    event.preventDefault();
    $('.editBtn').prop('disabled', true);
    // $(event.target).prop('disabled', true);
    $(editTemplate()).insertAfter(event.target.parentNode.parentNode);
    const $editCityForm = $(event.target.parentNode.parentNode.nextSibling.childNodes[1]);
    const $cancelEditButton = $(event.target.parentNode.parentNode.nextSibling.childNodes[3]);
    const $editDiv = $(event.target.parentNode.parentNode.nextSibling);

    $cancelEditButton.on('click', (editButton) => {
        event.preventDefault();
        $('.editBtn').prop('disabled', false);
        // $(event.target.parentNode.childNodes[3]).prop('disabled', false);
        $editDiv.remove();
    });

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

const editCityError = (err1, err2, err3) => {
    alert(err2);
};

const editCitySuccess = (response) => {
    console.log('Success');
};


// ------------------ DESTROY ------------------ //
const deleteCity = (event) => {
    event.preventDefault();
    let id = event.target.parentNode.parentNode.id;
    $.ajax({
        method: 'DELETE',
        url: `/api/v1/cities/delete/${id}`,
        success: deleteCitySuccess,
        error: deleteCityError
    });
};

const deleteCityError = (err1, err2, err3) => {
    alert(err2);
};

const deleteCitySuccess = (response) => {
    console.log('Success');
    let id = response.data._id;
    let $city = $(`#${id}`);
    $city.remove();
};

const editTemplate = () => {
    return `
    <div class="edit">
        <form class="editCityForm">
            <input type="text" id="name" name="name" placeholder="Name" class="input"/>
            <input type="text" id="description" name="description" placeholder="Description" class="input"/>
            <button type="submit" class="submitEditBtn">Edit City</button>
        </form>
        <button type="submit" class="cancelEditBtn">&times;</button>
    </div>`;
};

const cityTemplate = (city) => {
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

// ------------------ Event Listeners ------------------ //
$newCityForm.on('submit', addNewCity);
$cities.on('click', '.deleteBtn', deleteCity);
$cities.on('click', '.editBtn', editCity);


// Append cities to DOM
getAllCities();