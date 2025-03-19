export const exclude = <T, Key extends keyof T>(data: T, keys: Key[]): Omit<T, Key> =>
  Object.fromEntries(
    Object.entries(data).filter(([key]) => {
      return !keys.includes(key as Key) && data[key] != null
    })
  ) as Omit<T, Key>
