<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	const resp = await fetch("/api/posts");
	const postsResp = await resp.json();
	console.log(postsResp);

	axios.get("/api/posts").then((res) => {
		console.log(res.json());
	});
</script>
