import { invoke } from "@tauri-apps/api/core";

/**
 * Try to safely parse Python repr-like strings into JS objects/arrays.
 *
 * @param {any} value - Value returned by Python.
 * @returns {any} - Parsed JS value if possible.
 */
function safeParse(value) {
	if (typeof value !== "string") return value;

	// Try JSON first
	try {
		return JSON.parse(value);
	} catch {
		// Not JSON
	}

	// Try Python repr-like list/dict parsing
	try {
		// Replace Python single quotes with double quotes carefully
		const jsonish = value
			.replace(/'/g, '"')
			.replace(/None/g, "null")
			.replace(/True/g, "true")
			.replace(/False/g, "false");

		return JSON.parse(jsonish);
	} catch {
		// Not parsable, return as-is
		return value;
	}
}

/**
 * Run a Python script from the Tauri backend.
 *
 * @async
 * @function runPython
 * @param {string} script - Path to the Python script relative to your Tauri project root.
 * @param {Array<any>} [args=[]] - Arguments to pass to the Python script. Objects/arrays are auto-JSON stringified.
 * @returns {Promise<any>} - Parsed output from Python (objects as objects, lists as arrays, etc.).
 *
 * @example
 * import { runPython } from '$lib/utils/python.js';
 *
 * async function example() {
 *   const result = await runPython("backend/test.py", [
 *     "arg1",
 *     { apple: "banana", aa: 12312 },
 *   ]);
 *   console.log(result); // -> ["arg1", { apple: "banana", aa: 12312 }]
 * }
 */
export async function runPython(script, args = []) {
	try {
		const safeArgs = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg));

		// Remove leading slash if present
		script = script.replace(/^\/+/, "");
		// Prepend "../"
		script = "../" + script;
		const rawResult = await invoke("run_python", { script, args: safeArgs });
		const parsedResult = safeParse(rawResult);

		console.log(`[Python] ${script} returned:`, parsedResult);
		return parsedResult;
	} catch (error) {
		console.error(`[Python] Error running ${script}:`, error);
		throw error;
	}
}
