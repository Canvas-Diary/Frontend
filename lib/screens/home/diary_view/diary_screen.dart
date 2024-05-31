import 'package:canvas_diary/screens/home/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DiaryScreen extends StatelessWidget {
  final DateTime selectedDay;
  final Diary currentDiary;
  const DiaryScreen(
      {required this.currentDiary, required this.selectedDay, super.key});

  @override
  Widget build(BuildContext context) {
    final formatedSelectedDay = DateFormat('yyyy-MM-dd').format(selectedDay);

    return Scaffold(
      appBar: AppBar(
        title: Text("$formatedSelectedDay"),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Container(
            width: MediaQuery.of(context).size.width,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.network(currentDiary.imageUrl, loadingBuilder:
                    (BuildContext context, Widget child,
                        ImageChunkEvent? loadingProgress) {
                  if (loadingProgress == null) {
                    return child;
                  } else {
                    return Center(
                      child: CircularProgressIndicator(
                        value: loadingProgress.expectedTotalBytes != null
                            ? loadingProgress.cumulativeBytesLoaded /
                                loadingProgress.expectedTotalBytes!
                            : null,
                      ),
                    );
                  }
                }),
                Text('Emotion : ${currentDiary.emotion}'),
                Text('Content : ${currentDiary.content}'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
