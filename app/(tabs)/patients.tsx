import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface PatientSummary {
  id: string;
  display_id: string;
  name: string;
  last_document_date: string;
  risk_summary?: {
    suicidality?: string;
    self_harm_history?: string;
    safeguarding?: string;
  };
  medications?: string[];
  triage_points?: string[];
}

const MOCK_PATIENTS: PatientSummary[] = [
  {
    id: 'pat_001',
    display_id: 'PATIENT_ANON001',
    name: 'Adult Community Case',
    last_document_date: '2024-03-20',
    risk_summary: {
      suicidality: 'Recent suicidal ideation mentioned without current plan.',
      self_harm_history: 'Self-harm episode in the last 12 months.',
    },
    medications: ['Sertraline 50mg daily', 'Quetiapine 25mg at night (stopped)'],
    triage_points: [
      'GP requesting medication review due to partial response.',
      'Function declining at work; still in employment.',
    ],
  },
  {
    id: 'pat_002',
    display_id: 'PATIENT_ANON002',
    name: 'Early Intervention Case',
    last_document_date: '2024-03-10',
    risk_summary: {
      safeguarding: 'Living with parents; some carer stress noted.',
    },
    medications: ['Olanzapine 10mg at night'],
    triage_points: ['Monitoring for relapse symptoms and adherence.'],
  },
];

export default function PatientsScreen() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(MOCK_PATIENTS[0]?.id ?? null);

  const selectedPatient = MOCK_PATIENTS.find((p) => p.id === selectedPatientId) ?? null;

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="people" size={50} color="#4A90E2" />
        <ThemedText type="title" style={styles.title}>Patients</ThemedText>
        <ThemedText style={styles.subtitle}>
          View anonymised patients and their latest AI-assisted summaries.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Patient list</ThemedText>
        <View style={styles.patientList}>
          {MOCK_PATIENTS.map((patient) => {
            const isSelected = patient.id === selectedPatientId;
            return (
              <TouchableOpacity
                key={patient.id}
                style={[styles.patientCard, isSelected && styles.patientCardSelected]}
                onPress={() => setSelectedPatientId(patient.id)}
              >
                <View style={styles.patientHeader}>
                  <View style={styles.patientInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.patientName}>
                      {patient.name}
                    </ThemedText>
                    <ThemedText style={styles.patientId}>{patient.display_id}</ThemedText>
                  </View>
                  <View style={styles.patientMeta}>
                    <Ionicons name="time" size={14} color="#6B7280" />
                    <ThemedText style={styles.metaText}>{patient.last_document_date}</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedPatient && (
          <ThemedView style={styles.dashboardCard}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Patient dashboard
            </ThemedText>
            <View style={styles.dashboardHeaderRow}>
              <View style={styles.dashboardHeaderLeft}>
                <ThemedText style={styles.dashboardPatientName}>{selectedPatient.name}</ThemedText>
                <ThemedText style={styles.dashboardPatientId}>{selectedPatient.display_id}</ThemedText>
              </View>
              <View style={styles.dashboardBadge}>
                <Ionicons name="document-text" size={14} color="#1D4ED8" />
                <ThemedText style={styles.dashboardBadgeText}>
                  Last doc: {selectedPatient.last_document_date}
                </ThemedText>
              </View>
            </View>

            {selectedPatient.risk_summary && (
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.sectionBlockTitle}>Risk & Safeguarding</ThemedText>
                {selectedPatient.risk_summary.suicidality && (
                  <View style={styles.rowItem}>
                    <Ionicons name="warning" size={18} color="#EF4444" />
                    <ThemedText style={styles.rowText}>
                      {selectedPatient.risk_summary.suicidality}
                    </ThemedText>
                  </View>
                )}
                {selectedPatient.risk_summary.self_harm_history && (
                  <View style={styles.rowItem}>
                    <Ionicons name="water" size={18} color="#F97316" />
                    <ThemedText style={styles.rowText}>
                      {selectedPatient.risk_summary.self_harm_history}
                    </ThemedText>
                  </View>
                )}
                {selectedPatient.risk_summary.safeguarding && (
                  <View style={styles.rowItem}>
                    <Ionicons name="people-circle" size={18} color="#F59E0B" />
                    <ThemedText style={styles.rowText}>
                      {selectedPatient.risk_summary.safeguarding}
                    </ThemedText>
                  </View>
                )}
              </View>
            )}

            {selectedPatient.medications && selectedPatient.medications.length > 0 && (
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.sectionBlockTitle}>Medication overview</ThemedText>
                {selectedPatient.medications.map((med, index) => (
                  <View key={index} style={styles.rowItem}>
                    <Ionicons name="medkit" size={18} color="#3B82F6" />
                    <ThemedText style={styles.rowText}>{med}</ThemedText>
                  </View>
                ))}
              </View>
            )}

            {selectedPatient.triage_points && selectedPatient.triage_points.length > 0 && (
              <View style={styles.sectionBlock}>
                <ThemedText style={styles.sectionBlockTitle}>Triage support</ThemedText>
                {selectedPatient.triage_points.map((point, index) => (
                  <View key={index} style={styles.rowItem}>
                    <Ionicons name="list-circle" size={18} color="#6366F1" />
                    <ThemedText style={styles.rowText}>{point}</ThemedText>
                  </View>
                ))}
                <ThemedText style={styles.triageDisclaimer}>
                  These points are generated to support, not replace, clinical judgement. Always
                  review original documents and apply local protocols.
                </ThemedText>
              </View>
            )}
          </ThemedView>
        )}
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
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
  },
  patientList: {
    marginBottom: 16,
    gap: 8,
  },
  patientCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  patientCardSelected: {
    borderColor: '#1D4ED8',
    backgroundColor: '#EFF6FF',
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
  },
  patientId: {
    marginTop: 2,
    fontSize: 12,
    opacity: 0.7,
  },
  patientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
  dashboardCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dashboardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardHeaderLeft: {
    flex: 1,
  },
  dashboardPatientName: {
    fontSize: 18,
    fontWeight: '600',
  },
  dashboardPatientId: {
    marginTop: 2,
    fontSize: 12,
    opacity: 0.7,
  },
  dashboardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EFF6FF',
  },
  dashboardBadgeText: {
    fontSize: 12,
    color: '#1D4ED8',
  },
  sectionBlock: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sectionBlockTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  rowText: {
    flex: 1,
    fontSize: 13,
  },
  triageDisclaimer: {
    marginTop: 8,
    fontSize: 11,
    opacity: 0.7,
  },
});
