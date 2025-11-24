"""
Clinical NLP module for entity extraction and relationship mapping
"""
from typing import List, Dict, Any, Optional
import re
from datetime import datetime
import spacy


class ClinicalNLP:
    """Handles clinical text analysis and entity extraction"""
    
    def __init__(self, model_name: str = "en_core_sci_md"):
        """
        Initialize Clinical NLP processor
        
        Args:
            model_name: Name of the spaCy model to use
        """
        try:
            self.nlp = spacy.load(model_name)
        except OSError:
            # Fallback to basic English model if clinical model not available
            self.nlp = spacy.load("en_core_web_sm")
        
        # Common medication patterns
        self.medication_patterns = [
            r'\b(?:sertraline|fluoxetine|citalopram|escitalopram|paroxetine)\b',
            r'\b(?:venlafaxine|duloxetine|mirtazapine)\b',
            r'\b(?:quetiapine|olanzapine|risperidone|aripiprazole)\b',
            r'\b(?:lithium|valproate|lamotrigine|carbamazepine)\b',
            r'\b(?:lorazepam|diazepam|clonazepam|alprazolam)\b'
        ]
        
        # Dosage patterns
        self.dosage_pattern = r'\b(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg)\b'
        
        # Date patterns
        self.date_patterns = [
            r'\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\b',
            r'\b(\d{4}[-/]\d{1,2}[-/]\d{1,2})\b',
            r'\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b'
        ]
    
    def extract_medications(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract medication information from clinical text
        
        Args:
            text: Clinical text to analyze
            
        Returns:
            List of medication records
        """
        medications = []
        
        # Process text with spaCy
        doc = self.nlp(text.lower())
        
        # Extract medications using patterns
        for pattern in self.medication_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                drug_name = match.group(0)
                
                # Extract context around medication
                start = max(0, match.start() - 100)
                end = min(len(text), match.end() + 100)
                context = text[start:end]
                
                # Extract dosage
                dosage = self._extract_dosage(context)
                
                # Extract dates
                dates = self._extract_dates(context)
                
                medication = {
                    'drug_name': drug_name.title(),
                    'dosage': dosage,
                    'start_date': dates[0] if len(dates) > 0 else None,
                    'end_date': dates[1] if len(dates) > 1 else None,
                    'context': context
                }
                
                medications.append(medication)
        
        return medications
    
    def extract_mental_status(self, text: str) -> List[str]:
        """
        Extract mental status observations from text
        
        Args:
            text: Clinical text to analyze
            
        Returns:
            List of mental status observations
        """
        mental_status_keywords = [
            'mood', 'affect', 'anxiety', 'depression', 'psychosis',
            'hallucinations', 'delusions', 'suicidal', 'manic',
            'irritable', 'agitated', 'calm', 'stable', 'improved',
            'deteriorated', 'sleep', 'appetite', 'concentration'
        ]
        
        observations = []
        doc = self.nlp(text.lower())
        
        for sent in doc.sents:
            sent_text = sent.text
            if any(keyword in sent_text for keyword in mental_status_keywords):
                observations.append(sent_text.strip())
        
        return observations
    
    def detect_missing_data(self, medication_records: List[Dict[str, Any]]) -> List[str]:
        """
        Detect missing or incomplete data in medication records
        
        Args:
            medication_records: List of medication records
            
        Returns:
            List of missing data points
        """
        missing = []
        
        for idx, med in enumerate(medication_records):
            if not med.get('dosage'):
                missing.append(f"Missing dosage for {med['drug_name']}")
            
            if not med.get('start_date'):
                missing.append(f"Missing start date for {med['drug_name']}")
            
            if not med.get('end_date') and 'discontinued' not in med.get('context', '').lower():
                missing.append(f"Missing end date for {med['drug_name']} (may be ongoing)")
        
        return missing
    
    def _extract_dosage(self, text: str) -> Optional[str]:
        """Extract dosage information from text"""
        match = re.search(self.dosage_pattern, text, re.IGNORECASE)
        if match:
            return match.group(0)
        return None
    
    def _extract_dates(self, text: str) -> List[str]:
        """Extract dates from text"""
        dates = []
        for pattern in self.date_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                dates.append(match.group(0))
        return dates
    
    def assess_medication_response(self, text: str, medication: str) -> Optional[str]:
        """
        Assess patient response to medication
        
        Args:
            text: Clinical text
            medication: Medication name
            
        Returns:
            Response assessment (Positive, Negative, Neutral, or None)
        """
        positive_indicators = [
            'improved', 'better', 'effective', 'responding well',
            'reduction in', 'decreased', 'stable', 'remission'
        ]
        
        negative_indicators = [
            'worsened', 'worse', 'ineffective', 'no response',
            'increased', 'side effects', 'adverse', 'discontinued'
        ]
        
        # Find context around medication
        med_pattern = re.compile(rf'\b{re.escape(medication)}\b', re.IGNORECASE)
        match = med_pattern.search(text)
        
        if not match:
            return None
        
        # Get surrounding context
        start = max(0, match.start() - 200)
        end = min(len(text), match.end() + 200)
        context = text[start:end].lower()
        
        # Check for indicators
        positive_count = sum(1 for indicator in positive_indicators if indicator in context)
        negative_count = sum(1 for indicator in negative_indicators if indicator in context)
        
        if positive_count > negative_count:
            return "Positive"
        elif negative_count > positive_count:
            return "Negative"
        elif positive_count > 0 or negative_count > 0:
            return "Neutral"
        
        return None
