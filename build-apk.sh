#!/usr/bin/env bash
# SKILLORA — build the Android APK (macOS/Linux). Requires: Node 18+, JDK 21, Android SDK (ANDROID_HOME).
set -euo pipefail
cd "$(dirname "$0")"
: "${ANDROID_HOME:?Set ANDROID_HOME to your Android SDK folder}"
echo "[1/4] Building static web export..."
NEXT_EXPORT=true npm run build --workspace=apps/web
echo "[2/4] Syncing web assets into the Android project..."
(cd apps/web && npx cap sync android)
echo "[3/4] Compiling APK with Gradle..."
(cd apps/web/android && chmod +x gradlew && ./gradlew assembleDebug)
echo "[4/4] Copying APK..."
cp apps/web/android/app/build/outputs/apk/debug/app-debug.apk skillora-mobile.apk
echo "Done: $(pwd)/skillora-mobile.apk"
