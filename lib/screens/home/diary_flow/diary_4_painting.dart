import 'package:canvas_diary/screens/home/diary_flow/diary_5_result.dart';
import 'package:flutter/material.dart';

class PaintingSelectScreen extends StatelessWidget {
  const PaintingSelectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) {
                  return ResultScreen();
                },
              ),
            );
          },
          child: const Text("show result"),
        ),
      ),
    );
  }
}
