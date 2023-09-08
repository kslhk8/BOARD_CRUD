# BOARD_CRUD

---
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">

Nextjs 13 + React Query Simple Board_CRUD

## 프로젝트 실행 방법

```
yarn

yarn server:local

yarn start:local

```

## 기술 스택 및 사용 라이브러리

- Nextjs 13
- TypeScript
- React Query
- SCSS
- react-toastify

## 구현 기능

- Next 13 버전을 적용한 심플 게시판 CRUD
- axios interceptor 적용 및 response 결과에 따른 예외처리
- react-query 라이브러리 사용
  - prefetch 적용 및 data 값이 없을 경우 예외처리
    - 게시글이 없을 때는 게시판 목록으로 리다이렉트 한다.

## 폴더구조

```
└─src
    ├─app
    │  ├─board
    │  │  ├─add
    │  │  ├─edit
    │  │  │  └─[id]
    │  │  ├─list
    │  │  └─[id]
    │  └─maintainance
    ├─components
    │  ├─Header
    │  ├─Loader
    │  ├─Modal
    │  └─Toast
    ├─constants
    ├─helper
    ├─hooks
    │  ├─board
    │  │  ├─useBoard.ts
    │  │  ├─useBoardAdd.ts
    │  │  ├─useBoardEdit.ts
    │  └─input
    ├─public
    ├─queries
    │  ├─useDeleteItem.ts
    │  ├─useGetItem.ts
    │  ├─useGetItems.ts
    │  ├─usePostItem.ts
    │  ├─useUpdateItem.ts
    ├─static
    └─style
        └─scss
            └─components
                └─_board.scss
                └─_header.scss
                └─_loader.scss
                └─_modal.scss
                └─_toast.scss
            └─_base.scss
            └─_global.scss
            └─_main.scss
        └─root.scss
```

## 각 페이지별 기능 정의

- **게시글 목록** (/board/list)

  - app/board/list 내부에서 data를 prefetching 한다.
  - queries 폴더 내의 `useGetItems` hook 을 통해 data를 불러온다.
  - 불러온 데이터의 타이틀, helpers 폴더 내의 `timeFromToday` 포맷팅 함수를 사용하여 게시글 목록을 렌더한다.
  - 게시글 데이터가 없을 경우 noData 리스트를 렌더한다.
  - 게시글 등록 페이지로 이동할 수 있다.

- **게시글 등록** (/board/add)

  - 게시글의 타이틀과 내용을 입력하며 `usePostItem` hook을 사용하여 서버에 저장할 수 있다.
    - parameter : title, content, date (new Date())
  - 등록하기 버튼의 상태는 disabled이며, 필수값인 타이틀과 내용이 입력되어야 활성화된다.
  - input 태그의 경우 `useInput` 공통 custom hook을 통해 핸들링된다.
  - 데이터를 저장하기 전, 확인 모달창을 띄운다.
  - 완료 후 react-toastify 라이브러리를 활용한 공통 컴포넌트 `Toast`를 활용한 알림을 띄운다.

- **게시글 상세** (/board/[id])

  - `useGetItem` hook을 사용하여 게시글의 정보를 출력한다.
  - 편집 버튼과 삭제 버튼을 통해 게시글을 수정 및 삭제 할 수 있다.
  - 편집 버튼을 클릭하는 경우 게시글 편집 페이지(/board/edit/{id})로 이동한다.
  - 삭제 버튼을 클릭하는 경우 삭제 확인 모달창을 띄워 재확인 한다.
    - 삭제 완료 후 react-toastify 라이브러리를 활용한 공통 컴포넌트 `Toast`를 활용한 알림을 띄운다.

- **게시글 편집** (/board/edit/[id])
  - `useGetItem` hook을 통해 원본 게시글 데이터를 불러온다.
  - `useInput` custom hook을 사용하여 form 내부 필드를 관리한다.
  - 편집하기 버튼 클릭시 확인 모달을 띄워 재확인한다.
  - `useUpdateItem` hook을 통해 게시글 데이터를 업데이트 한다.
  - 완료 후 게시글 상세(board/[id]) 페이지로 이동하며, 알림 메시지를 띄운다.
