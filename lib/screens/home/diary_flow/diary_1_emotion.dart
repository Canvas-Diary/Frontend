import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:canvas_diary/models/diary_flow_model.dart';
import 'package:canvas_diary/screens/home/diary_flow/diary_2_write.dart';

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
  const EmotionSelectScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text("Select Emotion"),
      ),
      body: SafeArea(
        child: Center(
          child: GridView(
            shrinkWrap: true,
            padding: EdgeInsets.all(16.0),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3, // 3열로 설정
              mainAxisSpacing: 16.0,
              crossAxisSpacing: 16.0,
              childAspectRatio: 2,
            ),
            children: emotions.map((emotion) {
              return ElevatedButton(
                onPressed: () {
                  diaryData.updateDiaryEmotion(emotion);
                  routeNextPage(context);
                },
                child: Text(emotion),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  void routeNextPage(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (BuildContext context) {
          return WritingScreen();
        },
      ),
    );
  }
}
