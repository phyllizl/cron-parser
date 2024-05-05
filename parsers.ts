// Minute: The minute of the hour (0-59).
// Hour: The hour of the day (0-23).
// Day of the month: The day of the month (1-31).
// Month: The month of the year (1-12 or Jan-Dec).
// Day of the week: The day of the week (0-7, where both 0 and 7 represent Sunday, or use names like Mon, Tue, etc.).
// Year (optional): The year

// * (asterisk): Represents all possible values for a field.
// - (hyphen): Defines a range of values.
// , (comma): Specifies additional values.
// / (slash): Specifies increments.

export function expandCronField(
	field: string,
	min: number,
	max: number
): number[] {
	const result: Set<number> = new Set();

	// First split the field into parts to handle complex expressions correctly
	const parts = field.split(",");
	parts.forEach((part) => {
		// handle all values
		if (part.includes("*")) {
			// are there any increments, if none, just increase by 1
			const interval =  part.includes("/") ? parseInt(part.split("/")[1]) : 1;
			for (let i = min; i <= max; i += interval) {
				result.add(i);
			}
		} else if (part.includes("-")) {
			const [rangeStart, rangeEnd] = part.split("-");
			// check if range includes step
			const [start, endStep] = rangeEnd.includes("/")
				? rangeEnd.split("/")
				: [rangeEnd, "1"];
			const stepValue = parseInt(endStep);
			for (
				let i = parseInt(rangeStart);
				i <= parseInt(start);
				i += stepValue
			) {
				result.add(i);
			}
		} else {
			result.add(parseInt(part));
		}
	});

	return [...result].sort((a: number, b: number) => a - b);
}

export function cronParser(expression: string): void {
	// string can be broken down into 6
	const arr = expression.split(" ");

	if (arr.length !== 6) {
		throw new Error("Invalid cron expression");
	}

	const minutes = expandCronField(arr[0], 0, 59);
	const hours = expandCronField(arr[1], 0, 23);
	const dayOfMonth = expandCronField(arr[2], 1, 31);
	const months = expandCronField(arr[3], 1, 12);
	const dayOfWeek = expandCronField(arr[4], 0, 6);
	const command = arr[5];

	const logParts = [
		`minute         ${minutes.join(" ")}`,
		`hour           ${hours.join(" ")}`,
		`day of month   ${dayOfMonth.join(" ")}`,
		`month          ${months.join(" ")}`,
		`day of week    ${dayOfWeek.join(" ")}`,
		`command        ${command}`,
	];

	console.log(logParts.join("\n"));
}

// cronParser("*/15 0 1,15 * 1-5 /usr/bin/find");
