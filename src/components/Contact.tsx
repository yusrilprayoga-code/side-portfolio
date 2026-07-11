"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { generateChat } from "@/lib/ai-actions";
import { readStreamableValue } from "ai/rsc";

type FormField = {
  value: string;
  error: string;
};

type FormData = {
  name: FormField;
  email: FormField;
  message: FormField;
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Email is invalid."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters."),
});

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

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse({
      name: formData.name.value,
      email: formData.email.value,
      message: formData.message.value,
    });

    if (result.success) return true;

    const newFormData: FormData = {
      name: { ...formData.name, error: "" },
      email: { ...formData.email, error: "" },
      message: { ...formData.message, error: "" },
    };
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormData;
      if (field in newFormData && !newFormData[field].error) {
        newFormData[field].error = issue.message;
      }
    }
    setFormData(newFormData);
    return false;
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

      // readStreamableValue yields the full accumulated string each time —
      // replace, don't append (appending duplicates the whole message).
      for await (const chunk of readStreamableValue(output)) {
        if (chunk != null) generatedMessage = chunk;
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