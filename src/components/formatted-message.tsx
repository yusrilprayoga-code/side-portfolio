
interface FormattedMessageProps {
  content: string;
  role: "user" | "bot";
}

function formatBold(text: string) {
  // Replace **text** or *text* with <b>text</b>
  return text.replace(/\*\*([^*]+)\*\*|\*([^*]+)\*/g, (_, g1, g2) => `<b>${g1 || g2}</b>`);
}

export default function FormattedMessage({ content, role }: FormattedMessageProps) {
  const formatted = formatBold(content);
  return (
    <div
      className={`whitespace-pre-wrap ${role === "user" ? "text-white" : "text-foreground"}`}
      dangerouslySetInnerHTML={{ __html: formatted }}
    />
  );
}
