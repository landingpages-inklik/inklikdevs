@echo off
setlocal enabledelayedexpansion

:: --- PREREQUISITES ---
:: Install Git: https://git-scm.com/install/windows
:: During install, select "Add Git to PATH" so git commands work in CMD/BAT files.

:: --- STEP 0: Refresh GitHub CLI auth ---
echo Refreshing GitHub CLI authentication with delete_repo scope...
gh auth refresh -h github.com -s delete_repo




:: --- Auto-detect repo name from current directory ---
for %%I in (.) do set REPO_NAME=%%~nxI

echo Current directory: %CD%
echo Repo name will be: %REPO_NAME%
echo.

:: --- STEP 1: Ask user what to do ---
echo 1. Create repository (use folder name: %REPO_NAME%)
echo 2. Create repository (ask for custom name)
echo 3. Delete existing repository
set /p CHOICE=Enter your choice (1, 2 or 3): 

if "%CHOICE%"=="1" goto CREATE_REPO
if "%CHOICE%"=="2" goto CREATE_REPO_CUSTOM_NAME
if "%CHOICE%"=="3" goto DELETE_REPO

echo Invalid choice.
pause
exit /b

:CREATE_REPO_CUSTOM_NAME
:: --- Ask for a custom repo name ---
set /p REPO_NAME=Enter repository name: 
echo Repo name set to: %REPO_NAME%

:: Create folder and navigate into it
mkdir %REPO_NAME%
cd %REPO_NAME%

:: Initialize Git and set default branch to main
git init
git branch -M main

:: Create sample index.html
echo ^<h1^>Hello World from %REPO_NAME%^</h1^> > index.html
echo ^<h2^>Hello World 1 %REPO_NAME%^</h2^> > index.html
echo ^<h3^>Hello World 2 %REPO_NAME%^</h3^> > index.html

:: Add and commit files
git add .
git commit -m "Initial commit"

:: Create GitHub repository and push
gh repo create %REPO_NAME% --public --source=. --remote=origin --push

echo.
echo Repository "%REPO_NAME%" created and pushed to GitHub!
pause
exit /b

:CREATE_REPO
:: --- Initialize Git in current directory and push ---
git init
git branch -M main

:: Create sample index.html
echo ^<h1^>Hello World from %REPO_NAME%^</h1^> > index.html
echo ^<h2^>Hello World 1 %REPO_NAME%^</h2^> > index.html
echo ^<h3^>Hello World 2 %REPO_NAME%^</h3^> > index.html

:: Add and commit files
git add .
git commit -m "Initial commit"

:: Stage and commit everything
git add .
git commit -m "Initial commit"

:: Create GitHub repository and push
gh repo create %REPO_NAME% --public --source=. --remote=origin --push

echo.
echo Repository "%REPO_NAME%" created and pushed to GitHub!
pause
exit /b

:DELETE_REPO
:: --- Delete repositories ---
echo.
echo Fetching your repositories...
set COUNT=0

for /f "tokens=1" %%R in ('gh repo list landingpages-inklik --limit 100 --json name -q ".[].name"') do (
    set /a COUNT+=1
    set REPO!COUNT!=%%R
    echo !COUNT!. %%R
)

if %COUNT%==0 (
    echo No repositories found.
    pause
    exit /b
)

:: Ask which repos to delete
echo.
echo Enter numbers of repositories to delete separated by spaces (e.g., 1 3 5):
set /p SELECTION=

:: Delete selected repos
for %%N in (%SELECTION%) do (
    set REPO_NAME=!REPO%%N!
    if defined REPO_NAME (
        echo Deleting repository: !REPO_NAME!
        gh repo delete landingpages-inklik/!REPO_NAME! --confirm
    ) else (
        echo Invalid selection: %%N
    )
)

echo.
echo Finished processing selected repositories.
pause
exit /b
