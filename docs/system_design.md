# JDX Plano 시스템 설계 문서

## 1. 시스템 아키텍처

### 1.1 전체 시스템 구성

```
[Client Layer]
    Web Browser (React.js + Three.js)
        ↓
[API Layer]
    AWS Amplify API (GraphQL/REST) 또는 AWS API Gateway
        ↓
[Application Layer]
    AWS Lambda (Node.js)
    AI Services (Python + FastAPI)
        ↓
[Data Layer]
    DynamoDB (메인 DB, NoSQL)
    S3 (이미지/비디오 저장)
```

### 1.2 서비스 구성

- **프론트엔드 서비스**

  - React.js 기반 SPA
  - Three.js 기반 3D 렌더링
  - Tailwind CSS 기반 UI/UX
  - AWS Amplify Hosting

- **백엔드 서비스**

  - AWS Lambda (Node.js, 서버리스)
  - Python + FastAPI (AI 서버)
  - Amplify API (GraphQL/REST)

- **AI 서비스**
  - 이미지 분석 서버
  - 추천 엔진 서버
  - 3D 렌더링 서버

## 2. 데이터베이스 설계

### 2.1 DynamoDB 테이블 설계

#### Estimates (견적 요청)

| Attribute            | Type    | Description              |
| -------------------- | ------- | ------------------------ |
| id (PK)              | String  | UUID, Primary Key        |
| email                | String  | 사용자 이메일            |
| first_name           | String  | 이름                     |
| last_name            | String  | 성                       |
| phone                | String  | 전화번호                 |
| address              | String  | 주소                     |
| address2             | String  | 상세주소                 |
| city                 | String  | 도시                     |
| state                | String  | 주/도                    |
| zip                  | String  | 우편번호                 |
| country              | String  | 국가                     |
| visit_day            | String  | 방문 희망일 (YYYY-MM-DD) |
| visit_hours          | String  | 방문 시간대              |
| products             | List    | 구매 희망 제품(배열)     |
| heard_about          | List    | 유입 경로(배열)          |
| marketing_permission | Boolean | 마케팅 동의 여부         |
| created_at           | String  | 생성일시(ISO8601)        |

> DynamoDB는 스키마리스이므로, 필요한 속성만 저장 가능하며, 확장에 유리함.

### 2.2 S3 설계

- 이미지/비디오 등 대용량 파일 저장

## 3. API 설계

### 3.1 견적 요청 API (예시)

```typescript
// POST /api/estimates
interface EstimateRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  visitDay: string;
  visitHours: string;
  products: string[];
  heardAbout: string[];
  marketingPermission: boolean;
}
```

- Amplify API (GraphQL/REST) 또는 API Gateway + Lambda로 구현
- Lambda 함수에서 DynamoDB에 데이터 저장

### 3.2 인증/인가, AI, 추천 등 기존 API는 동일하게 유지

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

- Amplify Auth, Cognito 등으로 인증/인가
- DynamoDB IAM 정책으로 접근 제어
- 데이터 암호화, HTTPS 적용

### 5.2 데이터 보안

- 전송 데이터 암호화 (HTTPS)
- 저장 데이터 암호화
- 정기적인 보안 감사

## 6. 성능 최적화

### 6.1 캐싱 전략

- DynamoDB의 자동 스케일링, 고가용성 활용
- S3, CloudFront로 정적 자원 캐싱
- Lambda의 서버리스 확장성 활용

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

- DynamoDB 파티셔닝, 글로벌 테이블 등 확장성 확보
- Lambda 함수 분리, 마이크로서비스화
- AI/추천 기능 확장, 모바일/다국어 지원 등

### 9.2 기능 확장

- 모바일 앱 지원
- 다국어 지원
- 추가 AI 기능 통합
