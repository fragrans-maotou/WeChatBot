import express from "express";
import Weather from "../controller/weather.js";

const router = express.Router();

router.get('/geocode', Weather.latitudeAndLongitude);
router.get('/weather_forecast',Weather.weatherForecast);


export default router;