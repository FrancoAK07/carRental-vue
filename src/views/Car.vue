<template>
	<div class="car-details container min-vh-100">
		<div class="row w-75 mx-auto">
			<div class="col-8 text-center p-0"><img class="img-fluid bg-light" :src="props.carData.img" alt="car-img" /></div>
			<div class="col-4 p-0 mt-auto">
				<div class="row">
					<h4>Brand: {{ props.carData.brand }}</h4>
				</div>
				<div class="row">
					<h4>Model: {{ props.carData.model }}</h4>
				</div>
				<div class="row">
					<h4>Daily: {{ props.carData.pricePerDay }}</h4>
				</div>
				<div class="row justify-content-center mt-2">
					<button class="btn btn-primary w-50 text-nowrap">book now</button>
				</div>
			</div>
		</div>
		<div class="row text-center mt-4 fw-bold w-75 mx-auto">
			<h1 class="mb-3">vehicle fetures</h1>
			<div class="col-2 text-center my-auto">
				<img class="img-fluid w-50" src="../assets/images/doors.png" alt="" />
				<p>4 doors</p>
			</div>
			<div class="col-2 text-center">
				<img class="img-fluid w-50" src="../assets/images/passengers.jpg" alt="" />
				<p>5 passengers</p>
			</div>
			<div class="col-2 text-center">
				<img class="img-fluid w-50" src="../assets/images/doors.png" alt="" />
				<p>4 doors</p>
			</div>
			<div class="col-2 text-center">
				<img class="img-fluid w-50" src="../assets/images/doors.png" alt="" />
				<p>4 doors</p>
			</div>
			<div class="col-2 text-center">
				<img class="img-fluid w-50" src="../assets/images/doors.png" alt="" />
				<p>4 doors</p>
			</div>
			<div class="col-2 text-center">
				<img class="img-fluid w-50" src="../assets/images/doors.png" alt="" />
				<p>4 doors</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps(["carData"]);

	console.log(props.carData);
</script>
