# 🗂️ Env Sangraha

> **Environment File Collector & Archiver** 📦

A beautiful, modern desktop application built with Electron and TypeScript that helps you collect, organize, and archive all `.env` files from your project directories while maintaining their original folder structure.

---

## ✨ What It Does

**Env Sangraha** (*"Env Collection" in Sanskrit*) is your go-to tool for:

- 🔍 **Smart Scanning**: Recursively finds all `.env` files in your target directory
- 🚫 **Intelligent Filtering**: Automatically ignores `node_modules` and other irrelevant folders  
- 📁 **Structure Preservation**: Maintains the exact directory structure in the archive
- 🏷️ **Smart Naming**: Creates archives with format `env-backup-{project-name}-{timestamp}.zip`
- 💎 **Visibility**: Ensures `.env` files are properly visible when extracted (no more hidden files!)
- 🎨 **Beautiful UI**: Modern, responsive interface with real-time progress feedback

---

## 🚀 Key Features

### 🎯 **Core Functionality**
- **Recursive Directory Scanning** - Finds `.env`, `.env.local`, `.env.production`, etc.
- **Structure Preservation** - Your folder hierarchy stays intact in the archive
- **Smart Filtering** - Skips `node_modules`, `.git`, and other unnecessary directories
- **Timestamped Archives** - Each backup is uniquely named with creation timestamp

### 🖥️ **User Experience**
- **Drag & Drop Ready** - Easy directory selection with native file dialogs
- **Real-time Feedback** - See exactly which files are found before archiving
- **Progress Indicators** - Know what's happening at every step
- **Responsive Design** - Adapts to different window sizes seamlessly

### 🔒 **Security & Quality**
- **Modern Electron Architecture** - Context isolation and secure IPC communication
- **TypeScript Throughout** - Type-safe code with comprehensive error handling
- **Cross-platform** - Works on macOS, Windows, and Linux

---

## 📋 System Requirements

### **Minimum Requirements**
- **Operating System**: 
  - 🍎 **macOS**: 10.14 Mojave or later
  - 🪟 **Windows**: Windows 10 (64-bit) or later
  - 🐧 **Linux**: Ubuntu 18.04, Fedora 32, or equivalent
- **Memory**: 512 MB RAM
- **Storage**: 200 MB free disk space
- **Architecture**: x64 (Intel/AMD), ARM64 (Apple Silicon)

### **Recommended Requirements**
- **Memory**: 1 GB RAM or more
- **Storage**: 1 GB free disk space (for larger projects)

---

## 🛠️ Tech Stack

### **Core Technologies**
- **⚡ Electron 28+** - Cross-platform desktop framework
- **📝 TypeScript 5+** - Type-safe JavaScript development
- **🎨 Modern CSS3** - Beautiful, responsive styling
- **📦 Archiver.js** - Reliable ZIP archive creation

### **Development Tools**
- **🔧 Node.js 18+** - JavaScript runtime
- **📦 npm** - Package management
- **🏗️ electron-builder** - Application packaging and distribution

### **Architecture Highlights**
- **🔒 Context Isolation** - Secure renderer process isolation
- **⚡ IPC Communication** - Safe main-renderer process communication
- **🎯 Type Safety** - Comprehensive TypeScript coverage
- **🏛️ Clean Architecture** - Separation of concerns with modular design

---

## 🎮 How It Works

### **Simple 3-Step Process:**

1. **🎯 Select Target Directory**
   - Click "Browse" next to "Target Directory"
   - Choose the folder you want to scan for `.env` files
   - The app will recursively search all subdirectories

2. **📂 Choose Destination**
   - Click "Browse" next to "Destination Directory"  
   - Select where you want the archive saved
   - Archives are named: `env-backup-{project-name}-{timestamp}.zip`

3. **🚀 Scan & Archive**
   - Click "Scan & Archive .env Files"
   - Review the list of found files
   - Watch as your archive is created instantly!

### **What Gets Included:**
- ✅ `.env` files
- ✅ `.env.local`, `.env.development`, `.env.production`
- ✅ Any file starting with `.env.`
- ✅ Files from all subdirectories (except `node_modules`)

### **Archive Structure:**
```
env-backup-my-project-2025-01-20T10-30-45-123Z.zip
├── my-project/
│   ├── .env
│   ├── frontend/
│   │   ├── .env.local
│   │   └── .env.production
│   └── backend/
│       └── .env.development
```

---

## 🚀 Getting Started

### **For End Users** (Ready-to-use Applications)

#### **📥 Download & Install**

**macOS Users:**
```bash
# Download the .dmg file from releases
# Double-click to mount and drag to Applications
open env-sangraha-1.0.0.dmg
```

**Windows Users:**
```bash
# Download and run the installer
env-sangraha-setup-1.0.0.exe
```

**Linux Users:**
```bash
# Download and run the AppImage
chmod +x env-sangraha-1.0.0.AppImage
./env-sangraha-1.0.0.AppImage
```

### **For Developers** (Build from Source)

#### **🔧 Prerequisites**
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher  
- **Git**: Latest version

#### **📦 Installation**
```bash
# Clone the repository
git clone https://github.com/yourusername/env-sangraha.git
cd env-sangraha

# Install dependencies
npm install

# Build the application
npm run build

# Run in development mode
npm run dev
```

#### **🏗️ Build Commands**

| Command | Description |
|---------|-------------|
| `npm run build` | 🔨 Compile TypeScript to JavaScript |
| `npm run dev` | 🚀 Build and run in development mode |
| `npm run start` | ▶️ Run the built application |
| `npm run clean` | 🧹 Remove build artifacts |
| `npm run pack` | 📦 Package for current platform |
| `npm run dist` | 🚚 Build distributables for all platforms |

#### **📱 Platform-Specific Builds**

**Build for macOS (.dmg):**
```bash
npm run dist -- --mac
```

**Build for Windows (.exe):**
```bash
npm run dist -- --win
```

**Build for Linux (AppImage):**
```bash
npm run dist -- --linux
```

**Build for All Platforms:**
```bash
npm run dist
```

---

## 🗂️ Project Structure

```
env-sangraha/
├── 📁 src/
│   ├── 🎯 main.ts          # Electron main process
│   ├── 🖥️ renderer.ts      # Frontend logic
│   ├── 🔌 preload.ts       # IPC bridge
│   └── 🎨 index.html       # User interface
├── 📁 dist/               # Compiled output
├── 📁 release/           # Built applications
├── 📄 package.json       # Project configuration
├── 📄 tsconfig.json      # TypeScript configuration
├── 📄 CLAUDE.md          # AI assistant guidance
└── 📖 README.md          # This file
```

---

## 🔧 Configuration

### **Build Configuration**
The `package.json` includes electron-builder configuration for:
- **🍎 macOS**: DMG installer with Apple Silicon support
- **🪟 Windows**: NSIS installer for x64 systems
- **🐧 Linux**: AppImage for universal compatibility

### **TypeScript Configuration**
- **Target**: ES2020 with DOM support
- **Module**: CommonJS for Node.js compatibility
- **Strict Mode**: Enabled for type safety
- **Source Maps**: Generated for debugging

---

## 🧪 Testing Your Build

### **Test the Development Build:**
```bash
npm run dev
```

### **Test the Production Build:**
```bash
npm run build
npm start
```

### **Test the Packaged Application:**
```bash
npm run pack
# Check the 'release' folder for the packaged app
```

---

## 📚 Advanced Usage

### **Command Line Interface (for developers):**
```bash
# Development with auto-reload
npm run dev

# Production build and test
npm run build && npm start

# Clean build artifacts
npm run clean

# Build for distribution
npm run dist
```

### **Environment Variables:**
```bash
# Debug mode
DEBUG=env-sangraha:* npm run dev

# Skip code signing (macOS)
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🎯 Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Electron Team** - For the amazing desktop framework
- **TypeScript Team** - For making JavaScript development safer
- **archiver.js** - For reliable ZIP file creation
- **All Contributors** - For making this project better

---

## 📞 Support

- **🐛 Bug Reports**: Open an issue on GitHub
- **💡 Feature Requests**: Open an issue with the "enhancement" label
- **❓ Questions**: Check the GitHub discussions

---

<div align="center">

**Made with ❤️ and TypeScript**

*Env Sangraha - Collecting your environment files, one directory at a time* 🌟

</div>