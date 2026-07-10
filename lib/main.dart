import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const AnidakuApp());
}

class AnidakuApp extends StatelessWidget {
  const AnidakuApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // Add your providers here
      ],
      child: MaterialApp(
        title: 'Anidaku',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const HomeScreen(),
      ),
    );
  }
}
