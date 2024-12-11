//* 구글 맵 스타일 커스텀 방법
//* https://mapstyle.withgoogle.com 접속 (아니면 구글에 google map style검색)
//* 모달창이 나오는데 맨 아래 Use the legacy JSON styling wizard 클릭
//* 왼쪽 메뉴 하단에 MORE OPTIONS 클릭 후 커스텀 한 후 FINISH 클릭
//* COPY JSON으로 복사
//* 복사한 내용을 아래 코드 처럼 붙여넣기
//* MapView 컴포넌트에 customMapStyle 속성 추가 아래 mapStyle 넣으면 끝

const mapStyle = [
  {
    featureType: 'poi.attraction',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f8bef9',
      },
    ],
  },
];

export default mapStyle;
