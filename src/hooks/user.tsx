import { fetchjson } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USER_QUERY_KEY = 'user'

export function useSignin(){
  const queryClient = useQueryClient()
  const mutation = useMutation({mutationFn: ({email, password}: any) => fetchjson('/api/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    })
  })
  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({email, password})
        queryClient.setQueryData([USER_QUERY_KEY], user)
        return true
      } catch (err){
        return false
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  }
}

export function useSignOut(){
  const queryClient = useQueryClient()
  const mutation = useMutation(() => fetchjson('/api/logout'))
  return async () => {
    await mutation.mutateAsync()
    queryClient.setQueryData([USER_QUERY_KEY], undefined)
  }
}

export function useUser() {
  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: async () => {
      try {
        return await fetchjson("/api/user");
      } catch (err) {
        return undefined;
      }
    },
    cacheTime: Infinity,
    staleTime: 30_000,
  });

  return query.data;
}
