import { Dimensions, Platform } from 'react-native';

const SE_WIDTH = 320;
const SE_HEIGHT = 568;

export const isIPhoneSe = () => {
    const { width, height } = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        (width === SE_WIDTH && height === SE_HEIGHT)
    );
};

