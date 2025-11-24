# 🏗️ PsychiatristAI Architecture

Detailed architecture documentation for the PsychiatristAI clinical document review system.

---

## 📐 System Overview

PsychiatristAI is a full-stack application consisting of:

1. **Mobile Frontend** - React Native with Expo
2. **Backend API** - Python FastAPI
3. **AI/ML Pipeline** - Clinical NLP and document processing
4. **Data Layer** - SQLite (development) / PostgreSQL (production)

---

## 🎨 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile Application                       │
│                   (React Native + Expo)                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Upload   │  │   Meds   │  │Compliance│   │
│  │  Screen  │  │  Screen  │  │  Screen  │  │  Screen  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           API Service Layer (services/api.ts)       │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                    Backend API Server                         │
│                      (FastAPI)                                │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │              API Endpoints (main.py)                │     │
│  │  • POST /api/documents/upload                       │     │
│  │  • POST /api/documents/analyze                      │     │
│  │  • GET  /api/medications                            │     │
│  │  • GET  /api/compliance/check                       │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │  Document   │  │  Clinical    │  │  Anonymiser    │     │
│  │  Processor  │  │     NLP      │  │   (GDPR)       │     │
│  └─────────────┘  └──────────────┘  └────────────────┘     │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                   AI/ML Pipeline                              │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   PyPDF2     │  │  Tesseract   │  │    spaCy     │      │
│  │ (PDF Extract)│  │    (OCR)     │  │    (NER)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Clinical     │  │   Presidio   │  │  Transformers│      │
│  │    BERT      │  │(Anonymisation)│  │ (Hugging Face)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                    Data Storage                               │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   SQLite/    │  │  File System │  │  Audit Logs  │      │
│  │  PostgreSQL  │  │  (Uploads)   │  │    (JSON)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Document Upload & Analysis Flow

```
1. User selects document in mobile app
   ↓
2. Document picker returns file URI
   ↓
3. API Service uploads file to backend
   ↓
4. Backend validates file type and size
   ↓
5. Document Processor extracts text
   ├─ PDF → PyPDF2
   ├─ Image → Tesseract OCR
   └─ DOC/DOCX → python-docx
   ↓
6. Anonymiser removes personal identifiers
   ├─ NHS numbers
   ├─ Names
   ├─ Addresses
   ├─ Postcodes
   └─ Phone numbers
   ↓
7. Clinical NLP extracts entities
   ├─ Medications
   ├─ Dosages
   ├─ Dates
   └─ Mental status observations
   ↓
8. Gap Detection identifies missing data
   ↓
9. Results returned to mobile app
   ↓
10. User views analysis results
```

---

## 📦 Component Architecture

### Frontend Components

```typescript
app/
├── (tabs)/
│   ├── index.tsx           // Home screen with feature cards
│   ├── medications.tsx     // Medication history list
│   └── explore.tsx         // Explore features
├── upload.tsx              // Document upload & analysis
└── compliance.tsx          // Compliance information

services/
└── api.ts                  // API client for backend communication

components/
├── themed-text.tsx         // Themed text component
├── themed-view.tsx         // Themed view component
└── ...                     // Other reusable components
```

### Backend Modules

```python
backend/
├── main.py                 # FastAPI app & routes
├── config.py               # Configuration management
├── document_processor.py   # Document text extraction
├── clinical_nlp.py         # NLP entity extraction
└── anonymiser.py           # GDPR anonymisation
```

---

## 🧬 Clinical NLP Pipeline

### Entity Extraction Process

1. **Text Preprocessing**
   - Normalize whitespace
   - Remove special characters
   - Convert to lowercase for matching

2. **Medication Detection**
   - Pattern matching for common psychiatric medications
   - Regex patterns for drug names
   - Context extraction (±100 characters)

3. **Dosage Extraction**
   - Regex: `\b(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg)\b`
   - Extract from medication context

4. **Date Extraction**
   - Multiple date formats supported
   - ISO format: `YYYY-MM-DD`
   - UK format: `DD/MM/YYYY`
   - Natural language: `Jan 15, 2024`

5. **Mental Status Assessment**
   - Keyword matching for mental health terms
   - Sentence-level extraction
   - Sentiment analysis (planned)

6. **Response Assessment**
   - Positive indicators: improved, better, effective
   - Negative indicators: worsened, ineffective, side effects
   - Neutral: mixed or unclear response

---

## 🔐 Security Architecture

### Anonymisation Pipeline

```
Original Text
    ↓
┌───────────────────────────┐
│  Pattern Matching         │
│  • NHS Number: \d{3}\s?\d{3}\s?\d{4}  │
│  • Postcode: [A-Z]{1,2}\d{1,2}...     │
│  • Phone: 0\d{9,10}                   │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│  Identifier Removal       │
│  • NHS_REDACTED           │
│  • POSTCODE_REDACTED      │
│  • PHONE_REDACTED         │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│  Pseudonymisation         │
│  • SHA-256 hashing        │
│  • PATIENT_XXXXXXXX       │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│  Audit Logging            │
│  • Timestamp              │
│  • Entities removed       │
│  • Pseudonym mapping      │
└───────────────────────────┘
    ↓
Anonymised Text
```

### Compliance Layers

1. **Transport Security**
   - HTTPS for all API calls
   - TLS 1.3 encryption

2. **Data at Rest**
   - Encrypted database
   - Secure file storage

3. **Access Control**
   - Authentication (to be implemented)
   - Role-based access control (RBAC)
   - API key management

4. **Audit Trail**
   - Complete logging of all operations
   - Immutable audit logs
   - Compliance reporting

---

## 🗄️ Database Schema

### Documents Table
```sql
CREATE TABLE documents (
    id VARCHAR PRIMARY KEY,
    filename VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    upload_date TIMESTAMP NOT NULL,
    patient_pseudonym VARCHAR NOT NULL,
    anonymised BOOLEAN DEFAULT TRUE,
    processed BOOLEAN DEFAULT FALSE
);
```

### Medications Table
```sql
CREATE TABLE medications (
    id SERIAL PRIMARY KEY,
    document_id VARCHAR REFERENCES documents(id),
    drug_name VARCHAR NOT NULL,
    dosage VARCHAR,
    start_date DATE,
    end_date DATE,
    response VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Mental Status Table
```sql
CREATE TABLE mental_status (
    id SERIAL PRIMARY KEY,
    medication_id INTEGER REFERENCES medications(id),
    observation TEXT NOT NULL,
    recorded_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Audit Log Table
```sql
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    action VARCHAR NOT NULL,
    entity_type VARCHAR NOT NULL,
    entity_id VARCHAR,
    user_id VARCHAR,
    timestamp TIMESTAMP DEFAULT NOW(),
    details JSONB
);
```

---

## 🔌 API Design

### RESTful Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/documents/upload` | Upload document |
| POST | `/api/documents/analyze` | Analyze document |
| GET | `/api/medications` | Get medication history |
| GET | `/api/compliance/check` | Check compliance status |

### Request/Response Format

All API responses follow this structure:

```json
{
  "status": "success|error",
  "data": { ... },
  "message": "Optional message",
  "timestamp": "2024-11-02T20:00:00Z"
}
```

---

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── Expo Dev Server (Port 8081)
└── FastAPI Server (Port 8000)
```

### Production
```
┌─────────────────────┐
│   Mobile App        │
│   (iOS/Android)     │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   Load Balancer     │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   API Gateway       │
│   (HTTPS/TLS)       │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   FastAPI Servers   │
│   (Auto-scaling)    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   PostgreSQL DB     │
│   (Replicated)      │
└─────────────────────┘
```

---

## 📊 Performance Considerations

### Optimization Strategies

1. **Document Processing**
   - Async processing for large files
   - Background job queue (Celery)
   - Caching of processed results

2. **NLP Pipeline**
   - Model caching
   - Batch processing
   - GPU acceleration (optional)

3. **API Performance**
   - Response compression
   - Database query optimization
   - Connection pooling

4. **Mobile App**
   - Lazy loading
   - Image optimization
   - Offline caching

---

## 🔮 Future Architecture Enhancements

1. **Microservices**
   - Separate document processing service
   - Dedicated NLP service
   - Anonymisation service

2. **Event-Driven Architecture**
   - Message queue (RabbitMQ/Kafka)
   - Event sourcing
   - CQRS pattern

3. **Real-time Features**
   - WebSocket support
   - Live collaboration
   - Push notifications

4. **AI/ML Improvements**
   - Fine-tuned Clinical BERT
   - Custom medication NER model
   - Temporal reasoning engine

---

## 📚 Technology Stack Details

### Frontend
- **React Native** 0.81.5
- **Expo** ~54.0
- **TypeScript** 5.9
- **Expo Router** 6.0

### Backend
- **Python** 3.9+
- **FastAPI** 0.108
- **Uvicorn** 0.25 (ASGI server)
- **Pydantic** 2.5 (validation)

### AI/ML
- **spaCy** 3.7
- **Transformers** 4.36
- **PyTorch** 2.1
- **scikit-learn** 1.3

### Data Processing
- **PyPDF2** 3.0 (PDF)
- **Pillow** 10.1 (Images)
- **pytesseract** 0.3 (OCR)
- **python-docx** 1.1 (Word docs)

### Security
- **Presidio** 2.2 (Anonymisation)
- **cryptography** 41.0
- **python-jose** (JWT - planned)

---

**Architecture designed for scalability, security, and compliance.**
