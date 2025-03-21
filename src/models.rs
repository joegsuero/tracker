use diesel::{prelude::AsChangeset, Insertable, Queryable};
// src-tauri/src/models.rs
use crate::schema::posts;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Post {
    pub id: i32,         // INTEGER PRIMARY KEY AUTOINCREMENT
    pub title: String,   // TEXT NOT NULL
    pub content: String, // TEXT NOT NULL
    pub tags: String,    // TEXT NOT NULL
}

#[derive(AsChangeset, Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub title: String,
    pub content: String,
    pub tags: String,
}
