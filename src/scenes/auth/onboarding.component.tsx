/**
 * @format
 */
import React from 'react';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaLayout } from 'src/components/safe-area-layout.component';
import ContentView from 'src/layouts/auth/onboarding';

export const OnboardingScreen = ({ navigation }: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      edges={['right', 'left']}
    >
      <ContentView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
