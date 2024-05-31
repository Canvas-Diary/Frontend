import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:canvas_diary/models/diary_flow_model.dart';

const Map<String, String> emotions = {
  "ANGER": "화남",
  "FEAR": "두려움",
  "HAPPINESS": "행복함",
  "SADNESS": "슬픔",
  "SURPRISE": "놀람",
  "INTEREST": "관심",
  "DISGUST": "싫음",
  "SHAME": "창피함",
  "NONE": "없음",
};

class EmotionSelectScreen extends StatelessWidget {
  final VoidCallback routeNextPage;
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
        children: emotions.entries.map((entry) {
          return ElevatedButton(
            onPressed: () {
              diaryData.updateDiaryEmotion(entry.key);
              routeNextPage();
            },
            child: Text(entry.value),
          );
        }).toList(),
      ),
    );
  }
}
