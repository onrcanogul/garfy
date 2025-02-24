import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Post from "../../contracts/social-media/post";
import { currentUser } from "../../services/auth-service";
import { socialMediaBasePath } from "../../constants/endpoint";
import { PostState } from "../states";

const url = `${socialMediaBasePath}/post`;

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${url}/${page}/${size}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (model: Partial<Post>, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, model);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/like/${postId}/${currentUser()}`
      );
      return response.data.successful;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (model: Partial<Post>, { rejectWithValue }) => {
    try {
      const response = await axios.put(url, model);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"; // api request started
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"; // request succeeded
        state.posts = action.payload; // request datas added into store
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"; // request failed
        state.error = action.payload as string; // store error message
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload); // add post which comes from api
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          // find the post and update
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload); //find the post and delete
      });
  },
});

export default postSlice.reducer;
