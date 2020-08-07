import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { View } from 'react-native';
import Ball from './Ball';
import styles from './Board.styles';
import boardMap from '../../utilities/boardMap';
import getRandomNumber from '../../utilities/getRandomNumber';

const MAX_BALLS = 10;

const Board = ({
    syllables,
    currentIndex,
    counterCycle,
    incrementCurrentIndex,
}) => {

    const initRef = useRef(true);
    const containerRef = useRef();
    const [items, setItems] = useState([]);
    const maxSyllables = Math.min(syllables.length, MAX_BALLS);

    useEffect(() => {
        containerRef.current.measure((x, y, width, height, px, py) => {
            boardMap.init(width, height, maxSyllables);
            (async () => {
                try {
                    for(let index = 0; index < maxSyllables; index++) {
                        addItem(
                            await boardMap.addItem(index)
                        );
                    }
                } catch(error) {
                    console.error(error);
                }
            })();
        })
    }, [])

    useEffect(() => {
        if(currentIndex > 0) {
            const randomly = currentIndex > syllables.length - maxSyllables;
            const newIndex = randomly
                ? getRandomNumber(0, syllables.length - 1)
                : currentIndex + maxSyllables - 1;
            (async () => {
                addItem(
                    await boardMap.addItem(newIndex)
                );
            })();
        }
    }, [currentIndex]);

    useEffect(() => {
        if(initRef.current) {
            initRef.current = false;
            return;
        }
        (async () => {
            // remove duplicated and redundancy
            let duplicates = [];
            items.forEach(item => {
                if(duplicates.includes(item.index) || item.index > maxSyllables - 1) {
                    removeItem(
                        boardMap.removeItem(item.id)
                    );
                } else {
                    duplicates.push(item.index);
                }
            })
            // add what is missing
            for(let index = 0; index < maxSyllables; index++) {
                if(!items.some(item => item.index === index)) {
                    addItem(
                        await boardMap.addItem(index)
                    );
                }
            }
        })();
    }, [counterCycle])

    const addItem = item => setItems(items => [...items, item]);
    const removeItem = id => setItems(items => items.filter(item => item.id !== id));

    const onBallPress = useCallback(item => {
        if(syllables[item.index] === syllables[currentIndex]) {
            removeItem(
                boardMap.removeItem(item.id)
            );
            incrementCurrentIndex();
        }
    }, [currentIndex]);

    return (
        <View
            ref={containerRef}
            style={styles.container}
        >
            {items.length > 0 && items.map(item => (
                <Ball
                    key={item.id}
                    syllable={syllables[item.index]}
                    style={item.style}
                    boardSize={boardMap.getSize()}
                    onPress={() => onBallPress(item)}
                />
            ))}
        </View>
    )
};

export default memo(Board, (prevProps, nextProps) => {
    return prevProps.currentIndex === nextProps.currentIndex
        && prevProps.counterCycle === nextProps.counterCycle;
});
