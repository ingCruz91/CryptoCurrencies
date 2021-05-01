//@flow
import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {AssetsList} from '../components/AssetsList';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../store/Actions';
import {ASSET_STATUS_STATUS} from '../models/AssetModel';
import type {ASSET_TYPE_TYPE} from '../models/AssetModel';
import webSocket from '../api/WebSocket';
import assetReducer from '../store/AssetReducer';


const MainScreen = () => {
  const dispatch = useDispatch();
  const assetList = useSelector(state => state?.assetReducer.listOfAssets);

  const [enteredSearch, setEnteredSearch] = useState('');

  const handleReceive = received => {
    console.log(received);

    let cryptos = JSON.parse(received);
    console.log({assetList});
    for (const key in cryptos) {
      if (cryptos.hasOwnProperty(key)) {
        // dispatch(
        //   actions.addAsset({
        //     key: key,
        //     value: cryptos[key],
        //   }),
        // );
        dispatch(
          actions.updateAsset({
            key: key,
            value: cryptos[key],
          }),
        );
        console.log({assetList});
      }
    }
  };
  useEffect(() => {

    webSocket.onopen = () => {
      console.log('Websocket opened.');
    };
    webSocket.onmessage = e => {
      // console.log(`Received: ${e.data}`);
      handleReceive(e.data);
    };

    webSocket.onerror = e => {
      console.log(`Error: ${e.message}`);
    };

    webSocket.onclose = e => {
      console.log(e.code, e.reason);
    };
  }, []);

  const getAssetsByFilter = () => {
    return enteredSearch
      ? assetList.filter(asset =>
          asset.key.toLowerCase().includes(enteredSearch.toLowerCase()),
        )
      : assetList;
  };

  const testFunction = () => {
    console.log('FUNCTION PASSED');
  };
  const assetInputHandler = enteredText => {
    setEnteredSearch(enteredText);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Asset Prices</Text>
      </View>

      <View style={styles.headerSection}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Company to search"
            onChangeText={assetInputHandler}
            value={enteredSearch}
            style={styles.input}
            maxLength={20}
          />
        </View>
      </View>

      <AssetsList
        containerStyle={styles.middleSection}
        assets={getAssetsByFilter()}
        onPressHandler={() => testFunction()}
      />
      <View style={styles.footerSection} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#EDEEFF',
  },
  headerSection: {flex: 1.5, backgroundColor: '#EDEEFF'},
  middleSection: {flex: 5, backgroundColor: '#CCCCFF'},
  footerSection: {
    flex: 0.7,
    backgroundColor: '#EDEEFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },

  item: {
    backgroundColor: 'white',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    flex: 0.2,
    fontSize: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    height: hp('16%'),
    textAlign: 'center',
    fontSize: hp('5.5%'),
    color: '#9900CC',
    fontFamily: 'AvenirNext-Bold',
    lineHeight: hp('6.5%'),
    marginTop: 40,
  },
  textInput: {
    height: 40,
    minWidth: 50,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default MainScreen;
