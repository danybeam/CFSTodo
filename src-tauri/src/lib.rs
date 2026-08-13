use specta;
use specta_typescript::Typescript;
use std::fs::{self, File};
use tauri::Manager;
use tauri_plugin_log::log;
use tauri_plugin_updater::UpdaterExt;
use tauri_specta::{collect_commands, Builder};

pub mod models;
use models::task::Task;
use models::workspace::Workspace;

const TASK_FILE_PATH: &str = "tasks.json";
const WORKSPACE_FILE_PATH: &str = "workspaces.json";

#[tauri::command]
#[specta::specta]
fn save_tasks(app_handle: tauri::AppHandle, items: Vec<Task>) {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())
        .expect("Couldn't find app data dir");
    log::info!("[TASK][SAVE] App dir: {:?}", app_dir.to_str());

    std::fs::create_dir_all(&app_dir)
        .map_err(|e| e.to_string())
        .expect("Couldn't create dirs");

    let file_path = app_dir.join(TASK_FILE_PATH);
    log::info!("[TASK][SAVE] File path: {:?}", file_path);

    let file_ptr = File::create(file_path).map_err(|e| e.to_string()).unwrap();

    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
}

#[tauri::command]
#[specta::specta]
fn load_tasks(app_handle: tauri::AppHandle) -> Vec<Task> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())
        .expect("Couldn't find app data dir");
    log::info!("[TASK][LOAD] App dir: {:?}", app_dir.to_str());

    let file_path = app_dir.join(TASK_FILE_PATH);
    log::info!("[TASK][LOAD] File path: {:?}", file_path);

    if !fs::exists(&file_path).expect("Can't check existence") {
        log::info!("File for tasks doesn't exist. Creating.");
        save_tasks(app_handle, vec![]);
    }

    log::info!("[TASK][LOAD] File loaded");

    let contents = fs::read_to_string(&file_path).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
}

#[tauri::command]
#[specta::specta]
fn save_workspaces(app_handle: tauri::AppHandle, items: Vec<Workspace>) {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())
        .expect("Couldn't find app data dir");
    log::info!("[WORKSPACE][SAVE] App dir: {:?}", app_dir.to_str());

    std::fs::create_dir_all(&app_dir)
        .map_err(|e| e.to_string())
        .expect("Couldn't create dirs");

    let file_path = app_dir.join(WORKSPACE_FILE_PATH);
    log::info!("[WORKSPACE][SAVE] File path: {:?}", file_path.to_str());

    let file_ptr = File::create(file_path).map_err(|e| e.to_string()).unwrap();

    let file = std::io::BufWriter::new(file_ptr);
    let _ = serde_json::to_writer(file, &items);
}

#[tauri::command]
#[specta::specta]
fn load_workspaces(app_handle: tauri::AppHandle) -> Vec<Workspace> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())
        .expect("Couldn't find app data dir");
    log::info!("[WORKSPACE][LOAD] App dir: {:?}", app_dir.to_str());

    let file_path = app_dir.join(WORKSPACE_FILE_PATH);
    log::info!("[WORKSPACE][LOAD] File path: {:?}", file_path.to_str());

    if !fs::exists(&file_path).expect("Can't check existence") {
        log::info!("File for workspaces doesn't exist. Creating.");
        save_workspaces(app_handle, vec![]);
    }

    log::info!("[WORKSPACE][LOAD] File loaded");

    let contents = fs::read_to_string(&file_path).expect("Should work");
    serde_json::from_str(&contents).expect("should work")
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
    match app.updater()?.check().await {
        Ok(Some(update)) => {
            let mut downloaded = 0;
            log::info!("[UPDATE] Update found");
            log::info!("[UPDATE] Preparing for download");
            // alternatively we could also call update.download() and update.install() separately
            update
                .download_and_install(
                    |chunk_length, content_length| {
                        downloaded += chunk_length;
                        log::info!(
                            "[UPDATE][DOWNLOAD] downloaded {downloaded} from {content_length:?}"
                        );
                    },
                    || {
                        log::info!("[UPDATE][DOWNLOAD] download finished. Starting update.");
                    },
                )
                .await?;
            log::info!("[UPDATE] Update finished. Restarting app.");
            app.restart();
        }
        Ok(None) => {
            log::info!("[UPDATE] No update available");
        }
        Err(e) => log::error!("Error: {}", e),
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
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::LogDir {
                        file_name: Some("logs".to_string()),
                    },
                ))
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
            log::info!(
                "[APP] app version: {:?}",
                app.package_info().version.to_string()
            );
            Ok(())
        })
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                log::info!("[UPDATE] Preparing for update");
                update(handle).await.unwrap();
                log::info!("[UPDATE] Updated");
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
