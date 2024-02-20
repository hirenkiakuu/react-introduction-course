import React, {useState} from 'react';
import styles from './Post.module.css';
import {Link} from 'react-router-dom';

const Post = (props) => {
    const {data} = props;

    return (
        <div className={styles.post}>
            <Link to={`/post/${data.id}`} className={styles['post-title']}>{data.title}</Link>
            <p>{data.body}</p>
            <div className={styles['post-buttons']}>
                <button className={styles['post-open']}>Перейти</button>
                <button className={styles['post-delete']}>Удалить</button>
            </div>
        </div>
    );
}

export default Post;