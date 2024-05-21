import 'package:canvas_diary/screens/home/diary_flow/diary_3_format.dart';
import 'package:flutter/material.dart';

class WritingScreen extends StatelessWidget {
  const WritingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) {
                  return FormatSelectScreen();
                },
              ),
            );
          },
          child: const Text("select format"),
        ),
      ),
    );
  }
}
