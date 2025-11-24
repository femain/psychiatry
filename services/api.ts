/**
 * API Service for PsychiatristAI Backend
 */

const API_BASE_URL = 'http://localhost:8000';

export interface MedicationRecord {
  drug_name: string;
  dosage?: string;
  start_date?: string;
  end_date?: string;
  response?: string;
  mental_status_changes?: string[];
}

export interface DocumentAnalysisResult {
  document_id: string;
  patient_id: string;
  medications: MedicationRecord[];
  missing_data: string[];
  mental_status_summary?: string;
  anonymised: boolean;
  processed_at: string;
}

export interface UploadResponse {
  message: string;
  filename: string;
  size_mb: number;
  document_id: string;
}

export interface ComplianceStatus {
  gdpr_compliant: boolean;
  nhs_standard: string;
  audit_log_enabled: boolean;
  anonymisation_level: string;
}

class APIService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  /**
   * Upload a clinical document
   */
  async uploadDocument(file: {
    uri: string;
    type: string;
    name: string;
  }): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);

      const response = await fetch(`${this.baseURL}/api/documents/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Document upload failed:', error);
      throw error;
    }
  }

  /**
   * Analyze a document by ID
   */
  async analyzeDocument(documentId: string): Promise<DocumentAnalysisResult> {
    try {
      const response = await fetch(`${this.baseURL}/api/documents/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document_id: documentId }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Document analysis failed:', error);
      throw error;
    }
  }

  /**
   * Get medication history for a patient
   */
  async getMedications(patientId: string): Promise<{
    patient_id: string;
    medications: MedicationRecord[];
  }> {
    try {
      const response = await fetch(
        `${this.baseURL}/api/medications?patient_id=${patientId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch medications: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch medications:', error);
      throw error;
    }
  }

  /**
   * Check compliance status
   */
  async checkCompliance(): Promise<ComplianceStatus> {
    try {
      const response = await fetch(`${this.baseURL}/api/compliance/check`);

      if (!response.ok) {
        throw new Error(`Compliance check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Compliance check failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new APIService();

// Export class for testing
export default APIService;
