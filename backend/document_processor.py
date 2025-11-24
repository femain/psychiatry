"""
Document processing module for extracting text from various formats
"""
import os
from typing import Dict, Any
from pathlib import Path
import PyPDF2
from PIL import Image
import pytesseract
from docx import Document


class DocumentProcessor:
    """Handles document ingestion and text extraction"""
    
    def __init__(self):
        self.supported_formats = {
            'pdf': self._process_pdf,
            'jpg': self._process_image,
            'jpeg': self._process_image,
            'png': self._process_image,
            'doc': self._process_doc,
            'docx': self._process_doc
        }
    
    def process_document(self, file_path: str) -> Dict[str, Any]:
        """
        Process a document and extract text
        
        Args:
            file_path: Path to the document file
            
        Returns:
            Dictionary containing extracted text and metadata
        """
        file_extension = Path(file_path).suffix.lower().replace('.', '')
        
        if file_extension not in self.supported_formats:
            raise ValueError(f"Unsupported file format: {file_extension}")
        
        processor = self.supported_formats[file_extension]
        text = processor(file_path)
        
        return {
            'text': text,
            'file_path': file_path,
            'format': file_extension,
            'length': len(text)
        }
    
    def _process_pdf(self, file_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
        except Exception as e:
            raise Exception(f"Error processing PDF: {str(e)}")
        
        return text.strip()
    
    def _process_image(self, file_path: str) -> str:
        """Extract text from image using OCR"""
        try:
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            return text.strip()
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")
    
    def _process_doc(self, file_path: str) -> str:
        """Extract text from DOC/DOCX"""
        try:
            doc = Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text.strip()
        except Exception as e:
            raise Exception(f"Error processing DOC/DOCX: {str(e)}")
