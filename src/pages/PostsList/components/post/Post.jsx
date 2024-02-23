import React, {useState} from 'react';
import styles from './Post.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addDeleteAction } from '../../../../store';

const Post = (props) => {
    const navigate = useNavigate();

    const {data} = props;
    const counter = useSelector((state) => state.deleteCount);
    const dispatch = useDispatch();

    function goPage() {
        navigate(`/post/${data.id}`);
    }

    return (
        <div className={styles.post}>
            <Link to={`/post/${data.id}`} className={styles['post-title']}>{data.title}</Link>
            {counter}
            <p>{data.body}</p>
            <div className={styles['post-buttons']}>
                <button className={styles['post-open']}>Перейти</button>
                <button onClick={() => dispatch(addDeleteAction(counter + 1))} className={styles['post-delete']}>Удалить</button>
            </div>
        </div>
    );
}

export default Post;