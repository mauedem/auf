import PropTypes from "prop-types";

import './Skeleton.css'

export const Skeleton = ({ type }) => {
    const skeletonClass = `skeleton ${type === 'text' 
        ? 'skeleton--text' : type === 'image' 
        ? 'skeleton--image' : ''}`;

    return (
        <>
            <div className={skeletonClass}></div>
        </>
    )
}

Skeleton.propTypes = {
    type: PropTypes.oneOf(['text', 'image']).isRequired,
};
