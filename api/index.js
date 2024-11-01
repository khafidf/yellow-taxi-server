import axios from "axios";
import express from "express";
import { getDataWithFilter } from "./api/services.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const baseURL = "https://data.cityofnewyork.us/resource/gkne-dk5s.json";

app.use(express.json());
app.use((req, res, next) => {
	req.setHeader("Access-Control-Allow-Origin", "*");
	req.setHeader("Access-Control-Allow-Methods", "GET");
	next();
});

const api = axios.create({
	baseURL,
	headers: {
		accept: "application/json",
		"content-type": "application/json",
		"x-app-token": process.env.APP_TOKEN,
	},
});

const getDataWithFilter = async (time, trip, amount, limit = 10, page) => {
	const whereConditions = [
		time ? `pickup_datetime = '${time}'` : "",
		trip ? `trip_distance >= ${trip}` : "",
		amount ? `fare_amount >= ${amount}` : "",
	].filter(Boolean);

	const where = whereConditions.join(" AND ");

	try {
		const response = await api.get("", {
			params: {
				$limit: limit,
				$offset: (page - 1) * limit,
				$where: where,
			},
		});
		return response.data;
	} catch (err) {
		throw new Error("Error fetching data from the API");
	}
};

app.get("/trip", async (req, res) => {
	const { limit, page, time, trip, amount } = req.query;
	try {
		const data = await getDataWithFilter(time, trip, amount, limit, page);
		res.status(200).json({
			status: true,
			response: data,
			pagination: {
				limit,
				page,
			},
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
});

app.get("/", (req, res) => {
	res.send("Haloo");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
