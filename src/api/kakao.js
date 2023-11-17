
import axios from "axios";

export default class Kakao {
    constructor() {
      this.httpClient = axios.create({
        baseURL : "https://dapi.kakao.com",
        headers: {Authorization: "KakaoAK "+process.env.REACT_APP_KAKAO_RESTAPI_KEY},
    });
    }
    
    async search(text) {
      return this.httpClient.get('/v3/search/book', { 
        params : {
          query: text,
          sort: 'accuracy', // accuracy | recency 정확도 or 최신
          page: 1, // 페이지번호
          size: 50, // 한 페이지에 보여 질 문서의 개수}); // api 호출
        }
      })
      .then((res) => res.data.documents);
    }
  }