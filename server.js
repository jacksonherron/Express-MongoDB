// -------------- IMPORT CORE NODE MODULES -------------- //
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

// -------------- GLOBAL VARIABLES -------------- //
const PORT = 3000;
const app = express();
function getTime() {
    return new Date().toLocaleString();
};

// -------------- MIDDLEWARE -------------- //
// Body Parser - pulls data off of request object and puts it in "body" property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static assets
app.use(express.static(`${__dirname}/public`));



// -------------- HTML ENDPOINTS -------------- //
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});


// -------------- API ENDPOINTS -------------- //

// -------------- READ -------------- //
app.get('/api/v1/cities', (req, res) => {

    db.City.find((err, allCities) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again.'
        });
        res.status(200).json({
            status: 200,
            numberOfResults: allCities.length,
            data: allCities,
            requestedAt: getTime()
        });
    });

});

app.get('/api/v1/cities/:city_name', (req, res) => {
    db.City.findOne({name: req.params.city_name}, (err, foundCity) => {
        if (err) return res.status(404).json({
            status: 404,
            message: 'City not found, please try again.'
        });
        res.status(200).json({
            status: 200,
            city: foundCity,
            requestedAt: getTime()
        });
    });
});

app.get('/api/v1/cities/id/:city_id', (req, res) => {
    db.City.findById(req.params.city_id, (err, foundCity) => {
        if (err) return res.status(404).json({
            status: 404,
            message: 'City not found, please try again'
        });
        res.status(200).json({
            status: 200,
            city: foundCity,
            requestedAt: getTime()
        });
    });
});

// -------------- CREATE -------------- //
app.post('/api/v1/cities', (req, res) => {
    const newCity = req.body;
    db.City.create(newCity, (err, createdCity) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again'
        });
        res.status(200).json({
            status: 200,
            data: createdCity,
            requestedAt: getTime()
        });
    })
});


// -------------- Update -------------- //
app.put('/api/v1/cities/:city_id', (req, res) => {
    db.City.findByIdAndUpdate(req.params.city_id, req.body, { new: true }, (err, updatedCity) => {
        console.log(req.body);
        console.log()
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again'
        });
        res.status(200).json({
            status: 200,
            data: updatedCity,
            requestedAt: getTime()
        });
    });
});



// -------------- DESTROY -------------- //
app.delete('/api/v1/cities/delete/:city_id', (req,res) => {
    db.City.findByIdAndDelete(req.params.city_id, (err, deletedCity) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again'
        });
        res.status(200).json({
            status: 200,
            data: deletedCity,
            requestedAt: getTime()
        });
    })
});




// -------------- SERVER LISTENER -------------- //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

