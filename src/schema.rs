use diesel::table;

// src-tauri/src/schema.rs
table! {
    posts (id) {
        id -> Integer,
        title -> Text,
        content -> Text,
        tags -> Text,
    }
}
