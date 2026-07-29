import type { Book } from "@/types/book";

export const mockBooks: Book[] = [
  {
    id: 1,
    isbn13: "9780000000001",
    title: "파도가 머문 자리",
    subtitle: "천천히 마음을 회복하는 여섯 번의 계절",
    author: "서윤하",
    publisher: "파란서재",
    publishedDate: "2026-06-18",
    category: "소설",
    rating: 4.7,
    rank: 1,
    coverTheme: "ocean",
    description:
      "도시의 속도를 잠시 내려놓은 주인공이 작은 해안 마을에서 사람과 계절을 다시 배우는 이야기입니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 184,
      sentiment: { positive: 78, neutral: 15, negative: 7 },
      summary:
        "잔잔한 문장과 세밀한 감정 묘사가 오래 남는다는 평가가 많아요. 큰 사건보다 인물의 변화에 집중하는 작품이라 빠른 전개를 선호한다면 초반이 느리게 느껴질 수 있어요.",
      strengths: [
        "감정을 과장하지 않는 차분한 문체",
        "계절과 공간을 활용한 섬세한 분위기",
        "위로를 강요하지 않는 따뜻한 결말",
      ],
      cautions: ["초반 전개가 느리다는 의견", "사건 중심 소설을 기대하면 심심할 수 있음"],
      keywords: ["잔잔함", "회복", "감정묘사", "바다", "여운"],
      aspects: { story: 4.3, writingStyle: 4.8, readability: 4.5, usefulness: 4.1 },
      recommendedFor: [
        "조용히 몰입할 소설을 찾는 독자",
        "관계와 회복에 관한 이야기를 좋아하는 독자",
        "문장에 밑줄 긋는 독서를 즐기는 독자",
      ],
    },
  },
  {
    id: 2,
    isbn13: "9780000000002",
    title: "생각의 온도",
    subtitle: "흔들리는 날에도 나를 잃지 않는 법",
    author: "김도현",
    publisher: "모노북스",
    publishedDate: "2026-05-02",
    category: "인문",
    rating: 4.5,
    rank: 2,
    coverTheme: "clay",
    description:
      "일상에서 반복되는 불안과 선택의 문제를 철학과 심리학의 언어로 쉽게 풀어낸 인문 에세이입니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 242,
      sentiment: { positive: 71, neutral: 20, negative: 9 },
      summary:
        "어려운 개념을 일상의 사례로 풀어 읽기 편하다는 반응이 많아요. 다만 자기계발서를 많이 읽은 독자에게는 익숙한 내용이라는 평가도 있어요.",
      strengths: ["짧고 명확한 장 구성", "생활에 적용하기 쉬운 질문", "부담 없이 읽히는 문장"],
      cautions: ["일부 사례가 반복적이라는 의견", "깊이 있는 이론서를 기대하면 가벼울 수 있음"],
      keywords: ["불안", "선택", "자기이해", "철학", "마음관리"],
      aspects: { story: 3.9, writingStyle: 4.4, readability: 4.8, usefulness: 4.5 },
      recommendedFor: ["생각이 많아 쉽게 지치는 사람", "입문 인문서를 찾는 독자", "짧게 나눠 읽고 싶은 독자"],
    },
  },
  {
    id: 3,
    isbn13: "9780000000003",
    title: "작은 팀의 큰 기술",
    subtitle: "AI 시대, 빠르게 만들고 오래 살아남는 제품 개발",
    author: "이재원",
    publisher: "메이크랩",
    publishedDate: "2026-04-21",
    category: "경제·경영",
    rating: 4.8,
    rank: 3,
    coverTheme: "midnight",
    description:
      "작은 개발팀이 아이디어를 검증하고 제품을 출시하며 운영 지표를 개선하는 과정을 실제 사례로 설명합니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 126,
      sentiment: { positive: 84, neutral: 11, negative: 5 },
      summary:
        "현업 사례와 체크리스트가 구체적이라 바로 적용할 수 있다는 반응이 많아요. 기술 구현보다 제품 의사결정에 비중이 큰 책입니다.",
      strengths: ["실제 실패 사례를 숨기지 않음", "단계별 체크리스트", "개발과 비즈니스의 균형"],
      cautions: ["코드 예제를 기대하면 부족할 수 있음", "초기 스타트업 사례에 집중됨"],
      keywords: ["제품개발", "AI", "MVP", "협업", "스타트업"],
      aspects: { story: 4.5, writingStyle: 4.4, readability: 4.6, usefulness: 4.9 },
      recommendedFor: ["주니어 개발자와 기획자", "사이드 프로젝트를 시작하는 사람", "작은 팀의 리더"],
    },
  },
  {
    id: 4,
    isbn13: "9780000000004",
    title: "정원의 문장들",
    subtitle: "매일 한 뼘씩 자라는 것들에 대하여",
    author: "한여름",
    publisher: "초록편지",
    publishedDate: "2026-03-14",
    category: "에세이",
    rating: 4.4,
    rank: 4,
    coverTheme: "forest",
    description:
      "작은 베란다 정원에서 시작해 삶의 리듬을 되찾은 저자가 식물과 함께 보낸 사계절을 기록했습니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 98,
      sentiment: { positive: 73, neutral: 19, negative: 8 },
      summary:
        "사진 없이도 장면이 그려지는 문장과 편안한 호흡이 장점으로 꼽혀요. 식물 재배 정보를 원하는 독자보다는 에세이를 즐기는 독자에게 잘 맞아요.",
      strengths: ["감각적인 자연 묘사", "짧은 호흡으로 읽기 좋음", "소장하고 싶은 편집"],
      cautions: ["실용적인 식물 정보는 적음", "비슷한 정서가 반복된다는 의견"],
      keywords: ["식물", "계절", "일상", "휴식", "기록"],
      aspects: { story: 3.8, writingStyle: 4.7, readability: 4.6, usefulness: 3.7 },
      recommendedFor: ["잠들기 전 가볍게 읽고 싶은 독자", "식물과 자연을 좋아하는 사람", "감성 에세이를 찾는 독자"],
    },
  },
  {
    id: 5,
    isbn13: "9780000000005",
    title: "우리가 별을 부르는 방식",
    subtitle: "가까워지고 멀어지는 마음의 궤도",
    author: "문하진",
    publisher: "오후의책",
    publishedDate: "2026-02-27",
    category: "소설",
    rating: 4.6,
    rank: 5,
    coverTheme: "lavender",
    description:
      "서로 다른 시간대를 살아가는 두 사람이 오래된 천문대의 기록을 통해 연결되는 서정적인 장편소설입니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 157,
      sentiment: { positive: 76, neutral: 16, negative: 8 },
      summary:
        "독특한 설정과 아름다운 문장이 높은 평가를 받았어요. 시간선이 교차해 초반에는 인물 관계를 따라가기 어렵다는 의견도 있습니다.",
      strengths: ["신선한 시간 구조", "기억에 남는 문장", "감정적인 후반부"],
      cautions: ["초반 인물 구분이 어려움", "과학적 설명을 기대하면 아쉬울 수 있음"],
      keywords: ["별", "시간", "관계", "서정적", "반전"],
      aspects: { story: 4.6, writingStyle: 4.8, readability: 4.0, usefulness: 3.6 },
      recommendedFor: ["감성적인 SF를 좋아하는 독자", "구조가 독특한 소설을 찾는 사람", "긴 여운을 즐기는 독자"],
    },
  },
  {
    id: 6,
    isbn13: "9780000000006",
    title: "오늘도 데이터는 말이 없다",
    subtitle: "숫자를 읽고 질문을 설계하는 사람들",
    author: "박민서",
    publisher: "인사이트룸",
    publishedDate: "2026-01-09",
    category: "과학·기술",
    rating: 4.3,
    coverTheme: "sunset",
    description:
      "데이터를 맹신하지 않고 올바른 질문과 맥락으로 해석하는 방법을 다양한 조직의 사례로 살펴봅니다.",
    insight: {
      dataStatus: "MOCK",
      reviewCount: 86,
      sentiment: { positive: 69, neutral: 22, negative: 9 },
      summary:
        "통계 지식보다 질문을 만드는 태도를 강조해 비전공자도 읽기 쉽다는 평가예요. 분석 기법을 깊게 배우려는 독자에게는 입문 수준입니다.",
      strengths: ["현실적인 데이터 사례", "비전공자 친화적인 설명", "윤리 문제까지 다룸"],
      cautions: ["수식과 실습은 거의 없음", "경험 많은 분석가에게는 익숙한 내용"],
      keywords: ["데이터", "질문", "통계", "의사결정", "윤리"],
      aspects: { story: 4.1, writingStyle: 4.2, readability: 4.5, usefulness: 4.4 },
      recommendedFor: ["데이터 공부를 시작하는 사람", "지표를 다루는 기획자", "데이터 기반 의사결정을 고민하는 팀"],
    },
  },
];

export const findBookByIsbn = (isbn13: string) =>
  mockBooks.find((book) => book.isbn13 === isbn13);

export const categories = ["전체", ...new Set(mockBooks.map((book) => book.category))];
