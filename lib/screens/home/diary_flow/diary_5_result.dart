import 'dart:async';
import 'dart:developer';
import 'package:canvas_diary/models/diary_flow_model.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ResultScreen extends StatelessWidget {
  final VoidCallback routeNextPage;
  const ResultScreen({required this.routeNextPage, super.key});

  @override
  Widget build(BuildContext context) {
    var diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    var _dio = Dio();
    _dio.options.baseUrl = "http://54.180.145.19:8080";
    String? imageUrl;

    Future<String> _getImageURL() async {
      Response response = await _dio.post('/api/diaries/images', data: {
        "description": diaryData.diaryContent,
        "emotion": diaryData.emotion,
        "style": diaryData.painting
      });
      Map<String, dynamic> URLData = response.data;
      imageUrl = URLData["canvasImageUrl"][0];
      diaryData.updateDiaryImageUrl(imageUrl!);
      return imageUrl!;
    }

    Future<void> _storeData() async {
      try {
        await _dio.post('/api/diaries', data: {
          "imageUrl": imageUrl,
          "content": diaryData.diaryContent,
          "emotion": diaryData.emotion,
        });
      } catch (e) {
        throw Exception('Failed to store data: $e');
      }
    }

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: Center(
                child: FutureBuilder(
                  future: _getImageURL(),
                  builder:
                      (BuildContext context, AsyncSnapshot<String> snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      // 데이터를 기다리는 동안 로딩
                      return CircularProgressIndicator();
                    } else if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      log('${diaryData.emotion}', name: "diaryData");
                      log('${diaryData.diaryContent}', name: "diaryData");
                      log('${diaryData.format}', name: "diaryData");
                      log('${diaryData.painting}', name: "diaryData");
                      log('${diaryData.imageUrl}', name: "diaryData");
                      return Image.network(snapshot.data!, loadingBuilder:
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
                      });
                    }
                  },
                ),
              ),
            ),
            Center(
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: ElevatedButton(
                  onPressed: () {

                    _storeData();
                    routeNextPage();
                  },
                  child: const Text("end"),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
