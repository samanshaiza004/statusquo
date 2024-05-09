"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addPost } from "~/server/actions";

const initialState = {
  message: null,
};

function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(addPost, initialState);

  return (
    <div className="py-4">
      <form
        ref={formRef}
        action={async (FormData) => {
          await formAction(FormData);
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
        <div className="item-center flex justify-between">
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

export default Form;
