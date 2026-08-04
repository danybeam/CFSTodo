use specta;
use specta_typescript::Typescript;
use std::fs::{self, File};
use tauri_specta::{collect_commands, Builder};

pub mod models;
use models::task::Task;
use models::workspace::Workspace;

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
        let file_path = "./ignore_test.json";

    if !fs::exists(file_path).expect("Can't check existence") {
        save_tasks(vec![]);
    }

    let contents = fs::read_to_string(file_path).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
}
#[tauri::command]
#[specta::specta]
fn save_workspaces(items: Vec<Workspace>) {
    let file_ptr = File::create("./ignore_test_workspace.json")
        .map_err(|e| e.to_string())
        .unwrap();
    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
}

#[tauri::command]
#[specta::specta]
fn load_workspaces() -> Vec<Workspace> {
    let file_path = "./ignore_test_workspace.json";

    if !fs::exists(file_path).expect("Can't check existence") {
        save_workspaces(vec![]);
    }

    let contents = fs::read_to_string(file_path).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            save_tasks,
            load_tasks,
            save_workspaces,
            load_workspaces
        ])
        .export(Typescript::default(), "../src/models/bindings.ts")
        .expect("Failed to export types");

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            save_tasks,
            load_tasks,
            save_workspaces,
            load_workspaces
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
