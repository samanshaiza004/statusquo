// src/app/auth/authPage.tsx
import React from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

const AuthPage = () => {
  return (
    <div>
      <h1>Sign In / Sign Up</h1>
      <SignIn
        path="/auth/sign-in"
        routing="path"
        signUpUrl="/auth/sign-up"
        afterSignInUrl="/api/auth/newuser"
      />
      <SignUp
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
        afterSignUpUrl="/api/auth/newuser"
      />
    </div>
  );
};

export default AuthPage;
