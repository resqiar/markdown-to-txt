/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		".+\\.(t|j)s$": "ts-jest",
	},
};
