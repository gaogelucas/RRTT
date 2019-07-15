import { SetEditorState, HandleResult } from '../../../types/draft-js';
import { DraftEditorCommand, EditorState, RichUtils } from 'draft-js';
import { pipe, always } from 'ramda';
import { ifNotNilElse } from '../../../utils/ramda';

/**
 * 将指令集映射为新的editorState
 * @param command 指令集
 * @param editorState 
 */
const mapKeyCommandToState = (
	command: DraftEditorCommand,
	editorState: EditorState
) => RichUtils.handleKeyCommand(editorState, command)

/**
 * handleKeyCommand
 * @param setEditorState 
 */
export const handleKeyCommand = (
	setEditorState: SetEditorState,
	command: DraftEditorCommand,
	editorState: EditorState
) =>
	pipe(
		mapKeyCommandToState,
		ifNotNilElse(
			pipe(setEditorState, always(HandleResult.Handled)),
			always(HandleResult.NotHandled)
		)
	)(command, editorState) as HandleResult
