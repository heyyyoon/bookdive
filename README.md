# Book Dive

책에 대한 리뷰를 작성하고, 마음에 드는 리뷰에 좋아요를 누를 수 있습니다.
내가 작성한 리뷰와 좋아요 누른 리뷰는 myPage 페이지에서 모아 볼 수 있습니다.

## 사용한 기술

React, React Hooks, React Query, React Router, TailwindCss

## 구현 페이지

- 반응형 웹 디자인 적용
- React Query를 이용한 CRUD

### 상단 바

* 로그인 / 회원가입 모달
  닉네임, 이메일 중복 체크
  로그아웃 기능

* 도서 검색 입력 폼
  
### 메인페이지
* 인기있는 책 Top 10 슬라이드 방식으로 표시
* 인기있는 리뷰 Top 10 슬라이드 방식으로 표시

### 도서 검색 목록 조회 페이지
* 카카오 책 검색 API 호출하여 책 정보를 렌더
* grid 방식 적용

### 도서 상세 페이지
* 도서 이미지, 제목, 저자, 상세설명 등 표시
* 이 책의 포스트
  책에 포스팅 된 리뷰를 모두 grid 방식으로 보여줌

### 리뷰 작성 페이지
  * 유효성 검사
    별점, 제목, 감상평이 모두 입력되었는지 검사

### 마이페이지
  * 내가 작성한 리뷰 최대 10개 조회
  * 내가 좋아요 한 리뷰 최대 10개 조회

### 리뷰페이지
  * 내가 작성한 리뷰를 모두 조회
  * 내가 좋아요 한 리뷰 모두 조회

### 리뷰 모달 창
  * 리뷰를 클릭하면 리뷰의 상세정보가 모달 창으로 표시된다.
  * 좋아요 기능
    리뷰에 좋아요 혹은 좋아요 취소를 할 수 있다.
