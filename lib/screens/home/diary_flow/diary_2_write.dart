import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:canvas_diary/models/diary_flow_model.dart';

class WritingScreen extends StatefulWidget {
  final VoidCallback routeNextPage;
  WritingScreen({required this.routeNextPage, super.key});

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
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
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
                    diaryData.updateDiaryContent(_controller.text);
                    widget.routeNextPage();
                  },
                  child: const Text("Select Format"),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
