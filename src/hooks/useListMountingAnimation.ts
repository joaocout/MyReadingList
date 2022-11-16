import { useEffect } from "react";

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

const ANIMATION_CONFIG: WithTimingConfig = { duration: 200 };

// mounting animation on lists, animates opacity and y position
export function useListMountingAnimation(animate: boolean) {
  const opacitySV = useSharedValue(0.25);
  const yTranslationSV = useSharedValue(75);

  // we animate on the transition of the 'animate' parameter
  useEffect(() => {
    if (!animate) {
      opacitySV.value = withTiming(1, ANIMATION_CONFIG);
      yTranslationSV.value = withTiming(0, ANIMATION_CONFIG);
    } else {
      opacitySV.value = 0.25;
      yTranslationSV.value = 75;
    }
  }, [animate]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: yTranslationSV.value }],
    opacity: opacitySV.value,
  }));
}
