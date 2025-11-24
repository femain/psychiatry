import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ContactScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Book a demo</ThemedText>
        <ThemedText style={styles.body}>
          This is a placeholder contact screen. Integrate your preferred booking or contact
          workflow here.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    gap: 12,
  },
  body: {
    fontSize: 14,
    opacity: 0.9,
  },
});
