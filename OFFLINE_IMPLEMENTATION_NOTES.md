# Offline implementation notes

- Removed the Supabase JavaScript SDK and all Supabase references from the app HTML.
- Removed Android INTERNET permission.
- Loan records and embedded photo data are persisted in IndexedDB inside the app's WebView origin.
- Added encrypted portable backup/restore using PBKDF2-SHA-256 and AES-256-GCM via Web Crypto.
- Added native WebView JavaScript alert/confirm/prompt dialogs so confirmations and backup password prompts work on Android.
- This is a first offline implementation pass. Build the APK and test on the target phone before entering real customer records.
- Backup files include embedded images because images are saved as data URLs in each local record.
- The encrypted backup password cannot be recovered if forgotten.
- Local-only storage means uninstalling the app, clearing its data, or losing the phone may erase records. Keep regular encrypted backup copies on a separate device.
