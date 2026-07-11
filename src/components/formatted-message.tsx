"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  TerminalSquare,
  FileJson,
  Database,
  Code2,
} from "lucide-react";

interface FormattedMessageProps {
  content: string;
  role: "user" | "bot";
}

const getLanguageIcon = (language: string) => {
  const lang = language.toLowerCase();
  if (["bash", "sh", "shell", "terminal", "powershell"].includes(lang)) {
    return <TerminalSquare size={14} className="text-cyan-400" />;
  }
  if (lang === "json") {
    return <FileJson size={14} className="text-yellow-400" />;
  }
  if (lang === "sql") {
    return <Database size={14} className="text-blue-400" />;
  }
  return <Code2 size={14} className="text-neutral-400" />;
};

function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const isTerminal = ["bash", "sh", "shell", "terminal", "powershell"].includes(
    language.toLowerCase()
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-4 not-prose">
      <div className="relative bg-neutral-950 rounded-lg border border-neutral-700/50 overflow-hidden shadow-lg">
        <div
          className={`flex items-center justify-between px-4 py-2 border-b border-neutral-700/50 ${
            isTerminal ? "bg-neutral-800" : "bg-neutral-800/50"
          }`}
        >
          <div className="flex items-center gap-2">
            {isTerminal && (
              <div className="flex space-x-1.5 mr-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
            )}
            {getLanguageIcon(language)}
            <span className="text-xs text-neutral-300 font-mono">
              {language || "code"}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded text-neutral-300 transition-all duration-200 ${
              copied
                ? "bg-green-600/50"
                : "bg-neutral-700/50 hover:bg-neutral-700"
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm leading-6 text-neutral-200 font-mono">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function FormattedMessage({
  content,
  role,
}: FormattedMessageProps) {
  const [showRaw, setShowRaw] = React.useState(false);

  const messageClasses =
    role === "user"
      ? "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 pl-4 py-3 rounded-r-lg"
      : "py-1";

  return (
    <div className={`relative group max-w-none ${messageClasses}`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-2 py-1 rounded flex items-center gap-1.5 transition-colors"
          title={showRaw ? "Show formatted" : "Show raw"}
        >
          {showRaw ? <Eye size={12} /> : <EyeOff size={12} />}
          <span>{showRaw ? "Formatted" : "Raw"}</span>
        </button>
      </div>

      <div className="pr-4 md:pr-16">
        {showRaw ? (
          <pre className="whitespace-pre-wrap font-mono text-sm bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md border dark:border-neutral-700 overflow-x-auto">
            {content}
          </pre>
        ) : (
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 leading-relaxed
            prose-p:my-2 prose-p:leading-7
            prose-headings:mt-5 prose-headings:mb-2 prose-headings:font-semibold
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-li:leading-7
            prose-blockquote:my-4 prose-blockquote:py-1 prose-blockquote:not-italic
            prose-strong:font-semibold prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-table:my-4 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2
            prose-img:rounded-lg prose-img:shadow-md"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeText = String(children).replace(/\n$/, "");
                  // Fenced blocks get the full code window; inline code stays inline
                  if (match || codeText.includes("\n")) {
                    return (
                      <CodeBlock
                        language={match?.[1] ?? ""}
                        code={codeText}
                      />
                    );
                  }
                  return (
                    <code
                      className="bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded-md text-sm font-mono before:content-none after:content-none"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                // CodeBlock renders its own <pre>; strip the default wrapper
                pre({ children }) {
                  return <>{children}</>;
                },
                a({ children, href, ...props }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
                table({ children }) {
                  return (
                    <div className="my-4 overflow-x-auto">
                      <table className="min-w-full border-collapse border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm">
                        {children}
                      </table>
                    </div>
                  );
                },
                th({ children }) {
                  return (
                    <th className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-left font-semibold">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="border border-neutral-200 dark:border-neutral-700">
                      {children}
                    </td>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
