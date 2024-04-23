<template>
	<div>
		<h1>Test</h1>
	</div>
</template>

<script setup>
	const resp = await fetch("/api/posts");
	const postsResp = await resp.json();
	console.log(postsResp);
</script>
