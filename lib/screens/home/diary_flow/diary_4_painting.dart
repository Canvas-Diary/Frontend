import 'package:canvas_diary/screens/home/diary_flow/diary_5_result.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../models/diary_flow_model.dart';

const List<String> paintings = [
  "Oil Painting",
  "Watercolor",
  "Acrylic Painting",
  "Pen and Ink",
  "Pencil Drawing",
  "Charcoal Drawing",
  "Digital Art",
  "Comic Style",
  "Animation Style",
  "Collage"
];

class PaintingSelectScreen extends StatelessWidget {
  const PaintingSelectScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text("select painting"),
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
            children: paintings.map((painting) {
              return ElevatedButton(
                onPressed: () {
                  diaryData
                      .updateDiaryPainting(painting);
                  routeNextPage(context);
                },
                child: Text(painting),
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
          return ResultScreen();
        },
      ),
    );
  }
}
