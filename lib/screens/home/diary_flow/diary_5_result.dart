import 'dart:async';

import 'package:canvas_diary/models/diary_flow_model.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    var _dio = Dio();
    Future<String> _getImageURL() async{
      Response response =  await _dio.get('/test', queryParameters: {'id': 12, 'name': 'wendu'});
      return response.data.toString();
    }


    return Scaffold(
      appBar: AppBar(
        title: Text("result"),
      ),
      body: Column(
        children: [
          FutureBuilder(
            future: _getImageURL(),
            builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                // 데이터를 기다리는 동안 로딩
                return CircularProgressIndicator();
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              } else {
                return Image.network(snapshot.data!);
              }
            },
          ),
          Text('Selected Emotion: ${diaryData.emotion}'),
          Text('Diary Content: ${diaryData.diaryContent}'),
          Text('Selected format: ${diaryData.format}'),
          Text('Selected painting: ${diaryData.painting}'),
          Center(
            child: ElevatedButton(
              onPressed: () {
                diaryData.clear();
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
              child: const Text("end"),
            ),
          ),
        ],
      ),
    );
  }
}
