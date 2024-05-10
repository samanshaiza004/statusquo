"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addPost } from "~/server/actions";
import { UploadDropzone } from "./uploadthing";

const initialState = {
  message: null,
};

function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [state, formAction] = useFormState(addPost, initialState);

  return (
    <div className="py-4">
      <form
        ref={formRef}
        action={async (FormData) => {
          await formAction(FormData);
          setImageUrl(undefined);
          formRef.current?.reset();
        }}
      >
        <input
          className="w-full rounded-t-md border-2 px-4 py-2"
          type="text"
          name="title"
          placeholder="title"
        />
        <textarea
          className="mb-2 w-full rounded-b-md border-2 px-4 py-2"
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
            className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-white transition hover:bg-slate-400"
            type="submit"
          >
            submit
          </button>
        </div>
        <div>
          {state?.message ? (
            <p className="text-white">{state?.message}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
