/**
 * @format
 */
import React from 'react';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import {
  BackHandler,
  NativeModules,
  StatusBarStyle
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, Provider } from 'react-redux';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { setLanguage, setThemeName } from 'src/actions/settings';
import { loadWallet } from 'src/actions/wallet';
import { AntDesignIconsPack } from 'src/app/ant-design-icons-pack';
import { AppLoading, Task } from 'src/app/app-loading.component';
import { AlertModal } from 'src/components/alert.component';
import { StatusBar } from 'src/components/status-bar.component';
import { TRANSLATIONS, I18nProvider } from 'src/i18n';
import { AppNavigator } from 'src/navigation/app.navigator';
import { RootState } from 'src/reducers';
import { configureStore } from 'src/store';
import { ThemeProvider } from 'src/theme';

const loadingTasks: Task[] = [
  async (dispatch: any, state: RootState) => {
    if (!state.settings.language) {
      const find = RNLocalize.findBestAvailableLanguage(Object.keys(TRANSLATIONS));
      const language = find?.languageTag || 'en-US';
      dispatch(setLanguage(language));
    }
    return null;
  },
  async (dispatch: any, state: RootState) => {
    if (!state.settings.themeName) {
      const colorScheme = Appearance.getColorScheme();
      dispatch(setThemeName((colorScheme === 'no-preference') ? 'light': colorScheme));
    }
    return null;
  },
  async (dispatch: any, state: RootState) => {
    await dispatch(loadWallet());
    return null;
  },
];

const App = (): React.ReactElement => {
  const language = useSelector((state: RootState) => state.settings.language!);
  const themeName = useSelector((state: RootState) => state.settings.themeName!);

  let barStyle: StatusBarStyle = 'light-content';
  if (themeName === 'light') {
    barStyle = 'dark-content';
  }
  
  React.useEffect(() => {
    // see also: @react-native-community/hooks
    const backAction = (): boolean => {
      NativeModules.SplashScreen.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AntDesignIconsPack]}/>
      <I18nProvider language={language}>
        <ThemeProvider themeName={themeName}>
          <SafeAreaProvider>
            <StatusBar translucent barStyle={barStyle}/>
            <AppNavigator/>
            <AlertModal/>
          </SafeAreaProvider>
        </ThemeProvider>
      </I18nProvider>
    </>
  );
};

const { store, persistor } = configureStore();

const Application = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppearanceProvider>
          <AppLoading tasks={loadingTasks}>
            {props => <App {...props}/>}
          </AppLoading>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};

export default Application;
