const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("web/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "web/build", "index.html"));
	});
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function getPlaceId() {
	const rawdata = fs.readFileSync("placeids.json");
	return JSON.parse(rawdata).placeIds;
}

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const places = getPlaceId();

function generateRandomNumber(min, max) {
	highlightedNumber = Math.random() * (max - min) + min;
	return highlightedNumber.toFixed(3);
}

function getPlaces() {
	const lat = generateRandomNumber(55.5, 55.9);
	const long = generateRandomNumber(37.4, 38.0);
	axios
		.get(
			`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=4000&type=restaurant&key=${apiKey}`
		)
		.then((response) => {
			response.data.results
				.map((result) => result["place_id"])
				.filter((id) => !places.includes(id))
				.forEach((id) => places.push(id));
			console.log(places.length);
			const newData = JSON.stringify({ placeIds: places });
			fs.writeFileSync("placeids.json", newData);
		})
		.catch((err) => console.error(err.message));
}

getPlaces();
setInterval(() => {
	getPlaces();
}, 1000 * 60 * 60);

app.get("/data", (req, res) => {
	const randomIndex = Math.floor(Math.random() * places.length);
	res.send(places[randomIndex]);
});
