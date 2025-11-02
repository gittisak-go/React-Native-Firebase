# React Native Firebase

A React Native application integrated with Firebase services including Authentication and Firestore.

## Features

- 🔥 Firebase Authentication (Email/Password)
- 📦 Cloud Firestore integration
- ⚛️ React Native 0.82.1
- 📱 iOS and Android support
- 🎨 Dark mode support
- 🔐 User authentication flow

## Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

You will also need:
- Node.js >= 20
- npm or Yarn
- Xcode (for iOS)
- Android Studio (for Android)
- A Firebase project

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add an Android app to your Firebase project
3. Add an iOS app to your Firebase project
4. Download the configuration files:
   - `google-services.json` for Android (place in `android/app/`)
   - `GoogleService-Info.plist` for iOS (place in `ios/ReactNativeFirebase/`)

### Android Configuration

1. Place `google-services.json` in `android/app/`
2. The project already includes the necessary Gradle configuration for Firebase

### iOS Configuration

1. Place `GoogleService-Info.plist` in `ios/ReactNativeFirebase/`
2. Install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gittisak-go/React-Native-Firebase.git
cd React-Native-Firebase
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## Available Firebase Features

### Authentication
- Sign up with email/password
- Sign in with email/password
- Sign out
- Authentication state persistence

### Firestore
- Add data to collections
- Query data from collections
- Real-time updates

## Project Structure

```
React-Native-Firebase/
├── android/              # Android native code
├── ios/                  # iOS native code
├── __tests__/           # Test files
├── App.tsx              # Main application component with Firebase demo
├── index.js             # Entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Lint code

## Firebase Services Used

- **Firebase Authentication**: User authentication with email/password
- **Cloud Firestore**: NoSQL cloud database for storing and syncing data

## Security Notes

- Never commit Firebase configuration files (`google-services.json`, `GoogleService-Info.plist`) with production credentials to public repositories
- Use Firebase Security Rules to protect your data
- Enable App Check for additional security

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npm start -- --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode and reinstall pods
3. **Android build issues**: Clean Gradle cache with `cd android && ./gradlew clean`
4. **Firebase not connecting**: Ensure configuration files are in the correct locations

For more help, see:
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- [React Native Firebase Docs](https://rnfirebase.io/)

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Documentation](https://firebase.google.com/docs)

## License

MIT License - see LICENSE file for details
