import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Package, TrendingDown, TrendingUp } from 'lucide-react-native';
// import { Button } from './components/ui/Button';

interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: 'low' | 'normal' | 'high';
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock inventory data
  const inventory: InventoryItem[] = [
    { sku: 'SKU-2847-XL', name: 'Organic Coffee Beans', category: 'Beverages', stock: 48, status: 'normal' },
    { sku: 'SKU-1923-MD', name: 'Organic Green Tea', category: 'Beverages', stock: 12, status: 'low' },
    { sku: 'SKU-3456-LG', name: 'Premium Honey', category: 'Pantry', stock: 45, status: 'normal' },
    { sku: 'SKU-5678-SM', name: 'Herbal Tea Mix', category: 'Beverages', stock: 68, status: 'high' },
    { sku: 'SKU-9012-MD', name: 'Dark Chocolate Bar', category: 'Snacks', stock: 8, status: 'low' },
    { sku: 'SKU-7890-XL', name: 'Protein Powder', category: 'Supplements', stock: 28, status: 'normal' },
    { sku: 'SKU-4567-SM', name: 'Coconut Oil', category: 'Pantry', stock: 15, status: 'low' },
    { sku: 'SKU-8901-LG', name: 'Almond Butter', category: 'Pantry', stock: 52, status: 'normal' },
  ];

  const filteredItems = inventory.filter(item =>
    searchQuery.length === 0 ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectItem = (item: InventoryItem) => {
    router.push({
      pathname: '/item-detail',
      params: {
        sku: item.sku,
        name: item.name,
        category: item.category,
        currentStock: item.stock,
        minStock: 20,
        maxStock: 100,
        location: 'Aisle 3, Shelf B',
        lastRestocked: '2 days ago',
        image: 'https://images.unsplash.com/photo-1561766858-62033ae40ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGJhZ3xlbnwxfHx8fDE3NjgwNTE3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return '#A0522D';
      case 'high': return '#6B8E6F';
      default: return '#7A6F63';
    }
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <Pressable
      style={({ pressed }) => [
        styles.itemCard,
        pressed && styles.itemCardPressed,
      ]}
      onPress={() => handleSelectItem(item)}
    >
      <View style={styles.itemIconContainer}>
        <Package color="#6B5D4F" size={24} />
      </View>

      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          {item.status === 'low' && (
            <TrendingDown color="#A0522D" size={16} />
          )}
          {item.status === 'high' && (
            <TrendingUp color="#6B8E6F" size={16} />
          )}
        </View>

        <Text style={styles.itemCategory}>
          {item.category} • {item.sku}
        </Text>

        <View style={styles.itemFooter}>
          <View style={[
            styles.stockBadge,
            { backgroundColor: `${getStatusColor(item.status)}20` }
          ]}>
            <Text style={[styles.stockText, { color: getStatusColor(item.status) }]}>
              {item.stock} units
            </Text>
          </View>
          {item.status === 'low' && (
            <Text style={styles.lowStockText}>Low stock</Text>
          )}
        </View>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => {
    if (searchQuery.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Search color="#D4C7B8" size={48} />
          <Text style={styles.emptyText}>Start typing to search inventory</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyState}>
        <Search color="#D4C7B8" size={48} />
        <Text style={styles.emptyTitle}>No items found</Text>
        <Text style={styles.emptyText}>Try adjusting your search</Text>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Search Inventory</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#7A6F63" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, SKU, or category..."
            placeholderTextColor="#7A6F63"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {searchQuery.length > 0 && (
          <Text style={styles.resultsCount}>
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
          </Text>
        )}

        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.sku}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
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
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#E8DFD6',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#3D3226',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  resultsCount: {
    fontSize: 14,
    color: '#7A6F63',
    marginTop: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4C7B8',
    borderRadius: 12,
    marginBottom: 12,
  },
  itemCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E8DFD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3226',
  },
  itemCategory: {
    fontSize: 14,
    color: '#7A6F63',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  lowStockText: {
    fontSize: 12,
    color: '#A0522D',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3226',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#7A6F63',
    marginTop: 12,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
