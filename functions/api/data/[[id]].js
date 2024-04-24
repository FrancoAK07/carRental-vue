import users from "./users";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("Not found", { status: 404 });
	}

	const post = users.find((post) => post.id === Number(id));

	if (!post) {
		return new Response("Not found", { status: 404 });
	}

	return Response.json(post);
}
