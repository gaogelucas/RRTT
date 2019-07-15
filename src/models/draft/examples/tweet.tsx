import React, { CSSProperties } from 'react'
import {
	CompositeDecorator,
	ContentBlock,
	ContentState,
	EditorState
} from 'draft-js'
import { JSXElement } from '@babel/types'

const HANDLE_REGEX = /@[\w]+/g
const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g

function handleStrategy (
	contentBlock: ContentBlock,
	callback: any,
	contentState: ContentState
) {
	findWithRegex(HANDLE_REGEX, contentBlock, callback)
}

function hashtagStrategy (
	contentBlock: ContentBlock,
	callback: any,
	contentState: ContentState
) {
	findWithRegex(HASHTAG_REGEX, contentBlock, callback)
}

function findWithRegex (
	regex: RegExp,
	contentBlock: ContentBlock,
	callback: any
) {
	const text = contentBlock.getText()
	let matchArr, start
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index
		callback(start, start + matchArr[0].length)
	}
}

const HandleSpan = (props: { offsetKey: string; children: JSXElement }) => {
	return (
		<span style={styles.handle} data-offset-key={props.offsetKey}>
			{props.children}
		</span>
	)
}

const HashtagSpan = (props: { offsetKey: string; children: JSXElement }) => {
	return (
		<span style={styles.hashtag} data-offset-key={props.offsetKey}>
			{props.children}
		</span>
	)
}

const logState = (editorState: EditorState) => console.log(editorState.toJS())

export const InputComp = (props: { editorState: EditorState }) => (
	<input
		onClick={() => logState(props.editorState)}
		style={styles.button}
		type='button'
		value='Log State'
	/>
)

export const decoratorRules = [
	{
		strategy: handleStrategy,
		component: HandleSpan
	},
	{
		strategy: hashtagStrategy,
		component: HashtagSpan
	}
]

export const compositeDecorator = new CompositeDecorator(decoratorRules)

const styles = {
	root:
		{
			fontFamily: "'Helvetica', sans-serif",
			padding: 20,
			width: 600
		} as CSSProperties,
	editor:
		{
			border: '1px solid #ddd',
			cursor: 'text',
			fontSize: 16,
			minHeight: 40,
			padding: 10
		} as CSSProperties,
	button:
		{
			marginTop: 10,
			textAlign: 'center'
		} as CSSProperties,
	handle:
		{
			color: 'rgba(98, 177, 254, 1.0)',
			direction: 'ltr',
			unicodeBidi: 'bidi-override'
		} as CSSProperties,
	hashtag:
		{
			color: 'rgba(95, 184, 138, 1.0)',
			display: 'inline-block',
			border: '1px solid #aaa',
			borderRadius: '5%',
			margin: '4px'
		} as CSSProperties
}
