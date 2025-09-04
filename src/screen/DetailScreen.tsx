import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import PagerView from '../components/PagerView';
export default function DetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bgContainer}>
        <View style={styles.pagerViewContiner}>
          <PagerView isDetailScreen={true} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.zoneText}>ZONE 1</Text>
        <Text style={styles.title}>Alligator Gar</Text>
        <View style={styles.btnDistance}>
          <Text style={styles.meterTitle}>410m away</Text>
          <Text style={styles.mapTitle}>Map</Text>
        </View>

        <Text style={styles.description}>
          With its wide, alligator-like snout and razor-sharp teeth, it's easy
          to see how this fish acquired its name. Despite its ferocious
          appearance, the alligator gar poses little threat to human beings.
          They prefer to lie and wait for unsuspecting prey within reach, before
          lunging forward to grab their prey.
        </Text>
        <Text style={styles.additionalInfo}>
          As the largest species in the gar family, the alligator gar can reach
          up to 3 metres in length. Scientists have traced this species in
          fossil records dating back to 100 million years ago, hence they are
          also known as living fossils!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgContainer: {
    position: 'relative',
    height: 280,
    backgroundColor: '#0F2331',
  },
  infoContainer: {
    padding: 16,
    marginTop: 20,
  },
  zoneText: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    color: '#444444',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    marginTop: 15,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#333',
  },
  pagerViewContiner: {
    marginTop: 50,
  },
  btnDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginTop: 15,
    borderColor: '#878686',
  },
  meterTitle: {
    marginRight: 10,
  },
  mapTitle: {
    color: '#D94830',
  },
});
