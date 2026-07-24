use specta;
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

pub mod models;

use models::task::Task;

#[tauri::command]
#[specta::specta]
fn test_function(items: Vec<Task>) {
    println!("start test");
    for item in items {
        println!("{:?}", item);
    }
    ()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::<tauri::Wry>::new()
        .commands(collect_commands![test_function])
        .export(Typescript::default(), "../src/models/bindings.ts")
        .expect("Failed to export types");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![test_function])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
