import axios from "axios";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const baseURL = "https://data.cityofnewyork.us/resource/gkne-dk5s.json";

const api = axios.create({
	baseURL,
	headers: {
		accept: "application/json",
		"content-type": "application/json",
		"x-app-token": process.env.APP_TOKEN,
	},
});

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	next();
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
		console.error("Error fetching data from the API:", err);
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
		console.error("Error fetching data:", error);
		res.status(500).json({ status: false, message: error.message });
	}
});

app.get("/", (req, res) => res.send("Express on Vercel"));

export default (req, res) => app(req, res);
