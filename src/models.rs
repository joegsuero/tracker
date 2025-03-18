// src-tauri/src/models.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    pub id: Option<i32>,
    pub title: String,
    pub content: String,
    pub tags: String,
}