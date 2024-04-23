<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	import axios from "axios";
	axios.get("/api/posts").then((res) => {
		console.log(res.json());
	});
</script>
