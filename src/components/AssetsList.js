//@flow
import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import type {ASSET_TYPE} from '../models/AssetModel';

type AssetListProps = {
  assets?: [ASSET_TYPE],
  regularFont?: string,
  boldFont?: string,
  onPressHandler: () => void,
  onRefreshData: () => void,
  containerStyle?: StyleSheet.Styles,
  text?: string,
};

export const AssetsList = (props: AssetListProps) => {
  const {
    assets,
    regularFont,
    boldFont,
    onPressHandler,
    containerStyle,
    text,
  } = props;

  const onPress = onPressHandler
    ? onPressHandler
    : () => console.log('onPressHandler not implemented');

  const keyExtractor = item => item.id;

  const Item = ({asset}) => (
    <View style={styles.item}>
      <Text style={styles.titleText}>{asset.key}</Text>
      <Text style={styles.titleText}>{asset.value}</Text>
      <Text style={styles.titleText}>{asset.diff}</Text>
      <Text style={styles.titleText}>{asset.status}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item asset={item} />;

  return (
    <View style={containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={assets}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#EDEEFF',
  },
  input: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: hp('3%'),
    fontFamily: 'AvenirNext-Bold',
    color: '#192965',
  },
  itemText: {
    fontSize: hp('2.2%'),
    fontFamily: 'AvenirNext-Bold',
    color: '#192965',
  },
  itemValue: {
    fontSize: hp('2%'),
    color: 'black',
  },
});
