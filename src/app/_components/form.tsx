"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { addPost } from "~/server/actions";

interface ValueProps {
  title: string;
  content: string;
}

function Form() {
  const [values, setValues] = useState<ValueProps>({
    title: "",
    content: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setValues({
      title: "",
      content: "",
    });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="">
      <form action={addPost}>
        <input
          onChange={handleChange}
          value={values.title}
          type="text"
          name="title"
          placeholder="title"
        />
        <textarea
          onChange={handleChange}
          value={values.content}
          name="content"
          placeholder="content"
        />
        <button className="text-white" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Form;
