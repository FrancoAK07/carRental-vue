<template>
	<div class="home mb-4">
		<div class="header">
			<div class="position-relative d-flex justify-content-center h-100 w-100">
				<img class="img-fluid w-100" src="../assets/images/carbg.jpg" alt="" />
				<LocationDateTimeForm />
			</div>
		</div>
		<div class="main-content container mt-5">
			<div class="whychooseus row mb-5">
				<h2 class="text-center mb-3">Why choose us?</h2>
				<div class="col-sm-12 col-lg p-2">
					<div class="bg-light h-100 rounded">
						<div class="row bg-primary text-white rounded-top align-content-center w-100 mx-auto">
							<h5 class="text-center m-0 p-1">Simple and easy</h5>
						</div>
						<p class="p-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quaerat mollitia, fuga voluptatem similique iure architecto dolore sit
							nam voluptatibus. Omnis iste fugit error obcaecati nobis similique alias modi ut.
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg p-2">
					<div class="bg-light h-100 rounded">
						<div class="row bg-primary text-white rounded-top align-content-center w-100 mx-auto">
							<h5 class="text-center m-0 p-1">Every car for your needs</h5>
						</div>
						<p class="p-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nam cumque possimus odio ipsa veniam officiis eveniet corporis ducimus
							optio perspiciatis distinctio dolorum fugit illum praesentium autem consequuntur at nisi, deleniti, ab porro, temporibus mollitia sunt
							iusto? Impedit, asperiores. Laboriosam?
						</p>
					</div>
				</div>
				<div class="col-sm-12 col-lg p-2">
					<div class="bg-light h-100 rounded">
						<div class="row bg-primary text-white rounded-top align-content-center w-100 mx-auto">
							<h5 class="text-center m-0 p-1">Outstanding customer service</h5>
						</div>
						<p class="p-2">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptatibus blanditiis repellendus eos dicta nisi deleniti amet
							consequatur minima debitis.
						</p>
					</div>
				</div>
			</div>
			<div class="car-type row text-center bg-white justify-content-center">
				<h2 class="mb-4">We have a great selection of vehicles</h2>
				<div class="col-lg-3 mb-lg-0 col-md-5 col-12 p-2">
					<div class="cars text-center text-black bg-light rounded">
						<div class="row bg-primary rounded-top align-content-center w-100 mx-auto">
							<h5 class="m-0 p-1 text-white">Cars</h5>
						</div>
						<p>compact and fuel-efficient</p>
						<img class="img-fluid" src="../assets/images/cars.png" alt="" />
					</div>
				</div>
				<div class="col-lg-3 mb-lg-0 col-md-5 col-12 p-2">
					<div class="electric text-center text-black bg-light rounded">
						<div class="row bg-primary rounded-top align-content-center w-100 mx-auto">
							<h5 class="m-0 p-1 text-white">Electric</h5>
						</div>
						<p>full electric and hybrids</p>
						<img class="img-fluid" src="../assets/images/electric.png" alt="" />
					</div>
				</div>
				<div class="col-lg-3 mb-lg-0 col-md-5 col-12 p-2">
					<div class="suv text-center text-black bg-light rounded">
						<div class="row bg-primary rounded-top align-content-center w-100 mx-auto">
							<h5 class="m-0 p-1 text-white">SUVs</h5>
						</div>
						<p>ideal for family travels</p>
						<img class="img-fluid" src="../assets/images/suv.png" alt="" />
					</div>
				</div>
				<div class="col-lg-3 mb-lg-0 col-md-5 col-12 p-2">
					<div class="vans text-center text-black bg-light rounded">
						<div class="row bg-primary rounded-top align-content-center w-100 mx-auto">
							<h5 class="m-0 p-1 text-white">Luxury</h5>
						</div>
						<p>travel in style</p>
						<img class="img-fluid" src="../assets/images/luxury.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<button class="btn btn-primary" @click="postUser()">POST</button>
</template>

<script setup>
	import LocationDateTimeForm from "@/components/LocationDate&Time/LocationDateTimeForm.vue";
	import axios from "axios";

	const user = await axios.get("/api/unRegisteredUser");
	console.log(user.data);

	const carsData = await fetch("/api/carsData/afa0");
	const car = await carsData.json();
	console.log(car);

	const person = await axios.get(`/api/unRegisteredUsersData/cris@email`);
	console.log(person);

	const users = {
		id: 4,
		firstName: "lucky",
		lastName: "cat",
		email: "lucky@email",
		password: "luckythecat",
	};

	function postUser() {
		const post = axios.post(`/api/userPost/${users}`);
	}
</script>
