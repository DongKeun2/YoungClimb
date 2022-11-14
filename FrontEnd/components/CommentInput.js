import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import UserAvatar from './UserAvatar';

import InputBtnIcon from '../assets/image/feed/inputBtn.svg';
import {
  commentAdd,
  fetchFeedComment,
  changeCommentIdForRe,
  changeIsFocusedInput,
  recommentAdd,
} from '../utils/slices/PostSlice';

function CommentInput({boardId, navigation}) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const currentUser = useSelector(state => state.accounts.currentUser);

  const commentIdForRe = useSelector(state => state.post.commentIdForRe);
  const isFocusedInput = useSelector(state => state.post.isFocusedInput);

  const [text, changeText] = useState('');

  useEffect(() => {
    changeText('');
    if (isFocusedInput) {
      inputRef.current.focus();
    }
  }, [isFocusedInput]);

  useEffect(() => {
    return () => {
      dispatch(changeCommentIdForRe(0));
      dispatch(changeIsFocusedInput(false));
    };
  }, []);

  const onBlur = () => {
    dispatch(changeCommentIdForRe(0));
    dispatch(changeIsFocusedInput(false));
  };

  const commentSubmit = id => {
    if (!commentIdForRe) {
      const data = {
        boardId: id,
        comment: {
          content: text,
        },
      };
      dispatch(commentAdd(data)).then(res => {
        if (res.type === 'commentAdd/fulfilled') {
          changeText('');
          dispatch(fetchFeedComment(boardId));
          inputRef.current.blur();
          navigation.navigate('댓글', {boardId: boardId});
        } else {
          alert('다시 시도해주세요');
        }
      });
    } else {
      const data = {
        boardId: id,
        commentId: commentIdForRe,
        comment: {
          content: text,
        },
      };
      dispatch(recommentAdd(data)).then(res => {
        if (res.type === 'recommentAdd/fulfilled') {
          changeText('');
          dispatch(fetchFeedComment(boardId));
          dispatch(changeCommentIdForRe(0));
          dispatch(changeIsFocusedInput(false));
          inputRef.current.blur();
          navigation.navigate('댓글', {boardId: boardId});
        } else {
          alert('다시 시도해주세요');
        }
      });
    }
  };

  return (
    <View style={styles.inputContainer}>
      <UserAvatar source={{uri: currentUser.image}} size={40} />
      <TextInput
        style={styles.commentInput}
        onChangeText={changeText}
        onBlur={onBlur}
        ref={inputRef}
        value={text}
        multiline={true}
        placeholder={
          isFocusedInput ? '답글을 입력해주세요' : '댓글을 입력해주세요'
        }
        placeholderTextColor="#a7a7a7"
      />
      <TouchableOpacity
        style={styles.summitArea}
        disabled={!text}
        onPress={() => commentSubmit(boardId)}>
        <InputBtnIcon color={text ? 'black' : '#a7a7a7'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    paddingLeft: 10,
    paddingVertical: 3,
    borderTopWidth: 0.2,
    borderTopColor: '#a7a7a7',
  },
  commentInput: {
    width: '72%',
    height: '98%',
    color: 'black',
  },
  summitArea: {
    height: '98%',
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
  },
});

export default CommentInput;
