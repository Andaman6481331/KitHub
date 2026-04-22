import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Package, TrendingDown, TrendingUp } from 'lucide-react-native';
// import { Button } from './components/ui/Button';

interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  status: 'low' | 'normal' | 'high';
  img_url: string;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/`)
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/`)
      .then((response) => response.json())
      .then((data) => {      
      const inventory: InventoryItem[] = data.items.map(
        ([id, sku, name, description, category, stock, img_url, price1, price2, price3, price4, price5]: any) => ({
          id,
          sku,
          name,
          description,
          category,
          stock,
          status: stock < 15 ? 'low' : 'normal',
          img_url,
          price1,
          price2,
          price3,
          price4,
          price5,
        })
      );
      setItems(inventory);
    })
    .catch(console.error);
  }, []);

  const filteredItems = items.filter(item =>
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
        description: item.description,
        category: item.category,
        currentStock: item.stock,
        minStock: 20,
        maxStock: 100,
        location: 'Aisle 3, Shelf B',
        lastRestocked: '2 days ago',
        image: `${process.env.EXPO_PUBLIC_API_URL}/images/${item.img_url}`,
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
        {/* <Package color="#6B5D4F" size={24} /> */}
        <Image 
          source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${item.img_url}` }}
          style={styles.itemImage}
          resizeMode="cover"
        />
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
    overflow: 'hidden', // Ensure image stays within bounds
  },
  itemImage: {
    width: '100%',
    height: '100%',
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
