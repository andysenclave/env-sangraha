import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import archiver from 'archiver';

let mainWindow: BrowserWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('select-directory', async (_) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  return result.canceled ? null : result.filePaths[0];
});

// Handler to resize window when content expands
ipcMain.handle('resize-window', async (_, newHeight: number) => {
  const [currentWidth] = mainWindow.getSize();
  const targetHeight = Math.max(700, newHeight + 100); // Add padding
  mainWindow.setSize(currentWidth, targetHeight);
});

ipcMain.handle('scan-env-files', async (_, targetDir: string) => {
  const envFiles: Array<{ path: string; relativePath: string }> = [];
  
  function scanDirectory(dir: string, basePath: string = targetDir): void {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        if (item === 'node_modules') continue;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, basePath);
        } else if (item === '.env' || item.startsWith('.env.')) {
          const relativePath = path.relative(basePath, fullPath);
          envFiles.push({
            path: fullPath,
            relativePath
          });
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
  
  scanDirectory(targetDir);
  return envFiles;
});

ipcMain.handle('create-archive', async (_, envFiles: Array<{ path: string; relativePath: string }>, destinationDir: string, rootDirName: string) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveName = `env-backup-${rootDirName}-${timestamp}.zip`;
    const archivePath = path.join(destinationDir, archiveName);
    
    const output = fs.createWriteStream(archivePath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      resolve({
        success: true,
        archivePath,
        totalFiles: envFiles.length,
        archiveSize: archive.pointer()
      });
    });
    
    archive.on('error', (err: Error) => {
      reject(err);
    });
    
    archive.pipe(output);
    
    // Add each .env file to the archive maintaining directory structure
    for (const file of envFiles) {
      const fileName = path.basename(file.relativePath);
      const dirName = path.dirname(file.relativePath);
      
      // Remove dot prefix from .env files to make them visible
      const visibleFileName = fileName.startsWith('.env') ? fileName.replace(/^\./, '') : fileName;
      
      // Create archive path without root directory wrapper
      let archivePath: string;
      if (dirName === '.') {
        // File is in root directory
        archivePath = visibleFileName;
      } else {
        // File is in subdirectory - replace the filename with visible version
        const pathParts = file.relativePath.split(path.sep);
        pathParts[pathParts.length - 1] = visibleFileName;
        archivePath = pathParts.join('/');
      }
      
      archive.file(file.path, { name: archivePath });
    }
    
    archive.finalize();
  });
});