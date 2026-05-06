@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

:: =====================================
:: CONFIG
:: =====================================

set ROOT=D:\Git-Development

:: =====================================
:: CHECK REQUIRED TOOLS
:: =====================================

where git >nul 2>&1
if errorlevel 1 (
    echo Git is not installed.
    pause
    exit /b
)

where gh >nul 2>&1
if errorlevel 1 (
    echo GitHub CLI is not installed.
    pause
    exit /b
)

:: =====================================
:: AUTH CHECK
:: =====================================

echo Checking GitHub authentication...
echo.

gh auth status >nul 2>&1

if errorlevel 1 (
    echo Login required...
    gh auth login
) else (
    echo Already authenticated.
)

:: Get GitHub username
for /f %%U in ('gh api user -q .login') do set USERNAME=%%U

:: =====================================
:: MAIN MENU
:: =====================================

:MENU

cls

echo.
echo =====================================
echo         GitHub Automation Tool
echo =====================================
echo Root Folder: %ROOT%
echo =====================================
echo 1. Create New Project Repo
echo 2. Push Existing Project
echo 3. Delete GitHub Repositories
echo 4. Exit
echo =====================================

set /p CHOICE=Enter your choice:

if "%CHOICE%"=="1" goto CREATE_NEW
if "%CHOICE%"=="2" goto PUSH_EXISTING
if "%CHOICE%"=="3" goto DELETE_REPO
if "%CHOICE%"=="4" goto EXIT_SCRIPT

echo.
echo Invalid choice.
pause
goto MENU

:: =====================================
:: CREATE NEW PROJECT
:: =====================================

:CREATE_NEW

cls

echo.
echo =====================================
echo        Create New Project
echo =====================================

set /p REPO_NAME=Enter new project name: 

if "%REPO_NAME%"=="" (
    echo Invalid project name.
    pause
    goto MENU
)

if exist "%ROOT%\%REPO_NAME%" (
    echo Folder already exists.
    pause
    goto MENU
)

mkdir "%ROOT%\%REPO_NAME%"
cd /d "%ROOT%\%REPO_NAME%"

:: Initialize Git
git init
git branch -M main

:: Create sample file
echo ^<h1^>%REPO_NAME%^</h1^> > index.html

:: Create .gitignore
(
echo node_modules/
echo vendor/
echo .env
echo *.log
echo .cache/
) > .gitignore

:: Git commit
git add .
git commit -m "Initial commit"

:: Create GitHub repo + push
echo.
echo Creating GitHub repository...

gh repo create %REPO_NAME% --public --source=. --remote=origin --push

if errorlevel 1 (
    echo.
    echo Failed to create repository.
) else (
    echo.
    echo Repository created successfully!
)

pause
goto MENU

:: =====================================
:: PUSH EXISTING PROJECT
:: =====================================

:PUSH_EXISTING

cls

echo.
echo =====================================
echo        Available Projects
echo =====================================

set COUNT=0

for /d %%D in ("%ROOT%\*") do (
    set /a COUNT+=1
    set FOLDER!COUNT!=%%~nxD
    echo !COUNT!. %%~nxD
)

if %COUNT%==0 (
    echo No project folders found.
    pause
    goto MENU
)

echo.
set /p SELECT=Select project number: 

set PROJECT=!FOLDER%SELECT%!

if "%PROJECT%"=="" (
    echo Invalid selection.
    pause
    goto MENU
)

cd /d "%ROOT%\%PROJECT%"

cls

echo.
echo =====================================
echo Selected Project: %PROJECT%
echo =====================================

:: Initialize Git if missing
if not exist ".git" (
    git init
    git branch -M main
)

:: Create .gitignore if missing
if not exist ".gitignore" (
(
echo node_modules/
echo vendor/
echo .env
echo *.log
echo .cache/
) > .gitignore
)

:: Add changes
git add .

:: Check for changes
git diff --cached --quiet

if errorlevel 1 (

    echo.
    set /p MSG=Enter commit message:

    if "!MSG!"=="" set MSG=Auto commit

    git commit -m "!MSG!"

) else (

    echo.
    echo No changes detected.
)

:: Check if GitHub repo exists
gh repo view %USERNAME%/%PROJECT% >nul 2>&1

if errorlevel 1 (

    echo.
    echo GitHub repository does not exist.
    echo Creating repository...

    gh repo create %PROJECT% --public

    :: Add remote if missing
    git remote get-url origin >nul 2>&1

    if errorlevel 1 (
        git remote add origin https://github.com/%USERNAME%/%PROJECT%.git
    )

) else (

    echo.
    echo Repository already exists.
)

:: Push changes
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed.
) else (
    echo.
    echo Push completed successfully!
)

pause
goto MENU

:: =====================================
:: DELETE REPOSITORIES
:: =====================================

:DELETE_REPO

cls

echo.
echo =====================================
echo       GitHub Repositories
echo =====================================

gh repo list %USERNAME% --limit 1000 --json name,visibility -q ".[] | [.name, .visibility] | @tsv" > repos.txt

set COUNT=0

for /f "tokens=1,2" %%A in (repos.txt) do (
    set /a COUNT+=1

    set REPO!COUNT!=%%A
    set VIS!COUNT!=%%B

    echo !COUNT!. %%A [%%B]
)

del repos.txt

if %COUNT%==0 (
    echo.
    echo No repositories found.
    pause
    goto MENU
)

echo.
set /p SELECTION=Enter repo numbers to delete: 

echo.
echo WARNING: THIS ACTION IS PERMANENT
set /p CONFIRM=Type YES to continue:

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo Cancelled.
    pause
    goto MENU
)

for %%N in (%SELECTION%) do (

    set REPO_NAME=!REPO%%N!

    if defined REPO_NAME (

        echo.
        echo Deleting !REPO_NAME!...

        gh repo delete %USERNAME%/!REPO_NAME! --yes

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
goto MENU

:: =====================================
:: EXIT
:: =====================================

:EXIT_SCRIPT

echo.
echo Exiting...
timeout /t 1 >nul
exit /b