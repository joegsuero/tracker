use diesel::table;

table! {
    posts (id) {
        id -> Integer,
        title -> Text,
        content -> Text,
        tags -> Text,
    }
}
