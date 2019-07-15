import {
	convertFromRaw,
	convertToRaw,
	CompositeDecorator,
	Editor,
	EditorState,
	RawDraftContentState,
	ContentBlock,
	ContentState,
	DraftEntityMutability
} from 'draft-js'
import React, { CSSProperties } from 'react'

//@ts-ignore
const rawContent = {
	blocks:
		[
			{
				text:
					'This is an "immutable" entity: Superman. Deleting any ' +
					'characters will delete the entire entity. Adding characters ' +
					'will remove the entity from the range.',
				type: 'unstyled',
				entityRanges: [ { offset: 31, length: 8, key: 'first' } ]
			},
			{
				text: '',
				type: 'unstyled'
			},
			{
				text:
					'This is a "mutable" entity: Batman. Characters may be added ' +
					'and removed.',
				type: 'unstyled',
				entityRanges: [ { offset: 28, length: 6, key: 'second' } ]
			},
			{
				text: '',
				type: 'unstyled'
			},
			{
				text:
					'This is a "segmented" entity: Green Lantern. Deleting any ' +
					'characters will delete the current "segment" from the range. ' +
					'Adding characters will remove the entire entity from the range.',
				type: 'unstyled',
				entityRanges: [ { offset: 30, length: 13, key: 'third' } ]
			}
		],
	entityMap:
		{
			first:
				{
					type: 'TOKEN',
					mutability: 'IMMUTABLE'
				},
			second:
				{
					type: 'TOKEN',
					mutability: 'MUTABLE'
				},
			third:
				{
					type: 'TOKEN',
					mutability: 'SEGMENTED'
				}
		}
} as RawDraftContentState

export const blocks = convertFromRaw(rawContent)

function getEntityStrategy (mutability: DraftEntityMutability) {
	return function (
		contentBlock: ContentBlock,
		callback: any,
		contentState: ContentState
	) {
		contentBlock.findEntityRanges(character => {
			const entityKey = character.getEntity()
			if (entityKey === null) {
				return false
			}
			return (
				contentState.getEntity(entityKey).getMutability() === mutability
			)
		}, callback)
	}
}
function getDecoratedStyle (mutability: DraftEntityMutability) {
	switch (mutability) {
		case 'IMMUTABLE':
			return styles.immutable
		case 'MUTABLE':
			return styles.mutable
		case 'SEGMENTED':
			return styles.segmented
	}
}

const TokenSpan = (props: {
	contentState: ContentState
	entityKey: string
	offsetkey: string
	style: CSSProperties
	children: JSX.Element
}) => {
	const style = getDecoratedStyle(
		props.contentState.getEntity(props.entityKey).getMutability()
	)
	return (
		<span data-offset-key={props.offsetkey} style={style}>
			{props.children}
		</span>
	)
}

export const decoratorRules = [
	{
		strategy: getEntityStrategy('IMMUTABLE'),
		component: TokenSpan
	},

	{
		strategy: getEntityStrategy('MUTABLE'),
		component: TokenSpan
	},
	{
		strategy: getEntityStrategy('SEGMENTED'),
		component: TokenSpan
	}
]

export const decorator = new CompositeDecorator(decoratorRules)

const styles: { [prop: string]: CSSProperties } = {
	root:
		{
			fontFamily: "'Helvetica', sans-serif",
			padding: 20,
			width: 600
		},
	editor:
		{
			border: '1px solid #ccc',
			cursor: 'text',
			minHeight: 80,
			padding: 10
		},
	button:
		{
			marginTop: 10,
			textAlign: 'center'
		},
	immutable:
		{
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
			padding: '2px 0'
		},
	mutable:
		{
			backgroundColor: 'rgba(204, 204, 255, 1.0)',
			padding: '2px 0'
		},
	segmented:
		{
			backgroundColor: 'rgba(248, 222, 126, 1.0)',
			padding: '2px 0'
		}
}
