"use strict";
// Minute: The minute of the hour (0-59).
// Hour: The hour of the day (0-23).
// Day of the month: The day of the month (1-31).
// Month: The month of the year (1-12 or Jan-Dec).
// Day of the week: The day of the week (0-7, where both 0 and 7 represent Sunday, or use names like Mon, Tue, etc.).
// Year (optional): The year
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronParser = exports.expandCronField = void 0;
// * (asterisk): Represents all possible values for a field.
// - (hyphen): Defines a range of values.
// , (comma): Specifies additional values.
// / (slash): Specifies increments.
function expandCronField(field, min, max) {
    const result = new Set();
    // First split the field into parts to handle complex expressions correctly
    const parts = field.split(',');
    parts.forEach(part => {
        if (part.includes('*')) {
            const [base, step] = part.split('/');
            const interval = step ? parseInt(step, 10) : 1;
            for (let i = min; i <= max; i += interval) {
                result.add(i);
            }
        }
        else if (part.includes('-')) {
            const [rangeStart, rangeEnd] = part.split('-');
            const [start, endStep] = rangeEnd.includes('/') ? rangeEnd.split('/') : [rangeEnd, '1'];
            const stepValue = parseInt(endStep, 10);
            for (let i = parseInt(rangeStart, 10); i <= parseInt(start, 10); i += stepValue) {
                result.add(i);
            }
        }
        else {
            result.add(parseInt(part, 10));
        }
    });
    console.log(result);
    return [...result].sort((a, b) => a - b);
}
exports.expandCronField = expandCronField;
function cronParser(expression) {
    // string can be broken down into 6 
    const arr = expression.split(' ');
    if (arr.length !== 6) {
        throw new Error('Invalid cron expression');
    }
    const minutes = expandCronField(arr[0], 0, 59);
    const hours = expandCronField(arr[1], 0, 23);
    const dayOfMonth = expandCronField(arr[2], 1, 31);
    const months = expandCronField(arr[3], 1, 12);
    const dayOfWeek = expandCronField(arr[4], 0, 6);
    const command = arr[5];
    console.log(`minute        ${minutes.join(' ')}`);
    console.log(`hour          ${hours.join(' ')}`);
    console.log(`day of month  ${dayOfMonth.join(' ')}`);
    console.log(`month         ${months.join(' ')}`);
    console.log(`day of week   ${dayOfWeek.join(' ')}`);
    console.log(`command       ${command}`);
}
exports.cronParser = cronParser;
cronParser('*/15 0 1,15 * 1-5 /usr/bin/find');
//# sourceMappingURL=index.js.map