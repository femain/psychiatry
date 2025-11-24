import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="medical" size={60} color="#4A90E2" />
        <ThemedText type="title" style={styles.title}>PsychiatristAI</ThemedText>
        <ThemedText style={styles.subtitle}>
          AI-Powered Clinical Document Review
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.card}>
          <Ionicons name="document-text" size={40} color="#4A90E2" />
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Document Analysis
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Upload and analyze clinical mental health documents with AI-powered extraction
          </ThemedText>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/upload')}
          >
            <ThemedText style={styles.buttonText}>Upload Document</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.card}>
          <Ionicons name="medkit" size={40} color="#4A90E2" />
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Medication Tracking
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Extract medication history, dosages, and mental status changes
          </ThemedText>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/(tabs)/medications')}
          >
            <ThemedText style={styles.buttonText}>View Medications</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.card}>
          <Ionicons name="shield-checkmark" size={40} color="#4A90E2" />
          <ThemedText type="subtitle" style={styles.cardTitle}>
            GDPR Compliant
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Full anonymisation following UK GDPR and NHS ISB1523 standards
          </ThemedText>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/compliance')}
          >
            <ThemedText style={styles.buttonText}>Compliance Info</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.features}>
          <ThemedText type="subtitle" style={styles.featuresTitle}>
            Key Features
          </ThemedText>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.featureText}>Multi-format document support (PDF, JPG, DOC)</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.featureText}>Clinical NLP with Bio-BERT</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.featureText}>Automated medication extraction</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.featureText}>Mental status assessment</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <ThemedText style={styles.featureText}>Gap detection in clinical data</ThemedText>
          </View>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 20,
  },
  cardDescription: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  features: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
  },
  featuresTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
  },
});
