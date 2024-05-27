import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:canvas_diary/models/diary_flow_model.dart';
import 'package:canvas_diary/screens/home/diary_flow/diary_3_format.dart';

class WritingScreen extends StatefulWidget {
  WritingScreen({super.key});

  @override
  State<WritingScreen> createState() => _WritingScreenState();
}

class _WritingScreenState extends State<WritingScreen> {
  late TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    var diaryContent =
        Provider.of<DiaryFlowModel>(context, listen: false).diaryContent;
    _controller = TextEditingController(text: diaryContent);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text("Write Diary"),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Expanded(
                child: SizedBox(
                  child: TextField(
                    controller: _controller, // TextEditingController 설정
                    textAlign: TextAlign.start,
                    maxLines: null,
                    expands: true,
                    decoration: InputDecoration(
                      filled: true,
                      border: OutlineInputBorder(),
                      labelText: 'Write your diary',
                    ),
                  ),
                ),
              ),
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: ElevatedButton(
                    onPressed: () {
                      diaryData
                          .updateDiaryContent(_controller.text); // 입력된 텍스트 사용
                      routeNextPage(context);
                    },
                    child: const Text("Select Format"),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  routeNextPage(context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (BuildContext context) {
          return FormatSelectScreen();
        },
      ),
    );
  }
}
