import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        children: [
          SearchBar(
            trailing: [Icon(Icons.search)],
            hintText: "검색어를 입력하세요",
            elevation: MaterialStatePropertyAll(2),
          ),
          Expanded(
            child: CustomScrollView(
              slivers: <Widget>[
                SliverGrid(
                  delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                      return Container(
                        alignment: Alignment.center,
                        color: Colors.teal[100 * (index % 9)],
                        child: Text(
                          'Grid Item ${index + 1}',
                          style: TextStyle(fontSize: 20),
                        ),
                      );
                    },
                    childCount: 10,
                  ),
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: 200.0,
                    mainAxisSpacing: 10.0,
                    crossAxisSpacing: 10.0,
                    childAspectRatio: 4.0,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
