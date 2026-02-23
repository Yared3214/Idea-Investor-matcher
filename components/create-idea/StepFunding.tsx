import { locations } from '@/lib/utils/location';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import StepHeader from './StepHeader';

interface Props {
  amount: string;
  selectedStage: string | null;
  selectedLocation: string;
  equityEnabled: boolean;
  setAmount: Dispatch<SetStateAction<string>>;
  setSelectedStage: Dispatch<SetStateAction<string | null>>;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  setEquityEnabled: Dispatch<SetStateAction<boolean>>;
}

export default function StepFunding({
  amount,
  selectedStage,
  selectedLocation,
  equityEnabled,
  setAmount,
  setSelectedStage,
  setSelectedLocation,
  setEquityEnabled
}: Props) {

  return (
    <View style={{marginBottom: 45}}>
        {/* Intro */}
          <StepHeader
            title="Funding & Location"
            subtitle="Help investors understand your financial needs and geography."
            />

    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Fundraising Amount */}
      <View>
        <Text style={styles.label}>How much are you raising?</Text>

        <View style={styles.amountWrapper}>
          <Text style={styles.dollar}>$</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#D1D5DB"
            value={amount}
            onChangeText={setAmount}
            style={styles.amountInput}
          />
        </View>

        <View style={styles.amountFooter}>
          <Text style={styles.helperText}>
            Target raise amount in USD
          </Text>

          <View style={styles.stageRow}>
            {['Pre-Seed', 'Seed'].map((stage) => (
              <Pressable
                key={stage}
                onPress={() => setSelectedStage(stage)}
                style={[
                  styles.stageChip,
                  selectedStage === stage && styles.stageChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.stageText,
                    selectedStage === stage && styles.stageTextActive,
                  ]}
                >
                  {stage}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Location Selector */}
      <View>
        <Text style={styles.label}>Location</Text>

        <View style={styles.locationCard}>
          <View style={styles.searchBar}>
            <Feather name="search" size={16} color="#9CA3AF" />
            <TextInput
              placeholder="Search country or city..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          {locations.map((loc) => {
            const selected = selectedLocation === loc.name;

            return (
              <Pressable
                key={loc.name}
                onPress={() => setSelectedLocation(loc.name)}
                style={[
                  styles.locationItem,
                  selected && styles.locationSelected,
                ]}
              >
                <View style={styles.locationLeft}>
                  <Image
                    source={loc.flag}
                    style={styles.flag}
                  />
                  <Text
                    style={[
                      styles.locationText,
                      selected && styles.locationTextSelected,
                    ]}
                  >
                    {loc.name}
                  </Text>
                </View>

                {selected && (
                  <Feather name="check" size={16} color="#4F46E5" />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Equity Toggle */}
      <View style={styles.equityCard}>
        <View style={styles.equityLeft}>
          <View style={styles.coinIcon}>
            <FontAwesome5 name="coins" size={18} color="#16A34A" />
          </View>

          <View>
            <Text style={styles.equityTitle}>Equity Offered</Text>
            <Text style={styles.equitySub}>
              Willing to negotiate
            </Text>
          </View>
        </View>

        <Switch
          value={equityEnabled}
          onValueChange={setEquityEnabled}
          trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
        />
      </View>
      <View style={{ height: 60 }} />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },

  amountWrapper: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 96,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  dollar: {
    position: 'absolute',
    left: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },

  amountInput: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    paddingLeft: 28,
  },

  amountFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  helperText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  stageRow: {
    flexDirection: 'row',
    gap: 8,
  },

  stageChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  stageChipActive: {
    backgroundColor: '#EEF2FF',
  },

  stageText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  stageTextActive: {
    color: '#4F46E5',
  },

  locationCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },

  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  locationSelected: {
    backgroundColor: '#EEF2FF',
  },

  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },

  locationText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  locationTextSelected: {
    color: '#4F46E5',
  },

  equityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  equityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  coinIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  equityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  equitySub: {
    fontSize: 12,
    color: '#6B7280',
  },
});