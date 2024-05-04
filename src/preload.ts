// See the Electron documentation for details on how to use preload scripts:

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IpcChannels } from "./lib/ipcChannels";

/**
 * Exposes Electron API to the main world.
 */
contextBridge.exposeInMainWorld("electronAPI", {
  selectDirectory: async (apiKey: string) =>
    ipcRenderer.invoke(IpcChannels.SELECT_DIRECTORY, apiKey),
});
