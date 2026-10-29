/**
 * How a piece of work moves, in the reader's language.
 *
 * Deliberately not a state machine: the boxes are things that happen, the
 * person badges are where it waits for you, and the dashed arrows are the
 * two ways work comes back round.
 */
export function WorkFlowDiagram() {
  const W = 176;
  const H = 52;
  const steps = [
    { x: 10, label: "Agent plans it", sub: "writes up its approach" },
    { x: 246, label: "You approve", sub: "or send it back", you: true },
    { x: 482, label: "Agent does the work", sub: "" },
    { x: 718, label: "Result is checked", sub: "against your criteria", you: true },
  ];

  return (
    <svg viewBox="0 0 960 264" className="block h-auto w-full min-w-[680px]">
      <defs>
        <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
        <marker id="wf-back" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      {steps.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={62}
            width={W}
            height={H}
            rx={12}
            fill={s.you ? "color-mix(in oklch, var(--primary) 8%, var(--card))" : "var(--card)"}
            stroke={s.you ? "var(--primary)" : "var(--border)"}
            strokeWidth={s.you ? 1.6 : 1}
          />
          <text x={s.x + W / 2} y={s.sub ? 86 : 92} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--foreground)">
            {s.label}
          </text>
          {s.sub ? (
            <text x={s.x + W / 2} y={104} textAnchor="middle" fontSize="11.5" fill="var(--muted-foreground)">
              {s.sub}
            </text>
          ) : null}
          {s.you ? (
            <text x={s.x + W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--primary)" fontWeight="600">
              waits for you
            </text>
          ) : null}
          {i < steps.length - 1 ? (
            <line
              x1={s.x + W}
              y1={88}
              x2={steps[i + 1]!.x - 6}
              y2={88}
              stroke="var(--muted-foreground)"
              strokeWidth="1.4"
              markerEnd="url(#wf-arrow)"
            />
          ) : null}
        </g>
      ))}

      {/* done */}
      <rect
        x={718}
        y={168}
        width={W}
        height={44}
        rx={12}
        fill="color-mix(in oklch, var(--success) 14%, transparent)"
        stroke="var(--success)"
      />
      <text x={718 + W / 2} y={196} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--foreground)">
        Done
      </text>
      <line x1={806} y1={114} x2={806} y2={162} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#wf-arrow)" />
      <text x={816} y={142} fontSize="11.5" fill="var(--muted-foreground)">
        all good
      </text>

      {/* send it back */}
      <path
        d="M 334 62 C 334 22, 98 22, 98 56"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="1.3"
        strokeDasharray="5 4"
        markerEnd="url(#wf-back)"
      />
      <text x={216} y={18} textAnchor="middle" fontSize="11.5" fill="var(--muted-foreground)">
        needs another go
      </text>

      <path
        d="M 806 62 C 806 22, 570 22, 570 56"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="1.3"
        strokeDasharray="5 4"
        markerEnd="url(#wf-back)"
      />
      <text x={688} y={18} textAnchor="middle" fontSize="11.5" fill="var(--muted-foreground)">
        not right yet
      </text>

      {/* stuck */}
      <rect x={10} y={168} width={412} height={44} rx={12} fill="var(--card)" stroke="var(--border)" strokeDasharray="5 4" />
      <text x={30} y={196} fontSize="12.5" fill="var(--muted-foreground)">
        Stuck, or gone back and forth too many times? It stops and tells you.
      </text>
      <path d="M 98 114 C 98 140, 60 140, 60 162" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#wf-arrow)" />
    </svg>
  );
}
