# Anidaku - Development Guide

## Project Overview

**Anidaku** is a modern, feature-rich Android anime streaming and downloading application built with Flutter. The app is optimized exclusively for the Android platform and features a sleek, modern UI with Material 3 design principles.

## Architecture

### Clean Architecture Pattern

The project follows a clean architecture pattern with clear separation of concerns:

```
Presentation Layer (UI)
    ↓
State Management (Provider)
    ↓
Business Logic Layer (Services, Providers)
    ↓
Data Layer (Models, Local Storage)
```

### Project Structure

```
lib/
├── main.dart                    # Application entry point
├── config/
│   └── app_config.dart         # App configuration constants
├── theme/
│   └── app_theme.dart          # Theme and styling
├── screens/                     # UI Screens
│   ├── home_screen.dart        # Home/Discovery feed
│   ├── anime_detail_screen.dart # Anime details page
│   ├── search_screen.dart      # Search functionality
│   ├── watchlist_screen.dart   # User watchlist
│   └── profile_screen.dart     # User profile & settings
├── widgets/                     # Reusable UI components
│   ├── anime_card.dart         # Anime list item card
│   └── episode_card.dart       # Episode list item
├── models/                      # Data models
│   ├── anime_model.dart        # Anime data structure
│   └── episode_model.dart      # Episode data structure
├── providers/                   # State management
│   └── anime_provider.dart     # Anime state provider
├── services/                    # Business logic
│   └── local_storage_service.dart  # Local data management
└── utils/                       # Helper functions
    ├── constants.dart          # App constants
    └── extensions.dart         # Dart extensions
```

## UI/UX Design System

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | `#6366F1` | Buttons, highlights, active states |
| Background | `#0a0e27` | Main background color |
| Surface | `#1a1f3a` | Cards, containers, input fields |
| Accent | `#FBBF24` | Ratings, special highlights |
| Text Primary | `#FFFFFF` | Main text |
| Text Secondary | `#9CA3AF` | Secondary text, hints |

### Typography

- **Font Family**: Poppins (primary), Roboto (fallback)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Component Guidelines

- **Border Radius**: 12dp for cards and buttons
- **Padding**: 16dp standard, 12dp compact
- **Elevation**: Flat design with subtle shadows
- **Animation Duration**: 300ms (fast), 500ms (standard)

## Key Features

### 1. Home Screen
- Featured anime carousel
- Trending anime list
- Latest releases
- Tab-based navigation (Home, Trending, Downloads, Profile)

### 2. Search Functionality
- Real-time search
- Advanced filters (genre, rating, status)
- Search history

### 3. Anime Details
- Full anime information
- Episode list
- Ratings and reviews
- Watch/Download buttons

### 4. Local Storage
- Watchlist management
- Download tracking
- User preferences
- Watch history

### 5. User Profile
- AniList integration
- Profile information
- Preferences management
- Settings

## State Management

The app uses **Provider** for state management:

```dart
ChangeNotifier providers:
- AnimeProvider: Manages anime list and search state
```

## Local Storage

The app uses **Hive** for local storage:

```
Boxes:
- watchlist: User watchlist data
- downloads: Downloaded episodes
- preferences: User preferences
```

## API Integration

### Planned APIs

1. **Anime API**: Fetch anime data, search, trending
2. **AniList GraphQL**: User tracking and sync
3. **Video Streaming**: Episode streaming URLs

### Implementation

API calls should be implemented in:
- `lib/services/` - Business logic
- `lib/providers/` - State management

## Android Configuration

### Minimum Requirements

- **Min SDK**: API 21 (Android 5.0)
- **Target SDK**: API 34 (Android 14)
- **Compile SDK**: API 34

### Required Permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

## Development Setup

### Prerequisites

- Flutter SDK 3.2.0+
- Dart SDK 3.2.0+
- Android SDK (API 21+)
- Java Development Kit (JDK 11+)

### Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/sheikhdipuraihan-sudo/anidaku.git
   cd anidaku
   ```

2. **Install Dependencies**
   ```bash
   flutter pub get
   ```

3. **Run Development Build**
   ```bash
   flutter run
   ```

4. **Generate Code**
   ```bash
   flutter pub run build_runner build
   ```

## Building for Release

### Android APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (Play Store)

```bash
flutter build appbundle --release
```

Output: `build/app/outputs/bundle/release/app-release.aab`

## Dependencies

### Core Dependencies

- **flutter**: UI framework
- **provider**: State management
- **hive**: Local storage
- **http**: HTTP client
- **graphql**: GraphQL client

### UI Dependencies

- **cached_network_image**: Image caching
- **shimmer**: Loading animations
- **flutter_markdown_plus**: Markdown rendering

### Media Dependencies

- **better_player**: Video player
- **fvp**: FFmpeg video player

### Utility Dependencies

- **permission_handler**: Permissions
- **device_info_plus**: Device information
- **app_links**: Deep linking
- **path_provider**: File paths

## Code Style

### Naming Conventions

- **Classes**: PascalCase (e.g., `AnimeCard`)
- **Functions/Variables**: camelCase (e.g., `fetchAnimes`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MIN_SDK_VERSION`)
- **Files**: snake_case (e.g., `home_screen.dart`)

### Documentation

- Use triple-slash comments for public APIs
- Document complex logic
- Include usage examples for utilities

## Testing

### Unit Tests

```bash
flutter test
```

### Widget Tests

```bash
flutter test test/widgets/
```

### Integration Tests

```bash
flutter drive --target=test_driver/app.dart
```

## Deployment

### Play Store Submission

1. Generate signed AAB
2. Prepare store listing
3. Add screenshots and descriptions
4. Submit for review

### Beta Testing

- Use Firebase App Distribution
- Collect feedback from testers
- Iterate on features

## Troubleshooting

### Common Issues

1. **Build fails**: Run `flutter clean && flutter pub get`
2. **Plugin errors**: Update packages with `flutter pub upgrade`
3. **Gradle issues**: Clear gradle cache: `./gradlew clean`

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests and lint checks
4. Submit PR with description

## Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Provider Package](https://pub.dev/packages/provider)
- [Hive Database](https://docs.hivedb.dev/)
- [Material Design 3](https://m3.material.io/)

## License

GNU General Public License v3.0
