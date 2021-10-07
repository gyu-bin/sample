import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { useHistory } from 'react-router-dom';
// @ts-ignore
import SwiperCore, { Navigation } from 'swiper';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import classNames from 'classnames';
// @ts-ignore
import { getGAClickProps } from 'utils/lglifeUtils';
// @ts-ignore
import Tag from '../Tag';

SwiperCore.use([Navigation]);

export interface Tag {
    title: string;
    isActive: boolean;
    orderNum: number;
    cateId?: string;
    isSearchKeyword?: boolean;
    deletable?: boolean;
}

export interface ControlTagProps {
    tags: Array<Tag>;
    clickTag: (t) => void;
    clickExpand?: () => void;
    clickTagAll: (bool) => void;
    isSub?: boolean;
    isShow?: string;
}

const ControlTag = (props: ControlTagProps) => {
    const history = useHistory();
    const [isDisabled, setDisabled] = useState(false);
    const controlRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        const num = !props.isSub ? 0 : 1;
        const scrollWidth = document.querySelectorAll('.control_tag_list')[num]?.scrollWidth;
        const listWidth = document.querySelectorAll('.control_tag_list')[num]?.clientWidth;

        if (listWidth && scrollWidth) {
            if (listWidth < scrollWidth) {
                controlRef.current?.classList.add('is-over');
            } else {
                controlRef.current?.classList.remove('is-over');
            }
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        const swipers = document.querySelectorAll('.swiper-wrapper');
        swipers.forEach((s) => {
            s.classList.add('control_tag_list');
        });
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        handleResize();
    }, [props.tags]);

    return (
        <>
            <div
                className={classNames('control_tag', 'is-over', {
                    control_main_tag: !props.isSub,
                    control_sub_tag: props.isSub,
                    'is-show': props.isShow === 'show',
                })}
                ref={controlRef}
            >
                <div className="control_tag_wrap">
          <span className="control_tag_prev is-pc">
            <a href="#" className="control_tag_more_link" onClick={(e) => e.preventDefault()}>
              <img src="/assets/images/icon/ico-action-21-tab_next.svg" alt="view more" />
            </a>
          </span>
                    <Swiper
                        wrapperTag="ul"
                        observer
                        observeParents
                        watchOverflow
                        slidesPerView={'auto'}
                        freeMode={true}
                        threshold={10}
                        navigation={{
                            nextEl: `${
                                props.isSub ? '.control_sub_tag' : '.control_main_tag'
                            } .control_tag_more .control_tag_more_link`,
                            prevEl: `${
                                props.isSub ? '.control_sub_tag' : '.control_main_tag'
                            } .control_tag_prev .control_tag_more_link`,
                        }}
                        onReachEnd={() => {
                            controlRef.current?.classList.remove('is-over');
                        }}
                        onFromEdge={() => {
                            if (!controlRef.current?.classList.contains('is-over')) controlRef.current?.classList.add('is-over');
                            if (!controlRef.current?.classList.contains('is-over-prev'))
                                controlRef.current?.classList.add('is-over-prev');
                        }}
                        onReachBeginning={() => {
                            controlRef.current?.classList.remove('is-over-prev');
                        }}
                        className={classNames({ tagSwiper: !props.isSub, subTagSwiper: props.isSub })}
                    >
                        <SwiperSlide
                            tag="li"
                            className={classNames('tag_item', 'tag-all', {
                                'is-disabled': isDisabled,
                                'is-active': props.tags.filter((t) => t.isActive).length === 0,
                            })}
                        >
                            <a
                                href="#전체"
                                className="tag_link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isDisabled) return;
                                    if (document.querySelectorAll('.tag-all')[props.isSub ? 1 : 0]?.classList.contains('is-active')) {
                                        // document.querySelectorAll('.tag-all')[props.isSub ? 1 : 0]?.classList.remove('is-active');
                                        // props.clickTagAll(false);
                                    } else {
                                        document.querySelectorAll('.tag-all')[props.isSub ? 1 : 0]?.classList.add('is-active');
                                        props.clickTagAll(true);
                                    }
                                }}
                                {...getGAClickProps('전체', '태그키워드')}
                            >
                                전체
                            </a>
                        </SwiperSlide>
                        {props.tags.map((tag) => {
                            // `tag_item ${tag.isActive ? 'is-active' : ''}`
                            return (
                                <SwiperSlide
                                    tag="li"
                                    className={classNames('tag_item', {
                                        'is-active': tag.isActive,
                                        'is-disabled': isDisabled,
                                        search_tag: tag.isSearchKeyword && tag.deletable,
                                    })}
                                    key={tag.title}
                                    // style={{ backgroundColor: tag.title === '신년인사' ? tag.isActive ? '#be004e' : 'rgb(177, 37, 80, 0.1)' : '' }}
                                >
                                    <a
                                        href={`#${tag.title}`}
                                        className="tag_link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (isDisabled) return;
                                            document.querySelector('.tag-all')?.classList.remove('is-active');
                                            const newTags: Array<Tag> = props.tags.map((t) => {
                                                if (t.title === e.currentTarget.innerText) return { ...t, isActive: !t.isActive };
                                                return t;
                                            });
                                            props.clickTag(newTags);
                                        }}
                                        {...getGAClickProps(tag.title, '태그키워드')}
                                    >
                                        {tag.title}
                                    </a>
                                    {tag.isSearchKeyword && tag.deletable ? (
                                        <button
                                            type="button"
                                            className="remove_write_tag"
                                            onClick={() => {
                                                history.push({
                                                    pathname: location.pathname,
                                                });
                                            }}
                                        >
                                            <span className="ab_text">태그 삭제</span>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                        {props.clickExpand && (
                            <SwiperSlide className="tag_item tag_select">
                                <a
                                    href="#"
                                    className="tag_link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (props.clickExpand) props.clickExpand();
                                        if (document.querySelector('.tag_select')?.classList.contains('is-active')) {
                                            document.querySelector('.tag_select')?.classList.remove('is-active');
                                            setDisabled(false);
                                        } else {
                                            document.querySelector('.tag_select')?.classList.add('is-active');
                                            setDisabled(true);
                                        }
                                    }}
                                >
                                    연관 계열사
                                </a>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <span className="control_tag_more is-pc">
            <a className="control_tag_more_link" onClick={(e) => e.preventDefault()}>
              <img src="../assets/images/icon/ico-action-21-tab_next.svg" alt="view more" />
            </a>
          </span>
                </div>
            </div>
        </>
    );
};

export default ControlTag;
