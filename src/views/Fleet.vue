<template>
	<div v-if="showForm" class="dark-background position-fixed bg-black opacity-75 w-100 h-100 top-0 left-0"></div>
	<div class="cars min-vh-100 mt-3 mb-3">
		<div class="available-cars container">
			<div class="row w-75 m-auto text-center">
				<div class="col-12 col-sm-5 col-md bg-dark text-white me-1 rounded-5 p-2 d-flex justify-content-between">
					<label for="sort">Sort by:</label>
					<select class="filter border-0 border-dark bg-dark text-white" name="sort" id="sort" ref="priceRef" @change="priceFilter()">
						<option value="" selected disabled></option>
						<option value="default">all</option>
						<option value="lowToHigh">Price low to high</option>
						<option value="highToLow">Price high to low</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md bg-dark me-1 rounded-5 text-white p-2 d-flex justify-content-between">
					<label for="sort">Vehicle type:</label>
					<select class="filter border-0 bg-dark text-white" name="sort" id="sort" ref="typeRef" @change="typeFilter(), console.log(typeRef.value)">
						<option value="" selected disabled></option>
						<option value="default">all</option>
						<option value="SUV">SUV</option>
						<option value="sedan">Sedan</option>
						<option value="convertible">convertible</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md bg-dark me-1 rounded-5 text-white p-2 d-flex justify-content-between">
					<label for="sort">Gearshift:</label>
					<select class="filter border-0 bg-dark text-white" name="sort" id="sort" ref="gearshiftRef" @change="gearshiftFilter()">
						<option value="" selected disabled></option>
						<option value="default">All</option>
						<option value="automatic">Automatic</option>
						<option value="manual">Manual</option>
					</select>
				</div>
				<div class="col-12 col-sm-5 col-md bg-dark rounded-5 text-white p-2 d-flex justify-content-between">
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
			<div class="row g-0 mt-3">
				<div class="car-column col-sm-6 col-lg-4 p-1 rounded-4" v-for="car of cars">
					<div class="bg-dark rounded-4 w-100 p-3 text-white">
						<div class="row w-100 mx-auto">
							<h5>Brand: {{ car.brand }}</h5>
							<h5>Model: {{ car.model }}</h5>
							<div class="bg-light text-black rounded-4 w-auto d-flex me-1">
								<img class="gearshift-icon my-auto" src="../assets/images/manual.png" alt="" /> &nbsp
								<div class="text-center my-auto">: {{ car.Gearshift }}</div>
							</div>
							<div class="bg-light text-black rounded-4 w-auto d-flex">
								<img class="gearshift-icon my-auto" src="../assets/images/passengers.jpg" alt="" /> &nbsp
								<div class="d-flex align-content-center">: {{ car.Passengers }}</div>
							</div>
						</div>
						<div class="row w-100 mx-auto">
							<img class="img-fluid" :src="car.img" alt="car" />
						</div>
						<div class="row w-100 mx-auto">
							<h5>${{ car.pricePerDay }}/Day</h5>
							<button class="btn btn-primary w-50 m-auto" @click="bookCar" ref="bookCarBtn">Book Now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row" v-if="showForm" ref="formRef">
		<div class="col-12">
			<LocationDateTimeForm class="location-form position-fixed w-100" />
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import axios from "axios";
	import LocationDateTimeForm from "@/components/LocationDate&Time/LocationDateTimeForm.vue";

	let carsData;

	try {
		// carsData = await axios.get("http://localhost:5001/cars");
		// console.log("json-server");
		carsData = axios.get("/api/car").then((res) => {
			console.log(res.data);
			console.log(carsData.data);
		});
	} catch (error) {
		console.log(error);
		carsData = await axios.get("http://localhost:5000/cars");
		console.log("database");
	}

	const cars = ref(carsData.data);

	let priceRef = ref();
	let typeRef = ref();
	let gearshiftRef = ref();
	let passengersRef = ref();
	let formRef = ref();
	let bookCarBtn = ref();

	let showForm = ref(false);

	//arreglar que se cierra cuando elijo el location
	window.addEventListener("click", (e) => {
		if (formRef.value) {
			if (!formRef.value.contains(e.target) && !bookCarBtn.value.includes(e.target)) {
				showForm.value = false;
			}
		}
	});

	const priceFilter = () => {
		if (priceRef.value.value === "lowToHigh") {
			cars.value.sort((a, b) => {
				return parseInt(a.pricePerDay) - parseInt(b.pricePerDay);
			});
		} else if (priceRef.value.value === "highToLow") {
			cars.value.sort((a, b) => {
				return parseInt(b.pricePerDay) - parseInt(a.pricePerDay);
			});
		}
	};

	const resetFilter = () => {
		cars.value = carsData.data;
	};

	const typeFilter = () => {
		if (typeRef.value.value != "" && typeRef.value.value != "default") {
			resetFilter();
			cars.value = cars.value.filter((car) => {
				return car.Type === typeRef.value.value;
			});
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (typeRef.value.value === "default") {
			resetFilter();
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
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
			cars.value = cars.value.filter((car) => {
				return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
			});
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Passengers === passengersRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (gearshiftRef.value.value === "default") {
			resetFilter();
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (passengersRef.value.value != "" && passengersRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
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
			cars.value = cars.value.filter((car) => {
				return car.Passengers === passengersRef.value.value;
			});
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		} else if (passengersRef.value.value === "default") {
			resetFilter();
			if (typeRef.value.value != "" && typeRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Type === typeRef.value.value;
				});
			}
			if (gearshiftRef.value.value != "" && gearshiftRef.value.value != "default") {
				cars.value = cars.value.filter((car) => {
					return car.Gearshift.toLowerCase() === gearshiftRef.value.value;
				});
			}
			if (priceRef.value.value != "" && priceRef.value.value != "default") {
				priceFilter();
			}
		}
	};

	const bookCar = () => {
		showForm.value = true;
	};
</script>
