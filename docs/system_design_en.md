# JDX Plano System Design Document

## 1. System Architecture

### 1.1 Overall System Structure

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
    PostgreSQL (Main DB)
    Redis (Cache/Session)
    S3 (Image/Video Storage)
```

### 1.2 Service Components

- **Frontend Services**

  - React.js based SPA
  - Three.js based 3D rendering
  - Tailwind CSS based UI/UX

- **Backend Services**

  - Node.js + Express.js (Main Server)
  - Python + FastAPI (AI Server)
  - WebSocket Server (Real-time Communication)

- **AI Services**
  - Image Analysis Server
  - Recommendation Engine Server
  - 3D Rendering Server

## 2. Database Design

### 2.1 PostgreSQL Schema

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

### 2.2 Redis Schema

#### Session Storage

```
session:{session_id} -> {
    user_id: string,
    expires_at: timestamp
}
```

#### Cache Storage

```
recommendation:{space_id} -> {
    products: array,
    expires_at: timestamp
}
```

## 3. API Design

### 3.1 Authentication API

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

### 3.2 Space Analysis API

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

### 3.3 Recommendation API

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

## 4. AI System Design

### 4.1 Image Analysis Pipeline

1. Image Preprocessing

   - Size adjustment
   - Noise removal
   - Brightness/Contrast adjustment

2. Feature Extraction

   - Window detection (YOLO)
   - Wall analysis (ResNet50)
   - Lighting analysis (Custom CNN)

3. Style Analysis
   - Interior style classification
   - Color palette extraction
   - Space atmosphere analysis

### 4.2 Recommendation System Pipeline

1. Initial Recommendation

   - Space feature-based filtering
   - Popular product-based recommendation

2. Personalized Recommendation

   - User preference learning
   - Historical choice analysis

3. Real-time Optimization
   - User feedback integration
   - A/B testing based improvement

## 5. Security Design

### 5.1 Authentication/Authorization

- JWT-based authentication
- Role-based access control
- API key management

### 5.2 Data Security

- Transport data encryption (HTTPS)
- Storage data encryption
- Regular security audits

## 6. Performance Optimization

### 6.1 Caching Strategy

- Redis for recommendation result caching
- CDN for static resource caching
- Browser cache optimization

### 6.2 Load Balancing

- AWS ALB for load balancing
- Auto Scaling configuration
- Circuit Breaker pattern implementation

## 7. Monitoring Design

### 7.1 System Monitoring

- Prometheus + Grafana
- ELK Stack
- AWS CloudWatch

### 7.2 AI Model Monitoring

- Model performance metrics
- Inference time monitoring
- Data drift detection

## 8. Deployment Strategy

### 8.1 CI/CD Pipeline

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

### 8.2 Containerization

- Docker containers
- Kubernetes orchestration
- AWS ECS/EKS utilization

## 9. Scalability Considerations

### 9.1 Horizontal Scaling

- Microservices architecture
- Database sharding
- Cache clustering

### 9.2 Feature Expansion

- Mobile app support
- Multi-language support
- Additional AI feature integration
