import users from "./post/users";

export function onRequestGet() {
	return Response.json(users);
}
