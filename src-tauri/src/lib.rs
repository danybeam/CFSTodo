use specta;
use specta_typescript::Typescript;
use std::fs::File;
use tauri_specta::{collect_commands, Builder};

pub mod models;

use models::task::Task;

#[tauri::command]
#[specta::specta]
fn save_tasks(items: Vec<Task>) {
    let file_ptr = File::create("./ignore_test.json")
        .map_err(|e| e.to_string())
        .unwrap();
    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
}

#[tauri::command]
#[specta::specta]
fn load_tasks() -> Vec<Task> {
    println!("start loading");
    vec![]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::<tauri::Wry>::new()
        .commands(collect_commands![save_tasks, load_tasks])
        .export(Typescript::default(), "../src/models/bindings.ts")
        .expect("Failed to export types");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![save_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
