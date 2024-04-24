import addons from "./data/addons";

export function onRequestGet() {
	return Response.json(addons);
}
