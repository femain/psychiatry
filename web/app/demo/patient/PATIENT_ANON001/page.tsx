export default function PatientDemoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <a href="/" className="text-sm font-semibold text-zinc-900 hover:text-indigo-600">
          PsychiatristAI
        </a>
        <a
          href="/"
          className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Back to overview
        </a>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Demo</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Patient dashboard demo – PATIENT_ANON001
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            A fixed anonymised case that mirrors what clinicians see in the PsychiatristAI mobile app
            when reviewing a single patient.
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-500">Patient</p>
                <p className="text-lg font-semibold">PATIENT_ANON001</p>
                <p className="text-xs text-zinc-500">Adult community case</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Last document: 20 Mar 2024
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Recent documents</p>
              <ul className="mt-1 space-y-1 text-xs text-zinc-700">
                <li>20 Mar 2024 – GP referral letter</li>
                <li>05 Mar 2024 – CMHT clinic letter</li>
                <li>10 Feb 2024 – Crisis team contact note</li>
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Risk & safeguarding highlights</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                <li>Recent suicidal ideation without current plan; protective factors present.</li>
                <li>Self-harm episode in last 12 months, no current access to means reported.</li>
                <li>Children in household; no direct risk reported but carer stress noted.</li>
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Mental state & diagnoses</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                <li>Low mood, anhedonia, reduced energy; sleep disturbance.</li>
                <li>Prominent anxiety in social and work settings.</li>
                <li>Recurrent depressive disorder (recorded); possible GAD.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Medication overview</p>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>
                  <span className="font-semibold">Sertraline 50 mg daily</span>
                  <br />
                  <span className="text-xs text-zinc-500">Started Jan 2024 · Good response; continue and review.</span>
                </li>
                <li>
                  <span className="font-semibold">Quetiapine 25 mg at night</span>
                  <br />
                  <span className="text-xs text-zinc-500">Stopped due to sedation and weight gain.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-1 border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Next steps</p>
              <ul className="space-y-1 text-xs text-zinc-700">
                <li>Consider medication optimisation and psychological interventions.</li>
                <li>Ensure updated risk assessment is documented.</li>
                <li>Review support around work-related stress.</li>
              </ul>
              <p className="mt-2 text-[11px] text-zinc-500">
                This demo is read-only and for illustration only. It does not contain real patient data.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
