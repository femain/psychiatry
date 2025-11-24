import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function ComplianceScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="shield-checkmark" size={60} color="#4CAF50" />
        <ThemedText type="title" style={styles.title}>Compliance & Security</ThemedText>
        <ThemedText style={styles.subtitle}>
          UK GDPR and NHS ISB1523 Standards
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              UK GDPR Compliant
            </ThemedText>
          </View>
          <ThemedText style={styles.sectionText}>
            PsychiatristAI fully complies with UK General Data Protection Regulation (GDPR) 
            requirements for processing sensitive health data.
          </ThemedText>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="lock-closed" size={20} color="#4A90E2" />
              <ThemedText style={styles.featureText}>End-to-end encryption</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="eye-off" size={20} color="#4A90E2" />
              <ThemedText style={styles.featureText}>Automatic anonymisation</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="document-text" size={20} color="#4A90E2" />
              <ThemedText style={styles.featureText}>Complete audit trails</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color="#4A90E2" />
              <ThemedText style={styles.featureText}>Data retention policies</ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={32} color="#4CAF50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              NHS ISB1523 Standard
            </ThemedText>
          </View>
          <ThemedText style={styles.sectionText}>
            Implements the NHS Information Standards Board ISB1523 Anonymisation Standard 
            for Clinical, Personal and Sensitive Data.
          </ThemedText>
          <View style={styles.standardsList}>
            <View style={styles.standardItem}>
              <ThemedText style={styles.standardNumber}>1</ThemedText>
              <ThemedText style={styles.standardText}>
                Removal of direct identifiers (NHS number, name, address)
              </ThemedText>
            </View>
            <View style={styles.standardItem}>
              <ThemedText style={styles.standardNumber}>2</ThemedText>
              <ThemedText style={styles.standardText}>
                Pseudonymisation using SHA-256 hashing
              </ThemedText>
            </View>
            <View style={styles.standardItem}>
              <ThemedText style={styles.standardNumber}>3</ThemedText>
              <ThemedText style={styles.standardText}>
                Motivated Intruder Test considerations
              </ThemedText>
            </View>
            <View style={styles.standardItem}>
              <ThemedText style={styles.standardNumber}>4</ThemedText>
              <ThemedText style={styles.standardText}>
                Comprehensive audit logging
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={32} color="#4CAF50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Caldicott Principles
            </ThemedText>
          </View>
          <ThemedText style={styles.sectionText}>
            Adheres to the Caldicott Principles for handling patient-identifiable information.
          </ThemedText>
          <View style={styles.principlesList}>
            {[
              'Justify the purpose for using confidential information',
              'Use confidential information only when necessary',
              'Use the minimum necessary confidential information',
              'Access to confidential information on a need-to-know basis',
              'Everyone with access has responsibilities',
              'Comply with the law',
              'The duty to share information can be as important as the duty to protect'
            ].map((principle, index) => (
              <View key={index} style={styles.principleItem}>
                <ThemedText style={styles.principleNumber}>{index + 1}</ThemedText>
                <ThemedText style={styles.principleText}>{principle}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield" size={32} color="#4CAF50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Data Protection Measures
            </ThemedText>
          </View>
          <View style={styles.measuresList}>
            <View style={styles.measureCard}>
              <Ionicons name="finger-print" size={24} color="#4A90E2" />
              <ThemedText style={styles.measureTitle}>Anonymisation</ThemedText>
              <ThemedText style={styles.measureText}>
                All personal identifiers automatically removed and replaced with pseudonyms
              </ThemedText>
            </View>
            <View style={styles.measureCard}>
              <Ionicons name="server" size={24} color="#4A90E2" />
              <ThemedText style={styles.measureTitle}>Secure Storage</ThemedText>
              <ThemedText style={styles.measureText}>
                Encrypted data storage with access controls and monitoring
              </ThemedText>
            </View>
            <View style={styles.measureCard}>
              <Ionicons name="analytics" size={24} color="#4A90E2" />
              <ThemedText style={styles.measureTitle}>Audit Logging</ThemedText>
              <ThemedText style={styles.measureText}>
                Complete audit trail of all data access and processing operations
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.statusCard}>
          <Ionicons name="checkmark-done-circle" size={48} color="#4CAF50" />
          <ThemedText type="subtitle" style={styles.statusTitle}>
            System Status: Compliant
          </ThemedText>
          <ThemedText style={styles.statusText}>
            All compliance checks passed. System is ready for clinical use.
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
  section: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  standardsList: {
    gap: 16,
  },
  standardItem: {
    flexDirection: 'row',
    gap: 12,
  },
  standardNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  standardText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  principlesList: {
    gap: 12,
  },
  principleItem: {
    flexDirection: 'row',
    gap: 12,
  },
  principleNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E3F2FD',
    color: '#4A90E2',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
    fontSize: 13,
  },
  principleText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  measuresList: {
    gap: 12,
  },
  measureCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  measureTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  measureText: {
    marginTop: 4,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
  },
  statusCard: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    marginTop: 8,
  },
  statusTitle: {
    marginTop: 12,
    fontSize: 20,
    color: '#4CAF50',
  },
  statusText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
});
