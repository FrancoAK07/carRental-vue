import users from "./userData/users";

export function onRequestPost() {
	return Response.json(users);
}
