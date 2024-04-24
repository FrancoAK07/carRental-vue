import unRegisteredUsers from "./unRegisteredUsers";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("No id", { status: 404 });
	}

	const unRegisteredUser = unRegisteredUsers.find((unRegisteredUser) => unRegisteredUser.firstName === String(id));

	console.log(unRegisteredUser);

	if (!unRegisteredUser) {
		return new Response("user not found", { status: 404 });
	}

	return Response.json(unRegisteredUser);
}
