export default function ServiceDemoPage() {
  const mockSummary = {
    activePatients: 42,
    analysesLast30Days: 128,
    patientsWithRecentRiskFlags: 9,
    analysesWithMissingData: 17,
  };

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
            Service dashboard demo
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            Read-only example of how PsychiatristAI can present service-level metrics to help clinical
            leads and MDTs focus on workload, risk and data quality.
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="text-xs font-medium text-zinc-500">Active patients (30 days)</p>
                <p className="mt-1 text-2xl font-semibold">{mockSummary.activePatients}</p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="text-xs font-medium text-zinc-500">Documents analysed (30 days)</p>
                <p className="mt-1 text-2xl font-semibold">{mockSummary.analysesLast30Days}</p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="text-xs font-medium text-zinc-500">Patients with recent risk flags</p>
                <p className="mt-1 text-2xl font-semibold">{mockSummary.patientsWithRecentRiskFlags}</p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="text-xs font-medium text-zinc-500">Analyses with missing data</p>
                <p className="mt-1 text-2xl font-semibold">{mockSummary.analysesWithMissingData}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">How this helps</p>
              <ul className="space-y-1 text-sm text-zinc-700">
                <li>Identify teams or pathways with higher concentrations of risk.</li>
                <li>Spot data quality issues such as missing medication end dates.</li>
                <li>Support governance, supervision and service improvement discussions.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Example breakdown</p>
            <ul className="space-y-1 text-sm text-zinc-700">
              <li>6 patients with recent suicidality mentions.</li>
              <li>7 patients with self-harm history noted in last 12 months.</li>
              <li>3 cases where safeguarding concerns are highlighted.</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500">
              This demo is read-only and uses anonymised, synthetic data to illustrate how a service
              overview could look. It does not represent real patients or Trusts.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}
