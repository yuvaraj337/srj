Sri Rajalakshmi Jewellery — Ledger + Release Book update

IMPORTANT: This project was modified from the designated source archive sri_rajalakshmi_jewellery_android_apk_project.zip only.

Features in this update:
- Ivory, maroon and gold responsive interface. Goddess Lakshmi logo is used in the desktop header, sign-in screen, PWA icons and Android launcher icon.
- New Loan Record supports multiple ornament rows with weight in grams and milligrams, per-item loan amount and valuation, and auto totals.
- Customer address and optional Aadhaar field.
- Customer and jewellery photo previews include a square maximize control for full-screen viewing.
- Ledger Book lists active loans by serial number, loan number, customer name, pledge date and loan amount. View Details opens the full read-only record; Edit All Details opens all fields for editing; Delete requires confirmation.
- Edit includes expected release date and actual gold release date. Saving an actual release date moves the record from Ledger Book to Release Book. Clearing actual release date makes it active again.
- Release Book lists released loans with serial number, loan number, customer name, pledge date and actual release date; View Details shows the whole record.
- Day Book, Monthly Book and Due Book are intentionally not implemented/changed in this update.
- Supabase authentication and private gold-loan-photos storage remain in use.

SETUP REQUIRED BEFORE TESTING: Run supabase_upgrade_ledger_release.sql in the Supabase SQL Editor for the project configured in app/src/main/assets/index.html. This migration adds the columns required by the new UI; it does not disable RLS or remove records. Existing storage bucket and RLS policies are expected to remain in place.

TEST STATUS: HTML/JavaScript syntax and ZIP integrity should be checked after packaging. An Android APK has not been built or tested on a device in this environment.

LATEST UI/PERFORMANCE UPDATE (2026-10-16)
- Removed the dashboard tagline about a digital version of Dad's paper register.
- Added Quick Capture through the existing Save Loan Record button: a new record can be saved with loan number plus customer and jewellery photos, marked Pending Details, then completed later from Ledger Book.
- Pending capture uses placeholder customer name and zero/empty details to fit the current gold_loans schema; the same record is edited later, avoiding duplicate loan numbers.
- Photo processing now resizes to a maximum 1280px edge and JPEG quality 0.78 using createImageBitmap when supported, avoiding the slower base64 FileReader path.
- Customer/jewellery uploads run in parallel, and signed photo URLs are fetched only when a record is opened/edited rather than for every record on initial load.
- Added mobile CSS to prevent horizontal page overflow, make cards and photo panels fit small screens, and keep wide tables horizontally scrollable inside their own containers.
- Validation performed: JavaScript syntax check and ZIP integrity check. APK build/device camera performance still needs to be tested on an Android device.
