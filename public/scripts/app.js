// import { STATES } from "mongoose";

// ------------------ GLOBAL VARIABLES ------------------ //
const BASE_URL = '/api/v1/cities';

// ------------------ STATE VARIABLES ------------------ //

const state = {
    cities: []
}

// ------------------ DOM ELEMENTS ------------------ //
const newCityForm = document.querySelector('#newCityForm');
const citiesSection = document.querySelector('#cities');


// ------------------ FUNCTIONS ------------------ //

// ------------------ READ ------------------ //
const getAllCities = () => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(json => {
            state.cities = json.data;
            console.log(state.cities);
            render(state.cities);
        })
        .catch(err => console.log(err));
};


const render = (arr) => {
    citiesSection.innerHTML = '';
    arr.forEach(city => {
        const template = cityTemplate(city);
        citiesSection.insertAdjacentHTML('beforeend', template)
    })
}

// ------------------ CREATE ------------------ //
const addNewCity = (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const newCity = { name: name.value, description: description.value };
    fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers:{ 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => { 
            citiesSection.insertAdjacentHTML('beforeend', cityTemplate(json.data));
            state.cities.push(json.data);
            console.log(state.cities);
        })
        .catch(err => console.log(err));
}

// ------------------ UPDATE ------------------ //
const editCity = (event) => {
    event.preventDefault();
    event.target.disabled = true;
    const cityToEdit = event.target.parentNode.parentNode;
    cityToEdit.insertAdjacentHTML('afterend', editTemplate());
    const editDiv = event.target.parentNode.parentNode.nextSibling;
    const editForm = event.target.parentNode.parentNode.nextSibling.childNodes[1];
    const cancelEditButton = event.target.parentNode.parentNode.nextSibling.childNodes[3];
    // Add cancel edit button listener
    cancelEditButton.addEventListener('click', (event2) => {
        event2.preventDefault();
        event.target.disabled = false;
        editDiv.parentNode.removeChild(editDiv);
    });
    // Add sumbit edit button listener
    editForm.addEventListener('submit', (event3) => {
        event3.preventDefault();
        const editedCity = { name: editForm.childNodes[1].value, description: editForm.childNodes[3].value };
        fetch(`${BASE_URL}/${cityToEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify(editedCity),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(json => { 
                cityToEdit.insertAdjacentHTML('beforebegin', cityTemplate(json.data));
                cityToEdit.parentNode.removeChild(cityToEdit);
                editForm.parentNode.parentNode.removeChild(editForm.parentNode);
                const index = state.cities.findIndex((city) => {
                    return city._id === json.data._id;
                });
                state.cities[index] = json.data;
                console.log(state.cities);
            })
            .catch(err => console.log(err));
    });
};


// ------------------ DESTROY ------------------ //
const deleteCity = (event) => {
    event.preventDefault();
    let cityId = event.target.parentNode.parentNode.id;

    fetch(`${BASE_URL}/delete/${cityId}`, { method: 'delete' })
        .then(res => res.json())
        .then(json => {
            const id = json.data._id
            const city = document.getElementById(id);
            if (city.nextSibling.classList.contains('edit')) city.parentNode.removeChild(city.nextSibling);
            city.parentNode.removeChild(city);
            const index = state.cities.findIndex((city) => {
                return city._id === id;
            });
            state.cities.splice(index, 1);
            console.log(state.cities);
        })
        .catch(err => console.log(err));
};



// ------------------ HTML TEMPLATES ------------------ //
const cityTemplate = (city) => {
    return `<div id="${city._id}" class="city">
        <div>
        <h4>${city.name}</h4>
        <p>${city.description}</p>
        </div>
        <div class="buttons">
            <button class="deleteBtn">&times;</button>
            <button class="editBtn">edit</button>
        </div>
    </div>`
};

const editTemplate = () => {
    return `<div class="edit">
        <form class="editForm">
            <input type="text" id="name" name="name" placeholder="Name" class="input"/>
            <input type="text" id="description" name="description" placeholder="Description" class="input"/>
            <button type="submit" class="submitEditBtn">Edit City</button>
        </form>
        <button type="submit" class="cancelEditBtn">&times;</button>
    </div>`
};

// ------------------ Event Listeners ------------------ //
newCityForm.addEventListener('submit', addNewCity);

citiesSection.addEventListener('click', () => {
    if (event.target.classList.contains('deleteBtn')) deleteCity(event);
    if (event.target.classList.contains('editBtn')) editCity(event);
});


// Append cities to DOM when web page opens
getAllCities();