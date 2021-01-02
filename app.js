const express = require("express");
const axios = require('axios');
const baseInfo = require('./constant');


app = express();


// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//
//     if (req.method == 'OPTIONS') {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });

app.get("/satList/:latitude/:longitude/:elevation/:altitude", (req,res) => {
    res.header("Content-Type", "application/json");
    const {latitude, longitude, elevation, altitude} = req.params;
    const {BASE_URL,  NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY} = baseInfo;
    // let url = "https://api.n2yo.com/api/rest/v1/satellite/above/-40/70/90/90/52/&apiKey=29S8QF-TT4KYL-LTDKM7-4LW7"
    const url = `${BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
    axios.get(url)
        .then(response => {
            res.json(response.data);
        }).catch(error => {
            console.log(error);
    })
});

app.get("/position/:satid/:latitude/:longitude/:altitude/:endTime", (req, res) => {
    res.header("Content-Type", "application/json");
    const {satid, latitude, longitude, altitude, endTime} = req.params;
    const {BASE_URL, SATELLITE_POSITION_URL, SAT_API_KEY} = baseInfo;
    const url = `${BASE_URL}/${SATELLITE_POSITION_URL}//${satid}/${latitude}/${longitude}/${altitude}/${endTime}/&apiKey=${SAT_API_KEY}`;
    axios.get(url)
        .then(response => {
            res.json(response.data);
        }).catch(error => {
        console.log(error);
    })
})

// app.get("/", (req, res) => {
//     res.set("Content-Type", "text/html");
//     res.sendFile(__dirname + "/build/index.html");
// });

app.use(express.static("./build"));
app.listen(3000, '127.0.0.1');