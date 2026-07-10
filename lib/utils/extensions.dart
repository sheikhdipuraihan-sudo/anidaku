import 'package:flutter/material.dart';

extension ContextExtension on BuildContext {
  ThemeData get theme => Theme.of(this);
  MediaQueryData get mediaQuery => MediaQuery.of(this);
  Size get screenSize => mediaQuery.size;
  double get screenWidth => screenSize.width;
  double get screenHeight => screenSize.height;
  bool get isDarkMode => theme.brightness == Brightness.dark;
}

extension SizedBoxExtension on num {
  SizedBox get verticalSpace => SizedBox(height: toDouble());
  SizedBox get horizontalSpace => SizedBox(width: toDouble());
}
