import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/diary_flow_model.dart';

const List<String> paintings = [
  'OILPAINTING',
  'WATERCOLOR',
  'ACRYLICPAINTING',
  'PENANDINK',
  'PENCILDRAWING',
  'CHARCOALDRAWING',
  'DIGITALART',
  'COMICSTYLE',
  'ANIMATIONSTYLE',
  'COLLAGE',
];

class PaintingSelectScreen extends StatelessWidget {
  final VoidCallback routeNextPage;
  const PaintingSelectScreen({required this.routeNextPage, super.key});

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
          children: paintings.map((painting) {
            return ElevatedButton(
              onPressed: () {
                diaryData.updateDiaryPainting(painting);
                routeNextPage();
              },
              child: Text(painting),
            );
          }).toList(),
        ),
      ),
    );
  }
}
