//@flow
import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import constants from '../helpers/Constants';
import {getRequestApiClient} from '../api/Gateway';
import moment from 'moment';
import _ from 'lodash';
let graphData = [];

const DetailChartScreen = props => {
  const requestInfoGraph = async () => {

    const endpoint =
      constants.api.GET_HISTORY +
      props.route.params.asset +
      constants.api.GET_HISTORY_PATH;

    const {data} = await getRequestApiClient(endpoint);
    console.log(data)
    if (data) {
      graphData = [];
      if (graphData.length < 6) {
        for (let i = 10; i < 21; i += 2) {
          let j = i;
          j += 2;

          let dateMin = moment
            .utc('2021-05-02T' + i.toString() + ':00:00.000Z')
            .toDate();
          let dateMax = moment
            .utc('2021-05-02T' + j.toString() + ':00:00.000Z')
            .toDate();

          let x = _.mean(
            data.data.map(i =>
              moment.utc(i.date).toDate() > dateMin &&
              moment(i.date).toDate() < dateMax
                ? parseFloat(i.priceUsd)
                : 0,
            ),
          );

          graphData.push(parseInt(x.toFixed(0)));
        }
        console.log(graphData);
      }
    }
  };

  useEffect(() => {
    requestInfoGraph();
  }, []);
  const data = {
    labels: ['10AM', '12PM', '14PM', '16PM', '18PM', '20PM'],
    datasets: [
      {
        //[4698, 4707, 4703, 4694, 4703, 4714]  data: graphData ? graphData : [20, 45, 28, 80, 99, 43],
        data: graphData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Average assets'], // optional
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>{props.route.params.asset}</Text>
      </View>

      <View style={styles.middleSection}>
        {graphData.length > 0 && (
          <LineChart
            data={data}
            width={400}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
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

export default DetailChartScreen;
