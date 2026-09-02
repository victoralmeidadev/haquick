import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

export default view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  initialSelection: process.env.EXPO_PUBLIC_STORY_KIND
    ? {
        kind: process.env.EXPO_PUBLIC_STORY_KIND,
        name: process.env.EXPO_PUBLIC_STORY_NAME ?? '',
      }
    : undefined,
});
