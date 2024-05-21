import 'package:canvas_diary/screens/my_page/my_page_screen.dart';
import 'package:canvas_diary/screens/report/report_screen.dart';
import 'package:canvas_diary/screens/search/search_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:table_calendar/table_calendar.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  Map<DateTime, List<Event>> Events = {
    DateTime.utc(2024, 5, 5): [Event('title')],
    DateTime.utc(2024, 5, 1): [Event('title3')],
  };

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: TableCalendar(
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
                            child: Image.asset(
                              'assets/images/image_1.jpeg',
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
                            child: Image.asset(
                              'assets/images/image_1.jpeg',
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
              alignment: Alignment.topCenter,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    height: MediaQuery.of(context).size.height * 0.08,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      color: Colors.blueGrey[300],
                    ),
                    child: hasEvent
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),
                            child: Image.asset(
                              'assets/images/image_1.jpeg',
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
    );
  }
}

class Event {
  String title;

  Event(this.title);
}
