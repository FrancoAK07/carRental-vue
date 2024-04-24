import users from "./data/users";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("Not found", { status: 404 });
	}

	const user = users.find((user) => user.id === id);

	if (!user) {
		return new Response("not foun", { status: 404 });
	}

	return Response.json(user);
}
