/** What a project accumulates as its loops run. */
export function SecondBrainDiagram() {
  const layers = [
    { label: "Stories & criteria", note: "what was asked, and what counts as done" },
    { label: "Loop history", note: "every phase transition, verdict, and rejection note" },
    { label: "Comments & mentions", note: "the conversation around the work" },
    { label: "Project memory", note: "durable facts an agent recorded for later" },
    { label: "Knowledge & files", note: "documents, embeddings, entities, attachments" },
  ];

  return (
    <svg viewBox="0 0 760 300" className="block h-auto w-full min-w-[560px]" fontFamily="ui-monospace, Menlo, monospace">
      <defs>
        <marker id="brain-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      {layers.map((layer, i) => (
        <g key={layer.label}>
          <rect
            x={40}
            y={12 + i * 52}
            width={430}
            height={42}
            rx={9}
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text x={58} y={32 + i * 52} fontSize="12.5" fill="var(--foreground)">
            {layer.label}
          </text>
          <text x={58} y={47 + i * 52} fontSize="10.5" fill="var(--muted-foreground)">
            {layer.note}
          </text>
        </g>
      ))}

      {/* the project spine */}
      <path d="M 24 20 L 24 268" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* converging into context */}
      <path d="M 470 33 C 560 33, 560 140, 596 140" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" />
      <path d="M 470 85 C 550 85, 550 140, 596 140" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" />
      <path d="M 470 137 L 596 140" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" />
      <path d="M 470 189 C 550 189, 550 140, 596 140" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" />
      <path d="M 470 241 C 560 241, 560 140, 596 140" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" markerEnd="url(#brain-arrow)" />

      <rect
        x={600}
        y={106}
        width={140}
        height={68}
        rx={10}
        fill="color-mix(in oklch, var(--primary) 10%, transparent)"
        stroke="var(--primary)"
        strokeWidth="1.6"
      />
      <text x={670} y={134} textAnchor="middle" fontSize="12.5" fill="var(--foreground)">
        Context for
      </text>
      <text x={670} y={151} textAnchor="middle" fontSize="12.5" fill="var(--foreground)">
        the next loop
      </text>
      <text x={670} y={168} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
        and for you
      </text>
    </svg>
  );
}
