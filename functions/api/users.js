import users from "./user/userData.js";

export default function onRequestGet() {
	return Response.json(users);
}
