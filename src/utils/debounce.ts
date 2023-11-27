export const debounce = function (fn: Function, delay = 300) {
  let timer: ReturnType<typeof setTimeout>
  return function () {
    //@ts-ignore-next-line
    const context = this
    const args = arguments

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
