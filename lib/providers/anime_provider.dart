import 'package:flutter/material.dart';

class AnimeProvider extends ChangeNotifier {
  List<dynamic> _animes = [];
  bool _isLoading = false;
  String? _error;

  List<dynamic> get animes => _animes;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchAnimes() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // TODO: Implement API call
      await Future.delayed(const Duration(seconds: 2));
      _animes = []; // Replace with actual API response
      _isLoading = false;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
    }
    notifyListeners();
  }

  Future<void> searchAnimes(String query) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // TODO: Implement search API call
      await Future.delayed(const Duration(seconds: 1));
      _animes = []; // Replace with actual search results
      _isLoading = false;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
    }
    notifyListeners();
  }
}
