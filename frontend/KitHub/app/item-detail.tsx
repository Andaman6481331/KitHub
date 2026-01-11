import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Plus, Minus, MapPin, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
// import { Button } from './components/ui/Button';

interface ItemDetailParams {
  sku: string;
  name: string;
  category: string;
  currentStock: string;
  minStock: string;
  maxStock: string;
  location: string;
  lastRestocked: string;
  image: string;
}

export default function ItemDetailScreen() {
const params = useLocalSearchParams() as Partial<ItemDetailParams>;

  
  const itemData = {
    sku: params.sku || 'SKU-2847-XL',
    name: params.name || 'Organic Coffee Beans',
    category: params.category || 'Beverages',
    currentStock: parseInt(params.currentStock || '48'),
    minStock: parseInt(params.minStock || '20'),
    maxStock: parseInt(params.maxStock || '100'),
    location: params.location || 'Aisle 3, Shelf B',
    lastRestocked: params.lastRestocked || '2 days ago',
    image: params.image || 'https://images.unsplash.com/photo-1561766858-62033ae40ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGJhZ3xlbnwxfHx8fDE3NjgwNTE3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const [stock, setStock] = useState(itemData.currentStock);
  const [adjustment, setAdjustment] = useState(0);

  const handleIncrease = () => {
    if (stock < itemData.maxStock) {
      setStock(stock + 1);
      setAdjustment(adjustment + 1);
    }
  };

  const handleDecrease = () => {
    if (stock > 0) {
      setStock(stock - 1);
      setAdjustment(adjustment - 1);
    }
  };

  const handleSave = () => {
    router.push({
      pathname: '/(tabs)/history',
      params: {
        newUpdate: JSON.stringify({
          item: itemData.name,
          sku: itemData.sku,
          adjustment,
          newStock: stock,
          timestamp: new Date().toISOString()
        })
      }
    });
  };

  const getStockStatus = () => {
    if (stock < itemData.minStock) return { text: 'Low Stock', color: '#A0522D', Icon: AlertTriangle };
    if (stock >= itemData.minStock && stock < itemData.maxStock * 0.7) return { text: 'Normal', color: '#6B8E6F', Icon: CheckCircle2 };
    return { text: 'Well Stocked', color: '#6B8E6F', Icon: CheckCircle2 };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.Icon;
  const stockPercentage = (stock / itemData.maxStock) * 100;

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
        <Text style={styles.headerTitle}>Item Details</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: itemData.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.content}>
          {/* Item Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <View style={styles.infoText}>
                <Text style={styles.itemName}>{itemData.name}</Text>
                <Text style={styles.itemSku}>SKU: {itemData.sku}</Text>
                <Text style={styles.itemCategory}>Category: {itemData.category}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: `${stockStatus.color}20`, borderColor: stockStatus.color }
              ]}>
                <StockIcon color={stockStatus.color} size={16} />
                <Text style={[styles.statusText, { color: stockStatus.color }]}>
                  {stockStatus.text}
                </Text>
              </View>
            </View>

            {/* Location & Last Restocked */}
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <MapPin color="#7A6F63" size={16} />
                <Text style={styles.metaText}>{itemData.location}</Text>
              </View>
              <View style={styles.metaItem}>
                <Clock color="#7A6F63" size={16} />
                <Text style={styles.metaText}>Restocked {itemData.lastRestocked}</Text>
              </View>
            </View>
          </View>

          {/* Current Stock */}
          <View style={styles.stockCard}>
            <View style={styles.stockHeader}>
              <View>
                <Text style={styles.stockLabel}>Current Stock Level</Text>
                <Text style={styles.stockValue}>{stock}</Text>
              </View>
              <View style={styles.stockLimits}>
                <Text style={styles.limitText}>Min: {itemData.minStock}</Text>
                <Text style={styles.limitText}>Max: {itemData.maxStock}</Text>
              </View>
            </View>

            {/* Stock Progress Bar */}
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(stockPercentage, 100)}%`,
                    backgroundColor: stockStatus.color
                  }
                ]}
              />
            </View>
          </View>

          {/* Stock Adjustment */}
          <View style={styles.adjustmentCard}>
            <Text style={styles.adjustmentLabel}>Adjust Stock Level</Text>

            <View style={styles.adjustmentControls}>
              <Pressable
                style={({ pressed }) => [
                  styles.adjustButton,
                  styles.decreaseButton,
                  stock <= 0 && styles.adjustButtonDisabled,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleDecrease}
                disabled={stock <= 0}
              >
                <Minus color="#FFFFFF" size={24} />
              </Pressable>

              <View style={styles.stockDisplay}>
                {adjustment !== 0 && (
                  <Text style={[
                    styles.adjustmentValue,
                    { color: adjustment > 0 ? '#6B8E6F' : '#A0522D' }
                  ]}>
                    {adjustment > 0 ? '+' : ''}{adjustment}
                  </Text>
                )}
                <Text style={styles.currentStock}>{stock}</Text>
                <Text style={styles.unitsLabel}>units</Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.adjustButton,
                  styles.increaseButton,
                  stock >= itemData.maxStock && styles.adjustButtonDisabled,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleIncrease}
                disabled={stock >= itemData.maxStock}
              >
                <Plus color="#FFFFFF" size={24} />
              </Pressable>
            </View>

            {adjustment !== 0 && (
              <Text style={styles.adjustmentText}>
                {adjustment > 0 ? 'Adding' : 'Removing'} {Math.abs(adjustment)} unit{Math.abs(adjustment) !== 1 ? 's' : ''}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                adjustment === 0 && styles.saveButtonDisabled,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSave}
              disabled={adjustment === 0}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 256,
    backgroundColor: '#E0E0E0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    flex: 1,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3D3226',
    marginBottom: 8,
  },
  itemSku: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#7A6F63',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#7A6F63',
  },
  stockCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  stockLabel: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 36,
    fontWeight: '600',
    color: '#3D3226',
  },
  stockLimits: {
    alignItems: 'flex-end',
  },
  limitText: {
    fontSize: 14,
    color: '#7A6F63',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E8DFD6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  adjustmentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  adjustmentLabel: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 16,
  },
  adjustmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  adjustButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decreaseButton: {
    backgroundColor: '#A0522D',
  },
  increaseButton: {
    backgroundColor: '#6B8E6F',
  },
  adjustButtonDisabled: {
    opacity: 0.4,
  },
  stockDisplay: {
    alignItems: 'center',
    minWidth: 96,
  },
  adjustmentValue: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  currentStock: {
    fontSize: 30,
    fontWeight: '600',
    color: '#3D3226',
  },
  unitsLabel: {
    fontSize: 12,
    color: '#7A6F63',
  },
  adjustmentText: {
    fontSize: 14,
    color: '#7A6F63',
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    paddingBottom: 32,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#6B5D4F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    height: 48,
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3D3226',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
