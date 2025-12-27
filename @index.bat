@echo off
start chrome.exe --allow-file-access-from-files
echo Continue only when Chrome is fully loaded. And when it is;
pause
call index.html