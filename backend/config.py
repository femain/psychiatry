"""
Configuration management for PsychiatristAI Backend
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    environment: str = "development"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_workers: int = 4
    cors_origins: List[str] = ["http://localhost:8081", "exp://localhost:8081"]
    
    # Database
    database_url: str = "sqlite:///./psychiatrist_ai.db"
    
    # Security
    secret_key: str = "change-this-in-production"
    encryption_key: str = "change-this-in-production"
    
    # AI Models
    huggingface_token: str = ""
    model_cache_dir: str = "./backend/models_cache"
    clinical_bert_model: str = "emilyalsentzer/Bio_ClinicalBERT"
    ner_model: str = "en_core_sci_md"
    
    # Document Processing
    max_file_size_mb: int = 50
    supported_formats: List[str] = ["pdf", "jpg", "jpeg", "png", "doc", "docx"]
    upload_dir: str = "./backend/uploads"
    
    # Anonymisation
    anonymisation_level: str = "high"
    enable_audit_log: bool = True
    
    # Compliance
    gdpr_compliant: bool = True
    nhs_anonymisation_standard: str = "ISB1523"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
