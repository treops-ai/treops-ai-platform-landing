/**
 * What gets assembled on a machine when an agent picks work up.
 *
 * This is the diagram that explains three otherwise-confusing behaviours:
 * why a skill edit takes effect on the *next* run, why a hosted agent can't
 * see your disk, and why tool access is per-agent rather than per-workspace.
 */
export function TaskEnvironmentDiagram() {
  const inputs = [
    { y: 20, label: "The agent's brief", note: "who it is, how it works" },
    { y: 68, label: "Its skills", note: "the methods you attached" },
    { y: 116, label: "Its connected tools", note: "with credentials, unlocked now" },
    { y: 164, label: "Project files", note: "and a repository checkout, if needed" },
  ];

  return (
    <svg viewBox="0 0 940 268" className="block h-auto w-full min-w-[680px]">
      <defs>
        <marker id="te-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <text x="8" y="10" fontSize="11" fontWeight="600" fill="var(--muted-foreground)">
        GATHERED FOR THIS ONE PIECE OF WORK
      </text>

      {inputs.map((i) => (
        <g key={i.label}>
          <rect x={8} y={i.y} width={252} height={40} rx={9} fill="var(--card)" stroke="var(--border)" />
          <text x={22} y={i.y + 17} fontSize="12.5" fontWeight="600" fill="var(--foreground)">
            {i.label}
          </text>
          <text x={22} y={i.y + 31} fontSize="10.5" fill="var(--muted-foreground)">
            {i.note}
          </text>
          <path
            d={`M 264 ${i.y + 20} C 300 ${i.y + 20}, 316 112, 350 112`}
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.1"
            markerEnd="url(#te-arrow)"
          />
        </g>
      ))}

      {/* the working directory */}
      <rect
        x={358}
        y={62}
        width={216}
        height={100}
        rx={12}
        fill="color-mix(in oklch, var(--primary) 8%, var(--card))"
        stroke="var(--primary)"
        strokeWidth="1.6"
      />
      <text x={466} y={92} textAnchor="middle" fontSize="13.5" fontWeight="600" fill="var(--foreground)">
        A workspace on
      </text>
      <text x={466} y={110} textAnchor="middle" fontSize="13.5" fontWeight="600" fill="var(--foreground)">
        the machine
      </text>
      <text x={466} y={130} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">
        built fresh, then thrown away
      </text>

      <line x1={574} y1={112} x2={618} y2={112} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#te-arrow)" />

      {/* the run */}
      <rect x={626} y={82} width={140} height={60} rx={12} fill="var(--card)" stroke="var(--border)" />
      <text x={696} y={108} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">
        The agent
      </text>
      <text x={696} y={125} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">
        works
      </text>

      <line x1={766} y1={112} x2={810} y2={112} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#te-arrow)" />

      {/* back to the story */}
      <rect
        x={818}
        y={82}
        width={114}
        height={60}
        rx={12}
        fill="color-mix(in oklch, var(--success) 12%, transparent)"
        stroke="var(--success)"
      />
      <text x={875} y={108} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--foreground)">
        Results on
      </text>
      <text x={875} y={125} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--foreground)">
        the story
      </text>

      <text x={8} y={228} fontSize="11.5" fill="var(--muted-foreground)">
        Because this is assembled at the moment work starts, editing a skill or a brief changes the
      </text>
      <text x={8} y={246} fontSize="11.5" fill="var(--muted-foreground)">
        next piece of work — not the one already running.
      </text>
    </svg>
  );
}
