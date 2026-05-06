@echo off
setlocal enabledelayedexpansion

:: --- STEP 0: Refresh GitHub CLI auth ---
echo Refreshing GitHub CLI authentication with delete_repo scope...
::gh auth refresh -h github.com -s delete_repo

:: --- STEP 1: Ask user what to do ---
echo.
echo 1. Create a new repository
echo 2. Delete existing repository
set /p CHOICE=Enter your choice (1 or 2): 

if "%CHOICE%"=="1" goto CREATE_REPO
if "%CHOICE%"=="2" goto DELETE_REPO

echo Invalid choice.
pause
exit /b

:CREATE_REPO
:: --- Create a new repo ---
set /p REPO_NAME=Enter the new repository name: 

:: Create folder and navigate into it
mkdir %REPO_NAME%
cd %REPO_NAME%

:: Initialize Git and set default branch to main
git init
git branch -M main

:: Create sample index.html
echo ^<h1^>Hello World from %REPO_NAME%^</h1^> > index.html
echo ^<h1^>Hello World 1 %REPO_NAME%^</h1^> >> index.html
echo ^<h1^>Hello World 2 %REPO_NAME%^</h1^> >> index.html

:: Add and commit files
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
set REPO_LIST=
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
