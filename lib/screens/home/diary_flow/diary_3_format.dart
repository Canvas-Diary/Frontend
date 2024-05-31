import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/diary_flow_model.dart';

const Map<String, String> formats = {
  'ILLUSTRATION': '일러스트레이션',
  '4-PANELCOMIC': '4컷 만화',
  'POSTER': '포스터',
  'STORYBOARD': '스토리보드',
};


class FormatSelectScreen extends StatelessWidget {
  final VoidCallback routeNextPage;
  const FormatSelectScreen({required this.routeNextPage, super.key});

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return SafeArea(
      child: Center(
        child: GridView(
          shrinkWrap: true,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            mainAxisSpacing: 16.0,
            crossAxisSpacing: 16.0,
            childAspectRatio: 2,
          ),
          children: formats.entries.map((entry) {
            return ElevatedButton(
              onPressed: () {
                diaryData.updateDiaryFormat(entry.key);
                routeNextPage();
              }, // 익명 함수 사용
              child: Text(entry.value),
            );
          }).toList(),
        ),
      ),
    );
  }
}
