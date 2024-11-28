import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignUp,
} from '../../api/auth';
import {
  UseQueryCustomOptions,
  UserMutationCustomOptions,
} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';
import {numbers, queryKeys, storageKeys} from '../../constants';

const useSignup = (mutationOptions?: UserMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignUp,
    ...mutationOptions, // 옵션으로 사용 (onSuccess, onError, onSettled 등)
  });
};

// v4 버전
// const useSignup = () => {
//   return useMutation(postSignUp, {
//     onSuccess: () => {},
//     onError: () => {},
//     onSettled: () => {},
//   });
// };

const useLogin = (mutationOptions?: UserMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    // 로그인 성공시
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    // 성공, 실패와 관련없이 무조건 실행
    // 로그인 한뒤에도 useGetRefreshToken 훅을 한번 호출해줘서 자동 갱신이 처음 로그인 했을때도 useGetRefreshToken 훅 안에 있는 옵션에 따라 로직이 동작하도록 해주기 위해서 설정
    onSettled: () => {
      // refetch할 쿼리키를 넣으면 해당 쿼리키에 해당하는 쿼리를 찾아서 refetch함
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      // 로그인 한 뒤에도 다시 남아있는 프로필 데이터도 벼경해야 할 수도 있기 때문에 query를 stale한 데이터로 만들기 위해서 useGetProfile 훅을 한번 무효화 해줌
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  // 액세스 토큰을 한번 받아와서 평생 쓰는게 아닌 보안상 짧게 유효시간을 가져가고 따로 저장소에 저장하지도 않음.
  // useQuery로 스테일하게 관리 (신선하지 않은 데이터로 취급되는 시간을 지정해줄 수 있음)
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 30분 - 3분 = 27분
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 시간 주기에 따라 refetch할 수 있는 옵션, 즉 27분마다 호출
    refetchOnReconnect: true, // 재연결시 재호출 (앱을 종료하지 않고 다른 작업을 했다가 다시 돌아와도 자동 갱신이 되게끔 설정)
    refetchIntervalInBackground: true, // 다시 연결되거나 백그라운드에서 refetch될 수 있도록 true로 설정
  });

  //* v5버전 부터는 useQuery에 onSuccess, onError, onSettled 옵션이 사라짐
  //* refreshToken 요청이 성공했을 때, 헤더의 액세스 토큰과 인크립트에 있는 refreshToken을 갱신
  //* 위 isSuccess, isError 상태를 이용하여 성공, 실패 처리를 하는 함수를 따로 만들어줌

  //* 성공 했을때 헤더와 인크립트에 있는 accessToken, refreshToken 갱신
  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [data, isSuccess]);

  //* 실패 했을때 헤더와 인크립트에 있는 accessToken, refreshToken 삭제
  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions) => {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
};

const useLogout = (mutationOptions?: UserMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    //* 로그아웃 성공시 헤더와 인크립트에 있는 accessToken, refreshToken 삭제
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    //* auth에 해당하는 쿼리들을 한번 무효화 시켜줌
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    // 옵션으로 enabled추가. enabled가 true일 때, 쿼리가 실행될 수 있도록 해주는 옵션. refreshTokenQuery이 성공했다면 프로필 쿼리도 가져오도록
    enabled: refreshTokenQuery.isSuccess,
  });

  // getProfileQuery가 성공하면 로그인이 됐다고 판단
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin(); // 로그인 뮤테이션
  const logoutMutation = useLogout(); // 로그아웃 뮤테이션

  return {
    signupMutation,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
    loginMutation,
    logoutMutation,
  };
};

export default useAuth;
