import EncryptedStorage from 'react-native-encrypted-storage';

// 암호화된 스토리지에 데이터 저장
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data)); // 데이터 저장
};

// 암호화된 스토리지에서 데이터 가져오기
const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptedStorage.getItem(key); // 데이터 가져오기

  return storedData ? JSON.parse(storedData) : null; // 데이터가 있으면 파싱하여 반환, 없으면 null 반환
};

// 암호화된 스토리지에서 데이터 삭제
const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key); // 데이터 가져오기

  // 데이터가 있으면 삭제
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
