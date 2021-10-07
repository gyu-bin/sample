import { useState } from 'react';
// @ts-ignore
import useSWR from 'swr';
// @ts-ignore
import { endpoints, fetcher } from 'services';
// @ts-ignore
import useMyInfo from './useMyInfo';

interface AttachFileResDto {
}

interface BoardDetailResDto {
}

const useBoardUpdate = () => {
    const [boardId, setBoardId] = useState<string>();
    const { info } = useMyInfo();

    const boardUrl = () => `${endpoints.boards.board}/${boardId}`;

    const { data: board } = useSWR<BoardDetailResDto>(info && boardId ? [boardUrl(), boardId] : null, (url) =>
        fetcher.boards.getBoardDetail(url).then((res) => {
            return res;
        }),
    );

    return {
        setBoardId,
        board,
        putBoardUpdate(
            boardId: string,
            title: string,
            tags: Array<string>,
            contents: string,
            contentsText: string,
            cateId: string,
            subCateId: string,
            attachFiles: File[],
            uploadedFiles: AttachFileResDto[],
        ) {
            return fetcher.boards.putBoardUpdate(boardUrl(), {
                boardId,
                attachFiles,
                cateId,
                contents,
                contentsText,
                subCateId,
                tags,
                title,
                uploadedFiles,
            });
        },
    };
};

export default useBoardUpdate;
