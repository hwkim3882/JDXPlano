# JDX Plano Web Application

AI-powered interior recommendation system for JDX Plano store, specializing in blinds, curtains, and shutters.

## Overview

JDX Plano is a web-based application that uses artificial intelligence to recommend and simulate interior products. The system analyzes user-uploaded space images/videos and provides personalized recommendations for window treatments.

## Features

- AI-powered product recommendations
- 3D virtual simulation
- Space analysis and style matching
- Real-time feedback integration
- User preference learning

## Project Structure

```
JDXPlano/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
├── backend/           # Node.js backend server
│   ├── src/          # Source files
│   ├── config/       # Configuration files
│   └── package.json  # Backend dependencies
│
├── ai-service/        # Python AI service
│   ├── src/          # Source files
│   ├── models/       # AI models
│   └── requirements.txt  # Python dependencies
│
├── docs/             # Documentation
│   ├── requirements.md      # Korean requirements
│   ├── requirements_en.md   # English requirements
│   ├── system_design.md     # Korean system design
│   └── system_design_en.md  # English system design
│
└── scripts/          # Utility scripts
    ├── setup.sh      # Development environment setup
    └── deploy.sh     # Deployment scripts
```

## Technical Stack

### Frontend

- React.js
- Three.js
- Tailwind CSS

### Backend

- Node.js + Express.js
- Python (AI model serving)

### Database

- PostgreSQL
- Redis

### AI/ML

- TensorFlow/PyTorch
- Computer Vision API
- 3D rendering engine

## Documentation

Detailed documentation can be found in the `docs` directory:

- [Requirements (Korean)](docs/requirements.md)
- [Requirements (English)](docs/requirements_en.md)
- [System Design (Korean)](docs/system_design.md)
- [System Design (English)](docs/system_design_en.md)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL
- Redis

### Installation

1. Clone the repository

```bash
git clone https://github.com/hwkim3882/JDXPlano.git
cd JDXPlano
```

2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# AI Service
cd ../ai-service
pip install -r requirements.txt
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run server

# AI Service
cd ../ai-service
python src/main.py
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/hwkim3882/JDXPlano](https://github.com/hwkim3882/JDXPlano)
