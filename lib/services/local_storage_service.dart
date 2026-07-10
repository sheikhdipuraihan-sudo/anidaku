import 'package:hive_flutter/hive_flutter.dart';

class LocalStorageService {
  static final LocalStorageService _instance = LocalStorageService._internal();

  factory LocalStorageService() {
    return _instance;
  }

  LocalStorageService._internal();

  late Box _watchlistBox;
  late Box _downloadsBox;
  late Box _preferencesBox;

  Future<void> init() async {
    await Hive.initFlutter();
    _watchlistBox = await Hive.openBox('watchlist');
    _downloadsBox = await Hive.openBox('downloads');
    _preferencesBox = await Hive.openBox('preferences');
  }

  // Watchlist methods
  Future<void> addToWatchlist(String animeId, Map<String, dynamic> data) async {
    await _watchlistBox.put(animeId, data);
  }

  Future<void> removeFromWatchlist(String animeId) async {
    await _watchlistBox.delete(animeId);
  }

  Map<dynamic, dynamic> getWatchlist() {
    return _watchlistBox.toMap();
  }

  // Downloads methods
  Future<void> addDownload(String episodeId, Map<String, dynamic> data) async {
    await _downloadsBox.put(episodeId, data);
  }

  Future<void> removeDownload(String episodeId) async {
    await _downloadsBox.delete(episodeId);
  }

  Map<dynamic, dynamic> getDownloads() {
    return _downloadsBox.toMap();
  }

  // Preferences methods
  Future<void> setPreference(String key, dynamic value) async {
    await _preferencesBox.put(key, value);
  }

  dynamic getPreference(String key, {dynamic defaultValue}) {
    return _preferencesBox.get(key, defaultValue: defaultValue);
  }
}
