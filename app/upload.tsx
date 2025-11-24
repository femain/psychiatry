import { StyleSheet, ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

interface Medication {
  drug_name: string;
  dosage: string;
  start_date?: string;
  end_date?: string;
  response?: string;
  mental_status_changes?: string[];
}

interface RiskSummary {
  suicidality?: string;
  self_harm_history?: string;
  safeguarding?: string;
}

interface DiagnosesBlock {
  presenting_difficulties?: string[];
  recorded_or_suspected?: string[];
}

interface TriageSupport {
  summary_points?: string[];
  system_prompt?: string;
}

interface AnalysisResult {
  document_id: string;
  patient_id: string;
  anonymised: boolean;
  medications: Medication[];
  risk_summary?: RiskSummary;
  diagnoses?: DiagnosesBlock;
  triage_support?: TriageSupport;
  missing_data: string[];
}

type SelectedFile = DocumentPicker.DocumentPickerAsset | null;

export default function UploadScreen() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
        Alert.alert('Success', 'Document selected successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
      console.error(error);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a document first');
      return;
    }

    setUploading(true);
    
    try {
      // TODO: Replace with actual API endpoint
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.mimeType,
        name: selectedFile.name,
      } as any);

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated response
      setAnalysisResult({
        document_id: 'doc_12345',
        patient_id: 'PATIENT_ANON001',
        medications: [
          {
            drug_name: 'Sertraline',
            dosage: '50mg daily',
            start_date: '2024-01-15',
            response: 'Positive',
            mental_status_changes: ['Improved mood', 'Reduced anxiety'],
          },
        ],
        missing_data: ['End date for current medication'],
        anonymised: true,
        risk_summary: {
          suicidality: 'Recent suicidal ideation documented without current plan.',
          self_harm_history: 'History of self-harm in the last 12 months.',
          safeguarding: 'Children in household mentioned; consider safeguarding context.',
        },
        diagnoses: {
          presenting_difficulties: [
            'Low mood, anhedonia, and reduced energy over several months.',
            'Prominent anxiety in social and work situations.',
          ],
          recorded_or_suspected: [
            'Recurrent depressive disorder (recorded in previous letters).',
            'Generalised anxiety disorder (suspected).',
          ],
        },
        triage_support: {
          summary_points: [
            'Recent escalation in mood symptoms; GP requesting medication review.',
            'Self-harm in last year; ensure risk assessment is updated.',
            'Working full-time but function reportedly declining.',
          ],
          system_prompt: 'Based on the highlighted information, this case may warrant timely review. This is not a triage decision; apply local protocols and clinical judgement.',
        },
      });

      Alert.alert('Success', 'Document analyzed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="cloud-upload" size={60} color="#4A90E2" />
        <ThemedText type="title" style={styles.title}>Upload Document</ThemedText>
        <ThemedText style={styles.subtitle}>
          Upload clinical documents for AI analysis
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.uploadCard}>
          <Ionicons name="document-text" size={48} color="#4A90E2" />
          <ThemedText type="subtitle" style={styles.uploadTitle}>
            Select Document
          </ThemedText>
          <ThemedText style={styles.uploadDescription}>
            Supported formats: PDF, JPG, PNG, DOC, DOCX
          </ThemedText>
          
          {selectedFile && (
            <View style={styles.fileInfo}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <ThemedText style={styles.fileName}>{selectedFile.name}</ThemedText>
              {typeof selectedFile.size === 'number' && (
                <ThemedText style={styles.fileSize}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </ThemedText>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={pickDocument}>
            <Ionicons name="folder-open" size={20} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>Choose File</ThemedText>
          </TouchableOpacity>

          {selectedFile && (
            <TouchableOpacity 
              style={[styles.button, styles.uploadButton]} 
              onPress={uploadDocument}
              disabled={uploading}
            >
              <Ionicons 
                name={uploading ? "hourglass" : "cloud-upload"} 
                size={20} 
                color="#FFFFFF" 
              />
              <ThemedText style={styles.buttonText}>
                {uploading ? 'Analyzing...' : 'Upload & Analyze'}
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        {analysisResult && (
          <ThemedView style={styles.resultsCard}>
            <ThemedText type="subtitle" style={styles.resultsTitle}>
              Analysis Results
            </ThemedText>
            <ThemedText style={styles.resultsDisclaimer}>
              Outputs are generated to support, not replace, clinician judgement. Always review the
              original documents and apply local risk and triage protocols.
            </ThemedText>
            
            <View style={styles.resultItem}>
              <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
              <ThemedText style={styles.resultLabel}>Anonymised:</ThemedText>
              <ThemedText style={styles.resultValue}>
                {analysisResult.anonymised ? 'Yes' : 'No'}
              </ThemedText>
            </View>

            <View style={styles.resultItem}>
              <Ionicons name="person" size={20} color="#4A90E2" />
              <ThemedText style={styles.resultLabel}>Patient ID:</ThemedText>
              <ThemedText style={styles.resultValue}>
                {analysisResult.patient_id}
              </ThemedText>
            </View>

            <View style={styles.medicationsSection}>
              <ThemedText style={styles.sectionTitle}>Medications Found:</ThemedText>
              {analysisResult.medications.map((med: Medication, index: number) => (
                <View key={index} style={styles.medicationItem}>
                  <ThemedText style={styles.medicationName}>{med.drug_name}</ThemedText>
                  <ThemedText style={styles.medicationDosage}>{med.dosage}</ThemedText>
                </View>
              ))}
            </View>

            {analysisResult.risk_summary && (
              <View style={styles.cdsSection}>
                <ThemedText style={styles.sectionTitle}>Risk & Safeguarding</ThemedText>
                {analysisResult.risk_summary.suicidality && (
                  <View style={styles.cdsItemRow}>
                    <Ionicons name="warning" size={18} color="#EF4444" />
                    <ThemedText style={styles.cdsText}>
                      {analysisResult.risk_summary.suicidality}
                    </ThemedText>
                  </View>
                )}
                {analysisResult.risk_summary.self_harm_history && (
                  <View style={styles.cdsItemRow}>
                    <Ionicons name="water" size={18} color="#F97316" />
                    <ThemedText style={styles.cdsText}>
                      {analysisResult.risk_summary.self_harm_history}
                    </ThemedText>
                  </View>
                )}
                {analysisResult.risk_summary.safeguarding && (
                  <View style={styles.cdsItemRow}>
                    <Ionicons name="people-circle" size={18} color="#F59E0B" />
                    <ThemedText style={styles.cdsText}>
                      {analysisResult.risk_summary.safeguarding}
                    </ThemedText>
                  </View>
                )}
              </View>
            )}

            {analysisResult.diagnoses && (
              <View style={styles.cdsSection}>
                <ThemedText style={styles.sectionTitle}>Clinical Picture & Diagnoses</ThemedText>
                {analysisResult.diagnoses.presenting_difficulties?.map((item: string, index: number) => (
                  <View key={`presenting-${index}`} style={styles.cdsItemRow}>
                    <Ionicons name="chatbox-ellipses" size={18} color="#3B82F6" />
                    <ThemedText style={styles.cdsText}>{item}</ThemedText>
                  </View>
                ))}
                {analysisResult.diagnoses.recorded_or_suspected?.map((item: string, index: number) => (
                  <View key={`diagnosis-${index}`} style={styles.cdsItemRow}>
                    <Ionicons name="medkit" size={18} color="#10B981" />
                    <ThemedText style={styles.cdsText}>{item}</ThemedText>
                  </View>
                ))}
              </View>
            )}

            {analysisResult.triage_support && (
              <View style={styles.cdsSection}>
                <ThemedText style={styles.sectionTitle}>Triage Support Summary</ThemedText>
                {analysisResult.triage_support.summary_points?.map((item: string, index: number) => (
                  <View key={`triage-${index}`} style={styles.cdsItemRow}>
                    <Ionicons name="list-circle" size={18} color="#6366F1" />
                    <ThemedText style={styles.cdsText}>{item}</ThemedText>
                  </View>
                ))}
                {analysisResult.triage_support.system_prompt && (
                  <ThemedText style={styles.triagePrompt}>
                    {analysisResult.triage_support.system_prompt}
                  </ThemedText>
                )}
              </View>
            )}

            {analysisResult.missing_data.length > 0 && (
              <View style={styles.missingDataSection}>
                <ThemedText style={styles.sectionTitle}>Missing Data:</ThemedText>
                {analysisResult.missing_data.map((item: string, index: number) => (
                  <View key={index} style={styles.missingItem}>
                    <Ionicons name="alert-circle" size={16} color="#FFC107" />
                    <ThemedText style={styles.missingText}>{item}</ThemedText>
                  </View>
                ))}
              </View>
            )}
          </ThemedView>
        )}

        <ThemedView style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#4A90E2" />
          <ThemedText style={styles.infoTitle}>Privacy & Security</ThemedText>
          <ThemedText style={styles.infoText}>
            All documents are automatically anonymised following UK GDPR and NHS ISB1523 standards.
            Patient identifiers are removed and replaced with pseudonyms.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  uploadCard: {
    padding: 24,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadTitle: {
    marginTop: 16,
    fontSize: 20,
  },
  uploadDescription: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 13,
  },
  fileInfo: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    width: '100%',
  },
  fileName: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  fileSize: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  resultsDisclaimer: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 14,
    opacity: 0.7,
  },
  medicationsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  medicationItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  medicationName: {
    fontSize: 15,
    fontWeight: '600',
  },
  medicationDosage: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.7,
  },
  cdsSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cdsItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  cdsText: {
    flex: 1,
    fontSize: 13,
  },
  triagePrompt: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.8,
  },
  missingDataSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  missingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  missingText: {
    fontSize: 13,
    flex: 1,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  infoTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
  },
});
