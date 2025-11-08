# Coin List

암호화폐 시세 정보 페이지

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **API**: CoinGecko API
- **Icons**: Lucide React
- **Virtual Scroll**: @tanstack/react-virtual

## 프로젝트 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속
루트로 접속시 /coin-list로 자동 리다이렉트

## 주요 구현 기능

### 1. 코인 리스트

- CoinGecko API를 통해 실시간 코인 데이터 조회
- 코인 심볼, 이름, 가격, 24시간 변동률, 거래량, 시가총액 표시
- 가격 기준 내림차순 기본 정렬

### 2. 탭

- **All**: 전체 코인 목록
- **My favorite**: 즐겨찾기한 코인만 표시
- URL searchParams로 상태 관리

### 3. 검색 기능

- 코인 심볼(BTC) 또는 이름(Bitcoin)으로 검색
- 대소문자 구분 없음
- 300ms 디바운싱 적용으로 성능 최적화

### 4. 정렬 기능

- Price, 24h Change, 24h Volume, Market Cap 기준 정렬
- 헤더 클릭 시 오름차순/내림차순 토글
- URL에 정렬 상태 저장

### 5. 즐겨찾기

- 별 아이콘 클릭으로 즐겨찾기 추가/제거
- localStorage에 저장되어 새로고침 후에도 유지
- 토스트를 통한 피드백 처리

### 6. 대용량 데이터 최적화

- @tanstack/react-virtual을 활용한 가상 스크롤 구현
- 화면에 보이는 row만 렌더링하여 성능 최적화

### 7. 아키텍처

- Custom Hook으로 비즈니스 로직 분리 (`useCoinList`)
- 재사용 가능한 공통 컴포넌트 (Tab, SearchInput, Toast)

## 프로젝트 구조

```
├── app/
│   ├── coin-list/          # 코인 리스트 페이지
│   └── layout.tsx           # 루트 레이아웃 (ToastProvider)
├── apis/
│   └── coin/               # CoinGecko API 호출
├── components/
│   ├── coin-table/         # 코인 테이블 컴포넌트
│   ├── search-input/       # 검색 입력 컴포넌트
│   ├── tab/                # 탭 컴포넌트
│   └── toast/              # 토스트 컴포넌트
├── contexts/
│   └── ToastContext.tsx    # 토스트 전역 상태 관리
└── hooks/
    └── useCoinList.ts      # 코인 리스트 비즈니스 로직
```

## 보완하고 싶은 점

### 1. 에러 핸들링 개선

- API 실패 시 토스트 메시지와 무한 스켈레톤으로 표기되는데 좀 더 친절한 안내 및 재시도 버튼이 있으면 좋았을 거 같습니다.

### 2. 반응형 디자인

- 데스크톱 환경에 최적화
- 모바일에서는 테이블 가로 스크롤 필요
- 테이블의 필수정보만 보여주는 형태로 구현했으면 X축 스크롤이 빠져 UX가 좋지 않을까라는 생각이 들었습니다.

## AI 활용

- **도구**: Cursor IDE
- **활용 방식**:
  - 자동완성
  - TypeScript 타입 정의
  - PRD 체크리스트 작성
  - 문서 작성 도움
