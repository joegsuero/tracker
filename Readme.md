# Tauri Backend (Rust)

This directory contains the Rust backend for the Tracker application. The idea of this app is go deeper in the learning of the Rust programming language and at the same time create a useful tool for day to day tasks. Why Tracker? Because is for you to track your own stuffs. Any stuff...

## Some ideas for the app:
- Allow to take notes and filter the notes by date, by categories
- Have calendars for track habits, or any other idea. 
- Maybe an interface for run an AI model with your own personal data locally.
- Maybe a tool for organize your digital books and query them, with a pdf-viewer in it.

**Notes**: 
- If you want to contribute see contribution guide at the end of the file 👇
- Propose any idea for the app, it could be interesting implement it.
- Implement variety of Rust code and try new things on the project, this project is also a tool for learning.

## 🛠 Tech Stack
- **Rust** (v1.85.1)
- **Tauri** (v1) - App bundler/system integration
- **Diesel ORM** (v2.2.0) - PostgreSQL/SQLite database interaction
- **Serde** - Serialization/deserialization

## 🏗 Project Structure
    src-tauri/
    ├── src/
    │   ├── main.rs          # Entry point
    │   ├── models/          # Diesel models
    │   ├── schema.rs        # Diesel table definitions
    │   └── database.rs      # DB connection setup
    ├── Cargo.toml           # Rust dependencies
    ├── tauri.conf.json      # Tauri configuration
    └── .env                 # Enviroment variables

## 🚀 Setup
1. Install Rust:
```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
2. Install Dependencies and run the project:
```bash
   cargo run
```

## 🔧 Development
- Run migrations:
```bash
  diesel migration run
```


## 🤝 Contributing
- Don't care how much you use AI code (I use it), just make sure it's good code and actually works.
- You can even improve the Readme file

1. Fork the repository
2. Create feature branch (`git checkout -b feat/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feat/awesome-feature`)
5. Open Pull Request

## 📜 License
MIT © José Daniel García Suero