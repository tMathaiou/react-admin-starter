export function removeEmpty(obj: any): any {
  const output: any = {}
  Object.entries(obj).forEach(([key, val]) => {
    if (val != null && val !== '' && val !== undefined) {
      output[key] = val
    }
  })

  return output
}

export function to<T, U = any>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err) => {
      if (errorExt) {
        Object.assign(err, errorExt)
      }

      return [err, undefined]
    })
}
