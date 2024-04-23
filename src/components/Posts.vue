<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	axios.get("/api/posts").then((res) => {
		console.log(res.json());
	});
</script>
