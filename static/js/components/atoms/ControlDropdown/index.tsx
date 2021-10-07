import React, { useRef } from 'react';
// @ts-ignore
import classNames from 'classnames';
// @ts-ignore
import { getGAClickProps } from 'utils/lglifeUtils';

export interface SortItem {
    title: string;
    data: string;
    sub?: Array<SortItem>;
}
export interface ControlDropdownProps {
    initial: string;
    initPop?: string;
    sortList: Array<SortItem>;
    clickSort: (s) => void;
    clickPop?: (p) => void;
}

const ControlDropdown = (props: ControlDropdownProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    const labelRef = useRef<HTMLAnchorElement>(null);
    const liRef = useRef<HTMLLIElement>(null);
    const subListRef = useRef<HTMLUListElement>(null);

    return (
        <>
            <div className="control_sort" data-sort="filter">
                <a
                    className="sort_label"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!labelRef.current?.classList.contains('is-active')) {
                            labelRef.current?.classList.add('is-active');
                            listRef.current?.classList.add('is-active');
                        } else {
                            labelRef.current?.classList.remove('is-active');
                            listRef.current?.classList.remove('is-active');
                            subListRef.current?.classList.remove('is-active');
                        }
                    }}
                    ref={labelRef}
                >
                    {props.sortList.map((s) => {
                        if (s.data === props.initial) return s.title;
                    })}
                </a>
                <ul className="sort_list" ref={listRef}>
                    {props.sortList.map((s, idx) => {
                        return (
                            <li
                                className={classNames(['sort_item', { 'is-current': props.initial === s.data }])}
                                key={idx}
                                ref={liRef}
                            >
                                <a
                                    className={classNames('sort_link', { sort_link_sub: s.sub })}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!s.sub) {
                                            labelRef.current?.classList.remove('is-active');
                                            listRef.current?.classList.remove('is-active');
                                            liRef.current?.classList.remove('is-active');
                                            subListRef.current?.classList.remove('is-active');
                                            props.clickSort(s.data);
                                        } else {
                                            liRef.current?.classList.add('is-active');
                                            subListRef.current?.classList.add('is-active');
                                        }
                                    }}
                                    {...getGAClickProps(s.title, '정렬')}
                                >
                                    {s.title}
                                </a>
                                {s.sub && (
                                    <>
                                        <ul className="sort_list sort_2depth" ref={subListRef}>
                                            {s.sub.map((ss, idx) => (
                                                <li
                                                    className={classNames('sort_item sort_2depth_item', {
                                                        'is-current': s.data === props.initial && ss.data === props.initPop,
                                                    })}
                                                    key={idx}
                                                >
                                                    <a
                                                        className="sort_link sort_2depth_link"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.clickSort(s.data);
                                                            if (props.clickPop) props.clickPop(ss.data);
                                                            liRef.current?.classList.remove('is-active');
                                                            subListRef.current?.classList.remove('is-active');
                                                            labelRef.current?.classList.remove('is-active');
                                                            listRef.current?.classList.remove('is-active');
                                                        }}
                                                        {...getGAClickProps(`${s.title}/${ss.title}`, '정렬')}
                                                    >
                                                        {ss.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default ControlDropdown;
