import addons from "./addonsData/addons";

export function onRequestGet() {
	return Response.json(addons);
}
