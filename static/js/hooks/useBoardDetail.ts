import { useMemo } from 'react';
// @ts-ignore
import useSWR from 'swr';
// @ts-ignore
import { endpoints, fetcher } from 'services';
// @ts-ignore
import { useHistory } from 'react-router-dom';
// @ts-ignore
import Paths from 'commons/paths';
// @ts-ignore
import useMyInfo from './useMyInfo';
// @ts-ignore
import { isDetailsFor } from 'utils/utils';

const useBoardDetail = (boardId: string) => {
    const history = useHistory();
    const { info } = useMyInfo();

    const isBoardDetailPage = useMemo(() => isDetailsFor('board'), [location.pathname]);

    const { data: boardDetail, mutate } = useSWR<any>(
        info && isBoardDetailPage && boardId ? [`${endpoints.boards.board}/${boardId}`, boardId] : null,
        (url) =>
            fetcher.boards.getBoardDetail(url).then((res) => {
                return res;
            }),
    );

    return {
        boardDetail,
        mutate,
        postBoardLike() {
            fetcher.boards.postBoardLike({ boardId }).then((res) => {
                if (res.resultCode === 200) mutate();
            });
        },
        deleteBoard() {
            fetcher.boards.deleteBoard(`${endpoints.boards.board}/${boardId}`).then((res) => {
                if (res.resultCode === 200) history.push(Paths.getPath('boardList'));
            });
        },
    };
};

export default useBoardDetail;
