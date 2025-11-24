import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface Medication {
  id: string;
  drug_name: string;
  dosage: string;
  start_date: string;
  end_date?: string;
  response: string;
  mental_status_changes: string[];
}

export default function MedicationsScreen() {
  const [medications] = useState<Medication[]>([
    {
      id: '1',
      drug_name: 'Sertraline',
      dosage: '50mg daily',
      start_date: '2024-01-15',
      response: 'Positive',
      mental_status_changes: ['Improved mood', 'Reduced anxiety'],
    },
    {
      id: '2',
      drug_name: 'Quetiapine',
      dosage: '25mg at night',
      start_date: '2024-02-01',
      end_date: '2024-03-15',
      response: 'Negative',
      mental_status_changes: ['Excessive sedation', 'Weight gain'],
    },
  ]);

  const getResponseColor = (response: string) => {
    switch (response) {
      case 'Positive':
        return '#4CAF50';
      case 'Negative':
        return '#F44336';
      default:
        return '#FFC107';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="medkit" size={50} color="#4A90E2" />
        <ThemedText type="title" style={styles.title}>Medication History</ThemedText>
        <ThemedText style={styles.subtitle}>
          Track medications and patient responses
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        {medications.map((med) => (
          <ThemedView key={med.id} style={styles.medicationCard}>
            <View style={styles.medicationHeader}>
              <View style={styles.medicationInfo}>
                <ThemedText type="subtitle" style={styles.drugName}>
                  {med.drug_name}
                </ThemedText>
                <ThemedText style={styles.dosage}>{med.dosage}</ThemedText>
              </View>
              <View
                style={[
                  styles.responseBadge,
                  { backgroundColor: getResponseColor(med.response) },
                ]}
              >
                <ThemedText style={styles.responseText}>{med.response}</ThemedText>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateItem}>
                <Ionicons name="calendar" size={16} color="#666" />
                <ThemedText style={styles.dateLabel}>Start:</ThemedText>
                <ThemedText style={styles.dateValue}>{med.start_date}</ThemedText>
              </View>
              {med.end_date && (
                <View style={styles.dateItem}>
                  <Ionicons name="calendar" size={16} color="#666" />
                  <ThemedText style={styles.dateLabel}>End:</ThemedText>
                  <ThemedText style={styles.dateValue}>{med.end_date}</ThemedText>
                </View>
              )}
              {!med.end_date && (
                <View style={styles.ongoingBadge}>
                  <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                </View>
              )}
            </View>

            <View style={styles.changesContainer}>
              <ThemedText style={styles.changesTitle}>Mental Status Changes:</ThemedText>
              {med.mental_status_changes.map((change, index) => (
                <View key={index} style={styles.changeItem}>
                  <Ionicons name="arrow-forward" size={14} color="#4A90E2" />
                  <ThemedText style={styles.changeText}>{change}</ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#4A90E2" />
          <ThemedText style={styles.addButtonText}>Add Medication Record</ThemedText>
        </TouchableOpacity>
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
  medicationCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  drugName: {
    fontSize: 20,
    fontWeight: '600',
  },
  dosage: {
    marginTop: 4,
    fontSize: 14,
    opacity: 0.7,
  },
  responseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  responseText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  ongoingBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ongoingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  changesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  changesTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  changeText: {
    fontSize: 13,
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
});
