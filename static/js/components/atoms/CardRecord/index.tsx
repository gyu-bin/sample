import React from 'react';

export interface CardRecordProps {
    views: number;
    comments: number;
    likes: number;
}

const CardRecord = (props: CardRecordProps) => {
    return (
        <>
            <ul className="card_record">
                <li>
                    <img src="/assets/images/icon/ico-views.png" alt="views" />
                    {props.views}
                </li>
                <li>
                    <img src="/assets/images/icon/ico-comments.png" alt="comments" />
                    {props.comments}
                </li>
                <li>
                    <img src="/assets/images/icon/ico-likes.png" alt="likes" />
                    {props.likes}
                </li>
            </ul>
        </>
    );
};

export default CardRecord;
