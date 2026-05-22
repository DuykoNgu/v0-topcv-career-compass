@echo off
REM Create route directory structure
echo Creating route directories...

REM Auth group
mkdir "app\(auth)\welcome" 2>nul
mkdir "app\(auth)\login" 2>nul
mkdir "app\(auth)\career-stage" 2>nul

REM Dashboard group
mkdir "app\(dashboard)\onboarding" 2>nul
mkdir "app\(dashboard)\compass-result" 2>nul
mkdir "app\(dashboard)\profile" 2>nul
mkdir "app\(dashboard)\jobs" 2>nul
mkdir "app\(dashboard)\job\[id]" 2>nul
mkdir "app\(dashboard)\apply" 2>nul
mkdir "app\(dashboard)\cv" 2>nul
mkdir "app\(dashboard)\fit-explanation" 2>nul
mkdir "app\(dashboard)\referral" 2>nul

echo.
echo Directories created successfully!
echo.
echo Next steps:
echo 1. Restart your development server
echo 2. Routes will be automatically available:
echo    - /welcome
echo    - /login
echo    - /career-stage
echo    - /onboarding
echo    - /compass-result
echo    - /profile
echo    - /jobs
echo    - /job/[id]
echo    - /apply
echo    - /cv
echo    - /fit-explanation
echo    - /referral
pause
