const FormattedMessage: React.FC<{ content: string; role: "user" | "bot" }> = ({
  content,
  role,
}) => {
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    let inCodeBlock = false;
    let stepCount = 0;
    let codeContent = "";

    const formatBoldText = (line: string) => {
      return line.split(/(\*\*.*?\*\*)/).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    return lines
      .map((line, index) => {
        if (line.startsWith("```")) {
          if (inCodeBlock) {
            const formattedCode = (
              //   <ScrollArea
              //     className="w-full max-h-[300px]"
              //     key={`code-${index}`}
              //   >
              //     <pre className="bg-muted p-2 rounded-md my-2 overflow-x-auto">
              //       <code>{codeContent}</code>
              //     </pre>
              //   </ScrollArea>
              <pre className="bg-muted p-2 rounded-md my-2 overflow-x-auto">
                <code>{codeContent}</code>
              </pre>
            );
            codeContent = "";
            inCodeBlock = false;
            return formattedCode;
          } else {
            inCodeBlock = true;
            return null;
          }
        }

        if (inCodeBlock) {
          codeContent += line + "\n";
          return null;
        }

        if (line.match(/^\d+\.\s/)) {
          stepCount++;
          return (
            <div key={index} className="ml-4 mb-2">
              <span className="font-bold mr-2">{stepCount}.</span>
              {formatBoldText(line.replace(/^\d+\.\s/, ""))}
            </div>
          );
        }

        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4 mb-1">
              {formatBoldText(line.substring(2))}
            </li>
          );
        }

        return (
          <p key={index} className="mb-2">
            {formatBoldText(line)}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <div
      className={`rounded-lg p-3 ${
        role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
    >
      {formatContent(content)}
    </div>
  );
};

export default FormattedMessage;
