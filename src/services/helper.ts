
export const saveLocalStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
    return true
  } catch (error) {
    return false
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key)
    if (!jsonData) return null
    return JSON.parse(jsonData)
  } catch (error) {
    return null
  }
}
export function setLocalStorage(key: string, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value); 
      localStorage.setItem(key, serializedValue); 
    } catch (error) { 
      console.error(`Error setting localStorage key "${key}":`, error); 
    } 
  }
  