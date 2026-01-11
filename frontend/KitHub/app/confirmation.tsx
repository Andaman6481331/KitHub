import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle2, AlertCircle, Package } from 'lucide-react-native';

interface ConfirmationParams {
  sku: string;
  name: string;
  confidence: string;
  category: string;
}

export default function ConfirmationScreen() {
//   const params = useLocalSearchParams<ConfirmationParams>();
const params = useLocalSearchParams() as Partial<ConfirmationParams>;
  
  const {
    sku = 'SKU-2847-XL',
    name = 'Organic Coffee Beans',
    confidence: confidenceStr = '95',
    category = 'Beverages'
  } = params;

  const confidence = parseInt(confidenceStr);

  const getConfidenceColor = () => {
    if (confidence >= 90) return '#6B8E6F';
    if (confidence >= 70) return '#C4A05A';
    return '#A0522D';
  };

  const getConfidenceText = () => {
    if (confidence >= 90) return 'High Confidence';
    if (confidence >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const handleConfirm = () => {
    router.push({
      pathname: '/item-detail',
      params: {
        sku,
        name,
        category,
        currentStock: '48',
        minStock: '20',
        maxStock: '100',
        location: 'Aisle 3, Shelf B',
        lastRestocked: '2 days ago',
        image: 'https://images.unsplash.com/photo-1561766858-62033ae40ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGJhZ3xlbnwxfHx8fDE3NjgwNTE3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    });
  };

  const ConfidenceIcon = confidence >= 90 ? CheckCircle2 : AlertCircle;

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
        <Text style={styles.headerTitle}>Confirm Item</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Confidence Badge */}
        <View style={styles.badgeContainer}>
          <View style={[
            styles.confidenceBadge,
            {
              backgroundColor: `${getConfidenceColor()}20`,
              borderColor: getConfidenceColor(),
            }
          ]}>
            <ConfidenceIcon color={getConfidenceColor()} size={20} />
            <Text style={[styles.confidenceText, { color: getConfidenceColor() }]}>
              {getConfidenceText()} ({confidence}%)
            </Text>
          </View>
        </View>

        {/* Item Preview */}
        <View style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.iconContainer}>
              <Package color="#6B5D4F" size={40} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.detectedLabel}>Detected Item</Text>
              <Text style={styles.itemName}>{name}</Text>
              <Text style={styles.itemCategory}>Category: {category}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.skuSection}>
            <Text style={styles.skuLabel}>SKU Number</Text>
            <Text style={styles.skuValue}>{sku}</Text>
          </View>
        </View>

        {/* Confidence Explanation */}
        <View style={styles.explanationCard}>
          <Text style={styles.explanationText}>
            {confidence >= 90
              ? 'The system is highly confident this is the correct item. You can proceed with confidence.'
              : confidence >= 70
              ? 'The system found a likely match. Please verify the details before proceeding.'
              : 'The confidence is low. Please double-check the item or try scanning again.'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleConfirm}
          >
            <CheckCircle2 color="#FFFFFF" size={20} />
            <Text style={styles.confirmButtonText}>Confirm & Continue</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.scanAgainButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.scanAgainButtonText}>Scan Again</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.searchButtonText}>Search Manually Instead</Text>
          </Pressable>
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: 24,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  itemHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E8DFD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  detectedLabel: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 8,
  },
  itemCategory: {
    fontSize: 14,
    color: '#7A6F63',
  },
  divider: {
    height: 1,
    backgroundColor: '#D4C7B8',
    marginBottom: 16,
  },
  skuSection: {
    gap: 4,
  },
  skuLabel: {
    fontSize: 14,
    color: '#7A6F63',
  },
  skuValue: {
    fontSize: 18,
    fontFamily: 'monospace',
    color: '#3D3226',
  },
  explanationCard: {
    padding: 16,
    backgroundColor: '#E8DFD6',
    borderRadius: 12,
    marginBottom: 24,
  },
  explanationText: {
    fontSize: 14,
    color: '#3D3226',
    lineHeight: 20,
  },
  actions: {
    gap: 12,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    backgroundColor: '#6B5D4F',
    borderRadius: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scanAgainButton: {
    height: 56,
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3D3226',
  },
  searchButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#7A6F63',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
