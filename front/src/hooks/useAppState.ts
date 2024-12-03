import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

// 사용자가 앱을 백그라운드 상태로 뒀다가 다시 접속 했을 때 앱이 활성화 되는 상태를 확인하는 훅
const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComback, setIsComback] = useState(false); // 사용자가 설정에서 권한허용을 하고 나서 앱으로 다시 돌아왔다는 상태 값

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {appStateVisible, isComback};
};

export default useAppState;
