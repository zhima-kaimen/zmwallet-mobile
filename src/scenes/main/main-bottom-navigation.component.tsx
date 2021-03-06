/**
 * @format
 */
import React from 'react';
import {
  BottomTabBarProps
} from '@react-navigation/bottom-tabs';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { BrandBottomNavigation } from 'src/components/brand-bottom-navigation.component';
import { BrowserIcon, MarketIcon, WalletIcon } from 'src/components/icons';
import { useI18n } from 'src/i18n';

export const MainBottomNavigation = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps): React.ReactElement | null => {
  const i18n = useI18n();
  const options = descriptors[state.routes[state.index].key].options;

  const onSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  if (options.tabBarVisible === false) {
    return null;
  }

  return (
    <>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={state.index}
        onSelect={onSelect}
      >
        <BottomNavigationTab
          title={i18n.t('bottom_tab_bar.wallet')}
          icon={WalletIcon}
        />
        <BottomNavigationTab
          title={i18n.t('bottom_tab_bar.market')}
          icon={MarketIcon}
        />
        <BottomNavigationTab
          title={i18n.t('bottom_tab_bar.browser')}
          icon={BrowserIcon}
        />
      </BrandBottomNavigation>
    </>
  );
};
