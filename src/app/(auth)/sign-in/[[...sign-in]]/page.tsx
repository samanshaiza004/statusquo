import { SignIn } from "@clerk/nextjs";
import { useSignIn, useSignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
