<template>
	<div class="container min-vh-100">
		<div class="row text-center my-2 align-content-center p-2">
			<h1 class="fw-bold text-nowrap m-0 p-0">Would you like any add-ons?</h1>
		</div>
		<div class="col row-gap-2 d-grid">
			<div class="row add-on border border-2 rounded p-3 w-75 m-auto" v-for="(addon, index) in addons">
				<div class="col fw-bold">
					<div class="row">{{ addon.name }}</div>
					<div class="row">${{ addon.price }}/day</div>
				</div>
				<div class="col">
					<div class="row justify-content-end">
						<a class="text-decoration-none w-auto" href="#" @click="displayDetails(index)" ref="linkRef">Details</a>
						<input class="ms-1" type="checkbox" ref="checkedRef" @click="addToTotal(index, addon)" />
					</div>
				</div>
				<div class="col-12" v-if="details[index]">{{ addon.details }}</div>
			</div>
		</div>
		<div class="row mt-3 w-75 mx-auto justify-content-between">
			<div class="col-12 col-md text-center mb-2 mb-md-0">
				<h1 class="w-auto m-0">Total: ${{ totalPrice.toFixed(2) }}</h1>
			</div>
			<div class="col-12 col-md d-flex justify-content-center">
				<router-link :to="{ path: checkoutPath }" class="btn btn-primary w-auto my-auto" @click="saveToSessionStorage()">
					Continue
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import axios from "axios";

	//get booking info from sessionStorage
	const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));
	console.log(bookingInfo);
	//--

	let details = [false, false];
	const linkRef = ref(null);
	const checkedRef = ref(null);
	let addonsData;
	let selectedAddons = [];
	let userIsLogged = JSON.parse(sessionStorage.getItem("user"));

	addonsData = await axios.get("https://carrental-vue.onrender.com/addons");

	const addons = addonsData.data;

	console.log(addons);

	//handle next route path
	const checkoutPath = computed(() => {
		if (userIsLogged) {
			return "/usercheckout";
		} else {
			return "/checkout";
		}
	});
	//--

	console.log(addons);

	let pickupDate = new Date(bookingInfo.pickupDate);
	let returnDate = new Date(bookingInfo.returnDate);
	let totalPrice = ref(bookingInfo.totalPrice);
	console.log("totalPrice", bookingInfo.totalPrice);

	onMounted(() => {
		console.log(linkRef.value);
		console.log(checkedRef.value);
	});

	const displayDetails = (index) => {
		details[index] = !details[index];
		linkRef.value[index].innerHTML = linkRef.value[index].innerHTML === "Details" ? "Close details" : "Details";
	};

	const differenceInDays = computed(() => {
		const differenceInTime = returnDate.getTime() - pickupDate.getTime();
		return Math.round(differenceInTime / (1000 * 3600 * 24));
	});

	const addToTotal = (index, addon) => {
		if (checkedRef.value[index].checked) {
			totalPrice.value = parseFloat(totalPrice.value) + parseFloat(addon.price) * differenceInDays.value;
			if (!selectedAddons.includes(addon)) {
				selectedAddons.push(addon);
			}
		} else if (!checkedRef.value[index].checked) {
			totalPrice.value = parseFloat(totalPrice.value) - parseFloat(addon.price) * differenceInDays.value;
			selectedAddons = selectedAddons.filter((item) => {
				return item.name !== addon.name;
			});
		}
		console.log(selectedAddons);
	};

	function saveToSessionStorage() {
		bookingInfo.totalPlusAddons = totalPrice.value;
		bookingInfo.selectedAddons = selectedAddons;
		sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
	}
</script>
