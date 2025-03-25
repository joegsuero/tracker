// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod models;
mod schema;

use database::{delete_post, establish_connection, get_posts, save_post, update_post};
use models::{NewPost, Post};

#[tauri::command]
fn get_posts_command() -> Result<Vec<Post>, String> {
    let mut conn = establish_connection();
    get_posts(&mut conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_post_command(title: String, content: String, tags: String) -> Result<Post, String> {
    let mut conn = establish_connection();
    let new_post = NewPost {
        title,
        content,
        tags,
    };
    save_post(&mut conn, new_post).map_err(|e| e.to_string())
}

#[tauri::command]
fn update_post_command(
    id: i32,
    title: String,
    content: String,
    tags: String,
) -> Result<Post, String> {
    let mut conn = establish_connection();

    let updated_post = NewPost {
        title,
        content,
        tags,
    };

    update_post(&mut conn, id, updated_post).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_post_command(post_id: i32) -> Result<usize, String> {
    let mut conn = establish_connection();
    delete_post(&mut conn, post_id).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_posts_command,
            save_post_command,
            delete_post_command,
            update_post_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
