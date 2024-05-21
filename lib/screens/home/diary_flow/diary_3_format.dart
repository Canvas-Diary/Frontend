import 'package:canvas_diary/screens/home/diary_flow/diary_4_painting.dart';
import 'package:flutter/material.dart';

class FormatSelectScreen extends StatelessWidget {
  const FormatSelectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) {
                  return PaintingSelectScreen();
                },
              ),
            );
          },
          child: const Text("select painting"),
        ),
      ),
    );
  }
}
