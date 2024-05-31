import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../models/diary_flow_model.dart';

const Map<String, String> paintings = {
  'OILPAINTING': '유화',
  'WATERCOLOR': '수채화',
  'ACRYLICPAINTING': '아크릴화',
  'PENANDINK': '펜과 잉크',
  'PENCILDRAWING': '연필 드로잉',
  'CHARCOALDRAWING': '숯 드로잉',
  'DIGITALART': '디지털 아트',
  'COMICSTYLE': '만화',
  'ANIMATIONSTYLE': '애니메이션',
  'COLLAGE': '콜라주',
};


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
          children: paintings.entries.map((entry) {
            return ElevatedButton(
              onPressed: () {
                diaryData.updateDiaryPainting(entry.key);
                routeNextPage();
              },
              child: Text(entry.value),
            );
          }).toList(),
        ),
      ),
    );
  }
}
