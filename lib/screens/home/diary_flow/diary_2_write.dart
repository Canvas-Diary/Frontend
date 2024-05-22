import 'package:canvas_diary/screens/home/diary_flow/diary_3_format.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class WritingScreen extends StatelessWidget {
  const WritingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("write diary"),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Expanded(
                child: SizedBox(
                  child: TextField(
                    textAlign: TextAlign.start,
                    maxLines: null,
                    expands: true,
                    decoration: InputDecoration(
                      filled: true,
                      border: OutlineInputBorder(),
                      labelText: 'write your diary',
                    ),
                  ),
                ),
              ),
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (BuildContext context) {
                            return FormatSelectScreen();
                          },
                        ),
                      );
                    },
                    child: const Text("select format"),
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
