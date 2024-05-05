# Cron Parser

This application parses a cron string and expands each field to show the times at which it will run.

## Getting Started

To get started with this project, you need to first clone the repository and install its dependencies.

### Prerequisites

Ensure that you have Node.js installed on your machine. If Node.js is not installed, you can download and install it from [Node.js official website](https://nodejs.org/).

### Installation

Run the following command to install the dependencies:

```bash
npm install
```

### Run the app
To run the application, use the following command:

```bash
npm run dev -- "*/15 0 1,15 * 1-5 /usr/bin/find"
```

This will give you the output 
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /usr/bin/find

### Tests
To run the tests, use the command: 

```bash
npm run test
```