import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, Search, AlertTriangle, Clock, Package, LogOut } from 'lucide-react-native';
// import { Button } from '../components/ui/Button';

export default function HomeScreen() {
  const userName = 'Sarah Mitchell';
  const lowStockCount = 12;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.logoutButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.replace('/')}
            >
              <LogOut color="#FFFFFF" size={20} />
            </Pressable>
          </View>

          <View style={styles.statsCard}>
            <Package color="#FFFFFF" size={20} />
            <View style={styles.statsContent}>
              <Text style={styles.statsLabel}>Today's Updates</Text>
              <Text style={styles.statsValue}>24 items scanned</Text>
            </View>
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {/* Scan Item - Primary Action */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryAction,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/(tabs)/scan')}
          >
            <View style={styles.primaryIconContainer}>
              <Camera color="#FFFFFF" size={28} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.primaryActionTitle}>Scan Item</Text>
              <Text style={styles.primaryActionSubtitle}>Use camera to identify products</Text>
            </View>
          </Pressable>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryAction,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/search')}
            >
              <View style={styles.secondaryIconContainer}>
                <Search color="#6B5D4F" size={24} />
              </View>
              <Text style={styles.secondaryActionTitle}>Search</Text>
              <Text style={styles.secondaryActionSubtitle}>Find items</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryAction,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/(tabs)/history')}
            >
              <View style={styles.secondaryIconContainer}>
                <Clock color="#6B5D4F" size={24} />
              </View>
              <Text style={styles.secondaryActionTitle}>History</Text>
              <Text style={styles.secondaryActionSubtitle}>Recent updates</Text>
            </Pressable>
          </View>

          {/* Low Stock Alert */}
          <View style={styles.alertCard}>
            <View style={styles.alertIconContainer}>
              <AlertTriangle color="#FFFFFF" size={20} />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Low Stock Alert</Text>
              <Text style={styles.alertText}>
                {lowStockCount} items need restocking
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.alertButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.alertButtonText}>View Items</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6B5D4F',
    padding: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B7355',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoutButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#8B7355',
    borderRadius: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 16,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    backgroundColor: '#6B5D4F',
    borderRadius: 16,
    marginBottom: 16,
  },
  primaryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#8B7355',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    flex: 1,
  },
  primaryActionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  primaryActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  secondaryAction: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 16,
  },
  secondaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8DFD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secondaryActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 4,
  },
  secondaryActionSubtitle: {
    fontSize: 12,
    color: '#7A6F63',
  },
  alertCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: 'rgba(196, 160, 90, 0.12)',
    borderWidth: 2,
    borderColor: '#C4A05A',
    borderRadius: 16,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#C4A05A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 12,
  },
  alertButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#C4A05A',
    borderRadius: 6,
  },
  alertButtonText: {
    fontSize: 14,
    color: '#3D3226',
    fontWeight: '500',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
