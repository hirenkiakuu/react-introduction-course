import React, {useState, useEffect} from 'react';
import styles from './Modal.module.css';
import classNames from 'classnames';

const Modal = (props) => {

    function updatePost(name, value) {
        setNewPost({...newPost, [name]: value});
    }

    const {open, addPost, close} = props;

    useEffect(() => {
        if (!open) {
            console.log('here');
        }
        setNewPost({title: '', body: ''});
    }, [open]);

    const [newPost, setNewPost] = useState({
        title: '',
        body: ''
    });

    function setPost() {
        if (newPost.title) {
            addPost(newPost);
            close();
            setNewPost({title: '', body: ''});
        }
    }

    return (
        <div 
            onClick={close}
            className={classNames(styles['modal-container'], {[styles.open] : open})}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <h1>Добавить пост</h1>
                <input 
                    value={newPost.title} 
                    onChange={(e) => updatePost('title', e.target.value)} 
                    className={styles['modal-input']} 
                    placeholder='Название поста' 
                />
                <textarea 
                    value={newPost.body} 
                    onChange={(e) => updatePost('body', e.target.value)} 
                    className={styles['modal-textarea']} 
                    placeholder='Описание поста'>
                </textarea>
                <button onClick={setPost} className={styles['add-button']}>Добавить</button>
            </div>
        </div>
    );
};

export default Modal;