export function sliceByNumber<T>(array: T[], number:number): T[][] {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill(undefined).map((_, i) => 
    array.slice(i * number, (i + 1) * number)
  )
}