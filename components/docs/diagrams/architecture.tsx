/** Components and data flow — the README architecture drawn to scale. */
export function ArchitectureDiagram() {
  const box = (x: number, y: number, w: number, h: number) => ({ x, y, width: w, height: h, rx: 10 });

  return (
    <svg viewBox="0 0 900 340" className="block h-auto w-full min-w-[680px]" fontFamily="ui-monospace, Menlo, monospace">
      <defs>
        <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      {/* web */}
      <rect {...box(20, 20, 170, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="105" y="42" textAnchor="middle" fontSize="13" fill="var(--foreground)">Web app</text>
      <text x="105" y="58" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">Next.js</text>

      {/* backend */}
      <rect {...box(345, 20, 190, 52)} fill="color-mix(in oklch, var(--primary) 10%, transparent)" stroke="var(--primary)" strokeWidth="1.6" />
      <text x="440" y="42" textAnchor="middle" fontSize="13" fill="var(--foreground)">Backend</text>
      <text x="440" y="58" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">FastAPI · the security boundary</text>

      {/* storage */}
      <rect {...box(690, 20, 190, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="785" y="42" textAnchor="middle" fontSize="13" fill="var(--foreground)">PostgreSQL · MinIO</text>
      <text x="785" y="58" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">your data</text>

      <line x1="190" y1="46" x2="339" y2="46" stroke="var(--muted-foreground)" strokeWidth="1.4" markerStart="url(#arch-arrow)" markerEnd="url(#arch-arrow)" />
      <line x1="535" y1="46" x2="684" y2="46" stroke="var(--muted-foreground)" strokeWidth="1.4" markerStart="url(#arch-arrow)" markerEnd="url(#arch-arrow)" />

      {/* /api fan-out */}
      <text x="452" y="94" fontSize="10.5" fill="var(--muted-foreground)">/api/*</text>
      <path d="M 440 72 L 440 108 M 150 108 L 730 108" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
      <line x1="150" y1="108" x2="150" y2="146" stroke="var(--muted-foreground)" strokeWidth="1.2" markerEnd="url(#arch-arrow)" />
      <line x1="440" y1="108" x2="440" y2="146" stroke="var(--muted-foreground)" strokeWidth="1.2" markerEnd="url(#arch-arrow)" />
      <line x1="730" y1="108" x2="730" y2="146" stroke="var(--muted-foreground)" strokeWidth="1.2" markerEnd="url(#arch-arrow)" />

      {/* three clients */}
      <rect {...box(65, 152, 170, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="150" y="174" textAnchor="middle" fontSize="13" fill="var(--foreground)">MCP service</text>
      <text x="150" y="190" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">agent tools · thin proxy</text>

      <rect {...box(355, 152, 170, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="440" y="174" textAnchor="middle" fontSize="13" fill="var(--foreground)">CLI</text>
      <text x="440" y="190" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">humans</text>

      <rect {...box(645, 152, 170, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="730" y="174" textAnchor="middle" fontSize="13" fill="var(--foreground)">Daemon</text>
      <text x="730" y="190" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">runs tasks on a runtime</text>

      {/* daemon -> providers */}
      <line x1="730" y1="204" x2="730" y2="248" stroke="var(--muted-foreground)" strokeWidth="1.2" markerEnd="url(#arch-arrow)" />
      <rect {...box(645, 254, 170, 52)} fill="var(--card)" stroke="var(--border)" />
      <text x="730" y="276" textAnchor="middle" fontSize="13" fill="var(--foreground)">LLM providers</text>
      <text x="730" y="292" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">Claude · Gemini</text>

      {/* agent -> mcp */}
      <path d="M 645 280 C 420 300, 200 280, 150 210" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" />
      <text x="360" y="300" fontSize="10.5" fill="var(--muted-foreground)">agents call tools over MCP</text>
    </svg>
  );
}
