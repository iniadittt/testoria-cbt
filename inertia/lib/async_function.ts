export const asyncFunction = async (func: Function): Promise<[any, any]> => {
  try {
    const data = await func()
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}
