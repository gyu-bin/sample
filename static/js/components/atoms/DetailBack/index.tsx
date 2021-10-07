import React from 'react';

const DetailBack = () => {
    return (
        <div className="detail_back is-mobile">
            <button className="detail_back_btn" onClick={() => window.history.back()}>
                <img src="/assets/images/icon/ico-back-btn.png" alt="back" />
            </button>
        </div>
    );
};

export default DetailBack;
