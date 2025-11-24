# 🧠 PsychiatristAI

**AI-Powered Clinical Mental Health Document Review System**

PsychiatristAI is a comprehensive mobile application with a Python backend that uses artificial intelligence to review clinical mental health documents, extract medication history, assess mental status changes, and ensure GDPR compliance.

---

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Compliance](#compliance)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## ✨ Features

### Core Capabilities

- **📄 Multi-Format Document Processing**
  - Support for PDF, JPG, PNG, DOC, DOCX
  - OCR for scanned documents and handwriting
  - Automated text extraction

- **🧬 Clinical NLP**
  - Clinical BERT / BioGPT for medical language understanding
  - Custom Named Entity Recognition (NER) for medications
  - Temporal reasoning for medication timelines
  - Mental status change detection

- **💊 Medication Tracking**
  - Automatic extraction of drug names, dosages, dates
  - Response assessment (Positive/Negative/Neutral)
  - Mental status change correlation
  - Gap detection for missing data

- **🔐 Anonymisation & Compliance**
  - UK GDPR compliant
  - NHS ISB1523 Anonymisation Standard
  - Caldicott Principles implementation
  - Motivated Intruder Test considerations
  - Audit logging for all operations

- **📊 Gap Detection**
  - Missing start/end dates
  - Medications without documented effects
  - Inconsistencies in prescriptions

---

## 🏗️ Architecture

```
PsychiatristAI/
├── app/                    # React Native mobile app
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── medications.tsx # Medication history
│   │   └── explore.tsx    # Explore features
│   └── upload.tsx         # Document upload screen
├── backend/               # Python FastAPI backend
│   ├── main.py           # API endpoints
│   ├── config.py         # Configuration
│   ├── document_processor.py  # Document ingestion
│   ├── clinical_nlp.py   # NLP processing
│   └── anonymiser.py     # Data anonymisation
├── components/           # Reusable React components
└── assets/              # Images and resources
```

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install additional packages**
   ```bash
   npx expo install expo-document-picker
   ```

3. **Start the Expo development server**
   ```bash
   npm start
   ```

### Backend Setup

1. **Create a Python virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Download spaCy models**
   ```bash
   python -m spacy download en_core_web_sm
   # For clinical NLP (optional):
   pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.3/en_core_sci_md-0.5.3.tar.gz
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the backend server**
   ```bash
   python -m uvicorn backend.main:app --reload
   ```
   Or use npm script:
   ```bash
   npm run backend
   ```

---

## 💻 Usage

### Mobile App

1. **Launch the app** on iOS Simulator, Android Emulator, or Expo Go
2. **Upload a document** from the home screen
3. **View analysis results** including medications and mental status changes
4. **Browse medication history** in the Medications tab
5. **Check compliance status** for GDPR and NHS standards

### API Endpoints

The backend API runs on `http://localhost:8000` by default.

**Health Check**
```bash
GET /
```

**Upload Document**
```bash
POST /api/documents/upload
Content-Type: multipart/form-data
Body: file (PDF, JPG, PNG, DOC, DOCX)
```

**Analyze Document**
```bash
POST /api/documents/analyze
Body: { "document_id": "doc_12345" }
```

**Get Medications**
```bash
GET /api/medications?patient_id=PATIENT_001
```

**Compliance Check**
```bash
GET /api/compliance/check
```

---

## 🔐 Compliance

### UK GDPR & Data Protection

PsychiatristAI implements comprehensive data protection measures:

- **Direct Identifier Removal**: NHS numbers, names, addresses, postcodes
- **Pseudonymisation**: SHA-256 hashing for patient identifiers
- **Audit Logging**: Complete trail of all anonymisation operations
- **Access Controls**: Secure API with authentication (to be implemented)

### NHS ISB1523 Anonymisation Standard

- Removes all direct identifiers
- Applies pseudonymisation techniques
- Implements Motivated Intruder Test checks
- Maintains audit trails for compliance reporting

### Caldicott Principles

1. Justify the purpose
2. Use minimum necessary data
3. Access on a need-to-know basis
4. Everyone has responsibilities
5. Understand and comply with the law
6. Duty to share information can be as important as duty to protect

---

## 📚 API Documentation

### Document Processing Pipeline

1. **Upload** → Document received and validated
2. **Extract** → Text extraction (OCR if needed)
3. **Anonymise** → Remove/replace personal identifiers
4. **Analyze** → NLP processing for clinical entities
5. **Return** → Structured data with medications and gaps

### Response Format

```json
{
  "document_id": "doc_12345",
  "patient_id": "PATIENT_ANON001",
  "medications": [
    {
      "drug_name": "Sertraline",
      "dosage": "50mg daily",
      "start_date": "2024-01-15",
      "end_date": null,
      "response": "Positive",
      "mental_status_changes": ["Improved mood", "Reduced anxiety"]
    }
  ],
  "missing_data": ["End date for current medication"],
  "mental_status_summary": "Patient showing improvement",
  "anonymised": true,
  "processed_at": "2024-11-02T20:00:00Z"
}
```

---

## 🛠️ Technology Stack

### Frontend
- React Native with Expo
- TypeScript
- Expo Router for navigation
- Expo Document Picker

### Backend
- Python 3.9+
- FastAPI
- spaCy / Clinical BERT
- PyTesseract (OCR)
- Presidio (Anonymisation)

### AI/ML
- Transformers (Hugging Face)
- Clinical BERT / BioGPT
- spaCy for NER
- Custom medication extraction models

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the 0BSD License.

---

## 🔮 Future Enhancements

- [ ] Integration with EHR systems
- [ ] Clinician dashboard
- [ ] Real-time collaboration features
- [ ] Advanced temporal reasoning
- [ ] Multi-language support
- [ ] Cloud deployment
- [ ] Mobile offline mode

---

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for mental health professionals**
