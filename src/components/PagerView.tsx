import React, { memo, useCallback, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import { sample_data } from '../data';
import { useFocusEffect } from '@react-navigation/native';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const { width, height } = Dimensions.get('window');

const DOT_SIZE = 30;

const Pagination = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
  isDetailScreen,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
  isDetailScreen: boolean;
}) => {
  const inputRange = [0, sample_data.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, sample_data.length * DOT_SIZE],
  });
  return (
    <View
      style={[
        styles.pagination,
        styles.detailPagination,
        isDetailScreen && {
          ...styles.pagination,
          ...styles.detailPositionStyle,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            transform: [{ translateX: translateX }],
          },
        ]}
      />
      {sample_data.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View style={[styles.paginationDot]} />
          </View>
        );
      })}
    </View>
  );
};

function PagerViewScreen({
  isDetailScreen = false,
}: {
  isDetailScreen?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
    [],
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const interval = setInterval(() => {
  //       setCurrentPage(prev => {
  //         const nextPage = (prev + 1) % sample_data.length;
  //         ref.current?.setPage(nextPage);
  //         return nextPage;
  //       });
  //       return () => clearInterval(interval);
  //     }, 2000);
  //   }, []),
  // );

  return (
    <View testID="safe-area-view" style={styles.container}>
      <AnimatedPagerView
        testID="pager-view"
        initialPage={0}
        ref={ref}
        style={isDetailScreen ? styles.detailPagerView : styles.PagerView}
        onPageScroll={onPageScroll}
      >
        {sample_data.map(item => (
          <View
            testID={`pager-view-data-${item}`}
            key={item.key}
            style={styles.imageView}
          >
            <Image
              style={[styles.image, isDetailScreen && styles.detailImage]}
              source={item.image}
            />
            {isDetailScreen && (
              <View style={styles.btnCancel}>
                <Image
                  style={styles.imgCancel}
                  source={require('../assets/cancel.png')}
                />
              </View>
            )}
            {!isDetailScreen && (
              <View style={styles.imgTitle}>
                <Text style={[styles.label, { fontSize: 20 }]}>
                  Don't Miss Our
                </Text>
                <Text style={[styles.label, { fontSize: 23 }]}>
                  daily Dive Feeding!
                </Text>
              </View>
            )}
          </View>
        ))}
      </AnimatedPagerView>
      <Pagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
        isDetailScreen={isDetailScreen}
      />
    </View>
  );
}

export default memo(PagerViewScreen);

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  PagerView: {
    height: height / 4,
  },
  detailPagerView: {
    height: height / 3,
  },

  imageView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailImage: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  detailPagination: {
    right: width / 3,
    bottom: 10,
  },
  paginationDot: {
    width: DOT_SIZE * 0.8,
    height: DOT_SIZE * 0.2,
    borderRadius: DOT_SIZE * 0.15,
    backgroundColor: '#fff',
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE / 2,
    height: DOT_SIZE / 5,
    top: 10,
    backgroundColor: 'red',
    zIndex: 1,
    borderRadius: 10,
    marginTop: 2,
  },
  btnCancel: {
    position: 'absolute',
    left: 10,
    top: 40,
  },
  imgCancel: {
    width: 30,
    height: 30,
  },
  imgTitle: {
    position: 'absolute',
    bottom: 60,
    left: 20,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
  detailPositionStyle: {
    left: 0,
    bottom: 20,
  },
});
