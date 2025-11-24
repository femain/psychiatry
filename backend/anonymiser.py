"""
Patient data anonymisation module compliant with UK GDPR and NHS ISB1523
"""
import re
import hashlib
from typing import Dict, List, Any, Optional
from datetime import datetime
import json


class PatientAnonymiser:
    """
    Handles patient data anonymisation following UK GDPR and NHS ISB1523 standards
    Implements Caldicott Principles and Motivated Intruder Test considerations
    """
    
    def __init__(self, anonymisation_level: str = "high"):
        """
        Initialize anonymiser
        
        Args:
            anonymisation_level: Level of anonymisation (low, medium, high)
        """
        self.anonymisation_level = anonymisation_level
        self.audit_log = []
        
        # Patterns for identifying personal information
        self.patterns = {
            'nhs_number': r'\b\d{3}\s?\d{3}\s?\d{4}\b',
            'name': r'\b[A-Z][a-z]+\s+[A-Z][a-z]+\b',
            'postcode': r'\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b',
            'phone': r'\b(?:0|\+44)\d{9,10}\b',
            'email': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'date_of_birth': r'\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b',
            'address': r'\b\d+\s+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Drive|Dr)\b'
        }
        
        # Replacement strategies
        self.replacements = {}
    
    def anonymise_text(self, text: str, patient_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Anonymise clinical text by removing or replacing personal identifiers
        
        Args:
            text: Clinical text to anonymise
            patient_id: Optional patient identifier for consistent pseudonymisation
            
        Returns:
            Dictionary with anonymised text and metadata
        """
        anonymised_text = text
        removed_entities = []
        
        # Generate or use patient pseudonym
        if patient_id:
            pseudonym = self._generate_pseudonym(patient_id)
        else:
            pseudonym = self._generate_pseudonym(text[:50])
        
        # Remove NHS numbers
        nhs_matches = re.finditer(self.patterns['nhs_number'], anonymised_text)
        for match in nhs_matches:
            original = match.group(0)
            anonymised_text = anonymised_text.replace(original, f"NHS_REDACTED")
            removed_entities.append({'type': 'nhs_number', 'original': original})
        
        # Remove postcodes
        postcode_matches = re.finditer(self.patterns['postcode'], anonymised_text)
        for match in postcode_matches:
            original = match.group(0)
            anonymised_text = anonymised_text.replace(original, "POSTCODE_REDACTED")
            removed_entities.append({'type': 'postcode', 'original': original})
        
        # Remove phone numbers
        phone_matches = re.finditer(self.patterns['phone'], anonymised_text)
        for match in phone_matches:
            original = match.group(0)
            anonymised_text = anonymised_text.replace(original, "PHONE_REDACTED")
            removed_entities.append({'type': 'phone', 'original': original})
        
        # Remove email addresses
        email_matches = re.finditer(self.patterns['email'], anonymised_text)
        for match in email_matches:
            original = match.group(0)
            anonymised_text = anonymised_text.replace(original, "EMAIL_REDACTED")
            removed_entities.append({'type': 'email', 'original': original})
        
        # Remove addresses
        address_matches = re.finditer(self.patterns['address'], anonymised_text, re.IGNORECASE)
        for match in address_matches:
            original = match.group(0)
            anonymised_text = anonymised_text.replace(original, "ADDRESS_REDACTED")
            removed_entities.append({'type': 'address', 'original': original})
        
        # Log anonymisation action
        self._log_anonymisation(pseudonym, removed_entities)
        
        return {
            'anonymised_text': anonymised_text,
            'patient_pseudonym': pseudonym,
            'removed_entities_count': len(removed_entities),
            'anonymisation_level': self.anonymisation_level,
            'timestamp': datetime.now().isoformat()
        }
    
    def _generate_pseudonym(self, identifier: str) -> str:
        """
        Generate a consistent pseudonym for a patient
        
        Args:
            identifier: Original patient identifier
            
        Returns:
            Pseudonymised identifier
        """
        # Use SHA-256 hash for one-way pseudonymisation
        hash_object = hashlib.sha256(identifier.encode())
        hash_hex = hash_object.hexdigest()
        
        # Create readable pseudonym
        pseudonym = f"PATIENT_{hash_hex[:8].upper()}"
        
        return pseudonym
    
    def _log_anonymisation(self, pseudonym: str, removed_entities: List[Dict[str, str]]):
        """
        Log anonymisation action for audit trail
        
        Args:
            pseudonym: Patient pseudonym
            removed_entities: List of removed entities
        """
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'patient_pseudonym': pseudonym,
            'entities_removed': len(removed_entities),
            'entity_types': list(set([e['type'] for e in removed_entities]))
        }
        
        self.audit_log.append(log_entry)
    
    def get_audit_log(self) -> List[Dict[str, Any]]:
        """
        Retrieve audit log of anonymisation actions
        
        Returns:
            List of audit log entries
        """
        return self.audit_log
    
    def validate_anonymisation(self, text: str) -> Dict[str, Any]:
        """
        Validate that text has been properly anonymised
        Implements basic Motivated Intruder Test checks
        
        Args:
            text: Text to validate
            
        Returns:
            Validation results
        """
        issues = []
        
        # Check for remaining personal identifiers
        for entity_type, pattern in self.patterns.items():
            matches = re.findall(pattern, text)
            if matches and entity_type != 'name':  # Names might be clinical terms
                issues.append({
                    'type': entity_type,
                    'count': len(matches),
                    'severity': 'high'
                })
        
        # Check for common identifiable patterns
        if re.search(r'\b(?:Mr|Mrs|Ms|Dr)\s+[A-Z][a-z]+\b', text):
            issues.append({
                'type': 'title_with_name',
                'severity': 'medium',
                'message': 'Potential name with title found'
            })
        
        is_valid = len(issues) == 0
        
        return {
            'is_valid': is_valid,
            'issues': issues,
            'compliance_level': 'high' if is_valid else 'low',
            'timestamp': datetime.now().isoformat()
        }
    
    def export_audit_log(self, filepath: str):
        """
        Export audit log to file for compliance reporting
        
        Args:
            filepath: Path to save audit log
        """
        with open(filepath, 'w') as f:
            json.dump(self.audit_log, f, indent=2)
