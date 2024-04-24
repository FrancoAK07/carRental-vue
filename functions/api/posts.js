import posts from "./data/data";

export function onRequestGet() {
	return Response.json(posts);
}
