import { useState, useMemo } from "react";
import { Copy, CheckCircle, AlertTriangle, Eye, EyeOff } from "lucide-react";

interface JwtPart {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  error?: string;
}

function decodeBase64Url(str: string): string {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    throw new Error("Invalid Base64 URL encoding");
  }
}

function parseJwt(token: string): JwtPart {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Invalid JWT format. Expected header.payload.signature",
    };
  }
  try {
    const header = JSON.parse(decodeBase64Url(parts[0])) as Record<string, unknown>;
    const payload = JSON.parse(decodeBase64Url(parts[1])) as Record<string, unknown>;
    return { header, payload, signature: parts[2] };
  } catch {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Failed to decode token. The token may be malformed.",
    };
  }
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts * 1000);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const absStr =
    Math.abs(diff) < 60000
      ? "just now"
      : Math.abs(diff) < 3600000
        ? `${Math.floor(Math.abs(diff) / 60000)}m ago`
        : Math.abs(diff) < 86400000
          ? `${Math.floor(Math.abs(diff) / 3600000)}h ago`
          : `${Math.floor(Math.abs(diff) / 86400000)}d ago`;
  return `${date.toLocaleString()} (${diff < 0 ? "expired " : ""}${absStr})`;
}

export function JwtParser() {
  const [token, setToken] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showSig, setShowSig] = useState(false);

  const result = useMemo(() => (token ? parseJwt(token) : null), [token]);

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-1.5">
          Paste JWT Token
        </label>
        <textarea
          className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR3U"
          spellCheck={false}
        />
        <p className="text-xs text-muted-foreground mt-1">
          All decoding happens locally in your browser. Your token is never sent anywhere.
        </p>
      </div>

      {result && (
        <div className="space-y-3">
          {result.error ? (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {result.error}
            </div>
          ) : (
            <>
              <section className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-accent/30 px-4 py-2.5 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Header</h3>
                  <button
                    onClick={() => copy(JSON.stringify(result.header, null, 2), 0)}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    {copiedIdx === 0 ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {copiedIdx === 0 ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap bg-background">
                  {JSON.stringify(result.header, null, 2)}
                </pre>
              </section>

              <section className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-accent/30 px-4 py-2.5 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Payload</h3>
                  <button
                    onClick={() => copy(JSON.stringify(result.payload, null, 2), 1)}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    {copiedIdx === 1 ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {copiedIdx === 1 ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap bg-background">
                  {JSON.stringify(result.payload, null, 2)}
                </pre>
              </section>

              {result.payload && (
                <section className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="bg-accent/30 px-4 py-2.5 border-b border-border">
                    <h3 className="text-sm font-semibold text-foreground">Claims Summary</h3>
                  </div>
                  <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.payload.iss && (
                      <ClaimBadge label="Issuer (iss)" value={String(result.payload.iss)} />
                    )}
                    {result.payload.sub && (
                      <ClaimBadge label="Subject (sub)" value={String(result.payload.sub)} />
                    )}
                    {result.payload.aud && (
                      <ClaimBadge label="Audience (aud)" value={String(result.payload.aud)} />
                    )}
                    {result.payload.exp && (
                      <ClaimBadge label="Expires (exp)" value={formatTimestamp(Number(result.payload.exp))} />
                    )}
                    {result.payload.nbf && (
                      <ClaimBadge label="Not Before (nbf)" value={formatTimestamp(Number(result.payload.nbf))} />
                    )}
                    {result.payload.iat && (
                      <ClaimBadge label="Issued At (iat)" value={formatTimestamp(Number(result.payload.iat))} />
                    )}
                    {result.payload.jti && (
                      <ClaimBadge label="JWT ID (jti)" value={String(result.payload.jti)} />
                    )}
                  </div>
                </section>
              )}

              <section className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-accent/30 px-4 py-2.5 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Signature</h3>
                  <button
                    onClick={() => setShowSig(!showSig)}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    {showSig ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showSig ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap bg-background p-3 rounded-lg">
                    {showSig ? result.signature : result.signature.substring(0, 12) + "..."}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verification requires the secret/public key and is not performed client-side.
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ClaimBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col p-2.5 rounded-lg bg-accent/20">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground font-mono break-all">{value}</span>
    </div>
  );
}
