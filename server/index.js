import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
let connection;

MongoClient.connect("mongodb://mongo:xBodARXbsHbGNmfyiHNvoAAtxnGVfQaW@junction.proxy.rlwy.net:28416")
	.then((client) => {
		connection = client.db();
		app.listen(27017, () => {
			console.log("27017");
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.get("/cars", (req, res) => {
	console.log("hello");
	connection
		.collection("Cars")
		.find()
		.toArray()
		.then((data) => {
			res.json(data);
			console.log("data", connection.collection("Cars"));
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/addons", (req, res) => {
	connection
		.collection("Addons")
		.find()
		.toArray()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/userbooking", (req, res) => {
	const { booking, email } = req.body;
	connection
		.collection("Users")
		.updateOne({ email: email }, { $push: { bookings: booking } }, { upsert: true })
		.then((data) => {
			res.json("booked successfully!");
		});
});

app.post("/booking", (req, res) => {
	try {
		const { booking, email } = req.body;
		connection
			.collection("UnregisteredUsers")
			.updateOne({ email: email }, { $push: { bookings: booking } }, { upsert: true })
			.then((data) => {
				console.log(data);
				res.json("booked successfully!");
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/registerUser", async (req, res) => {
	try {
		let { user } = req.body;
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		connection
			.collection("Users")
			.insertOne(user)
			.then(() => {
				res.json("registered successfully");
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;
	connection
		.collection("Users")
		.find({ email: email })
		.toArray()
		.then((data) => {
			if (data.length === 0) {
				res.json("user not found");
			} else {
				const user = data[0];
				bcrypt.compare(password, user.password).then((comparison) => {
					if (comparison) {
						res.json({ user: user, message: "logged in successfully" });
					} else {
						res.json("wrong password");
					}
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/getUserBookings", (req, res) => {
	try {
		const email = req.query.email;
		console.log(email);
		connection
			.collection("Users")
			.find({ email: email })
			.toArray()
			.then((data) => {
				res.json(data[0].bookings);
			});
	} catch (error) {
		console.log(error);
	}
});

app.get("/getUnregisteredUserBooking", (req, res) => {
	try {
		const email = req.query.email;
		console.log(email);
		connection
			.collection("UnregisteredUsers")
			.find({ email: email })
			.toArray()
			.then((data) => {
				console.log(data[0].bookings);
				res.json(data[0].bookings);
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/deleteBooking", (req, res) => {
	try {
		const { email, booking } = req.body;
		console.log(email);
		console.log(booking);
		connection
			.collection("UnregisteredUsers")
			.updateOne({ email: email }, { $pull: { bookings: booking } })
			.then((data) => {
				res.json("booking deleted");
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/deleteUserBooking", (req, res) => {
	try {
		const booking = req.body.booking;
		const email = req.body.email;
		console.log(booking);
		connection
			.collection("Users")
			.updateOne({ email: email }, { $pull: { bookings: booking } })
			.then((data) => {
				console.log(data);
				res.json("booking deleted");
			});
	} catch (error) {
		console.log(error);
	}
});

app.get("/getUnregisteredUsers", (req, res) => {
	try {
		connection
			.collection("UnregisteredUsers")
			.find()
			.toArray()
			.then((data) => {
				console.log(data);
				res.json(data);
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/addUnregisteredUser", (req, res) => {
	const { client } = req.body;
	try {
		connection
			.collection("UnregisteredUsers")
			.insertOne(client)
			.then((data) => {
				console.log(data);
				res.json("booked successfully!");
			});
	} catch (error) {
		console.log(error);
	}
});

app.get("/getUsers", (req, res) => {
	try {
		connection
			.collection("Users")
			.find()
			.toArray()
			.then((data) => {
				console.log(data);
				res.json(data);
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/carReturnDate", (req, res) => {
	const { carReturnDate, carId } = req.body;
	console.log(carId);
	console.log(carReturnDate);
	try {
		const objectIdCarId = new ObjectId(carId);
		connection
			.collection("Cars")
			.updateOne({ _id: objectIdCarId }, { $set: { returnDate: carReturnDate } }, { upsert: true })
			.then((data) => {
				console.log(data);
				res.json("return date saved successfully");
			});
	} catch (error) {
		console.log(error);
	}
});
