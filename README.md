# FFXIV Chat Overlay

Final Fantasy XIV 채팅 오버레이입니다.

Advanced Combat Tracker(이하 ACT)의 OverlayPlugin 아래에서만 동작하며, 현재 WebSocket 플러그인은 지원하고 있지 않습니다.

글로벌 서버, 한국 서버 상관 없이 사용 가능합니다.

[ACT Download Page](http://advancedcombattracker.com/download.php)

[OverlayPlugin Download Page](https://github.com/ezsoftware/OverlayPlugin-Compiler/releases/latest)

## 설치 방법

![그림 설명](https://github.com/SasarinoMARi/ChatOverlay/blob/master/rm/tutorial1.JPG?raw=true)

1. ACT의 Plugins 탭 클릭
2. OverlayPlugin.dll 선택
3. 추가 버튼 클릭
4. 이름 입력
5. Log Parse 선택 (구버전의 OverlayPlugin에서 안보일 수 있습니다. 업데이트 해주세요)
6. OK 클릭
7. URL에 다음 값 입력

> `https://sasarinomari.github.io/ChatOverlay`

## 설정 방법

오버레이 우측 상단의 톱니바퀴 버튼을 눌러 설정 창을 열 수 있습니다.

### Keyword Setting

키워드가 포함된 로그가 올라오면 소리로 알려줍니다.

다른 용무 중 요긴하게 사용할 수 있을 지도..?

### Translate Setting

글로벌 서버용 설정입니다. 로그 본문을 번역한 뒤 출력하도록 합니다.

현재 Google Cloud 번역만을 지원합니다. 발급받은 키를 폼에 입력하고 적용을 누르면 바로 동작합니다.

[Google Cloud API Key 발급 가이드](https://) 는 아직 링크가 없어요.

### Log Detail Setting

로그별 설정을 할 수 있습니다.

다음은 각각의 폼에 대한 설명입니다.

- Index : 로그의 내부 식별 번호입니다. 로그 유형에 따라 다른 값이 지정되며 이 값을 매개로 개인 설정이 동작합니다.
- Name : 설정 화면에서 로그를 구별하기 위한 이름입니다. 아무 값이나 지정할 수 있습니다.
- Format : ChatOverlay에서 로그를 표시할 포맷입니다. 다음 예약어들을 사용할 수 있습니다.
  - /timestamp/ : 로그의 타임스탬프를 출력합니다.
  - /teller/ : 로그의 발신자를 출력합니다.
  - /content/ : 로그의 본문을 출력합니다.
- Color : 로그의 색상을 지정합니다. CSS코드를 사용할 수 있습니다.
- Visibility : 체크하면 ChatOverlay에 로그가 표시됩니다.
- Sound : 체크하면 로그가 올라올 때 소리로 알려줍니다.
- Keyword Check : 체크하면 이 로그에서 Keyword 문구가 포함되었을 때 소리로 알려줍니다.
- Translation : 체크하면 이 로그를 번역합니다.

## And...

오류나 건의사항은 [이슈 트래커](https://github.com/SasarinoMARi/ChatOverlay/issues) 혹은 [트위터](https://twitter.com/SasarinoMARi)로 받고 있습니다.

감사합니다.
