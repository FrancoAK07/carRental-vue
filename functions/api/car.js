import cars from "./carsData/cars";

export function onRequestGet() {
	return Response.json(cars);
}
