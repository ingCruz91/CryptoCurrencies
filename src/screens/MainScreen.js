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
import _ from 'lodash';


const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const assetList = useSelector(state => state?.assetReducer.listOfAssets);

  const [enteredSearch, setEnteredSearch] = useState('');
  const [top20, setTop20] = useState([]);


  const handleReceive = received => {
  //  console.log(received);

    let cryptos = JSON.parse(received);
   // console.log({assetList});
    for (const key in cryptos) {
      if (cryptos.hasOwnProperty(key)) {
        // dispatch(
        //   actions.addAsset({
        //     key: key,
        //     value: cryptos[key],
        //   }),
        // );
        // dispatch(
        //   actions.updateAsset({
        //     key: key,
        //     value: cryptos[key],
        //   }),
        // );
    //    console.log({assetList});
      }
    }
  };

  const searchTop20 = {"swarm-city":"0.089573","utrust":"0.534260","you-coin":"0.089168","indorse-token":"0.026518","sfi":"1511.55","stealth":"0.202498",
    "lcx":"0.064706","hive-project":"0.029774","redfox-labs":"0.236222","arcblock":"0.233743","elysian":"0.006738","aidcoin":"0.132314","bzx-protocol":"0.823317",
    "refereum":"0.020133","yoyow":"0.034822","nft":"0.365104","yuan-chain-coin":"0.022436","the-abyss":"0.057315","dsla-protocol":"0.018131","chads-vc":"0.086557",
    "gamecredits":"0.287876","ultra":"0.594395","achain":"0.021810","ceek-vr":"0.006556","sirin-labs-token":"0.028576","defi-pulse-index":"564.73","kekcoin":"0.172232",
    "status":"0.175892","hempcoin":"0.023586","wings":"0.099864","enigma-project":"0.391189","jarvis-network":"0.164868","touchcon":"0.003354","fsw-token":"0.241195"
    ,"verify":"0.028788","amon":"0.007928","fantom":"0.805882","request-network":"0.149878","rlc":"3.04","all-sports":"0.023179","high-performance-blockchain":"0.370074",
    "qbao":"0.015851","yield-farming":"0.161588","lamden":"0.058961","libertas-token":"0.028542","fetch":"0.630853","cryptopay":"0.064747","smartcash":"0.017821"
    ,"harvest-finance":"178.15","gobyte":"0.082084","primas":"0.049793","buck-hath-coin":"0.083991","silk":"0.002024","nxt":"0.082121","bitgear":"0.046912"
    ,"loom-network":"0.156792","crypterium":"0.335732","opacity":"0.216023","coinfi":"0.009897","sphere":"0.371629","tribute":"0.479831","verge":"0.053710"
    ,"arcona":"0.137425","2key-network":"0.073167","baguette-token":"0.025151","sumokoin":"0.091538","yearn-finance":"49067.40","vericoin":"0.134615","civic":"0.527444"
    ,"essentia":"0.005524","gochain":"0.059467","syscoin":"0.490401","fintrux-network":"0.024895","swing":"0.109303","bns-token":"0.126739","oneledger":"0.021145","vechain":"0.215716"
    ,"community-token":"0.323139","pantos":"0.131983","matic-network":"0.784656","zero":"0.412397","monero":"422.50","nix":"0.343423","acoin":"0.029914","digitalnote":"0.005711"
    ,"dxdao":"291.23","trust":"0.017373","sonm":"0.172583","neumark":"0.245507","bitmark":"0.192166","testa":"0.397722","titan-coin":"0.005177","temco":"0.010930",
    "herocoin":"0.050662","lambda":"0.085393","bnktothefuture":"0.079000","rsk-infrastructure-framework":"0.342045","viberate":"0.146660","appcoins":"0.248502",
    "hydro-protocol":"0.022687","hedgetrade":"1.57","spaghetti":"0.230741","callisto-network":"0.014324","curecoin":"0.155715"}


  useEffect(() => {
    let arrTOp = [];

      for (const key in searchTop20) {
        if (searchTop20.hasOwnProperty(key)) {
        //  console.log(key)
         // console.log( searchTop20[key])
          arrTOp.push({key: key, value: searchTop20[key]});
        }
      }
    //  console.log(arrTOp)
   const orderC = arrTOp.sort((a, b) => b.value - a.value).slice(0, 20);

  //
    console.log(orderC)
  //   let topValues = arrTOp.sort((a, b) => b.value - a.value).slice(0, 5);
  //   console.log(topValues); // [789,689,98,65,33]
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
 // webSocket.close();

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
      {/*<View style={styles.headerView}>*/}
      {/*  <Text style={styles.headerText}>Asset Prices</Text>*/}
      {/*</View>*/}

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
    borderColor: 'black',
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
