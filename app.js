// 수강 신청 구글폼. 담은 강의와 비밀 시리즈 투표를 미리 채워서 엽니다.
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScdq_V-kakkuDQJNKgIKXyscEbBy1Rzm0HGp52HSZmZ9senKw/viewform";
const FORM_PICK = "entry.127665552"; // 듣고 싶은 강의 (체크박스, ①~⑯)
const FORM_NOTE = "entry.889586095"; // 하고 싶은 말 (장문)
// 폼 체크박스 문구와 글자 하나까지 같아야 미리 채워집니다.
const FORM_LIVE = ["① 사단법인 만들기","② 미국 종교법인 만들기","③ 30억 투자 유치와 교훈","④ 혁신학교 만들기","⑤ 국제 포럼 만들기","⑥ AI로 앱인토스 게임 만들기","⑦ 세계 공공기관에 브랜드 팔기","⑧ 해외 게임쇼 부스 나가기","⑨ 공모전 300개 심화편","⑩ AI로 책 쓰고 출간하기","⑪ 해외 행사 연사 지원하기","⑫ 스폰서 구좌 모금 설계","⑬ 미국 대학·의대 입시","⑭ 1인 창업가 AI 업무 자동화","⑮ 블록체인 경험담 (이더리움부터 코인빗 대표까지)","⑯ 깃허브 프로젝트 70개 만든 경험"];
const CATS = {law:"법인·조직", startup:"창업·투자", global:"글로벌 진출", ai:"AI 실전", edu:"교육·입시", web3:"블록체인", talk:"AI 특강 다시보기"};
const COURSES = [
{"n": 1, "cat": "law", "t": "문체부 산하 사단법인 만들기 — 국제브레인스포츠협회 설립기", "p": ["왜 사단법인인가: 주식회사·재단법인·비영리민간단체와 비교", "국제브레인스포츠협회를 만든 이유", "주무관청 선택과 사전 협의: 왜 문체부였는지", "설립 전 과정: 발기인 → 창립총회 → 정관 → 허가 → 등기", "행정사 비용 공개, 직접 할 수 있는 부분과 맡길 부분", "이사·감사 선출: 누구를 어떻게 모셨는지", "설립 후 운영: 보고·회계, 그리고 국제 행사 주최 기관으로 쓰기"]},
{"n": 2, "cat": "law", "t": "미국 캘리포니아에 종교법인 만들기", "p": ["한국에서 종교법인 설립이 어려운 이유", "왜 샌프란시스코에, 왜 종교법인으로 만들었는지", "캘리포니아 비영리 종교법인의 구조 이해", "설립 서류 실무: Articles, 등록대리인, EIN, Bylaws", "한국에서 원격으로 진행한 방법과 실제 비용", "설립 후 유지: 신고·보고와 은행 계좌", "설립 후 활용: 교육 프로그램·국제 파트너십"], "d": "경험 공유이며 법률·세무 자문이 아닙니다."},
{"n": 3, "cat": "startup", "t": "30억 투자받고 20명을 내보내며 배운 것", "p": ["2018년 8억: 첫 투자자를 만난 과정과 투자 조건", "2021년 22억: 메타버스 붐 속 투자 유치 전략", "투자 계약서에서 실제로 부딪힌 조항들", "30억을 어디에 썼는지: 인건비·개발비 비율 공개", "메타버스 플랫폼 2개를 만들고 얻은 결과", "20명 채용과 전원 정리", "AI 시대에 다시 창업한다면: 1인 회사로 다시 시작한 이유"]},
{"n": 4, "cat": "law", "t": "미네르바 스쿨 같은 혁신학교 만들기", "p": ["2014년 미네르바 스쿨은 무엇이 혁신이었나", "오래전부터 그려 온 꿈의 학교, 플라토 스쿨의 비전", "샌프란시스코 비영리법인 설립 과정 공개", "500페이지 『플라토 스쿨 프리메드』 출간기", "학교 사이트를 직접 만든 과정과 투어", "학교보다 프로그램 먼저: AI Summer Korea 설계", "학부모·학생을 모으는 방법: 도서관·강연·네트워크"]},
{"n": 5, "cat": "global", "t": "다보스 포럼 같은 국제 포럼 만들기 — 999 Seoul Forum", "p": ["999 포럼을 만든 배경: 왜 9월 9일인가", "다보스 포럼 모델 분석", "아무것도 없을 때 시작하는 법: 사이트와 한 장짜리 제안서", "LP·GP·글로벌 패밀리오피스를 찾는 방법", "제안서 구조와 첫 이메일 공개", "스폰서 구좌 설계", "서울에서 대만·하노이로: 도시 순회 구상과 학생 트랙"]},
{"n": 6, "cat": "ai", "t": "AI로 앱인토스에 게임 만들어 올리기 (제작 과정 그대로)", "p": ["Zoom으로 여러 AI에게 동시에 게임 아이디어 수집하기", "아이디어 고르는 기준: 작게, 빨리, 끝까지", "AI로 프로토타입 만들기 (제작 화면 공개)", "테스트와 수정: 재미를 확인하는 방법", "게임물관리위원회 등급분류 신청 방법", "앱인토스 콘솔 등록과 심사 과정", "광고·인앱 수익화 구조"]},
{"n": 7, "cat": "global", "t": "세계 공공기관에 나만의 브랜드 팔기", "p": ["나만의 브랜드 분석하기", "나만의 자산 찾기 워크시트: 책·그림·게임·강연", "미국 도서관·박물관 500곳을 찾는 방법과 담당자 찾기", "영국·독일·프랑스·일본 공공기관 리스트 만들기", "컨택 메일 작성법과 후속 연락 전략", "협업 형태: 라이브 페인팅·강연·전시·도서 기증", "실제 사례: 미국 박물관·해외 한국문화원·한인회와 주고받은 메일"]},
{"n": 8, "cat": "global", "t": "정부 지원으로 해외 게임쇼 부스 나가기", "p": ["문체부·한콘진 해외 전시 지원사업 찾는 법", "선발되는 지원서 작성 포인트", "중국 텐센트 게임 어워즈 참가 경험", "스웨덴 게임 컨퍼런스·태국 게임스컴 준비 과정", "부스 운영: 빌드, 홍보물, 현장 미팅 잡기", "해외 바이어 미팅: 무엇을 보여 주고 무엇을 받아 오나", "전시 후 해외 파트너십으로 연결하기"]},
{"n": 9, "cat": "ai", "t": "2년간 공모전 300개 도전 — 심화편", "p": ["300개 중 어떤 공모전을 골랐나: 선별 기준", "공고를 찾는 곳: 사이트·기관·뉴스레터", "AI로 지원서를 빠르게 만드는 워크플로", "당선작과 탈락작의 차이, 실제 사례 분석", "인천공항 AI Port 최우수상 수상작 해부", "공모전 결과를 사업·포트폴리오로 연결하기", "떨어져도 계속하는 루틴과 관리표 공개"]},
{"n": 10, "cat": "ai", "t": "AI로 500페이지 책 쓰고 출간하기", "p": ["주제 선정과 목차 설계", "AI와 함께 원고 초안 쓰기", "퇴고와 팩트체크: AI가 틀리는 곳 잡기", "부크크 종이책·유페이퍼 전자책 출간 절차", "표지·가격 정하기와 ISBN", "교보문고 등 서점 유통", "도서관·강연으로 책 알리기"]},
{"n": 11, "cat": "global", "t": "CES·MWC 등 해외 행사 연사에 지원하는 법", "p": ["연사를 모집하는 글로벌 행사 찾기", "채택되는 발표 제안서(Abstract) 쓰는 법", "연사 프로필과 자기소개 자료 만들기", "세바시 등 국내 무대 경험을 해외로 연결하기", "실제 지원 사례 공개: 뉴욕·샌프란시스코·CES·MWC·GDC", "떨어졌을 때 다시 두드리는 법", "연사 경력을 다음 기회로 연결하기"]},
{"n": 12, "cat": "global", "t": "스폰서 구좌로 프로그램 자금 모으기", "p": ["구좌 방식이란: $10,000 = 학생 4명 구조", "후원자가 이해하기 쉬운 가격과 혜택 설계", "스폰서 제안서 구성", "기업·재단·개인 후원자 찾기", "첫 연락 메일과 후속 연락", "직접비와 운영비를 분리하는 자금 원칙", "지자체·정부 지원과 함께 설계하기"]},
{"n": 13, "cat": "edu", "t": "하버드 경제학 출신이 말하는 미국 대학·의대 입시", "p": ["미국 대학 입시의 구조와 한국 학생의 약점", "아이비리그가 보는 것: 성적 밖의 이야기", "에세이 쓰는 법", "활동·추천서 준비 전략", "한국에서 미국 의대를 준비하는 로드맵", "프리메드 과정에서 흔한 실수", "학부모가 지금 해야 할 일"]},
{"n": 14, "cat": "ai", "t": "1인 창업가의 AI 업무 자동화", "p": ["혼자 여러 사업을 운영하는 하루 공개", "AI로 이메일 쓰고 보내기", "AI로 문서·제안서 만들기", "AI로 자료 조사하기", "AI로 웹사이트·앱을 만들고 배포하기", "대량 이메일 캠페인 운영 방법", "나만의 AI 업무 시스템 만들기"]},
{"n": 15, "cat": "web3", "t": "2017년부터 블록체인 — 이더리움 공부부터 코인빗 대표이사까지", "p": ["2017년 비트코인 열풍, 무엇을 보고 뛰어들었나", "이더리움과 솔리디티를 직접 배운 과정", "윙클보스 형제가 세운 미국 제미나이 거래소 직접 방문기", "2018년 바이낸스 본사 이전 소식에 몰타까지 찾아간 이야기", "거래소 플랫폼을 만들다 1억 원 사기당한 경험", "중국 체인업(ChainUP) 솔루션 사용기", "코인빗 대표이사로 일하며 배운 것"], "d": "투자 권유가 아닌 경험 공유입니다."},
{"n": 16, "cat": "ai", "t": "혼자서 깃허브 프로젝트 70개 만든 경험", "p": ["깃허브 사용법: 저장소 만들기부터 버전 관리까지", "Supabase 사용법: 로그인과 데이터베이스 붙이기", "Firebase 사용법", "Vercel 사용법: 올리면 바로 배포되는 구조", "클로드와 함께 사이트와 앱 만들기 실전", "Cloudflare로 도메인 구매와 연결", "무료 이메일 활용법"]},
{"n": 17, "cat": "talk", "s": 1, "t": "AI로 6개월동안 50개 앱 10개 게임 만들기 (개요)", "w": "9월 9일(수)", "rel": [6, 16]},
{"n": 18, "cat": "talk", "s": 2, "t": "AI로 IP 만들어 해외 배급사들과 미팅 잡기", "w": "9월 10일(목)", "rel": [8]},
{"n": 19, "cat": "talk", "s": 3, "t": "AI로 게임 만들어 전세계 게임 컨퍼런스 도전하기", "w": "9월 22일(화)", "rel": [8, 11]},
{"n": 20, "cat": "talk", "s": 4, "t": "2년간 AI로 공모전 300개 도전하기: 발견과 실천", "w": "9월 21일(월)", "rel": [9]},
{"n": 21, "cat": "talk", "s": 5, "t": "AI로 글로벌 GP LP 등 해외 500개 기관 연결하여 프로젝트 만들기", "w": "9월 28일(월)", "rel": [5, 7]},
{"n": 22, "cat": "talk", "s": 6, "t": "AI로 메일 1만통 보내기: 글로벌에 자신의 브랜드 알리기", "w": "9월 29일(화)", "rel": [7, 14]},
{"n": 23, "cat": "talk", "s": 7, "t": "AI와 함께 웹소설/소설 만들고 배포하기", "w": "9월 30일(수)", "rel": [10]}
];
const SECRET_CATS = {money:"돈·투자", world:"글로벌", digital:"AI·디지털", grow:"교육·성장", law:"세금·가족", power:"사회", life:"건강·보험", faith:"종교"};
const SECRETS = [
{"n": 1, "cat": "money", "t": "대한민국 부자의 비밀"},
{"n": 2, "cat": "money", "t": "은행의 비밀", "img": "covers/bank.jpg", "ct": "대한민국 은행의 비밀", "sub": "은행의 역사와 사건으로 읽는 돈과 책임"},
{"n": 3, "cat": "money", "t": "부동산의 비밀"},
{"n": 4, "cat": "money", "t": "대출의 비밀"},
{"n": 5, "cat": "law", "t": "세무조사의 비밀"},
{"n": 6, "cat": "law", "t": "증여와 상속의 비밀", "img": "covers/inheritance.jpg", "ct": "대한민국 상속의 비밀", "sub": "재산을 남기는 선택, 가족의 미래를 바꾸다"},
{"n": 7, "cat": "law", "t": "이혼과 재산분할의 비밀"},
{"n": 8, "cat": "life", "t": "보험금의 비밀", "img": "covers/insurance.jpg", "ct": "대한민국 보험의 비밀", "sub": "보험료와 보험금 사이, 아무도 알려주지 않은 계산"},
{"n": 9, "cat": "power", "t": "재벌가의 비밀", "img": "covers/chaebol.jpg", "ct": "대한민국 재벌의 비밀", "sub": "가문과 기업, 승계와 지배구조의 이야기"},
{"n": 10, "cat": "money", "t": "주식시장의 비밀"},
{"n": 11, "cat": "digital", "t": "코인의 비밀"},
{"n": 12, "cat": "digital", "t": "보이스피싱의 비밀"},
{"n": 13, "cat": "digital", "t": "해킹의 비밀", "img": "covers/hacking.jpg", "ct": "해킹의 비밀", "sub": "뚫는 사람과 막는 사람, 보이지 않는 전쟁"},
{"n": 14, "cat": "digital", "t": "인공지능의 비밀"},
{"n": 15, "cat": "digital", "t": "유튜브 알고리즘의 비밀"},
{"n": 16, "cat": "grow", "t": "사교육의 비밀"},
{"n": 17, "cat": "grow", "t": "명문대의 비밀"},
{"n": 18, "cat": "world", "t": "미국 월가의 비밀", "img": "covers/wallstreet.jpg", "ct": "미국 월가의 비밀", "sub": "세계의 돈이 모이고 움직이는 곳"},
{"n": 19, "cat": "world", "t": "미국의 비밀"},
{"n": 20, "cat": "digital", "t": "빅테크의 비밀"},
{"n": 21, "cat": "world", "t": "일본 야쿠자의 비밀"},
{"n": 22, "cat": "digital", "t": "게임 산업의 비밀"},
{"n": 23, "cat": "world", "t": "일본 경제의 비밀"},
{"n": 24, "cat": "money", "t": "금융의 비밀"},
{"n": 26, "cat": "money", "t": "금리의 비밀"},
{"n": 28, "cat": "money", "t": "ETF의 비밀"},
{"n": 29, "cat": "money", "t": "달러의 비밀"},
{"n": 30, "cat": "money", "t": "공매도의 비밀"},
{"n": 31, "cat": "money", "t": "상장과 공모주의 비밀"},
{"n": 32, "cat": "world", "t": "미국 카지노 산업의 비밀"},
{"n": 33, "cat": "money", "t": "로또의 비밀", "img": "covers/lotto.jpg", "ct": "로또의 비밀", "sub": "확률과 욕망, 그리고 당첨금의 행방"},
{"n": 34, "cat": "money", "t": "대한민국 아파트의 비밀"},
{"n": 35, "cat": "money", "t": "환율의 비밀"},
{"n": 36, "cat": "digital", "t": "코인 거래소의 비밀", "img": "covers/exchange.jpg", "ct": "코인 거래소의 비밀", "sub": "거래소 대표가 직접 본 코인 시장의 안쪽"},
{"n": 37, "cat": "money", "t": "대한민국 금융사기의 비밀"},
{"n": 38, "cat": "money", "t": "금 투자의 비밀"},
{"n": 39, "cat": "world", "t": "미국 대마 산업의 비밀", "img": "covers/cannabis.jpg", "ct": "미국 대마 산업의 비밀", "sub": "불법에서 합법으로, 거대한 시장의 탄생"},
{"n": 40, "cat": "law", "t": "대한민국 유언장의 비밀"},
{"n": 41, "cat": "money", "t": "미국 주식의 비밀"},
{"n": 44, "cat": "world", "t": "패밀리오피스의 비밀", "img": "covers/familyoffice.jpg", "ct": "패밀리오피스의 비밀", "sub": "초부자들은 재산을 어떻게 지키는가"},
{"n": 45, "cat": "law", "t": "국세청의 비밀"},
{"n": 46, "cat": "world", "t": "조세피난처의 비밀", "img": "covers/taxhaven.jpg", "ct": "조세피난처의 비밀", "sub": "세금이 사라지는 섬들의 지도"},
{"n": 47, "cat": "world", "t": "스위스 은행의 비밀", "img": "covers/swissbank.jpg", "ct": "스위스 은행의 비밀", "sub": "비밀계좌의 신화와 현실"},
{"n": 48, "cat": "digital", "t": "저작권의 비밀"},
{"n": 49, "cat": "world", "t": "실리콘밸리의 비밀", "img": "covers/siliconvalley.jpg", "ct": "실리콘밸리의 비밀", "sub": "아이디어가 돈이 되는 곳의 규칙"},
{"n": 52, "cat": "digital", "t": "데이팅앱의 비밀"},
{"n": 57, "cat": "grow", "t": "시간관리의 비밀"},
{"n": 60, "cat": "world", "t": "중동 오일머니의 비밀"},
{"n": 65, "cat": "faith", "t": "사이비 종교의 비밀"},
{"n": 66, "cat": "world", "t": "중국 경제의 비밀"},
{"n": 67, "cat": "digital", "t": "SNS의 비밀"},
{"n": 68, "cat": "grow", "t": "아이비리그의 비밀"},
{"n": 71, "cat": "digital", "t": "AI 에이전트의 비밀"},
{"n": 72, "cat": "digital", "t": "반도체 산업의 비밀", "img": "covers/semiconductor.jpg", "ct": "반도체 산업의 비밀", "sub": "한 장의 칩이 세계 패권을 가른다"},
{"n": 73, "cat": "digital", "t": "다크웹의 비밀", "img": "covers/darkweb.jpg", "ct": "다크웹의 비밀", "sub": "검색되지 않는 인터넷의 깊은 곳"},
{"n": 74, "cat": "life", "t": "국민연금의 비밀", "img": "covers/pension.jpg", "ct": "대한민국 연금의 비밀", "sub": "내가 낸 돈은 언제, 얼마나 돌아오는가"},
{"n": 75, "cat": "life", "t": "병원의 비밀", "img": "covers/hospital.jpg", "ct": "대한민국 병원의 비밀", "sub": "진료실 밖에서 결정되는 것들"},
{"n": 76, "cat": "life", "t": "의사의 비밀"},
{"n": 77, "cat": "life", "t": "제약회사의 비밀", "img": "covers/pharma.jpg", "ct": "미국 제약회사의 비밀", "sub": "신약 하나에 걸린 돈과 권력"},
{"n": 78, "cat": "world", "t": "일본 파친코 산업의 비밀", "img": "covers/pachinko.jpg", "ct": "일본 파친코 산업의 비밀", "sub": "구슬 하나로 움직이는 거대한 회색 경제"},
{"n": 79, "cat": "digital", "t": "클로드의 비밀", "img": "covers/claude.jpg", "ct": "클로드의 비밀", "sub": "가장 똑똑한 AI 동료를 쓰는 법"},
{"n": 80, "cat": "digital", "t": "퍼플렉시티의 비밀", "img": "covers/perplexity.jpg", "ct": "퍼플렉시티의 비밀", "sub": "검색이 대화가 되는 순간"},
{"n": 81, "cat": "digital", "t": "챗GPT의 비밀", "img": "covers/chatgpt.jpg", "ct": "챗GPT의 비밀", "sub": "세상을 바꾼 AI를 제대로 부리는 법"},
{"n": 82, "cat": "digital", "t": "제미나이의 비밀", "img": "covers/gemini.jpg", "ct": "제미나이의 비밀", "sub": "구글이 만든 AI의 모든 것"},
{"n": 83, "cat": "digital", "t": "그록의 비밀", "img": "covers/grok.jpg", "ct": "그록의 비밀", "sub": "일론 머스크의 AI는 무엇이 다른가"},
{"n": 84, "cat": "power", "t": "방위산업의 비밀", "img": "covers/defense.jpg", "ct": "방위산업의 비밀", "sub": "무기를 파는 나라, 지키는 기술의 경제학"},
{"n": 85, "cat": "digital", "t": "우주산업의 비밀", "img": "covers/space.jpg", "ct": "우주산업의 비밀", "sub": "왜 일론 머스크는 우주에 열광하는가"},
{"n": 86, "cat": "power", "t": "음악산업의 비밀", "img": "covers/music.jpg", "ct": "음악산업의 비밀", "sub": "히트곡 뒤에서 돈은 어떻게 흐르는가"},
{"n": 87, "cat": "digital", "t": "드론 산업의 비밀", "img": "covers/drone.jpg", "ct": "드론 산업의 비밀", "sub": "하늘을 나는 로봇이 바꾸는 산업 지도"},
{"n": 88, "cat": "digital", "t": "자율주행의 비밀", "img": "covers/autonomous.jpg", "ct": "자율주행의 비밀", "sub": "운전대 없는 자동차는 언제 오는가"},
{"n": 89, "cat": "digital", "t": "수노의 비밀", "img": "covers/suno.jpg", "ct": "수노의 비밀", "sub": "AI로 노래를 만들고 파는 법"},
{"n": 90, "cat": "digital", "t": "미드저니의 비밀", "img": "covers/midjourney.jpg", "ct": "미드저니의 비밀", "sub": "AI 이미지로 디자인하고 돈 버는 법"},
{"n": 91, "cat": "digital", "t": "AI로 돈 버는 비밀", "img": "covers/aimoney.jpg", "ct": "AI로 돈 버는 비밀", "sub": "직접 해 본 사람이 알려주는 AI 수익 모델"},
{"n": 92, "cat": "digital", "t": "AI로 세금 신고하는 비밀", "img": "covers/aitax.jpg", "ct": "AI로 세금 신고하는 비밀", "sub": "종합소득세부터 부가세까지, AI와 함께"},
{"n": 93, "cat": "digital", "t": "AI로 PC 원격 조종하는 비밀", "img": "covers/airemote.jpg", "ct": "AI로 PC 원격 조종하는 비밀", "sub": "말 한마디로 컴퓨터를 움직이는 법"},
{"n": 94, "cat": "digital", "t": "AI로 고소장 만드는 비밀", "img": "covers/aicomplaint.jpg", "ct": "AI로 고소장 만드는 비밀", "sub": "법률 문서 초안을 AI로 쓰는 법"},
{"n": 95, "cat": "digital", "t": "AI로 HTML5 게임 만드는 비밀", "img": "covers/html5.jpg", "ct": "AI로 HTML5 게임 만드는 비밀", "sub": "코딩 몰라도 웹 게임 하나 완성하기"},
{"n": 96, "cat": "digital", "t": "AI로 유니티 게임 만드는 비밀", "img": "covers/unity.jpg", "ct": "AI로 유니티 게임 만드는 비밀", "sub": "모바일 게임을 AI와 함께 만드는 법"},
{"n": 97, "cat": "digital", "t": "AI로 언리얼 게임 만드는 비밀", "img": "covers/unreal.jpg", "ct": "AI로 언리얼 게임 만드는 비밀", "sub": "영화 같은 3D 게임을 AI로 만드는 법"}
];
const VOTE_MAX = 5;
const CIRC = n => String.fromCharCode(n<=20 ? 0x245F+n : 0x323C+n);
const LIST = 50000;
// 올패스 선착순 가격. 올패스가 한 장 팔릴 때마다 PASS_SOLD를 1씩 올려 주세요.
// minLive가 있는 차수는 공개된 강의가 그 수 이상일 때만 열리고, 그 전에는 앞 차수 가격이 이어집니다.
const PASS_SOLD = 1;
// until: 이 날(한국 시간) 밤 12시가 지나면 자리가 남아도 다음 차수로 넘어갑니다.
// covers: 이 날까지 열리는 강의를 모두 포함(없으면 구매일부터 1년).
const PASS_TIERS = [{k:"1차 · 선착순 30명",from:1,to:30,p:590000,until:"2026-12-31",covers:"2027-12-31",perk:"강의를 녹화할 때 Zoom으로 함께 참여하고 바로 질문 (1차 30명만, 녹화 일정은 단톡방으로 안내)"},{k:"2차 · 60번까지",from:31,to:60,p:690000},{k:"3차 · 61~90번",from:61,to:90,p:790000},{k:"4차 · 91번부터",from:91,to:Infinity,p:990000,minLive:25}];
// 강의 목표: 진행 막대와 올패스 안내에 쓰입니다.
const GOAL = 100, GOAL_BY = "2027년 말", PACE_MIN = 6, PACE_MAX = 7, PACE = `매달 ${PACE_MIN}~${PACE_MAX}강`;
const BONUS_MAX = 7; // 1강권 1개마다 AI 특강 1편 증정, 최대 7편
const LIVE = COURSES.filter(c=>c.cat!=="talk").length, TALKS = COURSES.length-LIVE;
// 강의를 올리면 그 강의에 "ready": true 를 붙여 주세요. 공개된 강의 수(OPEN)와 '지금 시청' 표시가 바뀝니다.
const isOpen = c => c.cat==="talk" || c.ready;
const OPEN = COURSES.filter(isOpen).length, SOON = COURSES.length - OPEN;
const tierOpen = t => !t.minLive || OPEN >= t.minLive;
const untilMs = t => t.until ? Date.parse(t.until + "T24:00:00+09:00") : Infinity;
const ended = t => Date.now() >= untilMs(t);
const tierDone = t => PASS_SOLD >= t.to || ended(t);
const passNow = () => { const i = PASS_TIERS.findIndex(t=>!tierDone(t)); return tierOpen(PASS_TIERS[i]) ? PASS_TIERS[i] : PASS_TIERS[i-1]; };
const coverText = t => { if(!t.covers) return "구매일부터 1년 동안"; const [y, m, d] = t.covers.split("-").map(Number); return `${y}년 ${m}월\u00a0${d}일까지`; };
const untilText = t => { const [, m, d] = t.until.split("-").map(Number); return `${m}월\u00a0${d}일`; };
// 일반 강의 live개와 AI 특강 talk개를 1강권으로만 들을 때 필요한 장수 (1강권은 어느 강의에나 쓸 수 있고, 장마다 AI 특강 1편 증정)
const ticketsFor = (live, talk) => { let k = live; while(k + Math.min(k, BONUS_MAX) < live + talk) k++; return k; };
const won = v => v.toLocaleString("ko-KR") + "원";
let filter = "all";
const picked = new Set();
try { JSON.parse(localStorage.getItem("kc-picked")||"[]").forEach(n=>picked.add(n)); } catch(e){}
function save(){ try{ localStorage.setItem("kc-picked", JSON.stringify([...picked])); }catch(e){} }
function renderFilters(){
const el = document.getElementById("filters");
const opts = [["all","전체 "+COURSES.length], ...Object.entries(CATS).map(([k,v])=>[k, v+" "+COURSES.filter(c=>c.cat===k).length])];
el.innerHTML = "";
for(const [k,label] of opts){
const b = document.createElement("button");
b.type="button"; b.className="chip"; b.textContent=label;
b.setAttribute("aria-pressed", String(filter===k));
b.addEventListener("click",()=>{filter=k; renderFilters(); renderCourses();});
el.appendChild(b);
}
}
function renderCourses(){
const el = document.getElementById("courseList");
el.innerHTML = "";
for(const c of COURSES){
if(filter!=="all" && c.cat!==filter) continue;
const on = picked.has(c.n);
const art = document.createElement("article");
art.className = "course" + (on?" on":"");
const body = c.p
? `<ol>${c.p.map(()=>"<li></li>").join("")}</ol>`
: `<div class="talk"><p class="when"></p><p class="rel"></p></div>`;
art.innerHTML = `
<div class="c-head"><span class="num">${String(c.n).padStart(2,"0")}</span>
<div><div class="cat">${CATS[c.cat]}${isOpen(c)?" · 지금 시청":" · 공개 예정"}</div><h3></h3></div></div>
${body}
${c.d?'<p class="disc"></p>':'<span></span>'}
<button class="pick" type="button" aria-pressed="${on}">${on?"✓ 담았어요":"+ 담기"}</button>`;
art.querySelector("h3").textContent = c.t;
if(c.p) art.querySelectorAll("li").forEach((li,i)=>li.textContent=c.p[i]);
else {
art.querySelector(".when").textContent = `제${c.s}탄 · ${c.w} 오후 8시–9시 30분 Zoom 라이브 · 녹화본 · 1강권 구매 시 증정 · 올패스 포함`;
art.querySelector(".rel").textContent = "함께 들으면 좋은 강의: " + c.rel.map(r=>CIRC(r)+" "+COURSES.find(x=>x.n===r).t).join(" / ");
}
if(c.d) art.querySelector(".disc").textContent = "※ " + c.d;
art.querySelector(".pick").addEventListener("click",()=>{
picked.has(c.n)?picked.delete(c.n):picked.add(c.n); save(); renderCourses(); renderCart();
});
el.appendChild(art);
}
}
function renderCart(){
syncApply();
const cart = document.getElementById("cart");
const n = picked.size;
if(!n){ cart.hidden = true; return; }
cart.hidden = false;
const list = [...picked].sort((a,b)=>a-b).map(CIRC).join("");
const talk = [...picked].filter(x=>COURSES.find(c=>c.n===x).cat==="talk").length, live = n - talk;
const k = ticketsFor(live, talk), single = k*LIST, pass = passNow();
const best = Math.min(single, pass.p);
document.getElementById("cartTitle").innerHTML = `${n}개 담음 ${list} → <span class="amt">${won(best)}</span>`;
const free = Math.min(k, BONUS_MAX), left = Math.min(free - Math.max(0, talk - (k - live)), TALKS - talk);
const sub = single <= pass.p
? `1강권 ×${k} (${won(single)}) + AI 특강 ${free}편 증정` + (left>0?` · AI 특강 ${left}편 더 고를 수 있어요`:"") + ` · 1강권 ${Math.floor(pass.p/LIST)+1}개부터는 올패스(${won(pass.p)})가 더 저렴해요`
: `올패스 ${pass.k} ${won(pass.p)} · 1강권으로 사면 ${won(single)} · 지금 볼 수 있는 ${OPEN}편 + 공개 예정 ${SOON}강 + ${coverText(pass)} 추가되는 강의 포함`;
document.getElementById("cartSub").textContent = sub;
}
document.getElementById("cartClear").addEventListener("click",()=>{picked.clear(); save(); renderCourses(); renderCart();});
function applyUrl(){
const q = new URLSearchParams({usp:"pp_url"});
const pk = [...picked].sort((a,b)=>a-b);
pk.filter(n=>n<=FORM_LIVE.length).forEach(n=>q.append(FORM_PICK, FORM_LIVE[n-1]));
const notes = [];
const talks = pk.filter(n=>n>FORM_LIVE.length).map(n=>CIRC(n)+" "+COURSES.find(c=>c.n===n).t);
if(talks.length) notes.push("담은 AI 특강: " + talks.join(", "));
if(votes.size) notes.push("먼저 듣고 싶은 비밀 시리즈: " + voteText());
if(notes.length) q.set(FORM_NOTE, notes.join("\n"));
return FORM_URL + "?" + q.toString().replace(/\+/g, "%20");
}
function syncApply(){
document.querySelectorAll(".apply").forEach(a=>{ a.href = applyUrl(); a.target="_blank"; a.rel="noopener"; });
}
function renderTickets(){
const el=document.getElementById("tickets"); el.innerHTML="";
const total = COURSES.length, full = ticketsFor(LIVE, TALKS)*LIST, now = passNow();
const card = (cls, flag, top, bottom) => {
const d=document.createElement("div");
d.className="ticket"+(cls?" "+cls:"");
d.innerHTML=(flag?`<span class="flag">${flag}</span>`:'')+`<div class="top">${top}</div><div class="bottom">${bottom}</div>`;
el.appendChild(d);
};
document.getElementById("single").innerHTML =
`<div class="s-main"><span class="name">1강권</span><span class="price">${LIST.toLocaleString("ko-KR")}<small>원</small></span></div>`+
`<div class="s-info"><span class="seats">1개 사면 AI 특강 1편 증정</span><span>원하는 강의 1개 · 원하는 AI 특강을 1편씩 최대 ${BONUS_MAX}편까지 드립니다 · 나중에 올패스로 바꾸면 낸 금액을 빼 드립니다</span></div>`;
const lo = Math.min(GOAL, OPEN + 12*PACE_MIN), hi = Math.min(GOAL, OPEN + 12*PACE_MAX);
const range = (a,b,f) => a===b ? f(a) : `${f(a)}~${f(b)}`;
for(const t of PASS_TIERS){
const cur = t===now, done = !cur && tierDone(t), open = tierOpen(t);
const dleft = Math.ceil((untilMs(t) - Date.now()) / 864e5);
const seats = cur && t.to > PASS_SOLD ? `<span class="badges"><span class="seats">남은 자리 ${t.to-PASS_SOLD}${t.from===1?` / ${t.to}`:""}</span>${t.until?`<span class="seats">${untilText(t)}까지 · D-${dleft}</span>`:""}</span>` : "";
const perlec = t.covers
? `<span class="perlec">${GOAL}강 완성 시 1강당 ${won(Math.round(t.p/GOAL))}</span>`
: `<span class="perlec">1강당 약 ${range(Math.round(t.p/hi/100)*100, Math.round(t.p/lo/100)*100, v=>v.toLocaleString("ko-KR"))}원</span>`;
const detail = !open
? `<span class="per">공개된 강의가 ${t.minLive}강 이상이 되면 판매합니다 (지금 ${OPEN}강)</span>`
: t.covers
? `<span class="val">${GOAL}강을 1강권으로 들으면 ${won(GOAL*LIST)} → 약 ${Math.round((1-t.p/(GOAL*LIST))*100)}% 저렴</span><span class="per">${coverText(t)} 열리는 강의 모두 포함</span>`
: `<span class="val">1강권 기준 약 ${range(lo*LIST/1e4, hi*LIST/1e4, v=>Math.round(v).toLocaleString("ko-KR"))}만원어치</span><span class="per">1년 동안 받을 강의 예상 ${range(lo,hi,v=>v)}강 · 약 ${Math.round((1-t.p/(lo*LIST))*100)}% 이상 저렴</span>`;
card(done?"done":cur?"best":"", done?"마감":cur?"지금 가격":"",
`<span class="name">올패스</span><span class="tier">${t.k}${t.until?` · ${untilText(t)}까지`:""}</span><span class="price">${t.p.toLocaleString("ko-KR")}<small>원</small></span>`+perlec+detail+seats,
cur?`<ul>${t.perk?`<li><b>${t.perk}</b></li>`:""}<li>지금 볼 수 있는 ${OPEN}편 바로 시청 + 순서대로 공개되는 ${SOON}강 전부</li><li>${coverText(t)} 새로 열리는 강의 모두 포함, 비밀 시리즈도 포함, 추가 비용 없음 (${PACE}씩, ${GOAL_BY} 목표 ${GOAL}강)</li><li>언제든 원하는 때에 보고, 몇 번이든 다시 보기</li><li>강의 자료 제공 (체크리스트 · 템플릿 · 슬라이드 PDF)</li><li>올패스 전용 단톡방에서 질문·답변</li></ul>`
:`<span>${done?(PASS_SOLD>=t.to?"선착순 마감":"기간 마감"):"앞 차수가 마감되면 이 가격이 됩니다"}</span><span>${coverText(t)} 새로 열리는 강의 포함 · 혜택은 지금 가격과 같습니다</span>`);
}
}
function renderGoal(){
const el=document.getElementById("goal"), n=OPEN, pct=Math.min(100, Math.round(n/GOAL*100));
el.innerHTML=`<div class="goal-top"><b>지금 볼 수 있는 강의 ${OPEN}편</b><span>공개 예정 ${SOON}강 · 비밀 시리즈 후보 ${SECRETS.length}편 · ${GOAL_BY}까지 목표 ${GOAL}강</span></div>`+
`<p class="goal-sum">${GOAL}강을 1강권으로 모두 들으면 <b>${won(GOAL*LIST)}</b></p>`+
`<div class="goal-track" role="progressbar" aria-valuemin="0" aria-valuemax="${GOAL}" aria-valuenow="${n}" aria-label="강의 ${GOAL}강 목표 중 ${n}강 공개"><span style="width:${pct}%"></span></div>`+
`<p>${PACE}씩 새로 엽니다. 비밀 시리즈는 <a href="#secrets">먼저 듣고 싶다는 표가 많은 주제</a>부터 만들고, 수요에 따라 주제가 바뀔 수 있습니다. 1차 올패스는 2027년 말까지, 2차부터는 구매일부터 1년 동안 열리는 강의를 모두 포함합니다.</p>`;
}
let sFilter = "all", sMore = false;
const SECRET_PREVIEW = 21;
const votes = new Set();
try { JSON.parse(localStorage.getItem("kc-votes7")||"[]").forEach(n=>{ if(SECRETS.some(x=>x.n===n)) votes.add(n); }); } catch(e){}
function saveVotes(){ try{ localStorage.setItem("kc-votes7", JSON.stringify([...votes])); }catch(e){} }
const voteText = () => [...votes].sort((a,b)=>a-b).map(n=>SECRETS.find(x=>x.n===n).t).join(", ");
function renderSecrets(){
const f = document.getElementById("secretFilters"); f.innerHTML = "";
for(const [k,label] of [["all","전체 "+SECRETS.length], ...Object.entries(SECRET_CATS).map(([k,v])=>[k, v+" "+SECRETS.filter(x=>x.cat===k).length])]){
const b = document.createElement("button");
b.type="button"; b.className="chip"; b.textContent=label;
b.setAttribute("aria-pressed", String(sFilter===k));
b.addEventListener("click",()=>{sFilter=k; sMore=false; renderSecrets();});
f.appendChild(b);
}
const full = votes.size >= VOTE_MAX;
const cv = document.getElementById("secretCovers"); cv.innerHTML = "";
for(const x of SECRETS.filter(x=>x.img)){
const on = votes.has(x.n);
const b = document.createElement("button");
b.type="button"; b.className="cover"+(on?" on":"");
b.setAttribute("aria-pressed", String(on));
b.disabled = full && !on;
b.innerHTML = `<img alt="" loading="lazy" width="720" height="1020"><span class="cv-t"></span><span class="cv-s"></span><span class="cv-v">${on?"✓ 투표함":(full?"5개 다 골랐어요":"+ 이 주제에 투표")}</span>`;
b.querySelector("img").src = x.img;
b.querySelector("img").alt = x.ct+" 표지";
b.querySelector(".cv-t").textContent = x.ct;
b.querySelector(".cv-s").textContent = x.sub;
b.addEventListener("click",()=>{ votes.has(x.n)?votes.delete(x.n):votes.add(x.n); saveVotes(); renderSecrets(); });
cv.appendChild(b);
}
const ey = document.getElementById("secretEyebrow"); if(ey) ey.textContent = `공개 예정 · 비밀 시리즈 후보 ${SECRETS.length}편`;
const el = document.getElementById("secretList"); el.innerHTML = "";
const shown = SECRETS.filter(x=>sFilter==="all" || x.cat===sFilter);
const cut = !sMore && shown.length > SECRET_PREVIEW;
for(const x of cut ? shown.slice(0, SECRET_PREVIEW) : shown){
const on = votes.has(x.n);
const b = document.createElement("button");
b.type="button"; b.className="secret"+(on?" on":"");
b.setAttribute("aria-pressed", String(on));
b.disabled = full && !on;
b.innerHTML = `<span class="sn">${String(x.n).padStart(2,"0")}</span><span class="st"></span><span class="sv">${on?"✓":"+"}</span>`;
b.querySelector(".st").textContent = x.t;
b.addEventListener("click",()=>{ votes.has(x.n)?votes.delete(x.n):votes.add(x.n); saveVotes(); renderSecrets(); });
el.appendChild(b);
}
const more = document.getElementById("secretMore");
more.hidden = !cut;
more.textContent = `${shown.length}편 모두 보기`;
document.getElementById("voteCount").textContent = `${votes.size} / ${VOTE_MAX}개 선택`;
document.getElementById("voteText").textContent = votes.size ? voteText() : "듣고 싶은 주제를 눌러 골라 주세요.";
document.getElementById("voteSend").disabled = !votes.size;
syncApply();
}
document.getElementById("voteSend").addEventListener("click", ()=>{
window.open(applyUrl(), "_blank", "noopener");
document.getElementById("voteMsg").textContent = "신청서를 열었어요. 고른 주제가 '하고 싶은 말' 칸에 채워져 있어요.";
});
document.getElementById("secretMore").addEventListener("click",()=>{sMore=true; renderSecrets();});
function renderSeries(){
const parts = [["s-talk", TALKS, "AI 특강", "지금 다시보기", "#courses"], ["s-live", LIVE, "직접 해본 것만 강의", "순서대로 공개 · 지금 신청", "#courses"], ["s-secret", SECRETS.length, "비밀 시리즈", "투표로 골라 제작", "#secrets"]];
const total = parts.reduce((t,p)=>t+p[1],0);
document.getElementById("series").innerHTML =
`<div class="series-bar" role="img" aria-label="${parts.map(p=>p[2]+" "+p[1]+"강").join(", ")}, 합계 ${total}강">${parts.map(p=>`<span class="${p[0]}" style="flex:${p[1]}"></span>`).join("")}</div>`+
`<ul class="series-list">${parts.map(p=>`<li><a href="${p[4]}"><i class="${p[0]}"></i><b>${p[2]} ${p[1]}${p[0]==="s-live"?"강":"편"}</b><em>${p[3]}</em></a></li>`).join("")}</ul>`+
`<p class="series-note">지금 ${OPEN}편 공개 · ${PACE}씩 새로 올림 · ${GOAL_BY}까지 ${GOAL}강</p>`;
}
function passHeadline(){
const t = passNow();
return t.from===1 && t.until && !tierDone(t) ? `올패스 ${won(t.p)}은 선착순 ${t.to}명, ${untilText(t)}까지입니다` : `지금 올패스는 ${t.k.split(" · ")[0]} 가격 ${won(t.p)}입니다`;
}
function renderTopbar(){
const t = passNow(), bits = [];
const showSeats = t.from===1 && t.to > PASS_SOLD && isFinite(t.to), left = t.to-PASS_SOLD;
if(t.to > PASS_SOLD && isFinite(t.to) && !showSeats) bits.push(`남은 자리 ${left}`);
if(t.until && !tierDone(t)) bits.push(`D-${Math.ceil((untilMs(t)-Date.now())/864e5)}`);
bits.push(t.covers ? `${GOAL}강 완성 시 1강당 ${won(Math.round(t.p/GOAL))}` : `지금 ${OPEN}편 + 공개 예정 ${SOON}강 + 1년 동안 새 강의 포함`);
const seatBox = showSeats ? `<div class="seat-box" role="img" aria-label="선착순 ${t.to}명 중 ${left}자리 남음"><small>남은 자리</small><strong>${left}<em>/${t.to}</em></strong></div>` : "";
const dots = showSeats ? `<div class="seat-dots" aria-hidden="true">${Array.from({length:t.to},(_,i)=>`<i${i<PASS_SOLD?' class="on"':""}></i>`).join("")}</div><span>${PASS_SOLD}명 신청 완료 · ${bits.join(" · ")}</span>` : `<span>${bits.join(" · ")}</span>`;
document.getElementById("topbar").innerHTML = `${seatBox}<div class="tb-main"><b></b>${dots}</div><a class="btn apply" href="#apply">수강 신청하기</a>`;
document.querySelector("#topbar b").textContent = passHeadline();
document.getElementById("applyHead").textContent = passHeadline();
}
renderTopbar(); renderSeries(); renderGoal(); renderSecrets(); renderTickets(); renderFilters(); renderCourses(); renderCart();
