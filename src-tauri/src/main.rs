#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use tauri::command;

#[command]
fn run_python(script: String, args: Vec<String>) -> Result<String, String> {
    // Build the python command
    let output = Command::new("python3") // or "python" if your system uses that
        .arg(script)
        .args(&args)
        .output()
        .map_err(|e| format!("Failed to execute python: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).trim().to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_python])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
