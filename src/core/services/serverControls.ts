import { invoke } from "@tauri-apps/api/tauri";

// src/services/serverControl.ts
export const checkServerStatus = async (): Promise<boolean> => {
  return await invoke<boolean>("is_server_running");
};

export const startServer = async (): Promise<ServerControlResult> => {
  const result = await invoke<boolean>("start_server");
  return {
    success: result !== undefined,
    wasAlreadyInState: !result,
  };
};

export const stopServer = async (): Promise<ServerControlResult> => {
  const result = await invoke<boolean>("stop_server");
  return {
    success: result !== undefined,
    wasAlreadyInState: !result,
  };
};

export const toggleServer = async (): Promise<ServerControlResult> => {
  const isRunning = await checkServerStatus();
  if (isRunning) {
    return await stopServer();
  } else {
    return await startServer();
  }
};
