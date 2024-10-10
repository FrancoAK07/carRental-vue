<template>
	<div class="position-relative min-vh-100">
		<div class="container p-2">
			<div class="row">
				<div class="col-12 text-center col-md">
					<h1 class="d-inline m-0">Review your booking</h1>
				</div>
				<div class="col-12 text-center col-md">
					<div class="row">
						<h1 class="d-inline m-0">
							Total: ${{ bookingInfo.totalPlusAddons ? bookingInfo.totalPlusAddons.toFixed(2) : bookingInfo.totalPrice }}
						</h1>
					</div>
					<div class="row justify-content-end">
						<div class="col-12">
							<a class="text-decoration-none w-auto ms-auto" ref="detailsLinkRef" href="#" @click="showDetails = !showDetails"
								>Price details</a
							>
						</div>
						<div
							ref="details"
							class="price-details col-11 col-md-4 text-light bg-dark rounded text-start position-absolute top-50 start-50 translate-middle p-0"
							v-if="showDetails">
							<div class="row px-3 py-3 m-0 text-center"><h1 class="m-0 p-0">Price details</h1></div>
							<div class="row px-3 pb-1 text-nowrap w-100 mx-auto">
								<div class="col me-5 p-0">Daily/${{ bookingInfo.car.pricePerDay }} x {{ differenceInDays }} Rental days</div>
								<div class="col text-end p-0">${{ bookingInfo.totalPrice }}</div>
							</div>
							<div class="row px-3 pb-1 text-nowrap w-100 mx-auto" v-for="addon of bookingInfo.selectedAddons">
								<div class="col me-5 p-0">{{ addon.name }} ${{ addon.price }} x {{ differenceInDays }} Rental days</div>
								<div class="col text-end p-0">${{ (addon.price * differenceInDays).toFixed(2) }}</div>
							</div>
							<div>
								<h5 class="fw-bold border-top border-light px-3 py-3 mt-2 mb-0 text-center">
									Total: ${{ bookingInfo.totalPlusAddons ? bookingInfo.totalPlusAddons.toFixed(2) : bookingInfo.totalPrice }}
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-bottom"></div>
		<div class="container mt-4">
			<div class="row justify-content-center">
				<div class="col-10 col-md-4 bg-dark text-light p-0 rounded-3">
					<div class="row w-100 m-auto">
						<div class="col p-3">
							<img class="img-fluid w-100 bg-dark-subtle rounded-3" :src="bookingInfo.car.img" alt="" />
						</div>
					</div>
					<div class="row px-3 mx-auto">
						<div class="col p-0 py-1">
							<div class="row m-auto">Brand: {{ bookingInfo.car.brand }}</div>
							<div class="row m-auto">Model: {{ bookingInfo.car.model }}</div>
							<div class="row m-auto">{{ differenceInDays }} rental days</div>
						</div>
						<div class="col-12 fw-bold p-0">Pickup</div>
						<div class="col-12 px-0 py-1 ms-2">
							<img src="../assets/images/house-icon2.png" alt="" /> {{ bookingInfo.pickupLocation }}
						</div>
						<div class="col-12 pickupDate px-0 pt-1 pb-2 ms-2">
							Pickup date: {{ lastPickupDate.replace("04:00:00", `| ${pickupTime}`) }}
						</div>
						<div class="col-12 fw-bold p-0">Return</div>
						<div class="col-12 px-0 py-1 ms-2">
							<img src="../assets/images/house-icon2.png" alt="" />
							{{ bookingInfo.returnLocation ? bookingInfo.returnLocation : bookingInfo.pickupLocation }}
						</div>
						<div class="col-12 returnDate px-0 pt-1 pb-2 ms-2">
							Return date: {{ lastReturnDate.replace("04:00:00", `| ${returnTime}`) }}
						</div>
					</div>
					<div class="row border-top border-light px-3 pb-2 w-100 mx-auto" v-if="bookingInfo.selectedAddons.length">
						<h5 class="text-center m-0 pt-2 px-0">Add-ons</h5>
						<p class="m-0 py-1 px-0" v-for="addon of bookingInfo.selectedAddons">
							<img :src="addon.img" alt="" /> {{ addon.name }}
						</p>
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-10 col-md-4 mt-3 mb-3 d-flex justify-content-center p-0">
					<button class="btn btn-primary text-center w-100 text-nowrap" @click="saveBooking">Confirm Booking</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import { useToast } from "vue-toastification";
	import { useRouter } from "vue-router";

	//get booking info from sessionStorage
	const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));
	const user = JSON.parse(sessionStorage.getItem("user"));
	console.log(bookingInfo.car._id);
	//--
	const router = useRouter();
	const toast = useToast();
	const pickupDate = new Date(bookingInfo.pickupDate);
	const returnDate = new Date(bookingInfo.returnDate);
	const lastPickupDate = pickupDate.toUTCString().replace("GMT", "");
	const lastReturnDate = returnDate.toUTCString().replace("GMT", "");
	const pickupTime = convertTo12HourFormat(bookingInfo.pickupTime);
	const returnTime = convertTo12HourFormat(bookingInfo.returnTime);
	let differenceInTime = returnDate.getTime() - pickupDate.getTime();
	let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
	let showDetails = ref(false);
	const details = ref();
	const detailsLinkRef = ref();
	let email = defineModel("email");
	let userBooking = {};

	window.addEventListener("click", (e) => {
		if (details.value) {
			if (!details.value.contains(e.target) && !detailsLinkRef.value.contains(e.target)) {
				showDetails.value = false;
			}
		}
	});

	function convertTo12HourFormat(time) {
		const [hours, minutes] = time.split(":");
		let period = "AM";
		if (hours >= 12) {
			period = "PM";
		}

		let hours12 = hours % 12 || 12;

		return `${hours12}:${minutes} ${period}`;
	}

	onMounted(() => {
		userBooking = {
			carImg: bookingInfo.car.img,
			carBrand: bookingInfo.car.brand,
			carModel: bookingInfo.car.model,
			pickupLocation: bookingInfo.pickupLocation,
			returnLocation: bookingInfo.returnLocation,
			pickupDate: lastPickupDate.replace("04:00:00", "").trim(),
			returnDate: lastReturnDate.replace("04:00:00", "").trim(),
			pickupTime: pickupTime,
			returnTime: returnTime,
			rentalDays: differenceInDays,
			pricePerDay: bookingInfo.car.pricePerDay,
			totalPrice: bookingInfo.totalPrice,
			totalPlusAddons: bookingInfo.totalPlusAddons,
			addons: bookingInfo.selectedAddons,
		};
	});

	function saveBooking() {
		if (userBooking.returnLocation === "") {
			userBooking.returnLocation = userBooking.pickupLocation;
		}
		axios
			.post("https://carrental-vue-server-production.up.railway.app/userbooking", { booking: userBooking, email: user.email })
			.then((res) => {
				toast(res.data, { timeout: 3000 });
			});
		axios.post("https://carrental-vue-server-production.up.railway.app/carReturnDate", {
			carReturnDate: userBooking.returnDate,
			carId: bookingInfo.car._id,
		});

		router.push({ path: "/" });
	}
</script>
