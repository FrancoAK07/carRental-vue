<template>
	<Navbar
		v-if="!userLogged"
		@showLoginForm="loginClick"
		@showRegisterForm="registerClick"
		@loginLink="getLoginLink"
		@registerLink="getRegisterLink"
		@loginLinkHamburger="loginLinkHamburger"
		@registerLinkHamburger="registerLinkHamburger" />
	<LoggedInNavbar v-if="userLogged" :loggedUser="user" @logout="logout" />
	<Suspense timeout="0">
		<router-view :key="$route.fullPath"></router-view>
	</Suspense>
	<Footer />
	<Suspense>
		<div>
			<LoginForm
				v-show="showLoginForm"
				@createAccount="createAccount"
				@createAccountLink="getCreateAccountLink"
				@clickedOut="closeLoginForm"
				@userLogged="userLoggedIn"
				:loginLink="loginLink"
				:signInLinkRef="signInLinkRef"
				:loginHamburger="loginHamburger" />

			<CreateAccountForm
				v-show="showCreateAccountForm"
				@login="signIn"
				@signInLink="getSignInLink"
				@closeRegisterForm="closeRegisterForm"
				:registerLink="registerLink"
				:createAccountLinkRef="createAccountLinkRef"
				:registerHamburger="registerHamburger" />
		</div>
	</Suspense>
</template>

<script setup>
	import Navbar from "./components/Navbar.vue";
	import Footer from "./components/Footer.vue";
	import LoginForm from "./components/LoginForm.vue";
	import CreateAccountForm from "./components/CreateAccountForm.vue";
	import LoggedInNavbar from "./components/LoggedInNavbar.vue";
	import { ref } from "vue";

	let showLoginForm = ref(false);
	let showCreateAccountForm = ref(false);
	const loginLink = ref(null);
	const signInLinkRef = ref(null);
	const createAccountLinkRef = ref(null);
	const registerLink = ref(null);
	const loginHamburger = ref(null);
	const registerHamburger = ref(null);
	let userLogged = ref(sessionStorage.getItem("userLogged"));
	let user;

	const closeLoginForm = () => {
		showLoginForm.value = false;
	};

	const closeRegisterForm = () => {
		showCreateAccountForm.value = false;
	};

	const loginClick = () => {
		showLoginForm.value = !showLoginForm.value;
		showCreateAccountForm.value = false;
	};

	const registerClick = () => {
		showCreateAccountForm.value = !showCreateAccountForm.value;
		showLoginForm.value = false;
	};

	const getLoginLink = (loginlink) => {
		loginLink.value = loginlink.value;
	};

	const getRegisterLink = (registerlink) => {
		registerLink.value = registerlink.value;
	};

	const createAccount = () => {
		showLoginForm.value = false;
		showCreateAccountForm.value = true;
	};

	const signIn = () => {
		showCreateAccountForm.value = false;
		showLoginForm.value = true;
	};

	const getSignInLink = (signInLink) => {
		signInLinkRef.value = signInLink.value;
	};

	const getCreateAccountLink = (createAccountLink) => {
		createAccountLinkRef.value = createAccountLink.value;
	};

	const userLoggedIn = (userData) => {
		user = userData;
		userLogged.value = true;
		sessionStorage.setItem("userLogged", userLogged.value);
	};

	const logout = () => {
		userLogged.value = false;
		sessionStorage.removeItem("userLogged");
	};

	const loginLinkHamburger = (loginhamburger) => {
		loginHamburger.value = loginhamburger;
	};

	const registerLinkHamburger = (registerhamburger) => {
		registerHamburger.value = registerhamburger;
	};
</script>
