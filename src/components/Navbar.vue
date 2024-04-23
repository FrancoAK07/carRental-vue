<template>
	<div class="navbar text-nowrap w-100 m-auto bg-dark text-white position-relative">
		<div class="row m-auto d-none d-sm-flex">
			<router-link :to="{ path: '/' }" class="col text-decoration-none">Home</router-link>
			<router-link :to="{ path: '/fleet' }" class="col text-decoration-none">Fleet</router-link>
			<router-link :to="{ path: '/emailbooking' }" class="col text-decoration-none my-auto">Bookings</router-link>
		</div>
		<div class="row position-absolute end-0 me-2 d-none d-sm-flex">
			<div class="col" ref="loginLink" v-show="route.path === '/'">
				<router-link :to="{ path: '#' }" class="loginlink text-decoration-none" @click="handleLoginClick">Login</router-link>
			</div>
			<div class="col" ref="registerLink" v-show="route.path === '/'">
				<router-link :to="{ path: '#' }" class="registerlink text-decoration-none" @click="handleRegisterClick">Register</router-link>
			</div>
		</div>
		<div class="hamburger-menu m-auto d-sm-none" ref="hamburgerMenu" @click="hamburgerMenuClicked">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>
		<div class="navbar-links row bg-dark position-absolute w-100 m-auto p-2 start-0 z-2" ref="hamburgerLinks" v-show="showHamburgerMenu">
			<div class="col-12 p-0">
				<div class="row p-1 m-auto justify-content-center">
					<router-link :to="{ path: '/' }" class="text-decoration-none p-0 w-auto">Home</router-link>
				</div>
				<div class="row p-1 m-auto justify-content-center">
					<router-link :to="{ path: '/fleet' }" class="text-decoration-none p-0 w-auto">Fleet</router-link>
				</div>
				<div class="row p-1 m-auto justify-content-center">
					<router-link :to="{ path: '/emailbooking' }" class="text-decoration-none p-0 w-auto">Bookings</router-link>
				</div>
				<div class="row p-1 m-auto justify-content-center" ref="loginLinkHamburger" v-show="route.path === '/'">
					<router-link :to="{ path: '#' }" class="loginlink text-decoration-none p-0 w-auto" @click="handleLoginClick">Login</router-link>
				</div>
				<div class="row p-1 m-auto justify-content-center" ref="registerLinkHamburger" v-show="route.path === '/'">
					<router-link :to="{ path: '#' }" class="registerlink text-decoration-none p-0 w-auto" @click="handleRegisterClick">Register</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch } from "vue";
	import { useRoute } from "vue-router";
	import axios from "axios";

	const loginLink = ref(null);
	const registerLink = ref(null);
	const emit = defineEmits(["showLoginForm", "loginLink", "showRegisterForm", "registerLink", "loginLinkHamburger", "registerLinkHamburger"]);
	const hamburgerMenu = ref(null);
	let showHamburgerMenu = ref(false);
	const loginLinkHamburger = ref(null);
	const registerLinkHamburger = ref(null);
	const hamburgerLinks = ref(null);

	onMounted(() => {
		emit("loginLink", loginLink);
		emit("registerLink", registerLink);
		emit("loginLinkHamburger", loginLinkHamburger.value);
		emit("registerLinkHamburger", registerLinkHamburger.value);
		console.log(loginLinkHamburger.value);
	});

	const handleLoginClick = () => {
		console.log("login emit");
		emit("showLoginForm");
		if (showHamburgerMenu.value) {
			showHamburgerMenu.value = false;
			hamburgerMenu.value.classList.toggle("hamburgerActive");
		}
	};

	const handleRegisterClick = () => {
		showHamburgerMenu.value = false;
		hamburgerMenu.value.classList.toggle("hamburgerActive");
		console.log("register emit");
		emit("showRegisterForm");
		if (showHamburgerMenu.value) {
			showHamburgerMenu.value = false;
			hamburgerMenu.value.classList.toggle("hamburgerActive");
		}
	};

	const route = useRoute();

	watch(route, () => {
		console.log(route.path);
	});

	const hamburgerMenuClicked = () => {
		showHamburgerMenu.value = !showHamburgerMenu.value;
		hamburgerMenu.value.classList.toggle("hamburgerActive");
	};

	window.addEventListener("click", (e) => {
		if (showHamburgerMenu.value) {
			if (!hamburgerLinks.value.contains(e.target) && !hamburgerMenu.value.contains(e.target)) {
				showHamburgerMenu.value = false;
				hamburgerMenu.value.classList.remove("hamburgerActive");
			}
		}
	});

	axios.get("/api/posts").then((res) => {
		console.log(res.json());
	});
</script>
