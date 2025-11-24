"""
FastAPI main application for PsychiatristAI
"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uvicorn

from .config import settings

# Initialize FastAPI app
app = FastAPI(
    title="PsychiatristAI API",
    description="AI Agent for Reviewing Clinical Mental Health Documents",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Models
class MedicationRecord(BaseModel):
    drug_name: str
    dosage: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    response: Optional[str] = None
    mental_status_changes: Optional[List[str]] = None


class DocumentAnalysisResult(BaseModel):
    document_id: str
    patient_id: str
    medications: List[MedicationRecord]
    missing_data: List[str]
    mental_status_summary: Optional[str] = None
    anonymised: bool
    processed_at: datetime


class HealthCheck(BaseModel):
    status: str
    version: str
    timestamp: datetime


# Routes
@app.get("/", response_model=HealthCheck)
async def root():
    """Health check endpoint"""
    return HealthCheck(
        status="healthy",
        version="1.0.0",
        timestamp=datetime.now()
    )


@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a clinical document for processing
    Supports: PDF, JPG, JPEG, PNG, DOC, DOCX
    """
    # Validate file type
    file_extension = file.filename.split(".")[-1].lower()
    if file_extension not in settings.supported_formats:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format. Supported formats: {', '.join(settings.supported_formats)}"
        )
    
    # Check file size
    content = await file.read()
    file_size_mb = len(content) / (1024 * 1024)
    if file_size_mb > settings.max_file_size_mb:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum allowed size of {settings.max_file_size_mb}MB"
        )
    
    # TODO: Implement document processing pipeline
    # 1. Save file
    # 2. Extract text (OCR if needed)
    # 3. Anonymise patient data
    # 4. Extract clinical entities
    # 5. Identify medications and mental status changes
    
    return JSONResponse(
        status_code=200,
        content={
            "message": "Document uploaded successfully",
            "filename": file.filename,
            "size_mb": round(file_size_mb, 2),
            "document_id": f"doc_{datetime.now().timestamp()}"
        }
    )


@app.post("/api/documents/analyze", response_model=DocumentAnalysisResult)
async def analyze_document(document_id: str):
    """
    Analyze a clinical document and extract structured data
    """
    # TODO: Implement full analysis pipeline
    # This is a placeholder response
    return DocumentAnalysisResult(
        document_id=document_id,
        patient_id="ANON_001",
        medications=[
            MedicationRecord(
                drug_name="Sertraline",
                dosage="50mg daily",
                start_date="2024-01-15",
                end_date=None,
                response="Positive",
                mental_status_changes=["Improved mood", "Reduced anxiety"]
            )
        ],
        missing_data=["End date for current medication"],
        mental_status_summary="Patient showing improvement in depressive symptoms",
        anonymised=True,
        processed_at=datetime.now()
    )


@app.get("/api/medications")
async def get_medications(patient_id: str):
    """
    Get medication history for a patient
    """
    # TODO: Implement database query
    return {
        "patient_id": patient_id,
        "medications": []
    }


@app.get("/api/compliance/check")
async def compliance_check():
    """
    Check compliance status with GDPR and NHS standards
    """
    return {
        "gdpr_compliant": settings.gdpr_compliant,
        "nhs_standard": settings.nhs_anonymisation_standard,
        "audit_log_enabled": settings.enable_audit_log,
        "anonymisation_level": settings.anonymisation_level
    }


if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=True
    )
