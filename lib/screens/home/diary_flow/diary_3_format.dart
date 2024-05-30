import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/diary_flow_model.dart';

const List<String> formats = [
  'ILLUSTRATION',
  '4-PANELCOMIC',
  'POSTER',
  'STORYBOARD',
];

class FormatSelectScreen extends StatelessWidget {
  final VoidCallback routeNextPage;
  const FormatSelectScreen({required this.routeNextPage, super.key});

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return SafeArea(
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
                diaryData.updateDiaryFormat(format);
                routeNextPage();
              }, // 익명 함수 사용
              child: Text(format),
            );
          }).toList(),
        ),
      ),
    );
  }
}
