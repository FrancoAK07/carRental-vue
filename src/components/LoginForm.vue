<template>
	<div class="row">
		<div class="form col-7 col-md-3 position-fixed bg-dark text-white rounded p-3" ref="loginForm">
			<h3 class="text-center">Login</h3>
			<div class="row w-100 mx-auto mb-3">
				<label class="fw-bold" for="email">Email</label>
				<input class="w-100 border-0 mb-2" type="text" name="email" placeholder="Enter Your Email" v-model="email" />
				<label class="fw-bold" for="password">Password</label>
				<input class="w-100 border-0" type="password" name="password" placeholder="Enter Your Password" v-model="password" />
			</div>
			<div class="row w-100 mx-auto mb-2">
				<button class="btn btn-primary w-50 mx-auto" @click="login">Log In</button>
			</div>
			<div class="row w-100 mx-auto text-center">
				<p class="m-0 p-0">
					Don't have an account? Register <a ref="createAccountLink" class="text-decoration-none" href="#" @click="emit('createAccount')">Here</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch } from "vue";
	import axios from "axios";
	import { useToast } from "vue-toastification";

	const createAccountLink = ref(null);
	const loginForm = ref(null);
	const email = defineModel("email");
	const password = defineModel("password");
	let user;
	const toast = useToast();

	const props = defineProps(["loginLink", "signInLinkRef", "loginHamburger"]);
	const emit = defineEmits(["createAccount", "createAccountLink", "clickedOut", "userLogged"]);

	onMounted(() => {
		emit("createAccountLink", createAccountLink);
	});

	window.addEventListener("click", (e) => {
		if (loginForm.value && props.loginLink) {
			if (
				!loginForm.value.contains(e.target) &&
				!props.loginLink.contains(e.target) &&
				!props.signInLinkRef.contains(e.target) &&
				!props.loginHamburger.contains(e.target)
			) {
				emit("clickedOut");
			}
		}
	});

	//see if credentials are correct
	const login = async () => {
		if (!email.value || !password.value) {
			toast.warning("please fill all fields");
		} else {
			const loginUserRes = await axios.post("http://localhost:5000/login", { email: email.value, password: password.value });
			console.log(loginUserRes.data);
			if (loginUserRes.data.user) {
				user = loginUserRes.data.user;
				sessionStorage.setItem("user", JSON.stringify(user));
				console.log(user);
				toast.success(loginUserRes.data.message, { timeout: 1500 });
				emit("userLogged", user);
				emit("clickedOut");
				email.value = "";
				password.value = "";
			} else {
				toast.warning(loginUserRes.data);
			}
		}
	};
</script>
