import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, TouchableOpacity } from 'react-native';
import Text from '../common/Text';
import styles from './Ball.styles';

const Ball = ({ syllable, style, boardSize, onPress }) => {

    const animatedStylesRef = useRef({
        translateX: new Animated.Value(
            style.left > boardSize.width / 2 ? boardSize.width + style.left*2 : -style.left*2
        ),
        translateY: new Animated.Value(
            style.top > boardSize.height / 2 ? boardSize.height + style.top*2 : -style.top*2
        ),
    });

    useEffect(() => {
        const useNativeDriver = Platform.OS !== 'web';
        Animated.parallel([
            Animated.timing(animatedStylesRef.current.translateX, {
                toValue: 0,
                duration: 750,
                easing: Easing.bezier(.76, 0, .24, 1),
                useNativeDriver,
            }),
            Animated.timing(animatedStylesRef.current.translateY, {
                toValue: 0,
                duration: 750,
                easing: Easing.bezier(.76, 0, .24, 1),
                useNativeDriver,
            }),
        ]).start();
    }, [])

    return (
        <Animated.View
            style={[styles.container, {
                ...style,
                transform: [
                    { translateX: animatedStylesRef.current.translateX },
                    { translateY: animatedStylesRef.current.translateY },
                ]
            }]}
        >
            <TouchableOpacity
                onPress={onPress}
                hitSlop={{
                    top: style.height,
                    bottom: style.height,
                    left: style.width,
                    right: style.width
                }}
            >
                <Text style={{fontSize: style.width / 3}}>
                    {syllable}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
};

export default Ball;
