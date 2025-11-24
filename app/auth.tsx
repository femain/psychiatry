import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AuthScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Sign in / Sign up</ThemedText>
        <ThemedText style={styles.body}>
          This is a placeholder authentication screen. Connect your authentication flow here.
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
