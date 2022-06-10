import { createAction } from "redux-actions";
import axios from 'axios';

export const setCards = createAction('[Cards] setCard')

export function getCards(req) {
  console.log(req);
  return async function (dispatch) {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch(setCards([
        {
          "reqNumber": "54771000173",
          "reqRoomCount": "2",
          "reqTypeofRealty": "Квартира",
          "isNew": 0,
          "reqType": "1c",
          "reqCity": "Новосибирск",
          "reqRayon": "Первомайский",
          "reqStreet": "Марии Ульяновой",
          "reqHouseNumber": "23",
          "nearMetro": null,
          "metroDistance": null,
          "reqFlatTotalArea": "51",
          "reqFlatLivingArea": "30",
          "reqKitchenArea": "9",
          "reqCommunity": null,
          "reqLandArea": null,
          "reqFloor": "1",
          "reqFloors": "5",
          "reqDocType": "Нет",
          "reqReserved": "2022-03-28 00:00:00.000000",
          "reqUpdateTime": 1650362582,
          "reqPrice": "4890",
          "reqPhoto": "https://centromir-sc.ru/imagebase/54771000173/Resize/54771000173_a9823bd6-b319-48b7-8790-2d53c68e721d_r.jpg",
          "reqLogo": "https://crm.centralnoe.ru/dealincom/assets/img/centr-small.png",
          "lat": "54.97760772705078",
          "lng": "83.09162139892578"
        },
        {
          "reqNumber": "54823000201",
          "reqRoomCount": "2",
          "reqTypeofRealty": "Квартира",
          "isNew": 0,
          "reqType": "1c",
          "reqCity": "Новосибирск",
          "reqRayon": "Октябрьский",
          "reqStreet": "Татьяны Снежиной",
          "reqHouseNumber": "25/4",
          "nearMetro": "Золотая Нива",
          "metroDistance": 38,
          "reqFlatTotalArea": "58",
          "reqFlatLivingArea": "35",
          "reqKitchenArea": "9",
          "reqCommunity": null,
          "reqLandArea": null,
          "reqFloor": "8",
          "reqFloors": "10",
          "reqDocType": "Нет",
          "reqReserved": "2021-11-06 00:00:00.000000",
          "reqUpdateTime": 1654664788,
          "reqPrice": "5900",
          "reqPhoto": "https://centromir-sc.ru/imagebase/54823000201/Resize/54823000201_d5399709-9ded-4416-b07c-6f2e54bea649_r.jpg",
          "reqLogo": "https://crm.centralnoe.ru/dealincom/assets/img/centr-small.png",
          "lat": "55.019981384277344",
          "lng": "83.01376342773438"
        }
      ]));
    } catch (error) {
      console.log(error.message);
    }
  }
}