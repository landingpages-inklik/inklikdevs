@echo off
setlocal enabledelayedexpansion

:: ================================
:: STEP 0: AUTH CHECK
:: ================================
echo Checking GitHub authentication...

gh auth status >nul 2>&1
echo.
if errorlevel 1 (
    echo Not authenticated. Starting login...
	echo.
	echo install git desktop ftom https://git-scm.com/install/windows
	echo install 'gh' from https://cli.github.com/
    gh auth login
) else (
    echo Already authenticated.
)



:: Get username dynamically
for /f %%U in ('gh api user -q .login') do set USERNAME=%%U

:: ================================
:: MENU
:: ================================
echo.
echo ================================
echo GitHub Automation Tool
echo ================================
echo 1. Create a new repository
echo 2. Delete repositories
echo 3. Push current directory
echo ================================
set /p CHOICE=Enter your choice (1, 2 or 3):

if "%CHOICE%"=="1" goto CREATE_REPO
if "%CHOICE%"=="2" goto DELETE_REPO
if "%CHOICE%"=="3" goto PUSH_CURRENT_DIR

echo Invalid choice.
pause
exit /b

:: ================================
:: CREATE NEW REPO
:: ================================
:CREATE_REPO
echo.
set /p REPO_NAME=Enter repository name:

if "%REPO_NAME%"=="" (
    echo Repo name cannot be empty!
    pause
    exit /b
)

if exist "%REPO_NAME%" (
    echo Folder already exists!
    pause
    exit /b
)

mkdir "%REPO_NAME%"
cd "%REPO_NAME%"

git init
git branch -M main

:: Create sample index.html
echo ^<h1^>Hello World from %REPO_NAME%^</h1^> > index.html
echo ^<h2^>Hello World 1 ^</h2^> >> index.html
echo ^<h3^>Hello World 2 %REPO_NAME%^</h3^> >> index.html


git add .
git commit -m "Initial commit"

echo Creating repo on GitHub...
gh repo create %REPO_NAME% --public --source=. --remote=origin --push

if errorlevel 1 (
    echo Failed to create repository.
) else (
    echo Repository created successfully!
)

pause
exit /b

:: ================================
:: DELETE REPOS
:: ================================
:DELETE_REPO
echo.
echo Fetching repositories...

gh repo list %USERNAME% --limit 100 --json name,visibility -q ".[] | [.name, .visibility] | @tsv" > repos.txt

set COUNT=0

for /f "tokens=1,2" %%A in (repos.txt) do (
    set /a COUNT+=1
    set REPO!COUNT!=%%A
    set VIS!COUNT!=%%B
    echo !COUNT!. %%A [%%B]
)

del repos.txt

if %COUNT%==0 (
    echo No repositories found.
    pause
    exit /b
)

echo.
:: Ensure delete permission (silent)
::gh auth refresh -h github.com -s delete_repo
echo.
set /p SELECTION=Enter numbers to delete (e.g., 1 2 3):

echo You selected: %SELECTION%
set /p CONFIRM=Type YES to confirm:

if /i not "%CONFIRM%"=="YES" (
    echo Cancelled.
    pause
    exit /b
)

for %%N in (%SELECTION%) do (
    set REPO_NAME=!REPO%%N!
    if defined REPO_NAME (
        echo Deleting !REPO_NAME!...
        gh repo delete %USERNAME%/!REPO_NAME! --confirm

        if errorlevel 1 (
            echo Failed to delete !REPO_NAME!
        ) else (
            echo Deleted successfully!
        )
    ) else (
        echo Invalid selection: %%N
    )
)

pause
exit /b

:: ================================
:: PUSH CURRENT DIRECTORY
:: ================================
:PUSH_CURRENT_DIR
echo.

:: Get folder name
for %%I in ("%cd%") do set REPO_NAME=%%~nxI

echo =====================================
echo Current Directory: %REPO_NAME%
echo =====================================

:: Init git if needed
if not exist ".git" (
    git init
    git branch -M main
)

:: Add + commit
git add .
git commit -m "Auto commit" >nul 2>&1

:: Create GitHub repo (ONLY create, no push)
echo Creating GitHub repo...
gh repo create %REPO_NAME% --public --confirm

if errorlevel 1 (
    echo Failed to create repo.
    pause
    exit /b
)

:: Fix remote (IMPORTANT PART)
git remote get-url origin >nul 2>&1

if errorlevel 1 (
    echo Adding origin...
    git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git
) else (
    echo Updating existing origin...
    git remote set-url origin https://github.com/%USERNAME%/%REPO_NAME%.git
)

:: Push manually
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo Push failed.
) else (
    echo.
    echo Repository pushed successfully!
)

pause
exit /b