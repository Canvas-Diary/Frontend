import 'package:provider/provider.dart';
import '../models/diary_flow_model.dart';

List<ChangeNotifierProvider> providers = [
  ChangeNotifierProvider(create: (_) => DiaryFlowModel()),
];
