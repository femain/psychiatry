# 🚀 PsychiatristAI Setup Guide

Complete setup instructions for the PsychiatristAI clinical document review system.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **Python** 3.9 or higher ([Download](https://www.python.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Expo CLI** (will be installed via npx)

### Platform-Specific Requirements

#### macOS (for iOS development)
- Xcode 14+ from the Mac App Store
- Xcode Command Line Tools: `xcode-select --install`
- iOS Simulator (included with Xcode)

#### Windows/Linux (for Android development)
- Android Studio ([Download](https://developer.android.com/studio))
- Android SDK and emulator configured

---

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PsychiatristAI
```

### 2. Frontend Setup (React Native)

#### Install Node Dependencies

```bash
npm install
```

#### Install Expo Document Picker

```bash
npx expo install expo-document-picker
```

#### Verify Installation

```bash
npm start
```

This should start the Expo development server. Press `Ctrl+C` to stop it.

---

### 3. Backend Setup (Python)

#### Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### Install spaCy Language Models

```bash
# Basic English model (required)
python -m spacy download en_core_web_sm

# Clinical/Scientific model (optional but recommended)
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.3/en_core_sci_md-0.5.3.tar.gz
```

#### Install Tesseract OCR

**macOS (using Homebrew):**
```bash
brew install tesseract
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

**Windows:**
Download installer from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)

#### Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file with your settings:
```env
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
DATABASE_URL=sqlite:///./psychiatrist_ai.db
SECRET_KEY=your-secret-key-change-this
```

#### Test Backend

```bash
python -m uvicorn backend.main:app --reload
```

Visit `http://localhost:8000` - you should see a health check response.

---

## 🏃 Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Backend:**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn backend.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Option 2: Use npm Scripts

**Backend:**
```bash
npm run backend
```

**Frontend:**
```bash
npm start
```

---

## 📱 Running on Devices

### iOS Simulator (macOS only)

1. Start the Expo server: `npm start`
2. Press `i` to open iOS Simulator
3. Or scan QR code with Expo Go app on physical device

### Android Emulator

1. Start Android Studio and launch an emulator
2. Start the Expo server: `npm start`
3. Press `a` to open Android emulator
4. Or scan QR code with Expo Go app on physical device

### Web Browser

1. Start the Expo server: `npm start`
2. Press `w` to open in web browser

---

## 🧪 Testing the Application

### Test Document Upload

1. Launch the app
2. Navigate to "Upload Document" from home screen
3. Select a test PDF or image file
4. Click "Upload & Analyze"
5. View extracted medications and analysis results

### Test API Endpoints

```bash
# Health check
curl http://localhost:8000/

# Upload document
curl -X POST http://localhost:8000/api/documents/upload \
  -F "file=@test_document.pdf"

# Compliance check
curl http://localhost:8000/api/compliance/check
```

---

## 🔍 Troubleshooting

### Common Issues

#### "Cannot find module 'expo-document-picker'"

**Solution:**
```bash
npx expo install expo-document-picker
```

#### "Python module not found"

**Solution:**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

#### "Tesseract not found"

**Solution:**
- Ensure Tesseract is installed (see installation steps above)
- On macOS: `brew install tesseract`
- Verify: `tesseract --version`

#### "spaCy model not found"

**Solution:**
```bash
python -m spacy download en_core_web_sm
```

#### Port 8000 already in use

**Solution:**
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or change port in .env file
API_PORT=8001
```

#### Expo Metro bundler issues

**Solution:**
```bash
# Clear cache and restart
npx expo start -c
```

---

## 🗂️ Project Structure

```
PsychiatristAI/
├── app/                          # React Native app
│   ├── (tabs)/                  # Tab navigation screens
│   │   ├── index.tsx           # Home screen
│   │   ├── medications.tsx     # Medication history
│   │   └── explore.tsx         # Explore features
│   ├── upload.tsx              # Document upload
│   └── compliance.tsx          # Compliance info
├── backend/                     # Python FastAPI backend
│   ├── __init__.py
│   ├── main.py                 # API routes
│   ├── config.py               # Configuration
│   ├── document_processor.py  # Document handling
│   ├── clinical_nlp.py        # NLP processing
│   └── anonymiser.py          # Data anonymisation
├── components/                  # Reusable components
├── assets/                      # Images and resources
├── requirements.txt            # Python dependencies
├── package.json               # Node dependencies
├── .env.example              # Environment template
└── README.md                 # Documentation
```

---

## 🔐 Security Considerations

### Before Production Deployment

1. **Change default secrets** in `.env`:
   - Generate strong `SECRET_KEY`
   - Generate strong `ENCRYPTION_KEY`

2. **Enable HTTPS** for API endpoints

3. **Configure authentication** and authorization

4. **Set up database** (replace SQLite with PostgreSQL/MySQL)

5. **Enable rate limiting** on API endpoints

6. **Configure CORS** properly for production domains

7. **Set up monitoring** and logging

---

## 📊 Database Setup (Optional)

For production, replace SQLite with PostgreSQL:

```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt-get install postgresql  # Ubuntu

# Create database
createdb psychiatrist_ai

# Update .env
DATABASE_URL=postgresql://user:password@localhost/psychiatrist_ai

# Install psycopg2
pip install psycopg2-binary
```

---

## 🚀 Deployment

### Backend Deployment (Example: Heroku)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login and create app
heroku login
heroku create psychiatrist-ai-backend

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Expo EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login and configure
eas login
eas build:configure

# Build for production
eas build --platform ios
eas build --platform android
```

---

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [README.md](README.md) documentation
3. Open an issue on GitHub
4. Contact the development team

---

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Python 3.9+ installed
- [ ] Virtual environment created and activated
- [ ] All Python dependencies installed
- [ ] spaCy models downloaded
- [ ] Tesseract OCR installed
- [ ] Environment variables configured
- [ ] Backend server starts successfully
- [ ] Frontend Expo server starts successfully
- [ ] Can upload and analyze test document
- [ ] All compliance checks pass

---

**Setup complete! You're ready to use PsychiatristAI.** 🎉
