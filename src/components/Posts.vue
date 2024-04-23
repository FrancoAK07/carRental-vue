<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	import axios from "axios";

	const resp = await fetch("/api/user");
	console.log(resp);
	const postsResp = await resp.json();
	console.log(postsResp);

	axios.get("/api/user").then((res) => {
		console.log(res.data);
	});
</script>
