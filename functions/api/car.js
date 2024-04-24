import cars from "./data/cars";

export function onRequestGet() {
	return Response.json(cars);
}
