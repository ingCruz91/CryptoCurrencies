//@flow
import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const DetailChartScreen = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text>Bezier Line Chart</Text>
      </View>

      <View style={styles.middleSection}>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={data}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />
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
