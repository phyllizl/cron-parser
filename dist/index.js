"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("./parsers");
function main() {
    // Access the command line arguments
    const args = process.argv.slice(2); // Skip the first two entries
    if (args.length === 0) {
        console.error("No cron expression provided.");
        process.exit(1);
    }
    // Join arguments to form the full cron expression
    const cronExpression = args.join(" ");
    // Call your parser function
    try {
        (0, parsers_1.cronParser)(cronExpression);
    }
    catch (error) {
        console.error(`Error parsing cron expression: ${error.message}`);
    }
}
main();
//# sourceMappingURL=index.js.map