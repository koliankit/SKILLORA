# SKILLORA — build the Android APK (Windows). Requires: Node 18+, JDK 21, Android SDK (ANDROID_HOME).
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root

if (-not $env:ANDROID_HOME -and -not $env:ANDROID_SDK_ROOT) {
  throw "Set ANDROID_HOME to your Android SDK folder (Android Studio > SDK Manager shows the path)."
}

Write-Host "[1/4] Building static web export..." -ForegroundColor Yellow
$env:NEXT_EXPORT = "true"
npm run build --workspace=apps/web
if ($LASTEXITCODE -ne 0) { throw "Web build failed" }

Write-Host "[2/4] Syncing web assets into the Android project..." -ForegroundColor Yellow
Push-Location "$root\apps\web"
npx cap sync android
if ($LASTEXITCODE -ne 0) { throw "Capacitor sync failed" }

Write-Host "[3/4] Compiling APK with Gradle..." -ForegroundColor Yellow
Push-Location android
.\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) { throw "Gradle build failed" }
Pop-Location; Pop-Location

Write-Host "[4/4] Copying APK..." -ForegroundColor Yellow
Copy-Item "$root\apps\web\android\app\build\outputs\apk\debug\app-debug.apk" "$root\skillora-mobile.apk" -Force
Write-Host "Done: $root\skillora-mobile.apk" -ForegroundColor Green
