import 'package:canvas_diary/models/diary_flow_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var diaryData = Provider.of<DiaryFlowModel>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: Text("result"),
      ),
      body: Column(
        children: [
          Text('Selected Emotion: ${diaryData.emotion}'),
          Text('Diary Content: ${diaryData.diaryContent}'),
          Text('Selected format: ${diaryData.format}'),
          Text('Selected painting: ${diaryData.painting}'),
          Center(
            child: ElevatedButton(
              onPressed: () {
                diaryData.clear();
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
              child: const Text("end"),
            ),
          ),
        ],
      ),
    );
  }
}
