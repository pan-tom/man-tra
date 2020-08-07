import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Board from './Board';
import Results from './Results';
import Sentence from './Sentence';
import styles from './Playground.styles';
import storage from '../../utilities/storage';

const defaultState = {
    currentIndex: 0,
    counterCycle: 0,
};

const Playground = ({ syllables }) => {

    const MAX_INDEX = syllables.length - 1;

    const [counters, setCounters] = useState(null);

    useEffect(() => {
        (async () => {
            const storedCounters = await storage.get('counters', defaultState);
            if(storedCounters) {
                storedCounters.currentIndex = 0;
                setCounters(storedCounters);
            }
        })();
    }, []);

    const incrementCurrentIndex = () => {
        setCounters(prevCounters => {
            const newCounters = {...prevCounters};
            if(prevCounters.currentIndex === MAX_INDEX) {
                newCounters.currentIndex = 0;
                newCounters.counterCycle ++;
            } else {
                newCounters.currentIndex ++;
            }
            storage.set('counters', newCounters);
            return newCounters;
        });
    }

    const render = () => (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                
                <Sentence
                    syllables={syllables}
                    currentIndex={counters.currentIndex}
                />

            </View>
            <View style={styles.contentBox}>
                
                <Board
                    syllables={syllables}
                    currentIndex={counters.currentIndex}
                    counterCycle={counters.counterCycle}
                    incrementCurrentIndex={incrementCurrentIndex}
                />

            </View>
            <View style={styles.statusBar}>
                
                <Results counterCycle={counters.counterCycle} />

            </View>
        </View>
    )

    return counters !== null ? render() : null;

};

export default Playground;
