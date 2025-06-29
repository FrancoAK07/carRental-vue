import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AvailableCars from "../views/AvailableCars.vue";
import Addons from "../views/Addons.vue";
import Checkout from "../views/Checkout.vue";
import Fleet from "../views/Fleet.vue";
import Bookings from "../views/Bookings.vue";
import UserCheckout from "../views/UserCheckout.vue";
import EmailBooking from "../views/EmailBooking.vue";

const routes = [
	{ path: "/", component: Home, props: true },
	{ path: "/cars", name: "cars", component: AvailableCars, props: true },
	{ path: "/addons", name: "addons", component: Addons, props: true },
	{ path: "/checkout", name: "checkout", component: Checkout, props: true },
	{ path: "/fleet", name: "fleet", component: Fleet, props: true },
	{ path: "/bookings", name: "bookings", component: Bookings, props: true },
	{ path: "/usercheckout", name: "usercheckout", component: UserCheckout, props: true },
	{ path: "/emailbooking", name: "emailbooking", component: EmailBooking, props: true },
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});

export default router;
