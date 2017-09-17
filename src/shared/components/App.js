import React, { Component, PropTypes } from 'react';
import Post from './Post';
import {Link, IndexLink} from 'react-router';
import {fetchPosts} from "../redux/modules/posts";
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';



/*@asyncConnect([{
     promise: ( {store: {dispatch, getState}}) => {
         const promises = [];
         promises.push(dispatch(fetchPosts()));
         return Promise.all(promises).catch(function(err) {
	console.log('Catch: ', err);
})
     }
}])*/

@asyncConnect([{
     deferred: true,
     promise: ( {store: {dispatch, getState}}) => {
          return dispatch(fetchPosts());
     }
}])
@connect(
    state => ({postsdata: state.posts.posts}),
    {fetchPosts})
class App extends Component {

 static propTypes = {
     postsdata : PropTypes.object,
   fetchPosts: PropTypes.func.isRequired

 };
 componentWillMount() {
   // Fetch data from API Server
   this.props.fetchPosts();
  }



  render() {
     console.log('some app rendering');

    const {postsdata} = this.props;



     const postsUI = postsdata.map((post) => {
      const linkTo = `/${post.id}/${post.slug}`;

      return (
        <li key={post.id}>
          <Link to={linkTo}>{post.title}</Link>
        </li>
      )
    });

    const {postId, postName} = this.props.params;
    let postTitle, postContent;
    if (postId && postName) {
      const post = postsdata.filter(p => p.id == postId)[0];
      if (post) {
        postTitle = post.title;
        postContent = post.content;
      }
    }

    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        <h3>Posts</h3>
        <ul>
          {postsUI}
        </ul>

        {postTitle && postContent ? (
          <Post title={postTitle} content={postContent}/>
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default App
