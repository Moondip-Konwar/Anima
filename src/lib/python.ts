import { invoke } from "@tauri-apps/api/tauri";

/**
 * Run a Python script via Tauri Rust backend
 * @param script Path to python script (relative to project root)
 * @param args Array of string or numbers
 * @returns Promise<string> output of the script
 */
export async function run_python_script(script: string, args: Array<string | number>): Promise<string> {
  // Convert all args to strings
  const strArgs = args.map((arg) => String(arg));

  try {
    const result = await invoke<string>("run_python", { script, args: strArgs });
    return result;
  } catch (e) {
    console.error("Python script error:", e);
    return "";
  }
}

/**
 * import { run_python_script } from './lib/python';
 *
 * async function test() {
 *    const sum = await run_python_script("backend/add.py", [23, 34, 212]);
 *    console.log("Python returned:", sum);
 * }
 *
 * test();
 **/
