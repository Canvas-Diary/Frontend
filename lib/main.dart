import 'package:canvas_diary/routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'models/diary_flow_model.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => DiaryFlowModel(),
      child: MaterialApp(
        home: Routes(),
      ),
    ),
  );
}
