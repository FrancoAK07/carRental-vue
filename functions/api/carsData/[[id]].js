import cars from "./cars";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("No id", { status: 404 });
	}

	const car = cars.find((car) => car.id === id);

	if (!car) {
		return new Response("user not found", { status: 404 });
	}

	return Response.json(car);
}
