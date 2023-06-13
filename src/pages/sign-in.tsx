import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { fetchjson } from "@/lib/api";
import { useRouter } from "next/router";
import { useState } from "react";

// function sleep(ms: number){
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false})

  const handleSubmit = async (event: any) => {
    try{
    event.preventDefault()
    setStatus({ loading: true, error: false})
    // await sleep(2000)
    const response = await fetchjson('/api/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    })

    setStatus({ loading: false, error: false})

    console.log(response)
    router.push('/')
    } catch (err) {
      setStatus({ loading: false, error: true})
    }
  }

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          /> 
        </Field>
        { status.error && (
          <p className="text-red-700">Invalid Credentials</p>
        )
        }
        {status.loading ? (
          <p>Loading...</p>
        ) : 
          <Button type="submit">Sign In</Button>
        }
      </form>
    </Page>
  );
}

export default SignInPage;
