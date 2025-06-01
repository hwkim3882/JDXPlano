# JDX Plano 시스템 설계 문서

## 1. 시스템 아키텍처

### 1.1 전체 시스템 구성

```
[Client Layer]
    Web Browser (React.js + Three.js)
        ↓
[API Gateway Layer]
    AWS API Gateway
        ↓
[Application Layer]
    Backend Services (Node.js + Express.js)
    AI Services (Python + FastAPI)
        ↓
[Data Layer]
    PostgreSQL (메인 DB)
    Redis (캐시/세션)
    S3 (이미지/비디오 저장)
```

### 1.2 서비스 구성

- **프론트엔드 서비스**

  - React.js 기반 SPA
  - Three.js 기반 3D 렌더링
  - Tailwind CSS 기반 UI/UX

- **백엔드 서비스**

  - Node.js + Express.js (메인 서버)
  - Python + FastAPI (AI 서버)
  - WebSocket 서버 (실시간 통신)

- **AI 서비스**
  - 이미지 분석 서버
  - 추천 엔진 서버
  - 3D 렌더링 서버

## 2. 데이터베이스 설계

### 2.1 PostgreSQL 스키마

#### Users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Products

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Spaces

```sql
CREATE TABLE spaces (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    image_url VARCHAR(255),
    features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Recommendations

```sql
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    space_id INTEGER REFERENCES spaces(id),
    product_id INTEGER REFERENCES products(id),
    score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Redis 스키마

#### 세션 저장

```
session:{session_id} -> {
    user_id: string,
    expires_at: timestamp
}
```

#### 캐시 저장

```
recommendation:{space_id} -> {
    products: array,
    expires_at: timestamp
}
```

## 3. API 설계

### 3.1 인증 API

```typescript
// POST /api/v1/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// POST /api/v1/auth/login
interface LoginRequest {
  email: string;
  password: string;
}
```

### 3.2 공간 분석 API

```typescript
// POST /api/v1/spaces/analyze
interface SpaceAnalysisRequest {
  image: File;
  userId: string;
}

interface SpaceAnalysisResponse {
  spaceId: string;
  features: {
    windows: WindowFeature[];
    walls: WallFeature[];
    lighting: LightingFeature[];
  };
}
```

### 3.3 추천 API

```typescript
// POST /api/v1/recommendations
interface RecommendationRequest {
  spaceId: string;
  preferences?: UserPreferences;
}

interface RecommendationResponse {
  recommendations: ProductRecommendation[];
  simulationUrl?: string;
}
```

## 4. AI 시스템 설계

### 4.1 이미지 분석 파이프라인

1. 이미지 전처리

   - 크기 조정
   - 노이즈 제거
   - 밝기/대비 조정

2. 특성 추출

   - 창문 감지 (YOLO)
   - 벽면 분석 (ResNet50)
   - 조명 분석 (Custom CNN)

3. 스타일 분석
   - 인테리어 스타일 분류
   - 색상 팔레트 추출
   - 공간 분위기 분석

### 4.2 추천 시스템 파이프라인

1. 초기 추천

   - 공간 특성 기반 필터링
   - 인기 제품 기반 추천

2. 개인화 추천

   - 사용자 선호도 학습
   - 과거 선택 이력 분석

3. 실시간 최적화
   - 사용자 피드백 반영
   - A/B 테스트 기반 개선

## 5. 보안 설계

### 5.1 인증/인가

- JWT 기반 인증
- Role-based 접근 제어
- API 키 관리

### 5.2 데이터 보안

- 전송 데이터 암호화 (HTTPS)
- 저장 데이터 암호화
- 정기적인 보안 감사

## 6. 성능 최적화

### 6.1 캐싱 전략

- Redis를 이용한 추천 결과 캐싱
- CDN을 이용한 정적 자원 캐싱
- 브라우저 캐싱 최적화

### 6.2 부하 분산

- AWS ALB를 이용한 로드 밸런싱
- Auto Scaling 설정
- Circuit Breaker 패턴 적용

## 7. 모니터링 설계

### 7.1 시스템 모니터링

- Prometheus + Grafana
- ELK Stack
- AWS CloudWatch

### 7.2 AI 모델 모니터링

- 모델 성능 메트릭
- 추론 시간 모니터링
- 데이터 드리프트 감지

## 8. 배포 전략

### 8.1 CI/CD 파이프라인

```yaml
# GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: |
          npm install
          npm run build
      - name: Deploy to AWS
        run: |
          aws deploy
```

### 8.2 컨테이너화

- Docker 컨테이너
- Kubernetes 오케스트레이션
- AWS ECS/EKS 활용

## 9. 확장성 고려사항

### 9.1 수평적 확장

- 마이크로서비스 아키텍처
- 데이터베이스 샤딩
- 캐시 클러스터링

### 9.2 기능 확장

- 모바일 앱 지원
- 다국어 지원
- 추가 AI 기능 통합
