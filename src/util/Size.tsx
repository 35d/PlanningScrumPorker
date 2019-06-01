import { Dimensions } from 'react-native';

interface Size {
  drawerWidth: number;
}

export const Size: Size = {
  drawerWidth: Dimensions.get('window').width - 54,
};
