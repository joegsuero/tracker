use crate::models::{NewPost, Post};
use crate::schema::posts;
use crate::schema::posts::dsl::*;
use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use dotenvy::dotenv;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok(); 
    let binding = std::env::current_exe().unwrap();
    let exe_path = binding.parent();
    let database_url = exe_path
        .unwrap()
        .join("db.sqlite3")
        .to_str()
        .unwrap()
        .to_string();
    let mut conn = SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));

    create_posts_table_if_not_exists(&mut conn).expect("Error creating posts table");

    conn
}

fn create_posts_table_if_not_exists(conn: &mut SqliteConnection) -> QueryResult<()> {
    diesel::sql_query(
        r#"
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tags TEXT NOT NULL
        );
        "#,
    )
    .execute(conn)?;

    Ok(())
}

pub fn get_posts(conn: &mut SqliteConnection) -> QueryResult<Vec<Post>> {
    posts.select((id, title, content, tags)).load::<Post>(conn)
}

pub fn save_post(conn: &mut SqliteConnection, new_post: NewPost) -> QueryResult<Post> {
    diesel::insert_into(posts).values(&new_post).execute(conn)?;

    posts
        .select((id, title, content, tags))
        .order(id.desc())
        .first::<Post>(conn)
}

pub fn update_post(
    conn: &mut SqliteConnection,
    post_id: i32,
    updated_post: NewPost,
) -> QueryResult<Post> {
    diesel::update(posts::table.find(post_id))
        .set(&updated_post)
        .execute(conn)?;

    posts::table.find(post_id).first::<Post>(conn)
}

pub fn delete_post(conn: &mut SqliteConnection, post_id: i32) -> QueryResult<usize> {
    diesel::delete(posts.filter(id.eq(post_id))).execute(conn)
}
