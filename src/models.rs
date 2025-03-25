use crate::schema::posts;
use diesel::{prelude::AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub tags: String,
}

#[derive(AsChangeset, Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub title: String,
    pub content: String,
    pub tags: String,
}
