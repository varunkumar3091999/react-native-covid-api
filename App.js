/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Picker,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {Picker} from '@react-native-picker/picker';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [states, setStates] = useState([]);
  const [currentStateData, setCurrentStateData] = useState();
  const [selectedState, setSelectedState] = useState("Total");

  useEffect(() => {
    if (states.length === 0) {
      fetch('https://api.covid19india.org/data.json')
        .then(res => res.json())
        .then(data => setStates([...data['statewise']]))
        .catch(err => console.log(err));
    }

    if (selectedState === "Total" && states.length !== 0) {
      setCurrentStateData(states[0]);
    } else {
      const currentStateData = states.find(stateValue => {
        return stateValue.state === selectedState;
      });

      setCurrentStateData(currentStateData);
    }
  }, [selectedState]);

  return (
    <View>
      <View style={styles.upperHalf}>
        <Text style={styles.heading}>Covid 19 metrics</Text>
        <Text style={styles.countryName}>India</Text>
        <View style={styles.flex}>
          <Text style={styles.label}>State: </Text>
          <Picker
            onValueChange={(itemValue, itemIndex) =>
              setSelectedState(itemValue)
            }
            // selectedValue={states[0]?.state}
            style={styles.picker}>
            {states.map(stateData => (
              <Picker.Item
                key={stateData['state']}
                label={stateData['state']}
                value={stateData['state']}
              />
            ))}
          </Picker>
        </View>
      </View>

      {currentStateData && (
        <View style={styles.lowerHalf}>
          <View style={styles.flex}>
            <Text style={styles.label}>Confirmed:</Text>
            <Text>{currentStateData['confirmed']}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Active:</Text>
            <Text>{currentStateData['active']}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Recovered:</Text>
            <Text>{currentStateData['recovered']}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Deaths:</Text>
            <Text>{currentStateData['deaths']}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  upperHalf: {
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 60,
    backgroundColor: 'grey',
  },
  heading: {
    marginHorizontal: 50,
    fontSize: 24,
    fontWeight: '600',
  },
  countryName: {
    marginHorizontal: 125,
    marginVertical: 50,
    fontSize: 18,
    fontWeight: '400',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    fontSize:36,
  },
  picker: {
    width: 150,
  },
  label: {
    width: 150,
    marginTop: 7,
  },

  lowerHalf: {
    paddingHorizontal: 55,
    paddingBottom: 230,
    paddingTop: 40,
  },
});

export default App;
