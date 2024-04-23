import cars from "./post/cars";

export function onRequestGet() {
	return Response.json(cars);
}
