# JDX Plano 시스템 설계

## 1. 시스템 아키텍처 개요

### 1.1 고수준 아키텍처

```
[클라이언트 레이어]
- Next.js 프론트엔드
- CDN
- 정적 자산

[애플리케이션 레이어]
- API 게이트웨이
- 인증 서비스
- 리드 생성 서비스
- 제품 카탈로그 서비스
- 가상 룸 디자이너
- AI 추천 엔진

[데이터 레이어]
- MongoDB (제품 카탈로그, 사용자 데이터)
- Redis (캐싱, 세션)
- AWS S3 (이미지, 자산)
- SendGrid (이메일 서비스)
```

### 1.2 핵심 서비스

#### 리드 생성 서비스

- 견적 요청 처리
- 폼 검증
- 이메일 알림
- 전화 상담 예약
- 리드 추적
- UTM 파라미터 처리

#### 제품 카탈로그 서비스

- 제품 관리
- 카테고리 구성
- 검색 기능
- 필터링 시스템
- 이미지 관리
- 가격 관리

#### 가상 룸 디자이너

- 3D 렌더링
- 룸 템플릿
- 제품 배치
- 색상/소재 선택
- 디자인 저장
- 공유 기능

#### AI 추천 엔진

- 공간 분석
- 스타일 매칭
- 제품 제안
- 에너지 효율성 계산
- 예산 최적화
- 기후 고려사항

## 2. 데이터베이스 설계

### 2.1 MongoDB 컬렉션

#### 사용자

```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  phone: String,
  address: String,
  preferences: {
    style: String,
    budget: Number,
    energyEfficiency: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 견적 요청

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  email: String,
  phone: String,
  address: String,
  projectType: String,
  timeline: String,
  message: String,
  status: String,
  utmParams: {
    source: String,
    medium: String,
    campaign: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 제품

```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  type: String,
  description: String,
  features: [String],
  specifications: {
    dimensions: Object,
    materials: [String],
    energyEfficiency: Number
  },
  images: [String],
  price: {
    base: Number,
    installation: Number
  },
  availability: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Redis 데이터 구조

#### 세션 저장소

```
키: session:{sessionId}
값: {
  userId: String,
  lastActivity: Timestamp,
  preferences: Object
}
```

#### 캐시

```
키: product:{productId}
값: {
  name: String,
  price: Number,
  images: [String]
}
```

## 3. API 설계

### 3.1 리드 생성 API

#### 견적 요청

```typescript
POST /api/v1/estimates
요청:
{
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: 'new' | 'replacement';
  timeline: 'urgent' | 'planning';
  message?: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

응답:
{
  success: boolean;
  estimateId: string;
  confirmationEmail: boolean;
  nextSteps: string[];
}
```

#### 전화 상담

```typescript
POST /api/v1/consultations
요청:
{
  estimateId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

응답:
{
  success: boolean;
  consultationId: string;
  confirmationEmail: boolean;
  appointmentDetails: {
    date: string;
    time: string;
    consultant: string;
  };
}
```

### 3.2 제품 API

#### 제품 카탈로그

```typescript
GET /api/v1/products
쿼리 파라미터:
{
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  energyEfficiency?: boolean;
  page?: number;
  limit?: number;
}

응답:
{
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
```

## 4. 프론트엔드 아키텍처

### 4.1 페이지 구조

```
/
├── 홈 (랜딩 페이지)
├── 제품
│   ├── 카테고리
│   └── 제품 상세
├── 가상 룸 디자이너
├── 무료 견적
├── 블로그
└── 문의하기
```

### 4.2 컴포넌트 계층

```
App
├── 레이아웃
│   ├── 헤더
│   ├── 네비게이션
│   └── 푸터
├── 페이지
│   ├── 홈
│   │   ├── 히어로
│   │   ├── 가치 제안
│   │   ├── 제품 전시
│   │   └── 견적 CTA
│   ├── 제품
│   │   ├── 필터
│   │   ├── 제품 그리드
│   │   └── 제품 상세
│   └── 견적
│       ├── 폼
│       └── 진행 상황
└── 공유
    ├── 버튼
    ├── 폼
    └── 모달
```

## 5. 보안 조치

### 5.1 인증

- JWT 기반 인증
- 안전한 세션 관리
- 요청 제한
- CSRF 방어

### 5.2 데이터 보호

- 입력 검증
- 데이터 암호화
- 보안 헤더
- XSS 방지

### 5.3 규정 준수

- GDPR 준수
- CCPA 준수
- 개인정보 처리방침
- 이용약관

## 6. 성능 최적화

### 6.1 프론트엔드

- 코드 분할
- 지연 로딩
- 이미지 최적화
- 캐싱 전략

### 6.2 백엔드

- 데이터베이스 인덱싱
- 쿼리 최적화
- 캐싱 레이어
- 로드 밸런싱

### 6.3 인프라

- CDN 통합
- 자동 스케일링
- 모니터링
- 오류 추적

## 7. 모니터링 및 분석

### 7.1 메트릭

- 페이지 로드 시간
- API 응답 시간
- 오류율
- 전환율

### 7.2 로깅

- 애플리케이션 로그
- 오류 로그
- 접근 로그
- 성능 로그

### 7.3 분석

- 사용자 행동
- 전환 추적
- A/B 테스트 결과
- ROI 측정

## 8. 배포 전략

### 8.1 환경

- 개발
- 스테이징
- 프로덕션

### 8.2 CI/CD 파이프라인

- 코드 리뷰
- 자동화된 테스트
- 배포 자동화
- 롤백 절차

### 8.3 인프라

- AWS 서비스
- Docker 컨테이너
- Kubernetes 오케스트레이션
- 모니터링 도구
