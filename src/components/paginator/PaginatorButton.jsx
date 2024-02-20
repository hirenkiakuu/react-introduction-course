import React from 'react';
import styles from './PaginatorButton.module.css';
import classNames from 'classnames';

const PaginatorButton = (props) => {
    const {active, updatePage, children} = props;

    return (
        <button 
            className={classNames(styles["paginator__button"], {[styles.active] : active})}
            onClick={updatePage}
            >
        {children}
        </button>
    ); 
}

export default PaginatorButton;