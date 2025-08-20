let targetDirectory: string | null = null;
let destinationDirectory: string | null = null;

async function selectDirectory(type: 'target' | 'destination') {
    try {
        const directory = await window.electronAPI.selectDirectory(type);
        if (directory) {
            if (type === 'target') {
                targetDirectory = directory;
                (document.getElementById('targetDir') as HTMLInputElement).value = directory;
            } else {
                destinationDirectory = directory;
                (document.getElementById('destinationDir') as HTMLInputElement).value = directory;
            }
            updateProcessButton();
        }
    } catch (error) {
        showStatus('Error selecting directory: ' + error, 'error');
    }
}

function updateProcessButton() {
    const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
    processBtn.disabled = !targetDirectory || !destinationDirectory;
}

function showStatus(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const statusDiv = document.getElementById('status')!;
    statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
    
    // Resize window to accommodate new content
    setTimeout(() => {
        const containerHeight = document.querySelector('.container')!.scrollHeight;
        window.electronAPI.resizeWindow(containerHeight);
    }, 100);
}

async function processEnvFiles() {
    if (!targetDirectory || !destinationDirectory) {
        showStatus('Please select both target and destination directories', 'error');
        return;
    }

    const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
    processBtn.disabled = true;
    processBtn.textContent = '🔍 Scanning...';

    try {
        // Scan for .env files
        showStatus('Scanning for .env files...', 'info');
        const envFiles = await window.electronAPI.scanEnvFiles(targetDirectory);

        if (envFiles.length === 0) {
            showStatus('No .env files found in the target directory', 'info');
            processBtn.disabled = false;
            processBtn.textContent = '🔍 Scan & Archive .env Files';
            return;
        }

        // Show found files
        const fileList = envFiles.map((file: { relativePath: string }) => `<div class="file-item">${file.relativePath}</div>`).join('');
        showStatus(`Found ${envFiles.length} .env files:<div class="file-list">${fileList}</div>`, 'info');

        // Create archive
        processBtn.textContent = '📦 Creating Archive...';
        const rootDirName = targetDirectory ? path.basename(targetDirectory) : 'unknown';
        const result = await window.electronAPI.createArchive(envFiles, destinationDirectory, rootDirName);

        if (result.success) {
            const sizeInKB = (result.archiveSize / 1024).toFixed(2);
            showStatus(
                `✅ Successfully created archive!<br>
                📁 Archive: ${result.archivePath}<br>
                📊 Files archived: ${result.totalFiles}<br>
                📦 Archive size: ${sizeInKB} KB`, 
                'success'
            );
        } else {
            showStatus('Failed to create archive', 'error');
        }

    } catch (error) {
        showStatus('Error processing files: ' + error, 'error');
    } finally {
        processBtn.disabled = false;
        processBtn.textContent = '🔍 Scan & Archive .env Files';
        updateProcessButton();
    }
}

// Make functions global for onclick handlers
(window as any).selectDirectory = selectDirectory;
(window as any).processEnvFiles = processEnvFiles;