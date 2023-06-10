export async function fetchjson(url: string){
  const response = await fetch(url)
  if(!response.ok){
    throw new Error(`request failed: ${response.status}`)
  }
  return await response.json()
}