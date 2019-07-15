import { EditorState, ContentBlock, ContentState } from 'draft-js'

/**
 * `Draft` 的 `Handler`的返回值。
 */
export enum HandleResult {
	/** 已经被正确处理，无需进一步处理 */
	Handled = 'handled',
	/** 没有被正确处理，还需要进一步处理 */
	NotHandled = 'not-handled'
}
/**
 * `SetEditorState` 的 `type`
 */
export type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>

export type DecoratorRule = {
	strategy: (
		block: ContentBlock,
		callback: (start: number, end: number) => void,
		contentState: ContentState
	) => void
	component: (props: any) => JSX.Element
}

export type DecoratorRules = DecoratorRule[]
