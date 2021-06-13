/**
 基础数据类型
 1. boolean
 2. number
 3. string
 4. null
 5. 数组
 6. 元组(Tuple)
 7. 枚举(enum)
 8. any
 9. void
 10. object
 11. never
 12. undefined
 */
let isTrue: boolean = false
let total: number

console.log(isTrue)
console.log(total)

let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 4]
let list3: any [] = [1, "2", false]
console.log(list1)
console.log(list2)
console.log(list3)

// Tuple
let pre: [number, string] = [1, "starry"]
pre.push(3)
console.log(pre)

let union: string | number
let n: 1 | 2 | 3
n = 2
union = 1
// union = true

// Enum
enum Color { red = 9, blue = "blue", green = "green"}

let color = Color.green
console.log(color)



