// import { lazy, LazyExoticComponent } from 'react';
// import { matchPath } from 'react-router-dom';
//
// export interface Path {
//     title: string;
//     key: string;
//     page_name?: string;
//     component?: LazyExoticComponent<any>;
//     children?: Array<Path>;
//     private?: boolean;
// }
//
// const paths: Path[] = [
//     {
//         title: 'home',
//         key: '/',
//         page_name: 'Home/Main',
//         component: lazy(() => import(`components/pages/Home`)),
//         private: true,
//     },
//     {
//         title: 'user',
//         key: '/user',
//         children: [
//             {
//                 title: 'login',
//                 key: '/user/login',
//                 page_name: 'Log-in/로그인하기',
//                 component: lazy(() => import(`components/pages/Login`)),
//             },
//             {
//                 title: 'findpw',
//                 key: '/user/findpw',
//                 page_name: 'Log-in/비밀번호 찾기',
//                 component: lazy(() => import(`components/pages/Login/FindPassword`)),
//             },
//             {
//                 title: 'confirmMember',
//                 key: '/user/confirmMember',
//                 page_name: 'Log-in/가입여부 확인',
//                 component: lazy(() => import(`components/pages/Login/ConfirmMember`)),
//             },
//             {
//                 title: 'agree',
//                 key: '/user/agree',
//                 page_name: 'Log-in/회원약관',
//                 component: lazy(() => import(`components/pages/Login/Agree`)),
//             },
//             {
//                 title: 'signup',
//                 key: '/user/signup',
//                 page_name: 'Log-in/신규가입',
//                 component: lazy(() => import(`components/pages/Login/SignUp`)),
//             },
//             {
//                 title: 'signupComplete',
//                 key: '/user/signupComplete',
//                 page_name: 'Log-in/가입완료',
//                 component: lazy(() => import(`components/pages/Login/SignupComplete`)),
//             },
//             {
//                 title: 'privacypublic',
//                 key: '/user/privacypublic',
//                 page_name: 'PrivacyPublic',
//                 component: lazy(() => import(`components/pages/Login/PrivacyPublic`)),
//             },
//         ],
//     },
//     {
//         title: 'video',
//         key: '/video',
//         children: [
//             {
//                 title: 'videoList',
//                 key: '/video/list',
//                 page_name: 'Video/List',
//                 component: lazy(() => import(`components/pages/Video`)),
//                 private: true,
//             },
//             {
//                 title: 'videoDetail',
//                 key: '/video/detail/:mediaId',
//                 page_name: 'Video/Detail Page',
//                 component: lazy(() => import(`components/pages/Video/VideoDetail`)),
//                 private: true,
//             },
//             {
//                 title: 'videoDownload',
//                 key: '/video/download/detail',
//                 page_name: 'Video/Download Page',
//                 component: lazy(() => import(`components/pages/Video/VideoDownload`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'recommend',
//         key: '/recommend',
//         // page_name: 'Recommend/List',
//         // component: lazy(() => import(`components/pages/Recommend`)),
//         children: [
//             {
//                 title: 'recommendList',
//                 key: '/recommend/list',
//                 page_name: 'Recommend/List',
//                 component: lazy(() => import(`components/pages/Recommend`)),
//                 private: true,
//             },
//             {
//                 title: 'recommendDetail',
//                 key: '/recommend/detail/:mediaId',
//                 page_name: 'Recommend/Detail Page',
//                 component: lazy(() => import(`components/pages/Recommend/RecommendDetail`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'news',
//         key: '/news',
//         children: [
//             {
//                 title: 'newsList',
//                 key: '/news/list',
//                 page_name: 'LG News/List',
//                 component: lazy(() => import(`components/pages/News`)),
//                 private: true,
//             },
//             {
//                 title: 'newsDetail',
//                 key: '/news/detail/:mediaId',
//                 page_name: 'LG News/Detail Page',
//                 component: lazy(() => import(`components/pages/News/NewsDetail`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'event',
//         key: '/event',
//         children: [
//             {
//                 title: 'eventList',
//                 key: '/event/list',
//                 page_name: 'Event/List',
//                 component: lazy(() => import(`components/pages/Event`)),
//                 private: true,
//             },
//             {
//                 title: 'eventDetail',
//                 key: '/event/detail/:eventId',
//                 page_name: 'Event/Detail Page',
//                 component: lazy(() => import(`components/pages/Event/EventDetail`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'board',
//         key: '/board',
//         children: [
//             {
//                 title: 'boardList',
//                 key: '/board/list',
//                 page_name: 'Board/List',
//                 component: lazy(() => import(`components/pages/Board`)),
//                 private: true,
//             },
//             {
//                 title: 'boardWrite',
//                 key: '/board/write',
//                 page_name: 'Board/Write',
//                 component: lazy(() => import(`components/pages/Board/BoardWrite`)),
//                 private: true,
//             },
//             {
//                 title: 'boardEdit',
//                 key: '/board/edit/:boardId',
//                 page_name: 'Board/Edit',
//                 component: lazy(() => import(`components/pages/Board/BoardWrite`)),
//                 private: true,
//             },
//             {
//                 title: 'boardDetail',
//                 key: '/board/detail/:boardId',
//                 page_name: 'Board/Detail',
//                 component: lazy(() => import(`components/pages/Board/BoardDetail`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'person',
//         key: '/person',
//         page_name: 'Person',
//         component: lazy(() => import(`components/pages/Person`)),
//         private: true,
//     },
//     {
//         title: 'introduce',
//         key: '/introduce',
//         // page_name: 'Intro',
//         // component: lazy(() => import(`components/pages/Introduce`)),
//         children: [
//             {
//                 title: 'LGway',
//                 key: '/introduce/lgway',
//                 page_name: 'Intro/LGway',
//                 component: lazy(() => import(`components/pages/Introduce/LGway`)),
//                 private: true,
//             },
//             {
//                 title: 'Management',
//                 key: '/introduce/management',
//                 page_name: 'Intro/Management',
//                 component: lazy(() => import(`components/pages/Introduce/Management`)),
//                 private: true,
//             },
//             {
//                 title: '70story',
//                 key: '/introduce/story',
//                 children: [
//                     {
//                         title: '70Story',
//                         key: '/introduce/story',
//                         page_name: 'Intro/70Story',
//                         component: lazy(() => import(`components/pages/Introduce/Story`)),
//                         private: true,
//                     },
//                     {
//                         title: '70StoryDetail',
//                         key: '/introduce/story/detail/:storyId',
//                         page_name: 'Intro/70Story/Detail',
//                         component: lazy(() => import(`components/pages/Introduce/Story/StoryDetail`)),
//                         private: true,
//                     },
//                 ],
//             },
//             {
//                 title: 'ESG',
//                 key: '/introduce/esg',
//                 children: [
//                     {
//                         title: 'ESGList',
//                         key: '/introduce/esg',
//                         page_name: 'Intro/ESG',
//                         component: lazy(() => import(`components/pages/Introduce/ESG`)),
//                         private: true,
//                     },
//                     {
//                         title: 'ESGDetail',
//                         key: '/introduce/esg/detail/:esgId',
//                         page_name: 'Intro/ESG/Detail',
//                         component: lazy(() => import(`components/pages/Introduce/ESG/ESGDetail`)),
//                         private: true,
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: 'faq',
//         key: '/faq',
//         page_name: 'FAQ',
//         component: lazy(() => import(`components/pages/Faq`)),
//         private: true,
//     },
//     {
//         title: 'qna',
//         key: '/qna',
//         children: [
//             {
//                 title: 'qnaWrite',
//                 key: '/qna/write',
//                 page_name: 'Q&A Write',
//                 component: lazy(() => import(`components/pages/Qna/QnaWrite`)),
//                 private: true,
//             },
//             {
//                 title: 'qnaWriteCompleted',
//                 key: '/qna/writecompleted/:mode',
//                 page_name: 'Q&A Write(completed)',
//                 component: lazy(() => import(`components/pages/Qna/QnaWriteCompleted`)),
//                 private: true,
//             },
//             {
//                 title: 'qnaEdit',
//                 key: '/qna/write/:qnaId',
//                 page_name: 'Q&A Edit',
//                 component: lazy(() => import(`components/pages/Qna/QnaWrite`)),
//                 private: true,
//             },
//             {
//                 title: 'qnaList',
//                 key: '/qna/list',
//                 page_name: 'Q&A List',
//                 component: lazy(() => import(`components/pages/Qna/QnaList`)),
//                 private: true,
//             },
//             {
//                 title: 'qnaDetail',
//                 key: '/qna/detail/:qnaId',
//                 page_name: 'Q&A Detail',
//                 component: lazy(() => import(`components/pages/Qna/QnaDetail`)),
//                 private: true,
//             },
//         ],
//     },
//     {
//         title: 'tools',
//         key: '/tools',
//         page_name: 'Tools',
//         component: lazy(() => import(`components/pages/Tools`)),
//         private: true,
//     },
//     {
//         title: 'search',
//         key: '/search',
//         page_name: 'Search Result',
//         component: lazy(() => import(`components/pages/SearchResult`)),
//         private: true,
//     },
//     {
//         title: 'mypage',
//         key: '/mypage',
//         page_name: 'My Page',
//         component: lazy(() => import(`components/pages/MyPage`)),
//         private: true,
//     },
//     {
//         title: 'edit',
//         key: '/mypage/edit',
//         page_name: 'My Page/Edit',
//         component: lazy(() => import(`components/pages/MyPage/Edit`)),
//         private: true,
//     },
//     {
//         title: 'recent',
//         key: '/mypage/recent',
//         page_name: 'My Page/Recent',
//         component: lazy(() => import(`components/pages/MyPage/Recent`)),
//         private: true,
//     },
//     {
//         title: 'bookmark',
//         key: '/mypage/bookmark',
//         page_name: 'My Page/Bookmark',
//         component: lazy(() => import(`components/pages/MyPage/Bookmark`)),
//         private: true,
//     },
//     {
//         title: 'like',
//         key: '/mypage/like',
//         page_name: 'My Page/Like',
//         component: lazy(() => import(`components/pages/MyPage/Like`)),
//         private: true,
//     },
//     {
//         title: 'myboard',
//         key: '/mypage/myboard',
//         page_name: 'My Page/My Board',
//         component: lazy(() => import(`components/pages/MyPage/Board`)),
//         private: true,
//     },
//     {
//         title: 'privacy',
//         key: '/privacy',
//         page_name: 'Privacy',
//         component: lazy(() => import(`components/pages/Home/Privacy`)),
//         private: true,
//     },
//     {
//         title: 'sitemap',
//         key: '/sitemap',
//         page_name: 'Sitemap',
//         component: lazy(() => import(`components/pages/Home/Sitemap`)),
//         private: true,
//     },
//     {
//         title: 'ep',
//         key: '/ep',
//         page_name: 'EP Panel',
//         component: lazy(() => import(`components/pages/EP`)),
//         private: true,
//     },
//     {
//         title: 'test',
//         key: '/video/detail/test/:number',
//         page_name: 'test',
//         component: lazy(() => import(`components/pages/TestPage`)),
//     }
// ];
//
// const flatPath = (acc: Array<Path>, path: Path) => {
//     if (!path.children) {
//         acc.push(path);
//         return acc;
//     }
//     path.children.map((p) => {
//         flatPath(acc, p);
//     });
//     return acc;
// };
//
// const flatPaths = paths.map((path) => flatPath([], path)).flat();
//
// const getPage = (pathName: string) => {
//     return flatPaths.filter((p) => {
//         return matchPath(pathName, {
//             path: p.key,
//             exact: true,
//         });
//     });
// };
//
// export default {
//     paths,
//     flatPaths,
//     getPath(title: string): string {
//         return flatPaths.filter((p) => p.title === title)[0].key;
//     },
//     getPageName(pathName: string): string | undefined {
//         const page = getPage(pathName);
//
//         if (page.length === 0) {
//             return '404';
//         }
//
//         return page[0].page_name;
//     },
//     isPrivate(pathName: string): boolean | undefined {
//         const page = getPage(pathName);
//
//         if (page.length > 0) {
//             return page[0].private;
//         }
//         return undefined;
//     },
// };
