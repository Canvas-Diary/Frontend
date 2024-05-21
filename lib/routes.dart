import 'package:canvas_diary/screens/home/home_screen.dart';
import 'package:canvas_diary/screens/my_page/my_page_screen.dart';
import 'package:canvas_diary/screens/report/report_screen.dart';
import 'package:canvas_diary/screens/search/search_screen.dart';
import 'package:flutter/material.dart';

/// NavItem은 아이콘, label을 담고 있는 모델 클래스로써
/// BottomNavigationBarItem에 필요한 정보를 제공합니다
class NavItem {
  final IconData activeIcon;
  final String label;
  final Widget widget;

  const NavItem({
    required this.activeIcon,
    required this.label,
    required this.widget,
  });
}

/// 여기서는 그냥 전역적으로 선언해주었습니다
/// [_navItems]는 [_TabViewState]의 지역 변수로 관리해주어도 되고, provider에 넣어도 되지만
/// 여기선 그냥 제일 간단하게 전역에서 관리할 예정입니다
const _navItems = [
  NavItem(
    activeIcon: Icons.home,
    label: 'home',
    widget: HomeScreen(),
  ),
  NavItem(
    activeIcon: Icons.text_snippet,
    label: 'report',
    widget: ReportScreen(),
  ),
  NavItem(
    activeIcon: Icons.search,
    label: 'search',
    widget: SearchScreen(),
  ),
  NavItem(
    activeIcon: Icons.person,
    label: 'mypage',
    widget: MyPageScreen(),
  ),
];

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
    _tabController = TabController(length: _navItems.length, vsync: this);
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
      appBar: AppBar(
        title: Text(_navItems[_selectedIndex].label),
      ),
      body: SafeArea(
        child: TabBarView(
          physics: const NeverScrollableScrollPhysics(), // 스와이핑으로 화면 전환 방지
          controller:
              _tabController, // BottomNavigationBar의 controller와 동일한 컨트롤러 사용
          children: _navItems.map(
            (item) {
              return item.widget;
            },
          ).toList(),
        ),
      ),
      bottomNavigationBar: Theme(
        data: ThemeData(
          bottomNavigationBarTheme: BottomNavigationBarThemeData(
            type: BottomNavigationBarType.fixed,
            selectedItemColor: Colors.blueAccent,
            showSelectedLabels: true,
            showUnselectedLabels: false,
          ),
        ),
        child: BottomNavigationBar(
          items: _navItems.map(
            (item) {
              return BottomNavigationBarItem(
                icon: Icon(item.activeIcon),
                label: item.label,
              );
            },
          ).toList(),
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}
