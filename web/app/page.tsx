export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <div className="text-sm font-semibold text-zinc-900">PsychiatristAI</div>
        <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
          <a href="#features" className="hover:text-zinc-900">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-zinc-900">
            How it works
          </a>
          <a href="/demo/clinician" className="hover:text-zinc-900">
            For clinicians
          </a>
          <a href="/demo/service" className="hover:text-zinc-900">
            For services
          </a>
          <a href="#compliance" className="hover:text-zinc-900">
            Compliance
          </a>
        </nav>
        <a
          href="#demo"
          className="hidden rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 md:inline-flex"
        >
          Book a demo
        </a>
      </header>

      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-4 pb-12 pt-2 sm:px-8 sm:pb-16 sm:pt-4">
        {/* Hero */}
        <section className="grid items-stretch gap-10 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:grid-cols-2 md:p-8">
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
              Clinical decision support for psychiatry
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Turn mental health documents into actionable dashboards.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-zinc-600">
              PsychiatristAI structures referral letters, clinic notes and discharge summaries into
              clear dashboards for assessment, triage and treatment review. Designed for NHS mental
              health services and clinician-in-the-loop workflows.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Book a demo
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                See how it works
              </a>
            </div>
            <p className="text-xs text-zinc-500">
              Outputs are designed to support, not replace, clinician judgement.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-zinc-500">
              <span>Try the app via your internal app store or Expo.</span>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Example dashboard
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-500">Patient</p>
                  <p className="font-semibold">PATIENT_ANON001</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Recent letters analysed
                </div>
              </div>
              <div className="border-t border-zinc-200 pt-3">
                <p className="text-xs font-medium text-zinc-500">Risk & safeguarding</p>
                <ul className="mt-1 space-y-1 text-xs text-zinc-700">
                  <li>• Recent suicidal ideation without current plan.</li>
                  <li>• Self-harm episode in the last 12 months.</li>
                </ul>
              </div>
              <div className="border-t border-zinc-200 pt-3">
                <p className="text-xs font-medium text-zinc-500">Medication overview</p>
                <ul className="mt-1 space-y-1 text-xs text-zinc-700">
                  <li>• Sertraline 50 mg daily – ongoing.</li>
                  <li>• Quetiapine 25 mg at night – stopped.</li>
                </ul>
              </div>
              <div className="border-t border-zinc-200 pt-3">
                <p className="text-xs font-medium text-zinc-500">Triage support</p>
                <ul className="mt-1 space-y-1 text-xs text-zinc-700">
                  <li>• Consider timely medication review for partial response.</li>
                  <li>• Function declining at work; still in employment.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold">Features</h2>
          <div className="grid gap-6 text-sm text-zinc-700 md:grid-cols-2">
            <div>
              <h3 className="mb-1 font-semibold">Multi-format document processing</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Support for PDF, JPG, PNG, DOC and DOCX.</li>
                <li>OCR for scanned documents and handwriting.</li>
                <li>Automated text extraction pipeline.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Clinical NLP for psychiatry</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Clinical language models such as Clinical BERT / BioGPT.</li>
                <li>Custom NER for medications and key clinical entities.</li>
                <li>Temporal reasoning for timelines and mental state changes.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Medication tracking & gap detection</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Drug names, dosages, start and end dates.</li>
                <li>Response assessment and mental status correlation.</li>
                <li>Detection of missing dates, undocumented effects and inconsistencies.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Anonymisation & compliance</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>UK GDPR and NHS ISB1523 aligned anonymisation.</li>
                <li>Pseudonymisation and Motivated Intruder Test considerations.</li>
                <li>Audit logging to support Caldicott governance.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section
          id="value"
          className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              For clinicians
            </p>
            <h2 className="text-xl font-semibold">Clinical decision support at the point of care</h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700">
              <li>• See key risk, safeguarding and diagnostic information at a glance.</li>
              <li>• Reduce time spent reading long narrative letters and reports.</li>
              <li>• Copy structured summaries straight into clinical notes and EHRs.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              For services & Trusts
            </p>
            <h2 className="text-xl font-semibold">Dashboards for teams and governance</h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700">
              <li>• Service-level view of active patients, risk flags and incomplete data.</li>
              <li>• APIs and exports to integrate with EHRs and analytics tools.</li>
              <li>• Designed with UK GDPR, NHS ISB1523 and Caldicott principles in mind.</li>
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">How PsychiatristAI works</h2>
          <ol className="mt-2 space-y-3 text-sm text-zinc-700">
            <li>
              <span className="font-semibold">1. Upload or receive documents.</span> Referral letters,
              clinic notes, discharge summaries and safeguarding reports.
            </li>
            <li>
              <span className="font-semibold">2. AI extracts key information.</span> Risk, mental state,
              diagnosis, safeguarding and medication changes.
            </li>
            <li>
              <span className="font-semibold">3. Dashboards highlight what matters.</span> Structured
              views for assessment, triage and treatment review.
            </li>
            <li>
              <span className="font-semibold">4. Clinicians review and decide.</span> Outputs support,
              not replace, clinical judgement and local protocols.
            </li>
          </ol>
        </section>

        {/* CTA */}
        <section
          id="demo"
          className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Explore PsychiatristAI for your service</h2>
            <p className="text-sm text-zinc-700">
              Book a short call to see the dashboards in action and discuss pilots with NHS mental
              health teams.
            </p>
            <p className="text-xs text-zinc-500">
              Prefer to try it yourself? Install the mobile app via Expo or your internal app store.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:flex-wrap">
            <a
              href="mailto:info@psychiatrist.ai?subject=PsychiatristAI%20demo"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Contact us
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
            >
              Download mobile app
            </a>
            <a
              href="/demo/clinician"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
            >
              Clinician dashboard demo
            </a>
            <a
              href="/demo/patient/PATIENT_ANON001"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
            >
              Patient dashboard demo
            </a>
            <a
              href="/demo/service"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
            >
              Service dashboard demo
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
