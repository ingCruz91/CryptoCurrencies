//@flow
import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {AssetsList} from '../components/AssetsList';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../store/Actions';
import {ASSET_STATUS} from '../models/AssetModel';
import type {ASSET_TYPE} from '../models/AssetModel';
import getWebSocketInstance from '../api/WebSocket';
import assetReducer from '../store/AssetReducer';
import _ from 'lodash';
import constants from '../helpers/Constants';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const assetList = useSelector(state => state?.assetReducer.listOfAssets);
  const [enteredSearch, setEnteredSearch] = useState('');

  let currentRequest = null;
  const assetsReceivedList = [];
  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
   */
  const connectSocket = getAssets => {
    let webSocket = getWebSocketInstance(getAssets);
    // websocket onopen event listener
    webSocket.onopen = () => {
      currentRequest = getAssets;
    };

    // websocket onclose event listener
    webSocket.onclose = e => {
      if (currentRequest === constants.api.GET_ALL_ASSETS) {
        const top20AssetsList = assetsReceivedList
          .sort((a, b) => b.value - a.value)
          .slice(0, 20);
        console.log(top20AssetsList);
        addAssets(top20AssetsList);
        const assetKeys = _.map(top20AssetsList, 'key').toString();
        console.log(assetKeys);
        setTimeout(() => {
          connectSocket(assetKeys);
        }, 4000);
      } else {
        check(webSocket);
      }
    };
    webSocket.onmessage = e => {
      handleReceive(e.data);
    };

    // websocket onerror event listener
    webSocket.onerror = err => {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket',
      );
      webSocket.close();
    };

    setTimeout(() => {
      if (currentRequest === constants.api.GET_ALL_ASSETS) {
        webSocket.close();
      }
    }, 5000);
  };
  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  const check = ws => {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      connectSocket(currentRequest);
    } //check if websocket instance is closed, if so call `connectSocket` function.
  };
  //function to dispatch top20 list sorted
  const addAssets = top20AssetsList => {
    for (const key in top20AssetsList) {
      if (top20AssetsList.hasOwnProperty(key)) {
        dispatch(
          actions.addAsset({
            id: key,
            key: top20AssetsList[key].key,
            value: top20AssetsList[key].value,
            diff: 0,
            status: ASSET_STATUS.DOWN,
          }),
        );
      }
    }
  };
  const getTop20Assets = received => {

    for (const key in received) {
      if (received.hasOwnProperty(key)) {
        const repeatedAsset = _.find(assetsReceivedList, {key: key});

        if (!repeatedAsset) {
          assetsReceivedList.push({
            key: key,
            value: parseFloat(received[key]),
          });
        } else if (
          repeatedAsset &&
          parseFloat(received[key]) > parseFloat(repeatedAsset?.value)
        ) {
          assetsReceivedList[key] = {
            key: key,
            value: parseFloat(received[key]),
          };
        }
      }
    }
  };
  const updateAssets = received => {
    for (const key in received) {
      if (received.hasOwnProperty(key)) {
        dispatch(
          actions.updateAsset({
            key: key,
            value: received[key],
          }),
        );
      }
    }
  };

  const handleReceive = received => {
   // console.log(received);
   // console.log(currentRequest)
    let receivedAssets = JSON.parse(received);

    if (currentRequest === constants.api.GET_ALL_ASSETS) {
      getTop20Assets(receivedAssets);
    } else {
      updateAssets(receivedAssets);
    }
  };

  useEffect(() => {
    connectSocket(constants.api.GET_ALL_ASSETS);
  }, []);

  const getAssetsByFilter = () => {
    return enteredSearch
      ? assetList.filter(asset =>
          asset.key.toLowerCase().includes(enteredSearch.toLowerCase()),
        )
      : assetList;
  };

  const assetInputHandler = enteredText => {
    setEnteredSearch(enteredText);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        onPressHandler={() => navigation.navigate('Details')}
      />
      <View style={styles.footerSection} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  headerSection: {flex: 0.7, backgroundColor: 'white'},
  middleSection: {flex: 5, backgroundColor: '#CAE1F9'},
  footerSection: {
    flex: 0.4,
    backgroundColor: 'white',
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
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 12,
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
    flex: 0.1,
    fontSize: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    height: hp('16%'),
    textAlign: 'center',
    fontSize: hp('5.5%'),
    color: 'red',
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
