import { useState, useRef, useCallback } from "react";
import { Copy, CheckCircle, Eye, Code2, Paintbrush, Trash2 } from "lucide-react";

export function WysiwygEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"wysiwyg" | "source">("wysiwyg");
  const [copied, setCopied] = useState(false);

  const getHtml = useCallback(() => {
    return editorRef.current?.innerHTML || "";
  }, []);

  const setHtml = useCallback((html: string) => {
    if (editorRef.current) editorRef.current.innerHTML = html;
  }, []);

  const exec = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const copyHtml = async () => {
    const html = getHtml();
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = html;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanStyles = () => {
    // Strip inline styles, class names, and font tags
    const html = getHtml();
    const cleaned = html
      .replace(/\s*style="[^"]*"/gi, "")
      .replace(/\s*class="[^"]*"/gi, "")
      .replace(/<font[^>]*>/gi, "<span>")
      .replace(/<\/font>/gi, "</span>")
      .replace(/<span>\s*<\/span>/gi, "");
    setHtml(cleaned);
  };

  const ToolbarBtn = ({ cmd, label, icon, value }: { cmd: string; label: string; icon?: string; value?: string }) => (
    <button
      onClick={() => exec(cmd, value)}
      className="px-2 py-1 text-xs rounded border border-border hover:bg-accent hover:border-primary/30 transition-colors"
      title={label}
    >
      {icon || label}
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-accent/20 rounded-lg border border-border">
        {/* Text formatting */}
        <ToolbarBtn cmd="bold" label="Bold" icon="B" />
        <ToolbarBtn cmd="italic" label="Italic" icon="I" />
        <ToolbarBtn cmd="underline" label="Underline" icon="U" />
        <ToolbarBtn cmd="strikeThrough" label="Strikethrough" icon="S" />
        <span className="w-px h-5 bg-border mx-1" />
        {/* Headings */}
        <ToolbarBtn cmd="formatBlock" label="H1" icon="H1" value="h1" />
        <ToolbarBtn cmd="formatBlock" label="H2" icon="H2" value="h2" />
        <ToolbarBtn cmd="formatBlock" label="H3" icon="H3" value="h3" />
        <ToolbarBtn cmd="formatBlock" label="P" icon="¶" value="p" />
        <span className="w-px h-5 bg-border mx-1" />
        {/* Lists */}
        <ToolbarBtn cmd="insertUnorderedList" label="Bullet List" icon="•≡" />
        <ToolbarBtn cmd="insertOrderedList" label="Numbered List" icon="1." />
        <span className="w-px h-5 bg-border mx-1" />
        {/* Link / Image */}
        <ToolbarBtn
          cmd="createLink"
          label="Insert Link"
          icon="🔗"
          value={prompt("URL:", "https://") || ""}
        />
        <span className="w-px h-5 bg-border mx-1" />
        {/* Clean / Actions */}
        <button
          onClick={cleanStyles}
          className="px-2 py-1 text-xs rounded border border-border hover:bg-accent hover:border-primary/30 transition-colors text-amber-600"
          title="Remove inline styles and classes"
        >
          <Paintbrush className="w-3 h-3 inline mr-1" /> Clean
        </button>
        <span className="flex-1" />
        {/* View toggle */}
        <div className="flex items-center gap-1 border border-border rounded overflow-hidden">
          <button
            onClick={() => setViewMode("wysiwyg")}
            className={`px-2 py-1 text-xs transition-colors ${viewMode === "wysiwyg" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            <Eye className="w-3 h-3 inline mr-1" /> Design
          </button>
          <button
            onClick={() => setViewMode("source")}
            className={`px-2 py-1 text-xs transition-colors ${viewMode === "source" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            <Code2 className="w-3 h-3 inline mr-1" /> Source
          </button>
        </div>
        <button
          onClick={copyHtml}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-border hover:bg-accent hover:border-primary/30 transition-colors"
          title="Copy HTML source"
        >
          {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Editor area */}
      {viewMode === "wysiwyg" ? (
        <div
          ref={editorRef}
          contentEditable
          onPaste={handlePaste}
          className="min-h-[280px] p-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 prose prose-sm max-w-none"
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          dangerouslySetInnerHTML={{
            __html:
              '<h2>Welcome to the WYSIWYG Editor</h2><p>Start typing or <strong>paste content</strong> here. Use the toolbar above to format text, create lists, and insert links.</p><ul><li>Bold, italic, underline, strikethrough</li><li>Headings (H1, H2, H3)</li><li>Bullet & numbered lists</li><li>Insert hyperlinks</li></ul><p><em>All processing is 100% client-side — nothing is uploaded.</em></p>',
          }}
        />
      ) : (
        <textarea
          value={getHtml()}
          onChange={(e) => setHtml(e.target.value)}
          className="min-h-[280px] w-full p-4 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="<h2>Your HTML here...</h2>"
        />
      )}

      {/* Info bar */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {viewMode === "wysiwyg"
            ? "✏️ Design mode — edit visually. Switch to Source to view/copy raw HTML."
            : "💻 Source mode — edit HTML directly. Switch to Design for visual preview."}
        </span>
        <span>
          {getHtml().length.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
}
