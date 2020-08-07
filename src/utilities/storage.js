import AsyncStorage from '@react-native-community/async-storage';

export default (() => {

    const get = async (key, defaultValue=null) => {
        try {
            return JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
        } catch(error) {
            console.log(error);
            return defaultValue;
        }
    }

    const set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }

    return { set, get };

})();
