<template>
	<div class="row m-auto">
		<div class="col-8 date-container position-absolute p-0 col-md-5 col-lg-4 top-50 start-50 translate-middle">
			<div class="row bg-dark top-content text-center text-white w-100 mx-auto rounded-top p-2">
				<h3 class="m-0 p-0">What car is on your mind?</h3>
			</div>
			<div class="middle-content row row-gap-2 justify-content-center w-100 m-auto">
				<div class="car-booking row w-100 bg-white p-3 rounded-bottom">
					<div class="col-12">
						<div class="row mt-3">
							<div class="col-12 p-0">
								<div class="row w-100 mx-auto px-2">
									<div class="col-12 col-md p-0 fw-bold">Pickup and Return Location</div>
									<div class="col-12 col-md p-0 d-flex text-nowrap">
										<input class="h-100 me-1" type="checkbox" id="pickupLocation" name="pickupLocation" ref="checkbox" @click="checkIfChecked" />
										<label class="w-auto my-auto p-0" for="pickupLocation">Same return location</label>
									</div>
								</div>
								<div class="row w-100 mx-auto my-2" ref="locationsDiv">
									<input class="rounded border" type="text" placeholder="Pickup Location" @click="changeShowLocations()" v-model="pickupLocation" />
									<div class="position-relative mt-2">
										<ul class="rounded m-0 p-0 bg-dark-subtle position-absolute w-100 start-0 z-3" v-show="showLocations">
											<div class="location rounded py-1 px-2" v-for="location in searchResults" :key="location" @click="setSelected(location)">
												{{ location }}
											</div>
										</ul>
									</div>
								</div>
								<div class="row w-100 mx-auto my-2" ref="locationsDiv2" v-if="!showReturnLocation">
									<input class="rounded border" type="text" placeholder="Return Location" @click="changeShowLocations2()" v-model="returnLocation" />
									<div class="position-relative mt-2">
										<ul class="rounded m-0 p-0 bg-dark-subtle position-absolute w-100 start-0 z-3" v-show="showLocations2">
											<div class="location rounded py-1 px-2" v-for="location in searchResults2" :key="location" @click="setSelected2(location)">
												{{ location }}
											</div>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-12 p-0">
								<div class="row w-100 mx-auto fw-bold px-2">Pickup Date & Time</div>
								<div class="row w-100 mx-auto my-2">
									<DatePicker @pickupDate="getPickupDate" />

									<input
										class="w-25 rounded-end border left"
										type="text"
										placeholder="time"
										onfocus="(this.type = 'time', this.showPicker())"
										onblur="(this.type = 'text')"
										v-model="pickupTime" />
								</div>
							</div>
							<div class="col-12 p-0">
								<div class="row w-100 mx-auto fw-bold px-2">Return Date & Time</div>
								<div class="row w-100 mx-auto my-2">
									<ReturnDatePicker @returnDate="getReturnDate" />
									<input
										class="w-25 rounded-end border left"
										type="text"
										placeholder="time"
										onfocus="(this.type = 'time', this.showPicker())"
										onblur="(this.type = 'text')"
										v-model="returnTime" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 d-flex justify-content-center mt-3 pb-2">
								<router-link :to="{ path: '/cars' }" class="btn bg-primary w-50 p-0"
									><button class="btn text-white w-100">Search</button></router-link
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch } from "vue";
	import { onBeforeRouteLeave } from "vue-router";
	import DatePicker from "../LocationDate&Time/DatePicker.vue";
	import ReturnDatePicker from "../LocationDate&Time/ReturnDatePicker.vue";
	import { useToast } from "vue-toastification";

	const toast = useToast();
	const locationsDiv = ref(null);
	const locationsDiv2 = ref(null);
	let pickupDate = ref("");
	let returnDate = ref("");
	let pickupTime = ref("");
	let returnTime = ref("");
	let pickupLocation = ref("");
	let returnLocation = ref("");
	let checkbox = ref(null);
	let showReturnLocation = ref(false);
	const locations = ["Miami Int Airport", "Madrid Airport", "Caracas Int Airport", "Berlin Airport"];
	let showLocations = ref(null);
	let showLocations2 = ref(null);

	//save variables that are needed in other components in an object
	let bookingInfo = computed(() => ({
		pickupLocation: pickupLocation.value,
		returnLocation: returnLocation.value,
		pickupDate: pickupDate.value,
		returnDate: returnDate.value,
		pickupTime: pickupTime.value,
		returnTime: returnTime.value,
	}));
	//--

	//save the object holding the variables to session storage every time a property changes
	watch(
		bookingInfo,
		() => {
			sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo.value));
		},
		{ deep: true }
	);
	//--

	//get pickup date from DatePicker component
	function getPickupDate(pickup) {
		pickupDate.value = pickup;
		console.log(pickupDate.value);
	}
	//--

	//get the return date from ReturnDatePicker component
	function getReturnDate(returndate) {
		returnDate.value = returndate;
		console.log(returnDate.value);
	}
	//--

	//filter results of locations
	const searchResults = computed(() => {
		if (pickupLocation.value === "") {
			return locations;
		}

		return locations.filter((location) => {
			return location.toLowerCase().includes(pickupLocation.value.toLowerCase());
		});
	});

	const searchResults2 = computed(() => {
		if (returnLocation.value === "") {
			return locations;
		}

		return locations.filter((location) => {
			return location.toLowerCase().includes(returnLocation.value.toLowerCase());
		});
	});
	//--

	//close locations div when clicking on a location
	function setSelected(location) {
		pickupLocation.value = location;
		showLocations.value = false;
	}
	//--

	function setSelected2(location) {
		returnLocation.value = location;
		showLocations2.value = false;
	}

	//show locations div when choosing a location a close it when clicking a location and showLocations is false
	function changeShowLocations() {
		showLocations.value = true;
	}

	function changeShowLocations2() {
		showLocations2.value = true;
	}
	//--

	//show return location input if the return location is not the same
	function checkIfChecked() {
		console.log(checkbox.value.checked);
		showReturnLocation.value = checkbox.value.checked;
	}
	//--

	//check if user filled all the fields correctly
	onBeforeRouteLeave(async (to, from, next) => {
		if (to.path === "/cars") {
			if (!pickupDate.value || !returnDate.value) {
				alert("Please enter a pickup and return date");
				next(false);
			} else if (new Date(pickupDate.value) >= new Date(returnDate.value)) {
				console.log(new Date(pickupDate.value) > new Date(returnDate.value));
				alert("invalid dates");
				next(false);
			} else if (checkbox.value.checked && !locations.includes(pickupLocation.value)) {
				alert("please choose a valid pickup location");
				next(false);
			} else if (!checkbox.value.checked && !locations.includes(pickupLocation.value) && !locations.includes(returnLocation.value)) {
				console.log(!locations.includes(pickupLocation.value));
				console.log(!locations.includes(returnLocation.value));
				alert("please choose a valid pickup and return location");
				next(false);
			} else if (!pickupTime.value || !returnTime.value) {
				alert("please enter a pickup and return time");
				next(false);
			} else {
				next(true);
			}
		} else {
			next(true);
		}
	});
	//--

	//Close locations list on click outside
	window.addEventListener("click", (e) => {
		if (locationsDiv.value && !locationsDiv.value.contains(e.target)) {
			showLocations.value = false;
		}
		if (locationsDiv2.value && !locationsDiv2.value.contains(e.target)) {
			showLocations2.value = false;
		}
	});
</script>
