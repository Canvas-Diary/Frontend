import 'package:flutter/material.dart';

import 'diary_1_emotion.dart';
import 'diary_2_write.dart';
import 'diary_3_format.dart';
import 'diary_4_painting.dart';
import 'diary_5_result.dart';

class DiaryRoutes extends StatefulWidget {
  const DiaryRoutes({super.key});

  @override
  State<DiaryRoutes> createState() => _DiaryRoutesState();
}

class _DiaryRoutesState extends State<DiaryRoutes> {
  int currentIndex = 0;
  PageController _pageController = PageController(initialPage: 0);

  void _routeNextPage() {
    _pageController.nextPage(
        duration: Duration(milliseconds: 200), curve: Curves.easeInOut);
  }

  void _endDiaryRoute() {
    Navigator.of(context).pop();
  }

  void _onPageChanged(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("select emotion"),
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 10, vertical: 30),
          child: Column(
            children: [
              LinearProgressIndicator(
                color: Colors.blue.shade700,
                value: (currentIndex + 1) / 5,
                borderRadius: BorderRadius.circular(10),
                minHeight: 20,
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(15),
                  child: PageView(
                    children: [
                      EmotionSelectScreen(routeNextPage: _routeNextPage),
                      WritingScreen(routeNextPage: _routeNextPage),
                      FormatSelectScreen(routeNextPage: _routeNextPage),
                      PaintingSelectScreen(routeNextPage: _routeNextPage),
                      ResultScreen(routeNextPage: _endDiaryRoute)
                    ],
                    controller: _pageController,
                    onPageChanged: _onPageChanged,
                    padEnds: true,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
