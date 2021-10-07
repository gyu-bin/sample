import { useState } from 'react';// @ts-ignore
import useSWR from 'swr';// @ts-ignore
import { endpoints, fetcher } from 'services';// @ts-ignore
import { sortAsc } from 'utils/lglifeUtils';// @ts-ignore
import useMyInfo from './useMyInfo';

const useBoards = () => {
    const { info } = useMyInfo();
    const [searchOptions, setSearchOptions] = useState<any>({
        size: 12,
        sort: 'createdDt,desc',
        searchWord: '',
        searchWordTotal: '',
        cateList: '',
        groupCompanyList: '',
        page: 0,
    });


    const { data: boards } = useSWR<any>(
        info && searchOptions.page > 0 ? [endpoints.boards.board, searchOptions] : null,
        () =>
            fetcher.boards.getBoards(searchOptions).then((res) => {
                return res;
            }),
    );

    let { data: category } = useSWR<any>(info ? [endpoints.common.category, 'BOARD'] : null, () =>
        fetcher.common.getCategory({ cateType: 'BOARD' }).then((res) => {
            return res;
        }),
    );

    if (category && category.categoryList) {
        category = sortAsc(category.categoryList);
    }

    let { data: subCategory } = useSWR<any>(info ? [endpoints.common.category, 'SUB'] : null, () =>
        fetcher.common.getCategory({ cateType: 'SUB' }).then((res) => {
            return res;
        }),
    );

    if (subCategory && subCategory.categoryList) {
        subCategory = sortAsc(subCategory.categoryList);
    }

    return {
        boards,
        searchOptions,
        setSearchOptions,
        category,
        subCategory,
        postBoardWrite(
            title: string,
            tags: Array<string>,
            contents: string,
            contentsText: string,
            cateId: string,
            subCateId: string,
            attachFiles: File[],
        ) {
            return fetcher.boards.postBoardWrite({
                attachFiles,
                cateId,
                contents,
                contentsText,
                subCateId,
                tags,
                title,
            });
        },
    };
};

export default useBoards;
