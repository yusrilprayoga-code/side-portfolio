"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { GlobeDemo } from "./GlobeDemo";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: {
        value,
        error: "",
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_h9hf4co',
        'template_kv6gx9t',
        {
          from_name: formData.name.value,
          to_name: "Yusril Prayoga",
          from_email: formData.email.value,
          to_email: "yusrilprayoga90@gmail.com",
          message: formData.message.value,
        },
        'FLVTZfnG-Bx5Y3q2X'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setFormData({
            name: {
              value: "",
              error: "",
            },
            email: {
              value: "",
              error: "",
            },
            message: {
              value: "",
              error: "",
            },
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <form className="form" action="" method="POST" onSubmit={handleSubmit} ref={formRef}>
      <GlobeDemo />
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
          value={formData.name.value}
          name="name"
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Your email address"
          className="bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
          value={formData.email.value}
          name="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className="bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
          value={formData.message.value}
          name="message"
          id="message"
          onChange={handleChange}
        />
      </div>
      <button
        className="w-full px-2 py-2 mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white rounded-md font-bold text-neutral-500"
        type="submit"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};
