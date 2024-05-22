"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { State, addPost } from "~/server/actions";
import { UploadDropzone } from "./uploadthing";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const formSchema = z.object({
  title: z.string().min(2).max(256),
  content: z.string().min(2).max(10000),
  image_url: z.string().url(),
});

export type MyFormFields = z.infer<typeof formSchema>;

function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const { pending } = useFormStatus();

  const form = useForm<MyFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
    },
  });

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [state, formAction] = useFormState<State, FormData>(addPost, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    /* if (state.status === "success") {
      alert(state.message);
    } */
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form
          className="w-full max-w-xl py-3"
          ref={formRef}
          action={async (FormData) => {
            await formAction(FormData);
            setImageUrl(undefined);
            router.refresh();
            formRef.current?.reset();
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    placeholder="title"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="content"
                    className="resize-none rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <input
            className="hidden"
            type="text"
            name="imageurl"
            value={imageUrl ? imageUrl : undefined}
          />
          <div>
            {state?.message ? (
              <Alert className="my-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="mx-3">
                  <AlertTitle>alert!</AlertTitle>
                  <AlertDescription>{state?.message}</AlertDescription>
                </div>
              </Alert>
            ) : null}
          </div>
          {/* <div className="flex items-center justify-center">
          {imageUrl ? (
            <img className="w-1/2 p-3" src={imageUrl} />
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                setImageUrl(res[0]?.url);

                console.log("Files: ", imageUrl);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div> */}

          <Button className="mt-3 rounded-none" type="submit">
            submit
          </Button>
          {pending && <span>loading...</span>}
        </form>
      </Form>
    </div>
  );
}

export default PostForm;
