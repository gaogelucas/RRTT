import { DecoratorRules } from '../../../types/draft-js'
import { CompositeDecorator } from 'draft-js'
import { concatAll } from '../../../utils/ramda'

export const concatDecorators = (...decorators: DecoratorRules[]) =>
	concatAll(...decorators) as DecoratorRules

export const compositeDecorators = (...decorators: DecoratorRules[]) =>
	new CompositeDecorator(
		concatDecorators(...decorators)
	) as CompositeDecorator
