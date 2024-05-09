"use client";

import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

interface ValueProps {
  title: string;
  content: string;
}

function Form() {
  const [values, setValues] = useState<ValueProps>({
    title: "",
    content: "",
  });

  const { userId } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(values);
    console.log(userId);
    insertPost();
    setValues({
      title: "",
      content: "",
    });
  }

  async function insertPost() {
    await db.insert(posts).values({
      title: values.title,
      content: values.content,
      userId: userId as string,
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
      <form onSubmit={handleSubmit}>
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
