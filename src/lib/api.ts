export class ApiError extends Error {
  constructor(url: string, status: number){
    super(`'${url}' returned ${status}`);
    if(Error.captureStackTrace){
      Error.captureStackTrace(this, ApiError)
    }
    this.name = 'ApiError';
    this.cause = status 
  }
}

export async function fetchjson(url: string, options?: Object){
  const response = await fetch(url, options)
  if(!response.ok){
    throw new ApiError(url, response.status)
  }
  return await response.json()
}