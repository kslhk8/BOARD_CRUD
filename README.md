<!-- TODO: 리드미 정리 -->
<!-- 1. 프로젝트 실행방법 -->
<!-- 2. 스택 -->
<!-- 3. 구현 기능 -->
<!-- 4. 폴더 구조 -->
<!-- 4. 페이지별 설명 -->

# BOARD_CRUD
Nextjs 13 + React Query 게시판 CRUD   
   
## 프로젝트 실행 방법
```
yarn

yarn start:local

yarn server:local
```
   
### 기술 스택
- Nextjs 13
- TypeScript
- React Query
- SCSS
- react-toastify

## 구현 기능   
- react-query를 이용한 게시판 CRUD   
- API 요청 성공, 실패 시 toast 메시지 띄움   
   
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
    │  ├─Modal
    │  └─Toast
    ├─constants
    ├─helper
    ├─hooks
    │  ├─board
    │  └─input
    ├─public
    ├─queries
    ├─static
    └─style
        └─scss
            └─components
                └─_board.scss
                └─_header.scss
                └─_modal.scss
                └─_toast.scss
            └─_base.scss
            └─_global.scss
            └─_main.scss
        └─root.scss
``` 
   
## 페이지별 설명   
- Home   
   Home, Board Add, Board List에 대한 Navigation 구현
   
- Board List(게시글 목록)   
   게시글 목록이 title, date의 형태로 구현  
   
- Board Add(게시글 등록 페이지)   
   게시글 등록 페이지로 title, content를 작성 후 게시글을 등록할 수 있음    
   
- Board Detail(게시글 상세 페이지)   
   게시글이 title, content로 구현돼있고 게시글 편집으로 이동, 게시글 삭제를 할 수 있음
