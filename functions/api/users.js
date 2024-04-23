import users from "./user/userData";

export function onRequestGet() {
	return Response.json(users);
}
