// src-tauri/src/database.rs
use rusqlite::{Connection, Result, params};
use crate::models::Post;
use std::path::Path;

/// Inicializa la base de datos y crea la tabla si no existe.
pub fn init_db() -> Result<Connection> {
    let db_path = "db.sqlite3";
    let db_exists = Path::new(db_path).exists();
    let conn = Connection::open(db_path)?;

    if !db_exists {
        conn.execute(
            "CREATE TABLE posts (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                tags TEXT NOT NULL
            )",
            [],
        )?;
    }

    Ok(conn)
}

/// Obtiene todos los posts de la base de datos.
pub fn get_posts(conn: &Connection) -> Result<Vec<Post>> {
    let mut stmt = conn.prepare("SELECT id, title, content, tags FROM posts")?;
    let posts_iter = stmt.query_map([], |row| {
        Ok(Post {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            tags: row.get(3)?,
        })
    })?;

    let mut posts = Vec::new();
    for post in posts_iter {
        posts.push(post?);
    }
    Ok(posts)
}

/// Guarda un post en la base de datos (inserta o actualiza).
pub fn save_post(conn: &Connection, post: Post) -> Result<()> {
    if post.id.is_some() {
        conn.execute(
            "UPDATE posts SET title = ?1, content = ?2, tags = ?3 WHERE id = ?4",
            params![post.title, post.content, post.tags, post.id.unwrap()],
        )?;
    } else {
        conn.execute(
            "INSERT INTO posts (title, content, tags) VALUES (?1, ?2, ?3)",
            params![post.title, post.content, post.tags],
        )?;
    }
    Ok(())
}

/// Elimina un post de la base de datos por su ID.
pub fn delete_post(conn: &Connection, id: i32) -> Result<()> {
    conn.execute("DELETE FROM posts WHERE id = ?1", params![id])?;
    Ok(())
}