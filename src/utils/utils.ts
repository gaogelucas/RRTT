import { add, curry, flip, compose } from 'ramda'

/** 可循环的类型 */
export type Loopable = any[] | string

/** 加 1 运算 */
export const inc = add(1)

/** 减 1 运算 */
export const dec = add(-1)

/** 
 * mod :: (x: number -> y: number) -> number
 * 
 * 取余运算
 * @param x: 被除数
 * @param y: 除数
 * @return 余数
 */
export const mod = curry((x: number, y: number) => x % y)

/** 被取余运算 */
export const modBy = flip(mod)

/**
 * 得到循环索引的下一个索引
 * @param len 循环长度
 * @param ind 循环开始的索引
 */
export const nextInLoop = curry((len: number, ind: number) => modBy(len, inc(ind)))

/**
 * 得到Loopable的变量的循环索引中的下一个索引
 * @param arr Loopable的变量
 */
export const nextIn = (arr: Loopable) => nextInLoop(arr.length)