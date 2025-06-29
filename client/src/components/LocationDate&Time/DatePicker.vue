<template>
	<div class="datepicker-container p-0 w-75 border-0">
		<input
			type="text"
			class="border w-100 px-2 rounded-start position-relative z-0"
			placeholder="Pickup Date"
			ref="dateInput"
			@click="displayDates()" />
		<div class="position-relative"></div>
		<div
			class="datepicker position-absolute bg-dark-subtle mt-1 start-0 p-3 rounded z-3"
			ref="datePicker"
			v-show="showDatePicker">
			<!-- .datepicker-header -->
			<div class="datepicker-header row w-100 mx-auto">
				<button class="prev col btn btn-primary" @click="prevMonth()">Prev</button>

				<select class="col month-input mx-1 text-start" ref="monthInput" @change="onMonthChange()">
					<option>January</option>
					<option>February</option>
					<option>March</option>
					<option>April</option>
					<option>May</option>
					<option>June</option>
					<option>July</option>
					<option>August</option>
					<option>September</option>
					<option>October</option>
					<option>November</option>
					<option>December</option>
				</select>
				<input type="number" class="col year-input p-0 me-1 text-center" ref="yearInput" @change="onYearChange()" />

				<button class="col next btn btn-primary" @click="nextMonth()">Next</button>
			</div>
			<!-- /.datepicker-header -->

			<!-- .days -->
			<div class="days row w-100 mx-auto text-center fw-bold">
				<span class="col p-0">Sun</span>
				<span class="col p-0">Mon</span>
				<span class="col p-0">Tue</span>
				<span class="col p-0">Wed</span>
				<span class="col p-0">Thu</span>
				<span class="col p-0">Fri</span>
				<span class="col p-0">Sat</span>
			</div>
			<!-- /.days -->

			<!-- .dates -->
			<div class="dates" ref="dates"></div>
			<!-- /.dates -->

			<!-- .datepicker-footer -->
			<div class="datepicker-footer row w-100 mx-auto">
				<button class="col cancel btn btn-secondary me-5" @click="showDatePicker = false">Cancel</button>
				<button class="col apply btn btn-primary" @click="setDate">Apply</button>
			</div>
			<!-- /.datepicker-footer -->
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";

	let selectedDate = new Date();
	let year = selectedDate.getFullYear();
	let month = selectedDate.getMonth();
	let hours = selectedDate.getHours();
	let showDatePicker = ref(false);
	let dateInput = ref(null);
	let monthInput = ref(null);
	let yearInput = ref(null);
	let dates = ref(null);
	let datePicker = ref(null);

	const emit = defineEmits(["pickupDate"]);

	const setDate = () => {
		dateInput.value.value = selectedDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		showDatePicker.value = false;

		emit("pickupDate", dateInput.value.value);
	};

	const handleDateClick = (e) => {
		const button = e.target;

		//remove the "selected" class from other buttons
		const selected = dates.value.querySelector(".selected");
		selected && selected.classList.remove("selected");

		//add the "selected" class to the current button
		button.classList.add("selected");

		//set the selected date
		selectedDate = new Date(year, month, parseInt(button.textContent));
	};

	const nextMonth = () => {
		if (month === 11) year++;
		month = (month + 1) % 12;
		displayDates();
	};

	const prevMonth = () => {
		if (month === 0) year--;
		month = (month - 1 + 12) % 12;
		displayDates();
	};

	const updateYearMonth = () => {
		monthInput.value.selectedIndex = month;
		yearInput.value.value = year;
	};

	const onMonthChange = () => {
		month = monthInput.value.selectedIndex;
		displayDates();
	};

	const onYearChange = () => {
		year = yearInput.value.value;
		displayDates();
	};

	const displayDates = () => {
		showDatePicker.value = true;

		//update year and month
		updateYearMonth();

		dates.value.innerHTML = "";

		//get the last date of the previous month
		const lastOfPrevMonth = new Date(year, month, 0);
		for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
			const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
			const button = createButton(text, true, false);
			dates.value.appendChild(button);
		}

		//get the last date of the month
		const lastOfMonth = new Date(year, month + 1, 0);

		for (let i = 1; i <= lastOfMonth.getDate(); i++) {
			const isToday = selectedDate.getDate() === i && selectedDate.getFullYear() === year && selectedDate.getMonth() === month;

			const button = createButton(i, new Date(year, month, i, hours + 1) >= new Date() ? false : true, isToday);
			button.addEventListener("click", handleDateClick);
			dates.value.appendChild(button);
		}

		//get the first week of the next month
		const firstofNextMonth = new Date(year, month + 1, 1);

		for (let i = firstofNextMonth.getDay(); i < 7; i++) {
			const text = firstofNextMonth.getDate() - firstofNextMonth.getDay() + i;
			const button = createButton(text, true, false);
			dates.value.appendChild(button);
		}
	};

	const createButton = (text, isDisabled = false, isToday = false) => {
		const button = document.createElement("button");
		button.textContent = text;
		button.disabled = isDisabled;
		button.classList.toggle("today", isToday);
		button.classList.add("border-0");
		return button;
	};

	window.addEventListener("click", (e) => {
		if (showDatePicker.value) {
			if (!datePicker.value.contains(e.target) && !dateInput.value.contains(e.target)) {
				showDatePicker.value = false;
			}
		}
	});
</script>
