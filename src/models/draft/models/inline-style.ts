import { EditorState, RichUtils } from 'draft-js'
import { reduce, pipe } from 'ramda'
import { SetEditorState } from '../../../types/draft-js'

export const inlineStyledState = (styles: string[], editorState: EditorState) =>
	reduce(RichUtils.toggleInlineStyle, editorState, styles)

export const setInlineStyledState = (
	editorState: EditorState,
	setEditorState: SetEditorState,
	styles: string[]
) => () => pipe(inlineStyledState, setEditorState)(styles, editorState)
