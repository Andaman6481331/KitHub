import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, CheckCircle2 } from 'lucide-react-native';

interface HistoryUpdate {
  id: string;
  item: string;
  sku: string;
  adjustment: number;
  newStock: number;
  timestamp: string;
  user?: string;
}

export default function HistoryScreen() {
  const params = useLocalSearchParams<{ newUpdate?: string }>();
  let newUpdate: HistoryUpdate | undefined;

  if (params.newUpdate) {
    try {
      newUpdate = JSON.parse(params.newUpdate);
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Mock history data
  const mockHistory: HistoryUpdate[] = [
    ...(newUpdate ? [{
      id: 'new',
      ...newUpdate,
      user: 'You'
    }] : []),
    {
      id: '1',
      item: 'Organic Green Tea',
      sku: 'SKU-1923-MD',
      adjustment: -5,
      newStock: 32,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: 'Sarah M.'
    },
    {
      id: '2',
      item: 'Premium Honey',
      sku: 'SKU-3456-LG',
      adjustment: 12,
      newStock: 45,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: 'John D.'
    },
    {
      id: '3',
      item: 'Organic Coffee Beans',
      sku: 'SKU-2847-XL',
      adjustment: -8,
      newStock: 40,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: 'Mike R.'
    },
    {
      id: '4',
      item: 'Herbal Tea Mix',
      sku: 'SKU-5678-SM',
      adjustment: 20,
      newStock: 68,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: 'Emma L.'
    },
    {
      id: '5',
      item: 'Dark Chocolate Bar',
      sku: 'SKU-9012-MD',
      adjustment: -3,
      newStock: 15,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: 'Alex K.'
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const todayUpdates = mockHistory.filter(update => {
    const updateDate = new Date(update.timestamp);
    const today = new Date();
    return updateDate.toDateString() === today.toDateString();
  });

  const olderUpdates = mockHistory.filter(update => {
    const updateDate = new Date(update.timestamp);
    const today = new Date();
    return updateDate.toDateString() !== today.toDateString();
  });

  const renderHistoryCard = ({ item, isNew = false }: { item: HistoryUpdate; isNew?: boolean }) => {
    const isIncrease = item.adjustment > 0;

    return (
      <View
        style={[
          styles.historyCard,
          isNew && styles.historyCardNew,
        ]}
      >
        <View style={styles.cardContent}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: isIncrease ? 'rgba(107, 142, 111, 0.12)' : 'rgba(160, 82, 45, 0.12)' }
          ]}>
            {isIncrease ? (
              <TrendingUp color="#6B8E6F" size={24} />
            ) : (
              <TrendingDown color="#A0522D" size={24} />
            )}
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemName} numberOfLines={2}>{item.item}</Text>
              <Text style={[
                styles.adjustmentValue,
                { color: isIncrease ? '#6B8E6F' : '#A0522D' }
              ]}>
                {isIncrease ? '+' : ''}{item.adjustment}
              </Text>
            </View>

            <Text style={styles.skuText}>SKU: {item.sku}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.stockText}>
                New stock: {item.newStock} units
              </Text>
              <View style={styles.timeContainer}>
                <Clock color="#7A6F63" size={14} />
                <Text style={styles.timeText}>{formatTimestamp(item.timestamp)}</Text>
              </View>
            </View>

            {item.user && (
              <Text style={styles.userText}>Updated by {item.user}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderSection = ({ section }: { section: { title: string; data: HistoryUpdate[] } }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((item) => (
        <View key={item.id}>
          {renderHistoryCard({ item, isNew: item.id === 'new' })}
        </View>
      ))}
    </View>
  );

  const sections = [
    ...(todayUpdates.length > 0 ? [{ title: 'Today', data: todayUpdates }] : []),
    ...(olderUpdates.length > 0 ? [{ title: 'Earlier', data: olderUpdates }] : []),
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Update History</Text>
        <Text style={styles.headerCount}>{mockHistory.length} updates</Text>
      </View>

      {/* Success Message */}
      {newUpdate && (
        <View style={styles.successBanner}>
          <CheckCircle2 color="#6B8E6F" size={20} />
          <Text style={styles.successText}>Stock updated successfully</Text>
        </View>
      )}

      {/* Content */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#6B5D4F',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerCount: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(107, 142, 111, 0.12)',
    borderWidth: 2,
    borderColor: '#6B8E6F',
    borderRadius: 12,
  },
  successText: {
    fontSize: 14,
    color: '#3D3226',
  },
  listContent: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyCardNew: {
    borderColor: '#6B8E6F',
    backgroundColor: 'rgba(107, 142, 111, 0.03)',
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3226',
  },
  adjustmentValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  skuText: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 14,
    color: '#7A6F63',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#7A6F63',
  },
  userText: {
    fontSize: 12,
    color: '#9D8B73',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
