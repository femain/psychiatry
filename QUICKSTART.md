# ⚡ PsychiatristAI Quick Start Guide

Get up and running with PsychiatristAI in 5 minutes!

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies (2 min)

```bash
# Install frontend dependencies
npm install

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt
```

### Step 2: Install Required Tools (2 min)

```bash
# Install spaCy model
python -m spacy download en_core_web_sm

# Install Tesseract OCR (macOS)
brew install tesseract

# Or Ubuntu/Debian
# sudo apt-get install tesseract-ocr
```

### Step 3: Configure Environment (30 sec)

```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (optional for development)
```

### Step 4: Start the Application (30 sec)

**Terminal 1 - Backend:**
```bash
source venv/bin/activate
python -m uvicorn backend.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm start
```

Press `i` for iOS, `a` for Android, or `w` for web!

---

## 📱 First Run

1. **Home Screen** - View features and capabilities
2. **Upload Document** - Click "Upload Document" button
3. **Select File** - Choose a PDF or image file
4. **View Results** - See extracted medications and analysis
5. **Browse Medications** - Switch to "Medications" tab

---

## 🧪 Test with Sample Data

### Create a Test Document

Create a file called `test_clinical_note.txt`:

```
Patient Clinical Note

Date: 15/01/2024

Patient started on Sertraline 50mg daily for depression.
Initial assessment shows low mood and reduced appetite.

Follow-up 01/03/2024:
Patient reports improved mood and better sleep.
Sertraline appears to be effective.
Continue current dosage.
```

Save as PDF and upload through the app!

---

## 🔧 Common Commands

### Frontend
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run in browser
```

### Backend
```bash
# Start backend server
python -m uvicorn backend.main:app --reload

# Or use npm script
npm run backend

# Test API
curl http://localhost:8000/
```

---

## 📊 API Testing

### Health Check
```bash
curl http://localhost:8000/
```

### Compliance Check
```bash
curl http://localhost:8000/api/compliance/check
```

### Upload Document (example)
```bash
curl -X POST http://localhost:8000/api/documents/upload \
  -F "file=@test_document.pdf"
```

---

## 🐛 Quick Troubleshooting

### "Cannot find module 'expo-document-picker'"
```bash
npx expo install expo-document-picker
```

### "Port 8000 already in use"
```bash
lsof -ti:8000 | xargs kill -9
```

### "Python module not found"
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### "Tesseract not found"
```bash
# macOS
brew install tesseract

# Ubuntu
sudo apt-get install tesseract-ocr
```

---

## 📚 Next Steps

1. **Read the full [README.md](README.md)** for detailed features
2. **Check [SETUP.md](SETUP.md)** for comprehensive setup
3. **Review [ARCHITECTURE.md](ARCHITECTURE.md)** for system design
4. **Explore the code** in `app/` and `backend/` directories

---

## ✅ Verification

Your setup is working if:

- ✅ Backend responds at `http://localhost:8000/`
- ✅ Expo dev server starts without errors
- ✅ App loads on simulator/emulator
- ✅ Can navigate between screens
- ✅ Document upload screen is accessible

---

## 🎯 Key Features to Try

1. **Document Upload**
   - Upload a clinical PDF or image
   - View extracted text and analysis

2. **Medication Tracking**
   - Browse medication history
   - See dosages and dates
   - View mental status changes

3. **Compliance Info**
   - Check GDPR compliance status
   - Review NHS ISB1523 standards
   - Understand Caldicott Principles

4. **Anonymisation**
   - Upload document with patient info
   - Verify automatic anonymisation
   - Check audit logs

---

## 💡 Tips

- **Development**: Use `npm start` and keep backend running
- **Testing**: Use the web version (`w`) for faster iteration
- **Debugging**: Check terminal output for errors
- **API**: Backend runs on `http://localhost:8000`
- **Expo**: Frontend runs on `http://localhost:8081`

---

## 🆘 Need Help?

1. Check the error message in terminal
2. Review [SETUP.md](SETUP.md) troubleshooting section
3. Ensure all dependencies are installed
4. Verify Python virtual environment is activated
5. Check that ports 8000 and 8081 are available

---

## 🎉 You're Ready!

Your PsychiatristAI system is now running. Start uploading clinical documents and exploring the AI-powered analysis features!

**Happy coding! 🚀**
