import * as React from "react";
import { Copy, Check, Eye, EyeOff, TerminalSquare, FileJson, Database, Code2 } from "lucide-react";

interface FormattedMessageProps {
  content: string;
  role: "user" | "bot";
}

// Helper function to escape HTML characters
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Enhanced Syntax Highlighting
const syntaxHighlight = (code: string, language: string): string => {
  const lang = language.toLowerCase();
  let highlightedCode = escapeHtml(code);

  if (['bash', 'sh', 'shell', 'terminal'].includes(lang)) {
    return code.split('\n').map(line => {
      line = escapeHtml(line);
      if (line.trim().startsWith('#')) {
        return `<span class="text-gray-500">${line}</span>`;
      }
      return line.replace(/^(\$|#|&gt;)\s*/, (match, prompt) => {
        const command = line.substring(match.length);
        const parts = command.split(' ');
        const mainCommand = parts[0];
        const args = parts.slice(1).join(' ');
        return `<span class="text-gray-500 select-none">${prompt} </span><span class="text-cyan-300 font-semibold">${mainCommand}</span> <span class="text-gray-100">${args.replace(/(--?\w+)/g, '<span class="text-purple-400">$1</span>')}</span>`;
      });
    }).join('\n');
  }

  const rules = {
    comment: /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm,
    string: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
    number: /\b(\d+(\.\d+)?)\b/g,
    keyword: /\b(const|let|var|function|return|if|else|for|while|class|import|export|async|await|try|catch|def|from|with|as|public|private|static|new|this|true|false|null|undefined)\b/g,
    functionCall: /(\w+)(?=\()/g,
    operator: /([+\-*/%=&|<>!]+)/g,
    punctuation: /([{}()[\].,:;])/g,
    tag: /(&lt;\/?[\w\s="/.':;#-]*&gt;)/g,
  };

  highlightedCode = highlightedCode
    .replace(rules.comment, `<span class="text-gray-500 italic">$1</span>`)
    .replace(rules.string, `<span class="text-green-400">$1$2$1</span>`)
    .replace(rules.number, `<span class="text-orange-400">$1</span>`)
    .replace(rules.keyword, `<span class="text-blue-400 font-semibold">$1</span>`)
    .replace(rules.functionCall, `<span class="text-yellow-300">$1</span>`)
    .replace(rules.operator, `<span class="text-purple-400">$1</span>`)
    .replace(rules.punctuation, `<span class="text-gray-400">$1</span>`)
    .replace(rules.tag, `<span class="text-red-400">$1</span>`);

  return highlightedCode;
};

const getLanguageIcon = (language: string) => {
    const lang = language.toLowerCase();
    if (['bash', 'sh', 'shell', 'terminal'].includes(lang)) {
        return <TerminalSquare size={14} className="mr-2 text-cyan-400" />;
    }
    if (['json'].includes(lang)) {
        return <FileJson size={14} className="mr-2 text-yellow-400" />;
    }
    if (['sql'].includes(lang)) {
        return <Database size={14} className="mr-2 text-blue-400" />;
    }
    return <Code2 size={14} className="mr-2 text-gray-400" />;
}

// A simplified code formatter inspired by Prettier
const prettierCode = (code: string, language: string): string => {
  const lang = language.toLowerCase();
  // Only apply to languages where it makes sense
  if (!['javascript', 'typescript', 'js', 'ts', 'json', 'css'].includes(lang)) {
    return code; // Return original code if language is not supported
  }

  let formattedCode = '';
  let indentLevel = 0;
  const indentSize = 2;

  const lines = code.split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Adjust indentation level BEFORE processing the line
    if (line.startsWith('}') || line.startsWith(']') || line.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add indentation
    if (line) {
       formattedCode += ' '.repeat(indentLevel * indentSize) + line + '\n';
    } else {
       formattedCode += '\n'; // Preserve empty lines
    }

    // Adjust indentation level AFTER processing the line
    if (line.endsWith('{') || line.endsWith('[') || line.endsWith('(')) {
      indentLevel++;
    }
  }

  // Basic spacing improvements
  formattedCode = formattedCode
    .replace(/ ?([=+\-*/%<>!&|,:;]) ?/g, ' $1 ') // Add space around operators and punctuation
    .replace(/\s*([{}()\[\]])\s*/g, ' $1 ') // Ensure space around brackets
    .replace(/(\s\s+)/g, ' ') // Collapse multiple spaces into one
    .replace(/ \}/g, '}') // Clean up spacing before closing braces
    .replace(/\{ /g, '{')
    .replace(/ \)/g, ')')
    .replace(/\( /g, '(')
    .trim();

  // Add semicolons for JS/TS
  if (['javascript', 'typescript', 'js', 'ts'].includes(lang)) {
      formattedCode = formattedCode.split('\n').map(line => {
          const trimmed = line.trim();
          // Conditions to NOT add a semicolon
          const shouldSkip = !trimmed ||
                             trimmed.endsWith(';') ||
                             trimmed.endsWith('{') ||
                             trimmed.endsWith('}') ||
                             trimmed.endsWith(',') ||
                             trimmed.endsWith('(') ||
                             trimmed.startsWith('//') ||
                             trimmed.startsWith('/*') ||
                             trimmed.match(/^(if|for|while|switch)\s*\(.*\)$/);

          if (shouldSkip) {
              return line;
          }
          return line + ';';
      }).join('\n');
  }

  return formattedCode;
};


// Main Text Formatting Function
function formatText(text: string): string {
  const blocks: string[] = [];
  const saveBlock = (block: string) => {
    const token = `__BLOCK_${blocks.length}__`;
    blocks.push(block);
    return `\n\n${token}\n\n`;
  };

  let formatted = `\n${text}\n`;

  // 1. Isolate and format code blocks
  formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (_, language, code) => {
    const lang = language || 'plaintext';
    const trimmedCode = code.trim();
    // Apply prettier formatting before syntax highlighting
    const formattedCode = prettierCode(trimmedCode, lang);
    const highlightedCode = syntaxHighlight(formattedCode, lang);
    const showLineNumbers = formattedCode.split('\n').length > 1;

    let codeHTML = highlightedCode;
    if (showLineNumbers) {
      const highlightedLines = highlightedCode.split('\n');
      codeHTML = highlightedLines.map((line, index) => {
        const lineNum = (index + 1).toString();
        return `<div class="flex"><span class="text-gray-600 select-none mr-4 text-right w-6">${lineNum}</span><div class="flex-1">${line || '&nbsp;'}</div></div>`;
      }).join('');
    }

    const isTerminal = ['bash', 'sh', 'shell', 'terminal'].includes(lang.toLowerCase());
    const headerBg = isTerminal ? 'bg-gray-800' : 'bg-gray-800/50';
    
    const codeBlockHtml = `
      <div class="my-4 group code-block-wrapper" data-language="${lang}" data-raw-code="${escapeHtml(trimmedCode)}">
        <div class="relative bg-gray-950/50 rounded-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden shadow-lg">
          <div class="flex items-center justify-between px-4 py-2 ${headerBg} border-b border-gray-700/50">
            <div class="flex items-center">
              ${isTerminal ? `<div class="flex space-x-1.5 mr-3"><div class="w-2.5 h-2.5 rounded-full bg-red-500"></div><div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><div class="w-2.5 h-2.5 rounded-full bg-green-500"></div></div>` : ''}
              <span class="text-xs text-gray-300 font-mono flex items-center">${getLanguageIcon(lang).props.dangerouslySetInnerHTML ? '' : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 ${isTerminal ? 'text-cyan-400' : 'text-gray-400'}"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><path d="M2 17h20"></path><path d="M6 11h2"></path><path d="M10 11h2"></path></svg>`}${lang}</span>
            </div>
            <button class="copy-code-btn flex items-center gap-1.5 text-xs bg-gray-700/50 hover:bg-gray-700 px-2 py-1 rounded text-gray-300 transition-all duration-200">
              <span class="copy-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span>
              <span class="check-icon hidden"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <span class="copy-text">Copy</span>
            </button>
          </div>
          <div class="overflow-x-auto"><pre class="p-4 text-sm leading-6"><code class="font-mono text-gray-200 block">${codeHTML}</code></pre></div>
        </div>
      </div>`;
    return saveBlock(codeBlockHtml);
  });

  // 2. Isolate and format Tables
  formatted = formatted.replace(/^\|(.+)\|\n\|([-\s|:]+)\|\n((?:\|.*(?:\n|$))*)/gm, (match, headerLine, separatorLine, bodyLines) => {
      const headers = headerLine.split('|').slice(1, -1).map((h: string) => h.trim());
      const rows = bodyLines.trim().split('\n').map((rowLine: string) => rowLine.split('|').slice(1, -1).map((c: string) => c.trim()));

      const thead = `<thead><tr class="bg-gray-50 dark:bg-gray-800/50">${headers.map((h: any) => `<th class="px-4 py-2 border border-gray-200 dark:border-gray-700 text-left text-sm font-semibold">${h}</th>`).join('')}</tr></thead>`;
      
      const tbody = `<tbody>${rows.map((row: any[]) => 
          `<tr class="hover:bg-gray-100/50 dark:hover:bg-gray-700/20">${row.map((cell: any) => 
              `<td class="px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm">${cell}</td>`
          ).join('')}</tr>`
      ).join('')}</tbody>`;

      const tableHtml = `<div class="my-4 overflow-x-auto"><table class="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">${thead}${tbody}</table></div>`;
      return saveBlock(tableHtml);
  });

  // 3. Process remaining markdown
  const processInlines = (line: string): string => {
    return line
      .replace(/\*\*([^\*\n]+)\*\*|__([^_]+)__/g, `<strong class="font-semibold">$1$2</strong>`)
      .replace(/(?<!\*)\*([^\*\n]+)\*(?!\*)|(?<!_)_([^_]+)_(?!_)/g, `<em class="italic">$1$2</em>`)
      .replace(/~~([^~]+)~~/g, `<del class="opacity-75">$1</del>`)
      .replace(/`([^`\n]+)`/g, `<code class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono">${escapeHtml("$1")}</code>`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 hover:underline">$1</a>`);
  };

  const chunks = formatted.split(/\n\n+/).filter(c => c.trim() !== '');
  let html = '';

  for (const chunk of chunks) {
    const trimmedChunk = chunk.trim();
    if (trimmedChunk.startsWith('__BLOCK_')) {
      html += trimmedChunk;
      continue;
    }

    // Headings
    if (trimmedChunk.startsWith('#')) {
      const match = trimmedChunk.match(/^(#{1,6})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const content = processInlines(match[2]);
        const sizes = ['text-2xl font-bold', 'text-xl font-semibold', 'text-lg font-semibold', 'text-base font-semibold', 'text-sm font-semibold', 'text-xs font-semibold'];
        const style = `class="${sizes[level-1] || 'text-base'} mt-4 mb-2"`;
        html += `<h${level} ${style}>${content}</h${level}>`;
        continue;
      }
    }
    
    // Horizontal Rule
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmedChunk)) {
      html += '<hr class="my-6 border-gray-200 dark:border-gray-700"/>';
      continue;
    }

    // Blockquotes
    if (trimmedChunk.startsWith('>')) {
      const content = trimmedChunk.split('\n').map(line => processInlines(line.replace(/^>\s?/, ''))).join('<br/>');
      html += `<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 pl-4 py-2 my-3 italic text-gray-600 dark:text-gray-400">${content}</blockquote>`;
      continue;
    }

    // Lists
    if (/^(\s*[*+-]|\s*\d+\.)\s+/.test(trimmedChunk)) {
        const lines = trimmedChunk.split('\n');
        const isOrdered = /^\s*\d+\./.test(lines[0]);
        const tag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered ? 'list-decimal' : 'list-disc';

        let listHtml = `<${tag} class="my-3 ml-5 ${listClass} space-y-2">`;
        for (const line of lines) {
            let content = line.replace(/^(\s*[*+-]|\s*\d+\.)\s+/, '');
            
            if (/^\[\s?\]/.test(content)) {
                content = processInlines(content.replace(/^\[\s?\]\s*/, ''));
                listHtml += `<li class="flex items-center gap-3"><input type="checkbox" disabled class="form-checkbox h-4 w-4 rounded bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-default"><span>${content}</span></li>`;
            } else if (/^\[x\]/i.test(content)) {
                content = processInlines(content.replace(/^\[x\]\s*/i, ''));
                listHtml += `<li class="flex items-center gap-3 text-gray-500 dark:text-gray-400 line-through"><input type="checkbox" disabled checked class="form-checkbox h-4 w-4 rounded text-blue-500 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-default"><span>${content}</span></li>`;
            } else {
                content = processInlines(content);
                listHtml += `<li>${content}</li>`;
            }
        }
        listHtml += `</${tag}>`;
        html += listHtml;
        continue;
    }

    // Default to paragraph
    html += `<p>${processInlines(trimmedChunk.replace(/\n/g, '<br/>'))}</p>`;
  }

  // Restore saved blocks
  html = html.replace(/__BLOCK_(\d+)__/g, (_, index) => blocks[parseInt(index, 10)]);

  return html;
}


export default function FormattedMessage({ content, role }: FormattedMessageProps) {
  const [showRaw, setShowRaw] = React.useState(false);
  const messageRef = React.useRef<HTMLDivElement>(null);

  const formattedContent = React.useMemo(() => formatText(content), [content]);

  React.useEffect(() => {
    if (showRaw) return;

    const container = messageRef.current;
    if (!container) return;

    const copyButtons = container.querySelectorAll('.copy-code-btn');
    const handlers: (() => void)[] = [];

    copyButtons.forEach(button => {
      const wrapper = button.closest('.code-block-wrapper');
      if (!wrapper) return;

      const rawCode = (wrapper as HTMLElement).dataset.rawCode;
      if (!rawCode) return;

      const handler = () => {
        navigator.clipboard.writeText(rawCode).then(() => {
          const copyText = button.querySelector('.copy-text');
          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');

          if (copyText) copyText.textContent = 'Copied!';
          if (copyIcon) (copyIcon as HTMLElement).classList.add('hidden');
          if (checkIcon) (checkIcon as HTMLElement).classList.remove('hidden');

          button.classList.add('bg-green-600/50');

          setTimeout(() => {
            if (copyText) copyText.textContent = 'Copy';
            if (copyIcon) (copyIcon as HTMLElement).classList.remove('hidden');
            if (checkIcon) (checkIcon as HTMLElement).classList.add('hidden');
            button.classList.remove('bg-green-600/50');
          }, 2000);
        });
      };

      button.addEventListener('click', handler);
      handlers.push(() => button.removeEventListener('click', handler));
    });

    return () => handlers.forEach(h => h());
  }, [formattedContent, showRaw]);

  const messageClasses = role === "user"
    ? "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 pl-4 py-3 rounded-r-lg"
    : "bg-white dark:bg-gray-900 py-3";

  return (
    <div ref={messageRef} className={`relative group max-w-none ${messageClasses}`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded flex items-center gap-1.5 transition-colors"
          title={showRaw ? "Show formatted" : "Show raw"}
        >
          {showRaw ? <Eye size={12} /> : <EyeOff size={12} />}
          <span>{showRaw ? "Formatted" : "Raw"}</span>
        </button>
      </div>

      <div className="pr-4 md:pr-16">
        {showRaw ? (
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md border dark:border-gray-700 overflow-x-auto">
            {content}
          </pre>
        ) : (
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-p:mb-2 prose-headings:my-3 prose-blockquote:my-2 prose-ul:my-2 prose-ol:my-2"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        )}
      </div>
    </div>
  );
}