import Vuex from 'vuex';
import Cookie from 'js-cookie';
import parser from 'cookieparser';

export default () =>
  new Vuex.Store({
    state: {
      posts: [],
      token: null
    },
    mutations: {
      setPosts: (state, payload) => {
        state.posts = payload;
      },
      addPost: (state, payload) => {
        const posts = [...state.posts];
        posts.push(payload);
        state.posts = posts;
      },
      editPost: (state, payload) => {
        const index = state.posts.findIndex(p => p.id === payload.id);
        if (index < 0) return;
        const posts = [...state.posts];
        posts[index] = payload;
        state.posts = posts;
      },
      setToken: (state, payload) => {
        state.token = payload;
      },
      clearToken: state => {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit: async ({ commit }, context) => {
        const { error, app } = context;
        try {
          const data = await app.$axios.$get('posts.json');
          const payload = [];
          for (const id in data) {
            payload.push({ ...data[id], id });
          }
          commit('setPosts', payload);
        } catch (err) {
          error(err);
        }
      },
      setPosts: ({ commit }, posts) => {
        commit('setPosts', posts);
      },
      async addPost({ commit, state }, post) {
        const { name } = await this.$axios.$post(
          `/posts.json?auth=${state.token}`,
          {
            ...post,
            updatedDate: new Date()
          }
        );
        commit('addPost', { ...post, id: name });
      },
      async editPost({ commit, state }, post) {
        const data = await this.$axios.$put(
          `/posts/${post.id}.json?auth=${state.token}`,
          {
            ...post,
            updatedDate: new Date()
          }
        );
        commit('editPost', data);
      },
      async authenticate({ commit, dispatch }, { email, password, isLogin }) {
        const apiKey = process.env.fbAPIKey;
        const payload = { email, password, returnSecureToken: true };
        let url = isLogin
          ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`
          : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
        const { idToken, refreshToken, expiresIn } = await this.$axios.$post(
          url,
          payload
        );
        const expiresInMs = +expiresIn * 1000;
        const expiresInDate = new Date().getTime() + expiresInMs;
        commit('setToken', idToken);
        localStorage.setItem('token', idToken);
        localStorage.setItem('expiresIn', expiresInDate);
        Cookie.set('token', idToken);
        Cookie.set('expiresIn', expiresInDate);
      },
      logout: ({ commit }) => {
        commit('clearToken');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('expiresIn');
          Cookie.remove('token');
          Cookie.remove('expiresIn');
        }
      },
      initAuth: ({ commit, dispatch }, req) => {
        let token;
        let expiresIn;
        if (process.client) {
          token = localStorage.getItem('token');
          expiresIn = +localStorage.getItem('expiresIn');
        } else if (req.headers.cookie) {
          const cookies = parser.parse(req.headers.cookie);
          token = cookies.token;
          expiresIn = +cookies.expiresIn;
        }
        if (!token) {
          return;
        }
        const current = new Date().getTime();
        if (current > expiresIn) {
          dispatch('logout');
          return;
        }
        commit('setToken', token);
      }
    },
    getters: {
      posts: state => state.posts,
      isAuthenticated: state => !!state.token
    }
  });
