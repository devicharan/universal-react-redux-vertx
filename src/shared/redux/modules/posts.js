const POSTS_LOAD = 'redux-example/posts/LOAD';
const POSTS_LOAD_SUCCESS = 'redux-example/posts/LOAD_SUCCESS';
const POSTS_LOAD_FAILURE = 'redux-example/posts/LOAD_FAILURE';

const initialState = {
    count: 0,
    loading: false,
    posts: [],
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case POSTS_LOAD:
            console.log("POST_LOAD");
            return {
                ...state,
                loading: true
            };
        case POSTS_LOAD_SUCCESS:
            console.log("LOAD SUCC");
            return {
                ...state,
                posts:  action.result,
                loading: false
            };
        case POSTS_LOAD_FAILURE:
            console.log("LOAD FIL");
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}

export function fetchPosts() {
    console.log('Fetching posts');
    return {
        types: [POSTS_LOAD, POSTS_LOAD_SUCCESS, POSTS_LOAD_FAILURE],
        promise: (client) => client.get('/posts').catch(function(){
            console.log("ERRORORR");
        })
    };
}