export const focusEditor = (editorRef: React.MutableRefObject<any>) => () =>
	//@ts-ignore
	editorRef.current.focus() as void

export const blurEditor = (editorRef: React.MutableRefObject<any>) => () =>
	//@ts-ignore
	editorRef.current.blur() as void
