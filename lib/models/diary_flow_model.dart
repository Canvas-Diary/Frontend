import 'package:flutter/foundation.dart';

class DiaryFlowModel extends ChangeNotifier {
  String _emotion = '';
  String _diaryContent = '';
  String _format = '';
  String _painting = '';

  get diaryContent =>_diaryContent;
  get emotion => _emotion;
  get format => _format;
  get painting => _painting;

  void updateDiaryEmotion(String content) {
    _emotion = content;
    notifyListeners();
  }

  void updateDiaryContent(String content) {
    _diaryContent = content;
    notifyListeners();
  }

  void updateDiaryFormat(String content) {
    _format = content;
    notifyListeners();
  }

  void updateDiaryPainting(String content) {
    _painting = content;
    notifyListeners();
  }

  void clear(){
    _emotion = '';
    _diaryContent = '';
    _format = '';
    _painting = '';
    notifyListeners();
  }
}
