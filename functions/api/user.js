import users from "./userData/users";

export function onRequestGet() {
	return Response.json(users);
}
