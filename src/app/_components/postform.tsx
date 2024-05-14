"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addPost } from "~/server/actions";
import { UploadDropzone } from "./uploadthing";
import { useRouter } from "next/navigation";

const initialState = {
  message: null,
};

function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [state, formAction] = useFormState(addPost, initialState);

  return (
    <div className="flex items-center justify-center px-1 py-4">
      <form
        ref={formRef}
        action={async (FormData) => {
          await formAction(FormData);
          setImageUrl(undefined);
          formRef.current?.reset();
        }}
      >
        <input
          className="input w-full max-w-lg rounded-none"
          type="text"
          name="title"
          placeholder="title"
        />
        <textarea
          className="textarea w-full max-w-lg rounded-none"
          name="content"
          placeholder="content"
        />

        <p
          className="hidden"
          id="imageurl"
          content={imageUrl ? imageUrl : undefined}
        ></p>
        <input
          className="hidden"
          type="text"
          name="imageurl"
          value={imageUrl ? imageUrl : undefined}
        />
        <div className="flex items-center justify-center">
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
          <button
            onClick={router.refresh}
            className="btn mx-3 rounded-none"
            type="submit"
          >
            submit
          </button>
        </div>
        <div>
          {state?.message ? (
            <div className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
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
              <span>{state?.message}</span>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
