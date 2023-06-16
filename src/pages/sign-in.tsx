import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { useSignin } from "@/hooks/user";
import { useRouter } from "next/router";
import { useState } from "react";

// function sleep(ms: number){
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { signIn, signInError, signInLoading } = useSignin()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const valid = await signIn(email, password)
    if(valid){
      router.push('/')
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
        { signInError && (
          <p className="text-red-700">Invalid Credentials</p>
        )
        }
        { signInLoading ? (
          <p>Loading...</p>
        ) : 
          <Button type="submit">Sign In</Button>
        }
      </form>
    </Page>
  );
}

export default SignInPage;
