import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:canvas_diary/models/diary_flow_model.dart';

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
  final VoidCallback  routeNextPage;
  const EmotionSelectScreen({
    required this.routeNextPage,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return Center(
      child: GridView(
        shrinkWrap: true,
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
              routeNextPage();
            },
            child: Text(emotion),
          );
        }).toList(),
      ),
    );
  }
}
