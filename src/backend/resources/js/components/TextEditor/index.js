import React, { useState } from 'react'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor = ({ getContent }) => {
  const editorStyles = { height: 200 }

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const onEditorStateChange = (state) => {
    setEditorState(state)
    sendContent()
  }

  const sendContent = () => {
    getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="border border-gray-100 h-3/4"
      editorStyle={editorStyles}
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default TextEditor
