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

  const inputBase =
    "w-full border-2 border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <form onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="w-full">
          <label htmlFor="name" className="label-mono mb-2 block">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className={`${inputBase} ${
              formData.name.error ? "border-accent" : ""
            }`}
            value={formData.name.value}
            name="name"
            required
            id="name"
            onChange={handleChange}
          />
          {formData.name.error && (
            <p className="mt-1 font-mono text-xs text-accent">
              {formData.name.error}
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="email" className="label-mono mb-2 block">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`${inputBase} ${
              formData.email.error ? "border-accent" : ""
            }`}
            value={formData.email.value}
            name="email"
            id="email"
            required
            onChange={handleChange}
          />
          {formData.email.error && (
            <p className="mt-1 font-mono text-xs text-accent">
              {formData.email.error}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="label-mono mb-2 block">
          Message
        </label>
        <textarea
          placeholder="What are we building?"
          rows={10}
          className={`${inputBase} ${
            formData.message.error ? "border-accent" : ""
          }`}
          value={formData.message.value}
          name="message"
          id="message"
          required
          onChange={handleChange}
        />
        {formData.message.error && (
          <p className="mt-1 font-mono text-xs text-accent">
            {formData.message.error}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex w-full items-center justify-center gap-2 border-2 border-line bg-fg px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-colors duration-150 hover:bg-accent hover:text-accent-ink hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send message"}
        </button>
        <button
          type="button"
          onClick={handleGenerateAIMessage}
          disabled={aiGenerating}
          className="inline-flex w-full items-center justify-center gap-2 border-2 border-line bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-fg transition-colors duration-150 hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aiGenerating ? "Generating..." : "Write with AI"}
        </button>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0a0a0a",
            color: "#f5f5f5",
            border: "2px solid #f5f5f5",
            borderRadius: "0",
          },
        }}
      />
    </form>
  );
};
