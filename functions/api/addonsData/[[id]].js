import addons from "./addons";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("No id", { status: 404 });
	}

	const addon = addons.find((addon) => addon.id === Number(id));

	if (!addon) {
		return new Response("user not found", { status: 404 });
	}

	return Response.json(addon);
}
