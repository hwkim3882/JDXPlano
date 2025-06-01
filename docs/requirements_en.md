# JDX Plano Web Application Requirements Definition

## 1. Project Overview

- Web-based interior recommendation system for JDX Plano store
- AI-powered blind/curtain/shutter recommendation and virtual simulation service
- Expected DAU: 100-500 users

## 2. Core Features

### 2.1 User Features

- User registration/login
- Space photo/video upload
- AI-based product recommendations
- 3D virtual simulation
- Product detail viewing
- Recommendation result saving and sharing

### 2.2 Admin Features

- Product catalog management
- User management
- Recommendation result analysis
- System monitoring

## 3. Technical Stack Proposal

### 3.1 Frontend

- React.js (SPA implementation)
- Three.js (3D simulation)
- Tailwind CSS (UI/UX)

### 3.2 Backend

- Node.js + Express.js
- Python (AI model serving)

### 3.3 Database

- PostgreSQL (user data, product information)
- Redis (caching, session management)

### 3.4 AI/ML

- TensorFlow/PyTorch
- Computer Vision API
- 3D rendering engine
- Recommendation System
  - Collaborative Filtering
    - User-based recommendation
    - Item-based recommendation
  - Content-based Filtering
    - Space feature analysis
    - Style matching
  - Hybrid Recommendation System
    - User preference + space feature combination
    - Real-time feedback integration
  - Deep Learning-based Recommendation
    - CNN-based image analysis
    - Transformer-based style matching
    - Reinforcement learning-based optimization

### 3.5 AI Recommendation System Details

#### 3.5.1 Image Analysis

- Space Feature Extraction
  - Window size and position
  - Wall color and texture
  - Lighting conditions
  - Furniture arrangement
- Style Analysis
  - Interior style classification
  - Color palette extraction
  - Space atmosphere analysis

#### 3.5.2 Recommendation Algorithms

- Initial Recommendation
  - Space feature-based basic recommendation
  - Popular product-based recommendation
- Personalized Recommendation
  - User preference learning
  - Past selection history-based recommendation
- Real-time Optimization
  - User feedback integration
  - A/B testing-based improvement

#### 3.5.3 AI Model Management

- Model version control
- Performance monitoring
- Periodic retraining
- A/B testing framework

### 3.6 AI Recommendation System Production Architecture

#### 3.6.1 AI Service Composition

- **Recommendation Engine Server**

  - FastAPI-based Python server
  - NVIDIA T4/Tesla instances for GPU acceleration
  - Model serving: TensorFlow Serving
  - Real-time inference: ONNX Runtime

- **Image Processing Pipeline**

  - Image preprocessing: OpenCV
  - Feature extraction: ResNet50/EfficientNet
  - Style analysis: StyleGAN
  - 3D transformation: PyTorch3D

- **Recommendation Algorithm Implementation**

  ```python
  # Collaborative Filtering
  - LightFM (hybrid recommendation)
  - Surprise (traditional collaborative filtering)

  # Deep Learning-based
  - TensorFlow Recommenders
  - PyTorch Geometric (graph-based recommendation)
  ```

#### 3.6.2 Data Pipeline

- **Data Collection**

  - Apache Kafka: Real-time user behavior data collection
  - Apache Spark: Large-scale data processing
  - Airflow: Data pipeline orchestration

- **Feature Store**
  - Redis: Real-time feature storage
  - Elasticsearch: Product search and matching
  - PostgreSQL: User preferences and history

#### 3.6.3 Model Training and Deployment

- **Model Training**

  - MLflow: Experiment management
  - DVC: Data version control
  - Ray: Distributed training

- **Model Deployment**
  - Docker containerization
  - Kubernetes orchestration
  - AWS SageMaker/Google Vertex AI

#### 3.6.4 Monitoring and Logging

- **System Monitoring**

  - Prometheus: Metric collection
  - Grafana: Dashboard
  - ELK Stack: Log management

- **Model Monitoring**
  - Evidently: Model performance monitoring
  - Weights & Biases: Experiment tracking
  - TensorBoard: Model visualization

#### 3.6.5 API Endpoints

```python
# Recommendation API
POST /api/v1/recommendations
  - Image upload
  - Space feature analysis
  - Product recommendation

# Feedback API
POST /api/v1/feedback
  - Recommendation result evaluation
  - User preference update

# Simulation API
POST /api/v1/simulation
  - 3D rendering
  - Virtual application
```

#### 3.6.6 Performance Optimization

- **Caching Strategy**

  - Redis: Real-time recommendation result caching
  - CDN: Static resource caching
  - Browser Cache: Client-side caching

- **Load Balancing**
  - AWS ALB: Load balancing
  - Auto Scaling: Automatic scaling
  - Circuit Breaker: Fault tolerance

#### 3.6.7 Security

- **API Security**

  - JWT authentication
  - Rate limiting
  - API key management

- **Data Security**
  - Data encryption
  - Access control
  - Audit logging

### 3.7 AI API Service Recommendations

#### 3.7.1 Image Analysis and Processing

- **Google Cloud Vision AI**

  - Space feature analysis
  - Object detection
  - Color analysis
  - Pros: High accuracy, diverse features
  - Cons: Relatively high cost

- **Amazon Rekognition**

  - Space layout analysis
  - Style classification
  - Pros: Easy AWS integration, stability
  - Cons: Limited customization

- **Azure Computer Vision**
  - Space feature extraction
  - Style matching
  - Pros: Reasonable pricing, stability
  - Cons: Limited advanced features

#### 3.7.2 3D Rendering and Simulation

- **Unity Computer Vision**

  - 3D space reconstruction
  - Virtual simulation
  - Pros: High-quality rendering, real-time processing
  - Cons: High resource requirements

- **NVIDIA Omniverse**
  - 3D modeling
  - Real-time rendering
  - Pros: Latest technology, high performance
  - Cons: High cost

#### 3.7.3 Recommendation Engine

- **Amazon Personalize**

  - Personalized recommendations
  - Real-time learning
  - Pros: AWS integration, easy implementation
  - Cons: Limited customization

- **Google Cloud Recommendations AI**
  - Hybrid recommendations
  - Real-time optimization
  - Pros: High accuracy, scalability
  - Cons: High cost

#### 3.7.4 Style Matching

- **Pinterest Visual Search API**

  - Style analysis
  - Similar product search
  - Pros: Interior-specific, high accuracy
  - Cons: API limitations

- **Clarifai**
  - Style classification
  - Color matching
  - Pros: Customizable, reasonable pricing
  - Cons: Limited features

#### 3.7.5 Integrated Solutions

- **Initial Stage Recommendations**

  ```
  1. Google Cloud Vision AI + Unity Computer Vision
     - Reason: High accuracy and stability
     - Cost: Medium-High
     - Implementation difficulty: Medium

  2. Amazon Rekognition + Amazon Personalize
     - Reason: Easy AWS integration
     - Cost: Medium
     - Implementation difficulty: Low

  3. Azure Computer Vision + Clarifai
     - Reason: Cost efficiency
     - Cost: Low-Medium
     - Implementation difficulty: Medium
  ```

#### 3.7.6 API Selection Criteria

- **Accuracy**

  - Space analysis accuracy
  - Style matching accuracy
  - Recommendation quality

- **Cost**

  - API call costs
  - Throughput-based pricing
  - Additional feature costs

- **Scalability**

  - Concurrent processing capability
  - Response time
  - Resource usage

- **Integration**
  - Existing system compatibility
  - Data compatibility
  - API stability

## 4. Data Management Policy

### 4.1 Image/Video Storage

- User upload images: Temporary storage in S3 (24 hours)
- AI processing results: S3 storage for 7 days
- Final selected results: Permanent storage

### 4.2 Database

- User information
- Product catalog
- Recommendation history
- Simulation results

## 5. Security Requirements

- User authentication/authorization
- Data encryption
- API security
- Privacy protection

## 6. Performance Requirements

- Page loading time: Within 3 seconds
- AI processing time: Within 10 seconds
- Concurrent users: 100+ users

## 7. Additional Considerations

### 7.1 Scalability

- Mobile app conversion possibility
- Multi-language support
- Additional AI feature integration

### 7.2 Monitoring

- System performance monitoring
- User behavior analysis
- AI model performance tracking

## 8. Additional Questions for Requirements Definition

1. User authentication method preference (including social login)
2. Recommendation system accuracy requirements
3. 3D simulation detail level
4. Expected product catalog size
5. Payment system integration necessity
6. Multi-language support necessity
7. Mobile optimization requirements
8. Data backup policy
9. Service availability requirements
10. Budget range
11. AI recommendation system accuracy goals
12. Recommendation result diversity requirements
13. Real-time feedback integration necessity
14. AI model update cycle
15. Recommendation result explainability requirements
16. GPU resource requirements
17. Real-time inference response time requirements
18. Model retraining cycle
19. Data backup and recovery policy
20. Cost optimization strategy
21. Expected API call frequency
22. Budget constraints
23. Accuracy vs cost priority
24. Customization requirements
25. Integration difficulty tolerance range
