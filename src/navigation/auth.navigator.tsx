/**
 * @format
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RootState } from 'src/reducers';
import { ChoosePasswordScreen } from 'src/scenes/auth/choose-password.component';
import { ImportFromSeedScreen } from 'src/scenes/auth/import-from-seed.component'
import { OnboardingCarouselScreen } from 'src/scenes/auth/onboarding-carousel.component';
import { OnboardingScreen } from 'src/scenes/auth/onboarding.component';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  const firstRun = useSelector((state: RootState) => state.settings.firstRun);

  return firstRun ? (
    <OnboardingCarouselScreen/>
  ) : (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <Stack.Screen name='Onboarding' component={OnboardingScreen}/>
      <Stack.Screen name='ImportFromSeed' component={ImportFromSeedScreen}/>
      <Stack.Screen name='ChoosePassword' component={ChoosePasswordScreen}/>
    </Stack.Navigator>
  );
};