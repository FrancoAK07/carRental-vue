<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	import axios from "axios";

	const resp = await fetch("/api/posts");
	console.log(resp);
	const postsResp = await resp.json();
	console.log(postsResp);

	axios.get("/api/posts").then((res) => {
		console.log(res);
		const data = res.json();
		console.log(data);
	});
</script>
