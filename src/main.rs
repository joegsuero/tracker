// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod models;
// mod schema;

use database::{delete_post, get_posts, init_db, save_post};
use models::Post;

#[tauri::command]
fn get_posts_command() -> Result<Vec<Post>, String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    get_posts(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_post_command(post: Post) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    save_post(&conn, post).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_post_command(id: i32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    delete_post(&conn, id).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_posts_command,
            save_post_command,
            delete_post_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
