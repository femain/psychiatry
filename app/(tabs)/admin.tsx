import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

interface Service {
  id: string;
  name: string;
  type?: 'cmht' | 'crisis_team' | 'liaison' | 'other';
}

interface AdminSummaryKpis {
  active_patients: number;
  analyses_last_30_days: number;
  patients_with_recent_risk_flags: number;
  analyses_with_missing_data: number;
}

interface AdminSummary {
  window: {
    from: string;
    to: string;
  };
  kpis: AdminSummaryKpis;
}

interface ServiceDashboardResponse {
  service: Service;
  summary: AdminSummary;
}

const CURRENT_SERVICE_ID = 'SERVICE_DEMO_001';

export default function AdminScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/services/${CURRENT_SERVICE_ID}/summary`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: ServiceDashboardResponse = await response.json();
        if (isMounted) {
          setServiceName(data.service.name);
          setSummary(data.summary);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load service summary.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const kpis: AdminSummaryKpis | null = summary?.kpis ?? null;

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="analytics" size={50} color="#4A90E2" />
        <ThemedText type="title" style={styles.title}>Service overview</ThemedText>
        <ThemedText style={styles.subtitle}>
          {serviceName
            ? `High-level view for ${serviceName}. Helps service leads and MDTs focus on workload, risk, and data quality.`
            : 'High-level view to help service leads and MDTs focus on workload, risk, and data quality.'}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        {loading && (
          <ThemedText style={styles.statusText}>Loading service summary…</ThemedText>
        )}
        {error && !loading && (
          <ThemedText style={styles.statusText}>{error}</ThemedText>
        )}

        {!loading && !error && kpis && (
          <>
            <View style={styles.kpiRow}>
              <ThemedView style={styles.kpiCard}>
                <ThemedText style={styles.kpiLabel}>Active patients (30 days)</ThemedText>
                <ThemedText type="title" style={styles.kpiValue}>{kpis.active_patients}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.kpiCard}>
                <ThemedText style={styles.kpiLabel}>Docs analysed (30 days)</ThemedText>
                <ThemedText type="title" style={styles.kpiValue}>{kpis.analyses_last_30_days}</ThemedText>
              </ThemedView>
            </View>

            <View style={styles.kpiRow}>
              <ThemedView style={styles.kpiCard}>
                <ThemedText style={styles.kpiLabel}>Patients with risk flags</ThemedText>
                <ThemedText type="title" style={styles.kpiValue}>{kpis.patients_with_recent_risk_flags}</ThemedText>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => router.push('/(tabs)/patients?filter=recentRisk')}
                >
                  <ThemedText style={styles.viewDetailsText}>View details</ThemedText>
                </TouchableOpacity>
              </ThemedView>
              <ThemedView style={styles.kpiCard}>
                <ThemedText style={styles.kpiLabel}>Analyses with missing data</ThemedText>
                <ThemedText type="title" style={styles.kpiValue}>{kpis.analyses_with_missing_data}</ThemedText>
              </ThemedView>
            </View>
          </>
        )}

        <ThemedView style={styles.sectionCard}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>How to use this view</ThemedText>
          <View style={styles.rowItem}>
            <Ionicons name="alert-circle" size={18} color="#F59E0B" />
            <ThemedText style={styles.rowText}>
              Use risk and missing data counts to prioritise case review, supervision, and governance
              discussions.
            </ThemedText>
          </View>
          <View style={styles.rowItem}>
            <Ionicons name="people" size={18} color="#3B82F6" />
            <ThemedText style={styles.rowText}>
              Combine this dashboard with MDT knowledge; it is designed to support, not replace,
              clinical and operational judgement.
            </ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.sectionCard}>
          <View style={styles.exportHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Exports & integrations</ThemedText>
          </View>
          <ThemedText style={styles.sectionBody}>
            In a full deployment this area will allow exporting anonymised CSV summaries and
            configuring integrations with EHRs and analytics platforms.
          </ThemedText>
          <TouchableOpacity style={styles.exportButton} disabled>
            <Ionicons name="download" size={20} color="#9CA3AF" />
            <ThemedText style={styles.exportButtonText}>Export CSV (coming soon)</ThemedText>
          </TouchableOpacity>
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
  statusText: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 12,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  kpiCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 22,
  },
  viewDetailsButton: {
    marginTop: 8,
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#2563EB',
  },
  sectionCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 12,
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
  exportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    backgroundColor: '#F3F4F6',
  },
  exportButtonText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
