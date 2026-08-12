use specta;
use specta_typescript::Typescript;
use std::fs::{self, File};
use tauri_plugin_updater::UpdaterExt;
use tauri_plugin_log::log;
use tauri_specta::{collect_commands, Builder};

pub mod models;
use models::task::Task;
use models::workspace::Workspace;

const TASK_FILE_PATH: &str = "./tasks.json";
const WORKSPACE_FILE_PATH: &str = "./workspaces.json";

#[tauri::command]
#[specta::specta]
fn save_tasks(items: Vec<Task>) {
    return;
    /*
    let file_ptr = File::create(TASK_FILE_PATH)
        .map_err(|e| e.to_string())
        .unwrap();
    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
    */
}

#[tauri::command]
#[specta::specta]
fn load_tasks() -> Vec<Task> {
    return vec![];
    /*
    if !fs::exists(TASK_FILE_PATH).expect("Can't check existence") {
        save_tasks(vec![]);
    }

    let contents = fs::read_to_string(TASK_FILE_PATH).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
    */
}
#[tauri::command]
#[specta::specta]
fn save_workspaces(items: Vec<Workspace>) {
    return;
    /*
        let file_ptr = File::create(WORKSPACE_FILE_PATH)
        .map_err(|e| e.to_string())
        .unwrap();
    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
    */
}

#[tauri::command]
#[specta::specta]
fn load_workspaces() -> Vec<Workspace> {
    return vec![];
    /*
    if !fs::exists(WORKSPACE_FILE_PATH).expect("Can't check existence") {
        save_workspaces(vec![]);
    }

    let contents = fs::read_to_string(WORKSPACE_FILE_PATH).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
     */
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
    println!("Inside update");
    let a = app.updater()?;
    let b = a.check();
    match b.await {
        Ok(Some(update)) => {
            println!("Update available {}", &update.version);
        }
        Ok(None) => {
            println!("None");
        }
        Err(e) => println!("Error: {}", e),
    }

    println!("after c");

    if let Some(update) = app.updater()?.check().await? {
        let mut downloaded = 0;

        println!("starting download and install");

        // alternatively we could also call update.download() and update.install() separately
        update
            .download_and_install(
                |chunk_length, content_length| {
                    downloaded += chunk_length;
                    println!("downloaded {downloaded} from {content_length:?}");
                },
                || {
                    println!("download finished");
                },
            )
            .await?;

        println!("update installed");
        app.restart();
    }

    Ok(())
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
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(log::LevelFilter::Debug)
                .build(),
        )
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            save_tasks,
            load_tasks,
            save_workspaces,
            load_workspaces
        ])
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                println!("Preparing for update");
                update(handle).await.unwrap();
                println!("Updated");
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
