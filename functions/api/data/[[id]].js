import users from "./users";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("Not found", { status: 404 });
	}

	const client = users.find((user) => user.id === Number(id));

	if (!client) {
		return new Response("Not found", { status: 404 });
	}

	return Response.json(client);
}
