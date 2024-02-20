import React, {useState, useEffect, useMemo} from 'react';
import Post from './components/post/Post';
import Modal from './components/modal/Modal';
import Paginator from '../../components/paginator/Paginator';
// import styles from '../PostsList/PostsList.css';
import axios from 'axios';
import PostSelect from './components/PostSelect/PostSelect';

const PAGE_SIZE = 10;
const sortingOptions = [
    {
        name: 'По заголовку',
        value: 'title'
    },
    {
        name: 'По содержимому',
        value: 'body'
    }
];

const PostsList = () => {
  function addPost(post) {
      const newPost = {
        ...post, 
        user: (new Date()).getMilliseconds()
      };
      setPosts([...posts, newPost]);
  };

  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [filter, setFilters] = useState({
    searching: '',
    page: 1,
    sorting: ''
  });

  function updatePage(num) {
    setFilters({...filter, page: num});
  };
  
  function updateFilter(name, value) {
    setFilters({...filter, [name]: value});
  };

  const [posts, setPosts] = useState([]);

  const filteredSortedPosts = useMemo(() => {
    if (!posts.length) return [];

    const {searching, sorting} = filter;
    const result = posts.filter(post => post.title.toLowerCase().includes(filter.searching.toLowerCase()));

    if (sorting) {
        result.sort((post1, post2) => post1[sorting].localeCompare(post2[sorting]));
    }

    return result;
  }, [posts, filter]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)
      .then(data => setPosts(data))
      .catch(err => setPosts([]));
  }, []);

  const pagesCount = Math.ceil(filteredSortedPosts.length / PAGE_SIZE);
  const pageIndex = PAGE_SIZE * (filter.page - 1);

  return (
    <div className='container'>
          <div className='post-header'>
              <input
                  className='post-input'
                  value={filter.searching}
                  onChange={(e) => setFilters({
                      searching: e.target.value,
                      page: 1
                  })}
                  placeholder='Find post'
              />
              <PostSelect 
                options={sortingOptions} 
                activeSorting={filter.sorting} 
                updateSorting={(value) => updateFilter('sorting', value)}
                /> 
          </div>
      {
        posts.length ? <div className='posts-list'>
        {filteredSortedPosts.slice(pageIndex, 10 + pageIndex).map(post => (
          <Post key={post.id} data={post}/>
        ))}
      </div> : <h2>Постов нет</h2>
      }
      <button onClick={() => setOpen(true)}>Добавить</button>
      {
        pagesCount > 1 && <Paginator 
        activePage={filter.page} 
        updatePage={(button) => updateFilter('page', button)} 
        pagesCount={Math.ceil(posts.length / PAGE_SIZE)}
        />
      }
      
      <Modal open = {open} addPost = {addPost} close = {() => setOpen(false)}/>
    </div>
  );
};

export default PostsList;