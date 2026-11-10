import { sources, team } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16 sm:px-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-300/80">Campaign concept by</p>
          <p className="mt-3 text-lg font-semibold">Group 4</p>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{team.join(' · ')}</p>
          <p className="mt-6 text-xs leading-relaxed text-white/35">
            A concept campaign created for APRD 3105: Public Relations Strategy, Department of Advertising, Public Relations,
            and Design. Not affiliated with or endorsed by Meta Platforms, Inc.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-300/80">Sources</p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/45">
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
