import unRegisteredUsers from "./unRegisteredUsersData/unRegisteredUsers";

export function onRequestGet() {
	return Response.json(unRegisteredUsers);
}
