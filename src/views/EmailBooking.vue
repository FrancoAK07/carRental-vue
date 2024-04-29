<template>
	<div class="min-vh-100 row w-100 m-auto justify-content-center">
		<div class="col-10 col-md-4 position-relative p-0">
			<div class="row position-absolute w-100 m-auto top-50 start-50 translate-middle bg-dark text-white p-3 rounded">
				<div class="col-12 d-flex justify-content-center">
					<label class="text-nowrap" for="email">Enter email to check bookings</label>
				</div>
				<div class="col-12 d-flex justify-content-center my-3">
					<input class="w-100" type="text" name="email" placeholder="Email..." v-model="bookingEmail" />
				</div>
				<div class="col-12 d-flex justify-content-center">
					<router-link :to="{ path: '/bookings' }" class="text-decoration-none my-auto btn btn-primary w-100">Next</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { onBeforeRouteLeave } from "vue-router";
	import { useToast } from "vue-toastification";

	const toast = useToast();
	const bookingEmail = defineModel("bookingEmail");
	let users;
	let unregisteredUsers;

	users = await axios.get("http://localhost:5000/getUsers");
	unregisteredUsers = await axios.get("http://localhost:5000/getUnregisteredUsers");

	console.log(users);
	console.log(unregisteredUsers);

	onBeforeRouteLeave((to, from, next) => {
		if (to.path === "/bookings") {
			if (bookingEmail.value) {
				if (bookingEmail.value.includes("@")) {
					for (let user of users.data) {
						if (user.email === bookingEmail.value) {
							toast("you already have an account! Log in and check your bookings");
							next(false);
							return;
						}
					}
					for (let user of unregisteredUsers.data) {
						if (user.email === bookingEmail.value) {
							sessionStorage.setItem("bookingEmail", bookingEmail.value);
							next(true);
							return;
						}
					}
					toast.error("user not found");
					next(false);
				} else {
					toast.warning("enter a valid email");
					next(false);
				}
			} else {
				toast.error("enter your email");
				next(false);
			}
		} else {
			next(true);
		}
	});
</script>
