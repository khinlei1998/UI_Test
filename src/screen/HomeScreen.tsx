import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PagerView from '../components/PagerView';
import { upcomingShows, data } from '../data';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

const numColumns = 4;
const horizontalMargin = 5;
const horizontalPadding = 16;
const availableWidth = width - 2 * horizontalPadding - 2 * horizontalMargin;
const itemWidth = availableWidth / numColumns;

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.notiIcon}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
        <Image source={require('../assets/image3.png')} style={styles.logo} />

        <TouchableOpacity style={styles.notiIcon}>
          <Image source={require('../assets/noti.png')} />
        </TouchableOpacity>
      </View>
      {/* content */}
      <ScrollView
        contentContainerStyle={styles.bottomContainer}
        showsHorizontalScrollIndicator={false}
      >
        <PagerView />

        {/* Category */}
        <View style={{ padding: horizontalPadding }}>
          <View style={styles.categoryContainer}>
            {data.map(item => (
              <View key={item.id} style={styles.categoryItem}>
                <View style={styles.categoryImgContainer}>
                  <Image source={item.icon} style={styles.categoryImg} />
                </View>
                <Text style={styles.categoryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ticketContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.ticketTitle}>My e-tickets</Text>
              <Image source={require('../assets/7.png')} />
            </View>
            <View style={styles.content}>
              <Text style={styles.cardText}>There aren't any yet.</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Retrieve here</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.ticketTitle}>Park hours</Text>
              <Image source={require('../assets/8.png')} />
            </View>
            <View style={styles.content}>
              <Text style={styles.dateTime}>Today, 13 Feb</Text>
              <Text style={styles.dateTime}>10am - 5pm</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Plan my visit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Upcoming Shows */}
        <View style={styles.upcomingShowContainter}>
          <Text style={styles.upcomingTitle}>Upcoming Shows</Text>
          <Text style={styles.viewAllTitle}>View All</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.upcomingSubContainer}
        >
          {upcomingShows.map(show => (
            <TouchableOpacity
              key={show.id}
              style={styles.upconingItem}
              onPress={() => navigation.navigate('Details')}
            >
              <View style={styles.bottomContainer}>
                <Image source={show.image} style={styles.upcomingImg} />

                <View style={styles.upcomingImgCover} />

                <Text style={styles.upcomingLabel}>
                  Dive Feeding @ Shipwreck
                </Text>

                <View style={styles.upcomingTime}>
                  <Icon name="clockcircleo" size={15} />

                  <Text style={styles.showTime}>{show.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    width: '48%',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notiIcon: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'space-between',
  },
  ticketTitle: {
    fontWeight: '500',
    color: '#909090',
  },
  cardText: {
    fontSize: 18,
    color: '#BABABA',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonText: {
    color: '#D94830',
    fontSize: 15,
    fontWeight: '500',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    width: itemWidth,
  },
  categoryImgContainer: {
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  categoryImg: {
    width: 25,
    height: 25,
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  dateTime: {
    fontWeight: '500',
    color: '#333',
    fontSize: 17,
  },
  upcomingShowContainter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#727272',
  },
  viewAllTitle: {
    color: '#D94830',
    fontSize: 15,
  },
  upcomingSubContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginHorizontal: 20,
    marginTop: 10,
  },
  upconingItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 8,
    width: 250,
    elevation: 3,
    height: 200,
  },
  upcomingImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  upcomingImgCover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  upcomingLabel: {
    position: 'absolute',
    bottom: 40,
    color: 'white',
    fontSize: 17,
    left: 10,
  },
  upcomingTime: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  showTime: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    left: 2,
  },
  bottomContainer: {
    paddingBottom: 30,
  },
});
