import React, { forwardRef } from 'react';
import { Text } from 'react-native';

export default forwardRef(({ style, children, ...props }, ref) => (
    <Text ref={ref} style={[style, {fontFamily: 'Quicksand'}]} {...props}>{children}</Text>
));
