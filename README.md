# Sri Rajalakshmi Jewellery — Offline Android App

This build is designed to store loan records and photographs locally on the Android phone. It does not use Supabase, Firebase, cloud storage, online authentication, or network APIs.

## Build the APK
Open this project folder (`srj_android_project`) in Android Studio, allow Gradle to resolve dependencies during setup, then choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**. The debug APK is generated at `app/build/outputs/apk/debug/app-debug.apk`.

Alternatively, push the project contents to a private GitHub repository and use the included GitHub Actions workflow to build a debug APK. Keep the project private.

## Local storage
- Loan records are stored in IndexedDB inside the Android WebView's app-private data.
- Customer and jewellery photos are saved with the local loan record as data URLs.
- Records remain available after app restarts.
- No Internet permission is declared in the Android manifest.

## Encrypted backup and restore
Use **Encrypted Backup** to create a password-protected `.srjbackup` file. It includes all loan records and embedded photos. Use **Restore backup** to import it. Restore replaces existing records, so create a backup first. Keep the password safe; there is no password recovery.

To copy the backup to your own phone, use Android file transfer / Bluetooth / local Wi-Fi transfer as appropriate. The backup file is portable, but restore currently happens inside the app. Do not assume the backup is valid until you test restoring it.

## Important
Test using fictional data first. This is a local-storage app; if the phone is lost, damaged, factory-reset, or the app data is cleared before backup, records can be lost. Keep encrypted backup copies on another device regularly.

Day Book, Monthly Book and Due Book are intentionally not implemented/changed.
