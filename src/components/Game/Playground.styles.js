import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    titleBar: {
        flexGrow: 0,
        flexShrink: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        padding: 10,
        textAlign: 'center',
    },
    contentBox: {
        flexGrow: 1,
        flexShrink: 0,
    },
    statusBar: {
        flexGrow: 0,
        flexShrink: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
});
