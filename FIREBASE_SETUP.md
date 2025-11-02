# Firebase Setup Guide

This guide will help you set up Firebase for your React Native application.

## Prerequisites

1. A Google/Firebase account
2. Node.js and npm installed
3. React Native development environment set up
4. Xcode (for iOS development)
5. Android Studio (for Android development)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "ReactNativeFirebase")
4. Enable/disable Google Analytics as needed
5. Click "Create project"

## Step 2: Add Android App

1. In your Firebase project, click on "Add app" and select Android
2. Enter the Android package name: `com.reactnativefirebase`
3. Optionally enter an app nickname and SHA-1 key
4. Click "Register app"
5. Download the `google-services.json` file
6. Place it in `android/app/` directory
7. Follow the remaining setup steps in Firebase console (the gradle changes are already done)

## Step 3: Add iOS App

1. In your Firebase project, click on "Add app" and select iOS
2. Enter the iOS bundle ID: `com.reactnativefirebase`
3. Optionally enter an app nickname
4. Click "Register app"
5. Download the `GoogleService-Info.plist` file
6. Place it in `ios/ReactNativeFirebase/` directory
7. Make sure to add it to your Xcode project:
   - Open `ios/ReactNativeFirebase.xcworkspace` in Xcode
   - Right-click on `ReactNativeFirebase` folder
   - Select "Add Files to ReactNativeFirebase"
   - Select `GoogleService-Info.plist`
   - Make sure "Copy items if needed" is checked
   - Click "Add"

## Step 4: Enable Firebase Services

### Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Select "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

### Cloud Firestore

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose a Cloud Firestore location
5. Click "Enable"

**Important**: Update security rules for production:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 5: Install Dependencies

Run the following command in your project root:

```bash
npm install
```

For iOS, also install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Step 6: Run the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Troubleshooting

### Android

**Issue**: "google-services.json missing"
- **Solution**: Ensure `google-services.json` is in `android/app/` directory

**Issue**: Build errors related to Firebase
- **Solution**: Clean and rebuild:
  ```bash
  cd android
  ./gradlew clean
  cd ..
  npm run android
  ```

### iOS

**Issue**: "GoogleService-Info.plist missing"
- **Solution**: Ensure the file is in `ios/ReactNativeFirebase/` and added to Xcode project

**Issue**: Pod install fails
- **Solution**: 
  ```bash
  cd ios
  rm -rf Pods Podfile.lock
  bundle exec pod install
  cd ..
  ```

**Issue**: Firebase not initializing
- **Solution**: Make sure GoogleService-Info.plist is added to the Xcode project target

## Security Best Practices

1. **Never commit Firebase config files to public repositories** with production credentials
2. Use different Firebase projects for development and production
3. Implement proper Firebase Security Rules
4. Enable App Check for additional security
5. Use environment variables for sensitive data in production
6. Regularly review Firebase usage and security settings

## Testing Firebase Integration

1. Run the app on an emulator or physical device
2. Try signing up with a new email/password
3. Check Firebase Console > Authentication to see the new user
4. Try adding data to Firestore using the "Add Data" button
5. Check Firebase Console > Firestore Database to see the data

## Additional Resources

- [React Native Firebase Documentation](https://rnfirebase.io/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
