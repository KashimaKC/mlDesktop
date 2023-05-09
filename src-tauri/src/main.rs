// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"), 
  windows_subsystem = "windows"
)]

use sysinfo::{System, SystemExt, CpuExt};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![change_state, get_cpu])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn change_state(state: bool) -> bool {
  let result: bool = !state;
  
  return result;
}

#[tauri::command]
fn get_cpu(run: bool) {
    let (tx, rx) = std::sync::mpsc::channel();

    std::thread::spawn(move || {
        let mut sys: System = System::new_all();

        while run {
            sys.refresh_cpu();
            std::thread::sleep(std::time::Duration::from_secs(2));
            tx.send(sys.global_cpu_info().cpu_usage()).unwrap();
        }
    });

    std::thread::spawn(move || {
        for received in rx {
            println!("{}", received);
        }
    });
}
