// import users from "./users";

// export function onRequestGet(context) {
// 	const id = context.params.id;

// 	if (!id) {
// 		return new Response("No id", { status: 404 });
// 	}

// 	const user = users.find((user) => user.id === id);

// 	if (!user) {
// 		return new Response("user not found", { status: 404 });
// 	}

// 	return Response.json(user);
// }

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
