import 'package:canvas_diary/screens/home/diary_flow/diary_2_write.dart';
import 'package:flutter/material.dart';

const List<String> emotions = [
  "ANGER",
  "FEAR",
  "HAPPINESS",
  "SADNESS",
  "SURPRISE",
  "INTEREST",
  "DISGUST",
  "SHAME",
  "NONE",
];

class EmotionSelectScreen extends StatelessWidget {
  const EmotionSelectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          width: MediaQuery.of(context).size.width,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: emotions.map((e) {
              return EmotionButton(
                onPressed: () => routeNextPage(context), // 익명 함수 사용
                emotion: e,
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  routeNextPage(context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (BuildContext context) {
          return WritingScreen();
        },
      ),
    );
  }
}

class EmotionButton extends StatelessWidget {
  final String emotion;
  final VoidCallback onPressed;
  const EmotionButton({
    required this.onPressed,
    required this.emotion,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text(this.emotion),
    );
  }
}
