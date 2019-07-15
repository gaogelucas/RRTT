import * as R from 'ramda'

/**
 * **判断**：不是`nill`则为真，否则为假
 * @param tested `any`
 * @return `boolean`
 */
export const isNotNil = R.pipe(R.isNil, R.not)

/**
 * **逻辑**：如果不是`nil`的`ifElse`
 * @param onNotNil `Function`
 * @param onNil `Function`
 * @param tested `any`
 * @return `any`
 */
export const ifNotNilElse = R.ifElse(isNotNil)

/**
 * **逻辑**: 如果是`nil`的`ifElse`
 * @param onNil `Function`
 * @param onNotNil `Function`
 * @param tested `any`
 * @return `any`
 */
export const ifNilElse = R.ifElse(R.isNil)

/**
 * **逻辑**: 如果是`nil`，返回`null`，否则`onNotNil`
 * @param onNotNil `Function`
 * @param tested `any`
 * @return `any`
 */
export const nullOr = ifNilElse(R.always(null))

//@ts-ignore
export const concatAll: ((...arrs: any[]) => any[]) = R.unapply(
	//@ts-ignore
	R.reduce(R.concat, [])
)
