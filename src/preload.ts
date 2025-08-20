import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: (type: 'target' | 'destination') => ipcRenderer.invoke('select-directory', type),
  scanEnvFiles: (targetDir: string) => ipcRenderer.invoke('scan-env-files', targetDir),
  createArchive: (envFiles: Array<{ path: string; relativePath: string }>, destinationDir: string, rootDirName: string) => 
    ipcRenderer.invoke('create-archive', envFiles, destinationDir, rootDirName),
  resizeWindow: (height: number) => ipcRenderer.invoke('resize-window', height)
});

declare global {
  interface Window {
    electronAPI: {
      selectDirectory: (type: 'target' | 'destination') => Promise<string | null>;
      scanEnvFiles: (targetDir: string) => Promise<Array<{ path: string; relativePath: string }>>;
      createArchive: (envFiles: Array<{ path: string; relativePath: string }>, destinationDir: string, rootDirName: string) => Promise<{
        success: boolean;
        archivePath: string;
        totalFiles: number;
        archiveSize: number;
      }>;
      resizeWindow: (height: number) => Promise<void>;
    };
  }
}