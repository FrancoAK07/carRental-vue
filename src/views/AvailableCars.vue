<template>
	<div class="cars min-vh-100">
		<div class="container">
			<h2 class="fw-bold">Available cars on: {{ bookingInfo.pickupDate }}</h2>
		</div>
		<div class="row border-bottom"></div>
		<div class="available-cars container">
			<div class="row mt-3 w-75 m-auto text-center">
				<div class="col-12 col-sm-5 col-md mb-1 bg-dark text-white me-1 rounded-5 p-2 d-inline-block">
					<label class="col" for="sort">Sort by:</label>
					<select class="filter col border-0 border-dark bg-dark text-white" name="sort" id="sort" ref="priceRef" @change="priceFilter()">
						<option value="" selected disabled></option>
						<option value="default">all</option>
						<option value="lowToHigh">Price low to high</option>
						<option value="highToLow">Price high to low</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md mb-1 bg-dark me-1 rounded-5 text-white p-2 d-inline-block">
					<label for="sort">Vehicle type:</label>
					<select class="filter border-0 bg-dark text-white" name="sort" id="sort" ref="typeRef" @change="typeFilter()">
						<option value="" selected disabled></option>
						<option value="default">all</option>
						<option value="SUV">SUV</option>
						<option value="sedan">Sedan</option>
						<option value="convertible">convertible</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md mb-1 bg-dark me-1 rounded-5 text-white p-2 d-inline-block">
					<label for="sort">Gearshift:</label>
					<select class="filter border-0 bg-dark text-white" name="sort" id="sort" ref="gearshiftRef" @change="gearshiftFilter()">
						<option value="" selected disabled></option>
						<option value="default">All</option>
						<option value="automatic">Automatic</option>
						<option value="manual">Manual</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md bg-dark rounded-5 text-white p-2 d-inline-block">
					<label for="sort">Passengers:</label>
					<select class="filter border-0 bg-dark text-white" name="sort" id="sort" ref="passengersRef" @change="passengersFilter()">
						<option value="" selected disabled></option>
						<option value="default">all</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="7">7</option>
					</select>
				</div>
			</div>
			<div class="row g-0 my-3">
				<div class="car-column col-sm-6 col-lg-4 p-1 rounded-4" v-for="car of availableCars ? availableCars : localDbavailableCars">
					<div class="bg-dark rounded-4 w-100 p-3 text-white">
						<div class="row w-100 mx-auto">
							<h5>Brand: {{ car.brand }}</h5>
							<h5>Model: {{ car.model }}</h5>
							<div class="bg-light text-black rounded-4 w-auto d-flex me-1">
								<img class="gearshift-icon my-auto" src="../assets/images/manual.png" alt="" /> &nbsp: {{ car.Gearshift }}
							</div>
							<div class="bg-light text-black rounded-4 w-auto d-flex">
								<img class="gearshift-icon my-auto" src="../assets/images/passengers.jpg" alt="" /> &nbsp: {{ car.Passengers }}
							</div>
						</div>
						<div class="row w-100 mx-auto">
							<img class="img-fluid" :src="car.img" alt="car" />
						</div>
						<div class="row w-100 mx-auto">
							<h5>${{ car.pricePerDay }}/Day</h5>
							<h5>Total: {{ parseInt(car.pricePerDay) * differenceInDays }}$</h5>
							<router-link :to="{ path: '/addons' }" class="btn btn-primary w-50 m-auto" @click="bookCar(car)"> Book Now </router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { ref, onMounted } from "vue";

	const priceRef = ref();
	const gearshiftRef = ref();
	const typeRef = ref();
	const passengersRef = ref();
	const carsData = await axios.get("http://localhost:5000/cars");
	const localDbCarsData = await axios.get("http://localhost:5001/cars");
	const localDbCars = localDbCarsData.data;
	const cars = carsData.data;
	let totalPrice;

	//get booking info from sessionStorage
	const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));
	console.log(bookingInfo);

	//Calculating days between pickupDate and returnDate
	const pickupDate = new Date(bookingInfo.pickupDate);
	const returnDate = new Date(bookingInfo.returnDate);
	let differenceInTime = returnDate.getTime() - pickupDate.getTime();
	let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
	console.log(differenceInDays);
	console.log(pickupDate, returnDate);
	console.log(returnDate > pickupDate);

	//new array of cars available in that pickup date
	const availableCars = ref(
		cars.filter((car) => {
			return pickupDate > new Date(car.returnDate) || car.returnDate === "";
		})
	);

	const localDbavailableCars = ref(
		localDbCars.filter((car) => {
			return pickupDate > new Date(car.returnDate) || car.returnDate === "";
		})
	);
	//--

	//filter functions
	const priceFilter = () => {
		if (priceRef.value.value === "lowToHigh") {
			availableCars.value.sort((a, b) => {
				return parseInt(a.pricePerDay) - parseInt(b.pricePerDay);
			});
		} else if (priceRef.value.value === "highToLow") {
			availableCars.value.sort((a, b) => {
				return parseInt(b.pricePerDay) - parseInt(a.pricePerDay);
			});
		}
	};

	const resetFilter = () => {
		availableCars.value = cars.filter((car) => {
			return pickupDate > new Date(car.returnDate) || car.returnDate === "";
		});
		console.log("reset");
	};

	const typeFilter = () => {
		if (typeRef.value.value != "" && typeRef.value.value != "default") {
			resetFilter();
			availableCars.value = availableCars.value.filter((car) => {
				return car.Type === typeRef.value.value;
			});
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (typeRef.value.value === "default") {
			resetFilter();
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		}
	};

	const gearshiftFilter = () => {
		if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
			resetFilter();
			availableCars.value = availableCars.value.filter((car) => {
				return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
			});
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (gearshiftRef.value.value === "default") {
			resetFilter();
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		}
	};

	const passengersFilter = () => {
		if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
			resetFilter();
			availableCars.value = availableCars.value.filter((car) => {
				return car.Passengers === passengersRef.value.value;
			});
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (passengersRef.value.value === "default") {
			resetFilter();
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				availableCars.value = availableCars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		}
	};
	//--

	//save data in session storage and go to addons component
	const bookCar = (car) => {
		totalPrice = parseInt(car.pricePerDay) * differenceInDays;
		console.log(totalPrice);
		bookingInfo.car = car;
		bookingInfo.totalPrice = totalPrice;
		sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
	};
	//--
</script>
