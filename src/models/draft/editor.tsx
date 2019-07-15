import React, { useState, CSSProperties, useRef } from 'react'
import { EditorState, Editor, CompositeDecorator } from 'draft-js'
import { curry as _, concat } from 'ramda'
import { handleKeyCommand } from './models/key-command'
import { setInlineStyledState } from './models/inline-style'
import { focusEditor, blurEditor } from './models/editor'
import { decoratorRules as tweetDecRules, InputComp } from './examples/tweet'
import { blocks, decoratorRules as entityDecRules } from './examples/entity'
import { compositeDecorators, concatDecorators } from './models/decorator'
import { concatAll } from '../../utils/ramda'

const MyEditor: React.FC = () => {
	const decorator = compositeDecorators(tweetDecRules, entityDecRules)
	const [ editorState, setEditorState ] = useState(
		EditorState.createWithContent(blocks, decorator)
	)
	const editorRef = useRef(null)
	const onHandleKeyCommand = _(handleKeyCommand)(setEditorState)
	const onToggleInlineStyles = _(setInlineStyledState)(
		editorState,
		setEditorState
	)

	return (
		<div style={styleEditorBox}>
			<div>
				<button onClick={onToggleInlineStyles([ 'BOLD' ])}>加粗</button>
				<button onClick={onToggleInlineStyles([ 'ITALIC' ])}>倾斜</button>
				<button onClick={onToggleInlineStyles([ 'BOLD', 'ITALIC' ])}>
					加粗且倾斜
				</button>

				<button onClick={focusEditor(editorRef)}>聚焦</button>
				<button onClick={blurEditor(editorRef)}>失焦</button>
			</div>
			<Editor
				ref={editorRef}
				editorState={editorState}
				onChange={setEditorState}
				handleKeyCommand={onHandleKeyCommand}
				placeholder='Write a tweet...'
			/>
			<InputComp editorState={editorState} />
		</div>
	)
}

export default MyEditor

const styleEditorBox: CSSProperties = {
	display: 'block',
	width: '900px',
	height: '300px',
	margin: '10px auto',
	padding: '10px',
	border: '1px solid #eee',
	borderRadius: '10px',
	overflow: 'hidden',
	textAlign: 'left'
}
