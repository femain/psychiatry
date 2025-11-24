export default function ClinicianDemoPage() {
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
            Clinician dashboard demo
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            Read-only example of how PsychiatristAI surfaces key information for a single patient to
            support assessment, triage and treatment review.
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
                Recent letters analysed
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Risk & safeguarding</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                <li>Recent suicidal ideation documented without current plan.</li>
                <li>Self-harm episode in the last 12 months.</li>
                <li>Children in household mentioned; consider safeguarding context.</li>
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Clinical picture & diagnoses</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                <li>Low mood, anhedonia and reduced energy over several months.</li>
                <li>Prominent anxiety in social and work situations.</li>
                <li>Recurrent depressive disorder (recorded); GAD (suspected).</li>
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Triage support (for clinician review)</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-700">
                <li>Consider timely medication review for partial response.</li>
                <li>Update risk assessment given recent self-harm history.</li>
                <li>Monitor work functioning and provide workplace support where possible.</li>
              </ul>
              <p className="mt-2 text-xs text-zinc-500">
                These points are generated to support, not replace, clinical judgement and local
                protocols.
              </p>
            </div>
          </div>

          <aside className="space-y-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Medication overview</p>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>
                  <span className="font-semibold">Sertraline 50 mg daily</span>
                  <br />
                  <span className="text-xs text-zinc-500">Started 15 Jan 2024 · Response: positive · Improved mood, reduced anxiety.</span>
                </li>
                <li>
                  <span className="font-semibold">Quetiapine 25 mg at night</span>
                  <br />
                  <span className="text-xs text-zinc-500">Stopped Mar 2024 · Sedation and weight gain.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-1 border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Data quality</p>
              <ul className="space-y-1 text-xs text-zinc-700">
                <li>Missing: end date for current medication.</li>
                <li>Consider clarifying non-pharmacological interventions.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
