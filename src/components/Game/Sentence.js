import React, { useState, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Text from '../common/Text';
import styles from './Sentence.styles';

const Sentence = ({ syllables, currentIndex }) => {

    const scrollViewRef = useRef();
    const [areaWidth, setAreaWidth] = useState(0);
    
    useEffect(() => {
        if(areaWidth > 0) {
            itemsRef[currentIndex].measure(x => {
                const threshold = areaWidth/2;
                const moveX = x > threshold ? x - threshold + 30 : 0;
                scrollViewRef.current.scrollTo({ x: moveX });
            });
        }
    }, [currentIndex]);

    const itemsRef = [];
    const onUpdateSize = event => {
        const width = event.nativeEvent.layout.width;
        setAreaWidth(width);
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            onLayout={onUpdateSize}
            horizontal
            centerContent
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {syllables.map((syllable, index) => {

                let finalStyles = [styles.text];
                finalStyles.push(
                    index === currentIndex ? styles.textCurrent : styles.textUndone
                );
                if(index <= currentIndex) {
                    finalStyles.push(styles.textDone);
                }

                return (
                    <Text
                        key={index}
                        ref={el => itemsRef[index] = el}
                        style={finalStyles}
                    >
                        {syllable}
                    </Text>
                )

            })}
        </ScrollView>
    )
};

export default Sentence;
