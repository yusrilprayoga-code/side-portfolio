"use client";
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { generateChat } from "@/app/api/chat";
import { readStreamableValue } from "ai/rsc";
import { Message } from "@/types/message";

type FormField = {
  value: string;
  error: string;
};

type FormData = {
  name: FormField;
  email: FormField;
  message: FormField;
};

type ChatSession = {
  id: string;
  name: string;
  messages: Message[];
};

const defaultFormState: FormData = {
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  message: { value: "", error: "" },
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormState);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: "1",
    name: "New Chat",
    messages: [],
  });
  const { theme } = useTheme();

  const validateForm = (): boolean => {
    const newFormData = { ...formData };
    let isValid = true;

    if (!formData.name.value.trim()) {
      newFormData.name.error = "Name is required.";
      isValid = false;
    }

    if (!formData.email.value.trim()) {
      newFormData.email.error = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.value)) {
      newFormData.email.error = "Email is invalid.";
      isValid = false;
    }

    if (!formData.message.value.trim()) {
      newFormData.message.error = "Message is required.";
      isValid = false;
    }

    setFormData(newFormData);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { value, error: "" },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_h9hf4co",
        "template_kv6gx9t",
        {
          from_name: formData.name.value,
          to_name: "Yusril Prayoga",
          from_email: formData.email.value,
          to_email: "yusrilprayoga90@gmail.com",
          message: formData.message.value,
        },
        "FLVTZfnG-Bx5Y3q2X"
      );

      toast.success("Message sent successfully!");
      setFormData(defaultFormState);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAIMessage = async () => {
    setAiGenerating(true);
    try {
      const prompt = `Generate a professional and friendly contact message for a website. The message should include:
      1. A brief introduction
      2. The reason for contacting (keep it general)
      3. A polite request for a response
      4. A thank you note`;

      const { output } = await generateChat("", prompt);
      let generatedMessage = "";

      for await (const chunk of readStreamableValue(output)) {
        generatedMessage += chunk;
      }

      setFormData((prev) => ({
        ...prev,
        message: { value: generatedMessage, error: "" },
      }));

      toast.success("AI message generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate AI message. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            className={`bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 py-2 rounded-md text-sm text-neutral-700 w-full ${
              formData.name.error ? "ring-2 ring-red-500" : ""
            }`}
            value={formData.name.value}
            name="name"
            required
            id="name"
            onChange={handleChange}
          />
          {formData.name.error && (
            <p className="text-red-500 text-xs mt-1">{formData.name.error}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Your email address"
            className={`bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 py-2 rounded-md text-sm text-neutral-700 w-full ${
              formData.email.error ? "ring-2 ring-red-500" : ""
            }`}
            value={formData.email.value}
            name="email"
            id="email"
            required
            onChange={handleChange}
          />
          {formData.email.error && (
            <p className="text-red-500 text-xs mt-1">{formData.email.error}</p>
          )}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className={`bg-neutral-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full ${
            formData.message.error ? "ring-2 ring-red-500" : ""
          }`}
          value={formData.message.value}
          name="message"
          id="message"
          required
          onChange={handleChange}
        />
        {formData.message.error && (
          <p className="text-red-500 text-xs mt-1">{formData.message.error}</p>
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="w-full px-2 py-2 mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white rounded-md font-bold text-neutral-500
       focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 hover:bg-neutral-200 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out
        "
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        <button
          type="button"
          onClick={handleGenerateAIMessage}
          disabled={aiGenerating}
          className="w-full px-2 py-2 mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white rounded-md font-bold text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-gray-600 hover:bg-neutral-200 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out"
        >
          {aiGenerating ? "Generating..." : "Write With AI"}
        </button>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </form>
  );
};