import 'dart:developer';

import 'package:canvas_diary/screens/home/diary_flow/diary_routes.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';

import '../../models/diary_flow_model.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  var _dio = Dio();

  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  Map<DateTime, List<Diary>> Events = {};

  Future<List<dynamic>> _getDiaries() async {
    _dio.options.baseUrl = "http://54.180.145.19:8080";
    Response response = await _dio.get('/api/diaries', queryParameters: {
      'from': null,
      'to': null,
      'content': null,
      'emotion': null,
    });

    Map<String, dynamic> diaryData = response.data;
    print(diaryData);
    List<dynamic> diaries = diaryData['diaries'];
    return diaries;
  }

  Future<void> _fetchAndSetDiaries() async {
    List<dynamic> diaries = await _getDiaries();
    Map<DateTime, List<Diary>> newEvents = {};

    for (var element in diaries) {
      DateTime date = DateTime.parse(element['date']);
      Diary diary =
          Diary(element['content'], element['imageUrl'], element['emotion']);

      newEvents[date] = [diary];
    }

    setState(() {
      Events = newEvents;
    });
  }

  @override
  void initState() {
    super.initState();
    _fetchAndSetDiaries();
  }

  @override
  Widget build(BuildContext context) {
    var diaryData = Provider.of<DiaryFlowModel>(context, listen: false);
    void _updateCalendar() {
      setState(() {
        Events[DateTime.utc(
            DateTime.now().year, DateTime.now().month, DateTime.now().day)] = [
          Diary(diaryData.diaryContent, diaryData.imageUrl, diaryData.emotion)
        ];
      });
      diaryData.clear();
      log('${Events[DateTime.utc(DateTime.now().year, DateTime.now().month, DateTime.now().day)]}');
    }

    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Stack(children: [
        TableCalendar(
          firstDay: DateTime.utc(2010),
          lastDay: DateTime.utc(2030),
          focusedDay: _focusedDay,
          calendarFormat: CalendarFormat.month,
          selectedDayPredicate: (day) {
            return isSameDay(_selectedDay, day);
          },
          onDaySelected: (selectedDay, focusedDay) {
            if (!isSameDay(_selectedDay, selectedDay)) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
            }
          },
          headerStyle: HeaderStyle(
            titleCentered: true,
            formatButtonVisible: false,
          ),
          onPageChanged: (focusedDay) {
            _focusedDay = focusedDay;
          },
          rowHeight: MediaQuery.of(context).size.height * 0.115,
          calendarBuilders: CalendarBuilders(
            defaultBuilder: (context, day, focusedDay) {
              bool hasEvent = Events[day]?.isNotEmpty ?? false;
              return Container(
                margin: const EdgeInsets.all(4.0),
                alignment: Alignment.topCenter,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      height: MediaQuery.of(context).size.height * 0.08,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8.0),
                        color: Colors.grey[300],
                      ),
                      child: hasEvent
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(8.0),
                              child: Image.network(
                                Events[day]![0].imageUrl,
                                fit: BoxFit.cover,
                              ),
                            )
                          : null,
                    ),
                    Text(
                      '${day.day}',
                    ),
                  ],
                ),
              );
            },
            selectedBuilder: (context, day, focusedDay) {
              bool hasEvent = Events[day]?.isNotEmpty ?? false;
              return Container(
                margin: const EdgeInsets.all(4.0),
                alignment: Alignment.topCenter,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8.0),
                  color: Colors.blue[200],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      height: MediaQuery.of(context).size.height * 0.08,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8.0),
                        color: Colors.grey[400],
                      ),
                      child: hasEvent
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(8.0),
                              child: Image.network(
                                Events[day]![0].imageUrl,
                                fit: BoxFit.cover,
                              ),
                            )
                          : null,
                    ),
                    Text(
                      '${day.day}',
                    ),
                  ],
                ),
              );
            },
            todayBuilder: (context, day, focusedDay) {
              bool hasEvent = Events[day]?.isNotEmpty ?? false;
              return Container(
                margin: const EdgeInsets.all(4.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8.0),
                  color: Colors.blueGrey[100],
                ),
                alignment: Alignment.topCenter,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      height: MediaQuery.of(context).size.height * 0.08,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8.0),
                        color: Colors.grey[400],
                      ),
                      child: hasEvent
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(8.0),
                              child: Image.network(
                                Events[day]![0].imageUrl,
                                fit: BoxFit.cover,
                              ),
                            )
                          : null,
                    ),
                    Text(
                      '${day.day}',
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (BuildContext context) {
                        return DiaryRoutes();
                      },
                    ),
                  ).then((value) {
                    if (diaryData.imageUrl != '') _updateCalendar();
                  });
                },
                child: const Text("start writing"),
              ),
            ],
          ),
        )
      ]),
    );
  }
}

class Diary {
  String content;
  String imageUrl;
  String emotion;

  Diary(this.content, this.imageUrl, this.emotion);
}
