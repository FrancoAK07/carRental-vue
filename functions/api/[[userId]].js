import users from "./data/users";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("No id", { status: 404 });
	}

	const user = users.find((user) => user.id === Number(id));

	if (!user) {
		return new Response("Not found", { status: 404 });
	}

	return Response.json(user);
}
