<template>
	<div class="row">
		<div class="form col-7 col-md-3 position-fixed bg-dark text-white rounded p-3" ref="registerForm">
			<h3 class="text-center">Create Account</h3>
			<div class="row w-100 mx-auto mb-3">
				<label class="fw-bold" for="email">First Name</label>
				<input
					class="w-100 border-0 mb-2"
					type="text"
					name="firstname"
					placeholder="First Name"
					v-model="firstName"
					@change="
						{
							{
								console.log(firstName);
							}
						}
					" />
				<label class="fw-bold" for="email">Last Name</label>
				<input class="w-100 border-0 mb-2" type="text" name="lastname" placeholder="Last Name" v-model="lastName" />
				<label class="fw-bold" for="email">Email</label>
				<input class="w-100 border-0 mb-2" type="text" name="email" placeholder="Enter Your Email" v-model="email" />
				<label class="fw-bold" for="password">Password</label>
				<input class="w-100 border-0" type="password" name="password" placeholder="Enter Your Password" v-model="password" />
			</div>
			<div class="row w-100 mx-auto mb-2">
				<button class="btn btn-primary w-75 mx-auto" @click="createAccount">Create Account</button>
			</div>
			<div class="row w-100 mx-auto text-center">
				<p class="m-0 p-0">
					Already have an account? Sign in <a ref="signInLink" class="text-decoration-none" href="#" @click="signInClick">Here</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { ref, onMounted, onBeforeMount, computed } from "vue";
	import { useToast } from "vue-toastification";
	const registerForm = ref(null);
	const signInLink = ref(null);
	const firstName = defineModel("firstName");
	const lastName = defineModel("lastName");
	const email = defineModel("email");
	const password = defineModel("password");
	const toast = useToast();

	let user = computed(() => ({
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		password: password.value,
	}));

	const emit = defineEmits(["login", "signInLink", "closeRegisterForm"]);
	const props = defineProps(["registerLink", "createAccountLinkRef", "registerHamburger"]);

	const signInClick = () => {
		emit("login");
	};

	onMounted(() => {
		emit("signInLink", signInLink);
	});

	window.addEventListener("click", (e) => {
		if (registerForm.value && props.registerLink) {
			if (
				!registerForm.value.contains(e.target) &&
				!props.registerLink.contains(e.target) &&
				!props.createAccountLinkRef.contains(e.target) &&
				!props.registerHamburger.contains(e.target)
			) {
				emit("closeRegisterForm");
			}
		}
	});

	async function createAccount() {
		if (!firstName.value || !lastName.value || !email.value || !password.value) {
			toast.error("please fill all fields correctly", { timeout: 3000 });
		} else if (!email.value.includes("@")) {
			toast.error("invalid email", { timeout: 2500 });
		} else if (password.value.length < 5) {
			toast.warning("password must be at least 5 characters long", { timeout: 3000 });
		} else {
			try {
				axios.post("http://localhost:5001/users", user.value).then((res) => {
					console.log(res.data);
				});
			} catch (error) {
				axios.post("http://localhost:5000/registerUser", { user: user.value }).then((res) => {
					toast.success(res.data);
					emit("closeRegisterForm");
					firstName.value = "";
					lastName.value = "";
					email.value = "";
					password.value = "";
				});
			}
		}
	}
</script>
