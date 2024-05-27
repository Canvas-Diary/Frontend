import 'package:canvas_diary/screens/home/diary_flow/diary_4_painting.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/diary_flow_model.dart';

const List<String> formats = [
  "Illustration",
  "4-Panel Comic",
  "Poster",
  "Storyboard",
];

class FormatSelectScreen extends StatelessWidget {
  const FormatSelectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text("select format"),
      ),
      body: SafeArea(
        child: Center(
          child: GridView(
            padding: EdgeInsets.all(16.0),
            shrinkWrap: true,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 16.0,
              crossAxisSpacing: 16.0,
              childAspectRatio: 2,
            ),
            children: formats.map((format) {
              return ElevatedButton(
                onPressed: () {
                  diaryData
                      .updateDiaryFormat(format);
                  routeNextPage(context);
                }, // 익명 함수 사용
                child: Text(format),
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
          return PaintingSelectScreen();
        },
      ),
    );
  }
}
