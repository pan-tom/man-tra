import React from 'react';
import { Text, View } from 'react-native';
import styles from './Results.styles';

const Results = ({ counterCycle }) => (

    <View style={styles.container}>
        <Text style={[styles.text, styles.textLeft]}>
            {counterCycle} <Text style={styles.textSmall}></Text>
        </Text>
    </View>
    
);

export default Results;
