const APPLY_URL = "https://docs.google.com/forms/d/1qd0H3X9hd6xrSrCkbiThR_vXxmcFDTY8SvibDWqLpKo/viewform";
const CATS = {law:"법인·조직", startup:"창업·투자", global:"글로벌 진출", ai:"AI 실전", edu:"교육·입시", web3:"블록체인"};
const COURSES = [
{"n": 1, "cat": "law", "t": "문체부 산하 사단법인 만들기 — 국제브레인스포츠협회 설립기", "p": ["왜 사단법인인가: 주식회사·재단법인·비영리민간단체와 비교", "국제브레인스포츠협회를 만든 이유", "주무관청 선택과 사전 협의: 왜 문체부였는지", "설립 전 과정: 발기인 → 창립총회 → 정관 → 허가 → 등기", "행정사 비용 공개, 직접 할 수 있는 부분과 맡길 부분", "이사·감사 선출: 누구를 어떻게 모셨는지", "설립 후 운영: 보고·회계, 그리고 국제 행사 주최 기관으로 쓰기"]},
{"n": 2, "cat": "law", "t": "미국 캘리포니아에 종교법인 만들기", "p": ["한국에서 종교법인 설립이 어려운 이유", "왜 샌프란시스코에, 왜 종교법인으로 만들었는지", "캘리포니아 비영리 종교법인의 구조 이해", "설립 서류 실무: Articles, 등록대리인, EIN, Bylaws", "한국에서 원격으로 진행한 방법과 실제 비용", "설립 후 유지: 신고·보고와 은행 계좌", "설립 후 활용: 교육 프로그램·국제 파트너십"], "d": "경험 공유이며 법률·세무 자문이 아닙니다."},
{"n": 3, "cat": "startup", "t": "30억 투자받고 20명을 내보내며 배운 것", "p": ["2018년 8억: 첫 투자자를 만난 과정과 투자 조건", "2021년 22억: 메타버스 붐 속 투자 유치 전략", "투자 계약서에서 실제로 부딪힌 조항들", "30억을 어디에 썼는지: 인건비·개발비 비율 공개", "메타버스 플랫폼 2개를 만들고 얻은 결과", "20명 채용과 전원 정리", "AI 시대에 다시 창업한다면: 1인 회사로 다시 시작한 이유"]},
{"n": 4, "cat": "law", "t": "미네르바 스쿨 같은 혁신학교 만들기", "p": ["2014년 미네르바 스쿨은 무엇이 혁신이었나", "오래전부터 그려 온 꿈의 학교, 플라토 스쿨의 비전", "샌프란시스코 비영리법인 설립 과정 공개", "500페이지 『플라토 스쿨 프리메드』 출간기", "학교 사이트를 직접 만든 과정과 투어", "학교보다 프로그램 먼저: AI Summer Korea 설계", "학부모·학생을 모으는 방법: 도서관·강연·네트워크"]},
{"n": 5, "cat": "global", "t": "다보스 포럼 같은 국제 포럼 만들기 — 999 Seoul Forum", "p": ["999 포럼을 만든 배경: 왜 9월 9일인가", "다보스 포럼 모델 분석", "아무것도 없을 때 시작하는 법: 사이트와 한 장짜리 제안서", "LP·GP·글로벌 패밀리오피스를 찾는 방법", "제안서 구조와 첫 이메일 공개", "스폰서 구좌 설계", "서울에서 대만·하노이로: 도시 순회 구상과 학생 트랙"]},
{"n": 6, "cat": "ai", "t": "AI로 앱인토스에 게임 만들어 올리기 (라이브 제작)", "p": ["Zoom으로 여러 AI에게 동시에 게임 아이디어 수집하기", "아이디어 고르는 기준: 작게, 빨리, 끝까지", "AI로 프로토타입 만들기 (라이브)", "테스트와 수정: 재미를 확인하는 방법", "게임물관리위원회 등급분류 신청 방법", "앱인토스 콘솔 등록과 심사 과정", "광고·인앱 수익화 구조"]},
{"n": 7, "cat": "global", "t": "세계 공공기관에 나만의 브랜드 팔기", "p": ["나만의 브랜드 분석하기", "나만의 자산 찾기 워크시트: 책·그림·게임·강연", "미국 도서관·박물관 500곳을 찾는 방법과 담당자 찾기", "영국·독일·프랑스·일본 공공기관 리스트 만들기", "컨택 메일 작성법과 후속 연락 전략", "협업 형태: 라이브 페인팅·강연·전시·도서 기증", "실제 사례: 미국 박물관·해외 한국문화원·한인회와 주고받은 메일"]},
{"n": 8, "cat": "global", "t": "정부 지원으로 해외 게임쇼 부스 나가기", "p": ["문체부·한콘진 해외 전시 지원사업 찾는 법", "선발되는 지원서 작성 포인트", "중국 텐센트 게임 어워즈 참가 경험", "스웨덴 게임 컨퍼런스·태국 게임스컴 준비 과정", "부스 운영: 빌드, 홍보물, 현장 미팅 잡기", "해외 바이어 미팅: 무엇을 보여 주고 무엇을 받아 오나", "전시 후 해외 파트너십으로 연결하기"]},
{"n": 9, "cat": "ai", "t": "2년간 공모전 300개 도전 — 심화편", "p": ["300개 중 어떤 공모전을 골랐나: 선별 기준", "공고를 찾는 곳: 사이트·기관·뉴스레터", "AI로 지원서를 빠르게 만드는 워크플로", "당선작과 탈락작의 차이, 실제 사례 분석", "인천공항 AI Port 최우수상 수상작 해부", "공모전 결과를 사업·포트폴리오로 연결하기", "떨어져도 계속하는 루틴과 관리표 공개"]},
{"n": 10, "cat": "ai", "t": "AI로 500페이지 책 쓰고 출간하기", "p": ["주제 선정과 목차 설계", "AI와 함께 원고 초안 쓰기", "퇴고와 팩트체크: AI가 틀리는 곳 잡기", "부크크 종이책·유페이퍼 전자책 출간 절차", "표지·가격 정하기와 ISBN", "교보문고 등 서점 유통", "도서관·강연으로 책 알리기"]},
{"n": 11, "cat": "global", "t": "CES·MWC 등 해외 행사 연사에 지원하는 법", "p": ["연사를 모집하는 글로벌 행사 찾기", "채택되는 발표 제안서(Abstract) 쓰는 법", "연사 프로필과 자기소개 자료 만들기", "세바시 등 국내 무대 경험을 해외로 연결하기", "실제 지원 사례 공개: 뉴욕·샌프란시스코·CES·MWC·GDC", "떨어졌을 때 다시 두드리는 법", "연사 경력을 다음 기회로 연결하기"]},
{"n": 12, "cat": "global", "t": "스폰서 구좌로 프로그램 자금 모으기", "p": ["구좌 방식이란: $10,000 = 학생 4명 구조", "후원자가 이해하기 쉬운 가격과 혜택 설계", "스폰서 제안서 구성", "기업·재단·개인 후원자 찾기", "첫 연락 메일과 후속 연락", "직접비와 운영비를 분리하는 자금 원칙", "지자체·정부 지원과 함께 설계하기"]},
{"n": 13, "cat": "edu", "t": "하버드 경제학 출신이 말하는 미국 대학·의대 입시", "p": ["미국 대학 입시의 구조와 한국 학생의 약점", "아이비리그가 보는 것: 성적 밖의 이야기", "에세이 쓰는 법", "활동·추천서 준비 전략", "한국에서 미국 의대를 준비하는 로드맵", "프리메드 과정에서 흔한 실수", "학부모가 지금 해야 할 일"]},
{"n": 14, "cat": "ai", "t": "1인 창업가의 AI 업무 자동화", "p": ["혼자 여러 사업을 운영하는 하루 공개", "AI로 이메일 쓰고 보내기", "AI로 문서·제안서 만들기", "AI로 자료 조사하기", "AI로 웹사이트·앱을 만들고 배포하기", "대량 이메일 캠페인 운영 방법", "나만의 AI 업무 시스템 만들기"]},
{"n": 15, "cat": "web3", "t": "2017년부터 블록체인 — 이더리움 공부부터 코인빗 대표이사까지", "p": ["2017년 비트코인 열풍, 무엇을 보고 뛰어들었나", "이더리움과 솔리디티를 직접 배운 과정", "윙클보스 형제가 세운 미국 제미나이 거래소 직접 방문기", "2018년 바이낸스 본사 이전 소식에 몰타까지 찾아간 이야기", "거래소 플랫폼을 만들다 1억 원 사기당한 경험", "중국 체인업(ChainUP) 솔루션 사용기", "코인빗 대표이사로 일하며 배운 것"], "d": "투자 권유가 아닌 경험 공유입니다."},
{"n": 16, "cat": "ai", "t": "혼자서 깃허브 프로젝트 70개 만든 경험", "p": ["깃허브 사용법: 저장소 만들기부터 버전 관리까지", "Supabase 사용법: 로그인과 데이터베이스 붙이기", "Firebase 사용법", "Vercel 사용법: 올리면 바로 배포되는 구조", "클로드와 함께 사이트와 앱 만들기 실전", "Cloudflare로 도메인 구매와 연결", "무료 이메일 활용법"]}
];
const CIRC = ["","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯"];
const PRICES = {
gen:  [{k:"1강권",n:1,p:49000},{k:"3강권",n:3,p:132000},{k:"7강권",n:7,p:259000},{k:"16강 올패스",n:16,p:549000}],
mate: [{k:"1강권",n:1,p:44000},{k:"3강권",n:3,p:117000},{k:"7강권",n:7,p:206000},{k:"16강 올패스",n:16,p:415000}]
};
const LIST = 49000;
const won = v => v.toLocaleString("ko-KR") + "원";
let filter = "all";
const picked = new Set();
try { JSON.parse(localStorage.getItem("kc-picked")||"[]").forEach(n=>picked.add(n)); } catch(e){}
function save(){ try{ localStorage.setItem("kc-picked", JSON.stringify([...picked])); }catch(e){} }
function bestPlan(n, trk){
if(n<=0) return null;
const best = Array(17).fill(null); best[0] = {cost:0, items:[]};
for(let i=1;i<=16;i++){
for(const t of PRICES[trk]){
const prev = best[Math.max(0,i-t.n)];
const cost = prev.cost + t.p;
if(!best[i] || cost < best[i].cost) best[i] = {cost, items:[...prev.items, t.k]};
}
}
return best[n];
}
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
art.innerHTML = `
<div class="c-head"><span class="num">${String(c.n).padStart(2,"0")}</span>
<div><div class="cat">${CATS[c.cat]}</div><h3></h3></div></div>
<ol>${c.p.map(()=>"<li></li>").join("")}</ol>
${c.d?'<p class="disc"></p>':'<span></span>'}
<button class="pick" type="button" aria-pressed="${on}">${on?"✓ 담았어요":"+ 담기"}</button>`;
art.querySelector("h3").textContent = c.t;
art.querySelectorAll("li").forEach((li,i)=>li.textContent=c.p[i]);
if(c.d) art.querySelector(".disc").textContent = "※ " + c.d;
art.querySelector(".pick").addEventListener("click",()=>{
picked.has(c.n)?picked.delete(c.n):picked.add(c.n); save(); renderCourses(); renderCart();
});
el.appendChild(art);
}
}
function renderCart(){
const cart = document.getElementById("cart");
const n = picked.size;
if(!n){ cart.hidden = true; return; }
cart.hidden = false;
const g = bestPlan(n,"gen"), m = bestPlan(n,"mate");
const list = [...picked].sort((a,b)=>a-b).map(x=>CIRC[x]).join("");
const full = n*LIST;
const fmt = plan => { const c={}; plan.items.forEach(k=>c[k]=(c[k]||0)+1); return Object.entries(c).map(([k,v])=>v>1?`${k}×${v}`:k).join(" + "); };
document.getElementById("cartTitle").innerHTML = `${n}개 담음 ${list} → 일반 <span class="amt">${won(g.cost)}</span> · 동기 <span class="amt mate-amt">${won(m.cost)}</span>`;
let sub = `추천 이용권: ${fmt(g)}` + (fmt(m)!==fmt(g)?` (동기: ${fmt(m)})`:"");
if(g.cost < full) sub += ` · 정가 ${won(full)}`;
const covered = g.items.reduce((s,k)=>s+PRICES.gen.find(t=>t.k===k).n,0);
if(covered > n) sub += ` · ${covered-n}강 더 고를 수 있어요`;
document.getElementById("cartSub").textContent = sub;
}
document.getElementById("cartClear").addEventListener("click",()=>{picked.clear(); save(); renderCourses(); renderCart();});
document.querySelectorAll(".combo").forEach(b=>b.addEventListener("click",()=>{
picked.clear(); b.dataset.combo.split(",").forEach(x=>picked.add(+x)); save();
filter="all"; renderFilters(); renderCourses(); renderCart();
document.getElementById("courses").scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}));
document.querySelectorAll(".apply").forEach(a=>{
if(APPLY_URL){ a.href = APPLY_URL; a.target="_blank"; a.rel="noopener"; }
});
function renderTickets(){
const el=document.getElementById("tickets"); el.innerHTML="";
const info={1:["원하는 강의 1개","먼저 한 번 들어보고 싶은 분"],3:["원하는 강의 3개 선택"],7:["원하는 강의 7개 선택"],16:["전 강의 수강, 그리고"]};
const perTxt=(p,n)=>{const v=p/n; return "1강당 "+(v%100===0?"":"약 ")+won(Math.round(v/100)*100);};
PRICES.gen.forEach((t,i)=>{
const m=PRICES.mate[i], full=t.n*LIST;
const off=Math.round((1-t.p/full)*100), moff=Math.round((1-m.p/full)*100);
const d=document.createElement("div");
d.className="ticket"+(t.n===3?" best":"");
d.innerHTML=(t.n===3?'<span class="flag">추천</span>':'')+
`<div class="top"><span class="name">${t.k}</span>`+
(off>0?`<span class="was">${won(full)}</span>`:'')+
`<span class="price">${t.p.toLocaleString("ko-KR")}<small>원</small></span>`+
`<span class="per">일반 · ${perTxt(t.p,t.n)}${off>0?` · 약 ${off}% 할인`:""}</span></div>`+
`<div class="mate"><span class="ml">동기 가격 <b>${moff===50?"":"약 "}${moff}% 할인</b></span>`+
`<span class="mp">${m.p.toLocaleString("ko-KR")}<small>원</small></span>`+
`<span class="mper">${perTxt(m.p,m.n)}</span></div>`+
`<div class="bottom">${info[t.n].map(x=>`<span>${x}</span>`).join("")}`+
(t.n===16?'<ul><li>결석한 강의는 다음 기수에서 무료로 다시 듣기</li><li>강의 자료 제공 (체크리스트 · 템플릿 · 슬라이드 PDF)</li><li>올패스 전용 단톡방</li><li>켄트와의 30분 그룹 Q&amp;A 1회</li></ul>':'')+`</div>`;
el.appendChild(d);
});
}
renderTickets(); renderFilters(); renderCourses(); renderCart();
