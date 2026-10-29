/** What uploading a file gets you, and what indexing it adds on top. */
export function FileJourneyDiagram() {
  return (
    <svg viewBox="0 0 952 236" className="block h-auto w-full min-w-[620px]">
      <defs>
        <marker id="fj-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <rect x={8} y={70} width={168} height={56} rx={11} fill="var(--card)" stroke="var(--border)" />
      <text x={92} y={95} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">You upload</text>
      <text x={92} y={112} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">a file</text>

      <line x1={176} y1={98} x2={220} y2={98} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#fj-arrow)" />

      {/* stored */}
      <rect x={228} y={58} width={216} height={80} rx={11} fill="var(--card)" stroke="var(--border)" />
      <text x={336} y={82} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">Stored</text>
      <text x={336} y={101} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">find it by name</text>
      <text x={336} y={116} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">attach it to a story</text>
      <text x={336} y={131} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">download it</text>

      <line x1={444} y1={98} x2={528} y2={98} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#fj-arrow)" />
      <text x={486} y={86} textAnchor="middle" fontSize="10.5" fill="var(--primary)">you choose</text>

      {/* indexed */}
      <rect
        x={536}
        y={44}
        width={236}
        height={108}
        rx={11}
        fill="color-mix(in oklch, var(--primary) 8%, var(--card))"
        stroke="var(--primary)"
        strokeWidth="1.6"
      />
      <text x={654} y={68} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)">Indexed as knowledge</text>
      <text x={654} y={88} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">everything above, plus:</text>
      <text x={654} y={106} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">search it by meaning</text>
      <text x={654} y={121} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">ask questions, get sources</text>
      <text x={654} y={136} textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">agents draw on it unprompted</text>

      <line x1={772} y1={98} x2={816} y2={98} stroke="var(--muted-foreground)" strokeWidth="1.4" markerEnd="url(#fj-arrow)" />
      <rect x={824} y={70} width={108} height={56} rx={11} fill="var(--card)" stroke="var(--border)" strokeDasharray="4 3" />
      <text x={878} y={95} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">Remove it</text>
      <text x={878} y={111} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">when stale</text>

      <text x={8} y={192} fontSize="11.5" fill="var(--muted-foreground)">
        Storing is free and reversible. Indexing is a judgement call — an out-of-date document that stays indexed
      </text>
      <text x={8} y={210} fontSize="11.5" fill="var(--muted-foreground)">
        competes with the current one, and agents can&apos;t tell which is which.
      </text>
    </svg>
  );
}
