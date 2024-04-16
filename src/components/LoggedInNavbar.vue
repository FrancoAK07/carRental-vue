<template>
	<div class="navbar text-nowrap w-100 bg-dark text-white position-relative">
		<div class="row text-center m-auto d-none d-sm-flex">
			<router-link :to="{ path: '/' }" class="col text-decoration-none my-auto">Home</router-link>
			<router-link :to="{ path: '/fleet' }" class="col text-decoration-none my-auto">Fleet</router-link>
			<router-link :to="{ path: '/bookings' }" class="col text-decoration-none my-auto">Bookings</router-link>
		</div>
		<div class="row position-absolute end-0 me-2 position-relative">
			<h3 class="user-name ms-auto my-auto text-end" @click="showLogout = !showLogout" ref="userName">{{ user.firstName }}</h3>
		</div>
		<div class="logout-btn col position-absolute d-flex justify-content-end bg-dark rounded p-2 end-0" v-if="showLogout" ref="logoutDiv">
			<button class="btn btn-danger w-100" @click="handleLogout">Logout</button>
		</div>
		<div class="hamburger-menu m-auto d-sm-none" ref="hamburgerMenu" @click="hamburgerMenuClicked">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>
		<div class="navbar-links row bg-dark position-absolute w-100 m-auto start-0 z-3" ref="hamburgerLinks" v-if="showHamburgerMenu">
			<div class="col-12 p-0">
				<div class="row p-0 m-auto justify-content-center">
					<router-link :to="{ path: '/' }" class="text-decoration-none p-0 w-auto">Home</router-link>
				</div>
				<div class="row p-0 m-auto justify-content-center">
					<router-link :to="{ path: '/fleet' }" class="text-decoration-none p-0 w-auto">Fleet</router-link>
				</div>
				<div class="row p-0 m-auto justify-content-center">
					<router-link :to="{ path: '/bookings' }" class="text-decoration-none p-0 w-auto">Bookings</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";

	const props = defineProps(["loggedUser"]);
	const user = JSON.parse(sessionStorage.getItem("user"));
	const emit = defineEmits(["logout"]);
	let showLogout = ref(false);
	const route = useRouter();
	const logoutDiv = ref(null);
	const userName = ref(null);
	const hamburgerMenu = ref(null);
	let showHamburgerMenu = ref(false);
	const hamburgerLinks = ref(null);

	const handleLogout = () => {
		emit("logout");
		sessionStorage.removeItem("user");
		route.push({ path: "/" });
	};

	window.addEventListener("click", (e) => {
		if (logoutDiv.value) {
			if (!logoutDiv.value.contains(e.target) && !userName.value.contains(e.target)) {
				showLogout.value = false;
			}
		}
		if (showHamburgerMenu.value) {
			if (!hamburgerLinks.value.contains(e.target) && !hamburgerMenu.value.contains(e.target)) {
				showHamburgerMenu.value = false;
				hamburgerMenu.value.classList.toggle("hamburgerActive");
			}
		}
	});

	const hamburgerMenuClicked = () => {
		showHamburgerMenu.value = !showHamburgerMenu.value;
		hamburgerMenu.value.classList.toggle("hamburgerActive");
	};
</script>
