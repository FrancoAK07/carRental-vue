import users from "./data/users";

export function onRequestGet() {
	return Response.json(users);
}
