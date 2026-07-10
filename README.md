# Anidaku - Android Anime Streaming App

A modern, feature-rich Android application for streaming and downloading anime built with Flutter.

## 🎯 Features

- 📱 **Android-Optimized** - Built exclusively for Android platform
- 🎬 **Stream Anime** - Watch high-quality anime in real-time
- ⬇️ **Download & Watch Offline** - Save episodes for offline viewing
- 🔍 **Advanced Search** - Find anime by title, genre, or popularity
- ⭐ **Ratings & Reviews** - Community ratings and user reviews
- 📊 **AniList Integration** - Sync your watch progress with AniList
- 🌙 **Dark Theme** - Modern dark UI designed for comfortable viewing
- 📝 **Watchlist** - Keep track of anime you're watching
- 💾 **Local Storage** - Secure local data management

## 📋 Tech Stack

- **Framework**: Flutter (Dart)
- **State Management**: Provider
- **Local Storage**: Hive
- **Video Player**: Better Player + FVP
- **Network**: GraphQL + HTTP
- **UI/UX**: Material 3 Design

## 🚀 Getting Started

### Prerequisites

- Flutter SDK 3.2.0 or higher
- Android SDK (API 21+)
- Java Development Kit (JDK 11+)
- Android Studio or VS Code with Flutter extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sheikhdipuraihan-sudo/anidaku.git
   cd anidaku
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Setup Android signing (for release builds)**
   - Create signing keystore in `android/app/`
   - Create `android/key.properties` with keystore details

4. **Build APK**
   ```bash
   flutter build apk --release
   ```

5. **Install on device**
   ```bash
   flutter install
   ```

## 📁 Project Structure

```
lib/
├── main.dart                 # App entry point
├── theme/
│   └── app_theme.dart        # Theme configuration
├── screens/
│   ├── home_screen.dart      # Home page
│   └── anime_detail_screen.dart
├── widgets/
│   ├── anime_card.dart       # Reusable anime card widget
│   └── episode_card.dart     # Episode list item
├── models/
│   ├── anime_model.dart      # Anime data model
│   └── episode_model.dart    # Episode data model
├── providers/
│   └── anime_provider.dart   # State management
├── services/
│   └── local_storage_service.dart
└── utils/
    ├── constants.dart
    └── extensions.dart
```

## 🎨 UI/UX Design

### Color Palette

- **Primary**: `#6366F1` (Indigo)
- **Background**: `#0a0e27` (Deep Navy)
- **Surface**: `#1a1f3a` (Slate Navy)
- **Accent**: `#FBBF24` (Amber)

### Design System

- Material 3 Design with dark theme
- Rounded corners (12dp standard)
- Smooth animations and transitions
- Responsive layouts for all screen sizes

## 🔧 Configuration

### Android Configuration

- Minimum SDK: API 21 (Android 5.0)
- Target SDK: API 34 (Android 14)
- Compile SDK: API 34
- Gradle: 7.0+

### Required Permissions

- `INTERNET` - For streaming
- `READ_EXTERNAL_STORAGE` - For downloads
- `WRITE_EXTERNAL_STORAGE` - For downloads
- `WAKE_LOCK` - For media playback
- `POST_NOTIFICATIONS` - For notifications (Android 12+)

## 📦 Dependencies

See `pubspec.yaml` for complete dependency list:

- **HTTP & Network**: http, graphql
- **State Management**: provider
- **Storage**: hive, hive_flutter, flutter_secure_storage
- **Media**: better_player, fvp
- **UI**: flutter_markdown_plus, cached_network_image, shimmer
- **Utilities**: permission_handler, device_info_plus, app_links

## 🚀 Building for Release

### Generate APK

```bash
flutter build apk --release
```

### Generate App Bundle (for Play Store)

```bash
flutter build appbundle --release
```

## 📝 License

This project is licensed under the **GNU General Public License v3.0** - see the LICENSE file for details.

## ⚠️ Disclaimer

- By using this app, you agree that the developer(s) are not responsible for any content within the app
- All content is sourced from third-party websites and APIs
- Users are responsible for complying with applicable laws and regulations
- The developer(s) are not accountable for the legality or nature of the content

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for anime enthusiasts on Android**
