import 'package:canvas_diary/screens/home/home_screen.dart';
import 'package:canvas_diary/screens/my_page/my_page_screen.dart';
import 'package:canvas_diary/screens/report/report_screen.dart';
import 'package:canvas_diary/screens/search/search_screen.dart';
import 'package:flutter/material.dart';

class Routes extends StatefulWidget {
  const Routes({super.key});

  @override
  State<Routes> createState() => _RoutesState();
}

class _RoutesState extends State<Routes> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _selectedIndex = 0;
  void _onItemTapped(int index) {
    _tabController.animateTo(index);
  }

  void tabListener() {
    setState(() {
      _selectedIndex = _tabController.index;
    });
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _tabController.addListener(tabListener);
  }

  @override
  void dispose() {
    _tabController.removeListener(tabListener);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: TabBarView(
          physics: const NeverScrollableScrollPhysics(), // 스와이핑으로 화면 전환 방지
          controller:
              _tabController, // BottomNavigationBar의 controller와 동일한 컨트롤러 사용
          children: const [
            HomeScreen(),
            ReportScreen(),
            SearchScreen(),
            MyPageScreen(),
          ],
        ),
      ),
      bottomNavigationBar: Theme(
        data: ThemeData(
          bottomNavigationBarTheme: BottomNavigationBarThemeData(),
        ),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          selectedItemColor: Colors.blueAccent,
          showSelectedLabels: true,
          showUnselectedLabels: false,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: "home"),
            BottomNavigationBarItem(
                icon: Icon(Icons.text_snippet), label: "report"),
            BottomNavigationBarItem(icon: Icon(Icons.search), label: "search"),
            BottomNavigationBarItem(icon: Icon(Icons.people), label: "my page"),
          ],
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}
