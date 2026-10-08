ASSETFLOW AI - VITE WINDOWS FIX

If you previously installed dependencies from an older V9 ZIP, remove the old native dependencies first.

PowerShell:
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev

CMD:
rmdir /s /q node_modules
del package-lock.json
npm cache verify
npm install
npm run dev

The project pins Vite 7.1.7 to avoid the Rolldown native-binding issue seen with the Vite 8 installation on this Windows setup.
The app port remains 5180.
