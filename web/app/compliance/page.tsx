export default function CompliancePage() {
  const gdprPoints = [
    'Processing of special category data aligned with UK GDPR for health.',
    'Data minimisation and purpose limitation built into workflows.',
    'Strict access controls and role-based views for clinical teams.',
  ];

  const nhsPoints = [
    'Removal of direct identifiers (name, NHS number, address) before analysis.',
    'Pseudonymisation and internal identifiers for follow-up over time.',
    'Motivated Intruder Test considerations in anonymisation design.',
  ];

  const governancePoints = [
    'Audit logging of document uploads, analyses and exports.',
    'Support for local Caldicott Guardian oversight.',
    'Configurable retention windows according to Trust policy.',
  ];

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
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Compliance</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Designed with UK GDPR and NHS anonymisation standards in mind
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            PsychiatristAI is built for NHS mental health services, with anonymisation and governance
            patterns that align to UK GDPR, NHS ISB1523 and the Caldicott Principles. This page outlines
            how we approach data protection for clinical document analysis.
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">UK GDPR for health data</h2>
            <p className="text-sm text-zinc-700">
              PsychiatristAI is designed for processing special category health data inside clinical
              pathways. The service focuses on structured analysis for clinicians and teams, not
              direct-to-patient use.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {gdprPoints.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Example workflow</p>
            <ul className="space-y-1 text-sm text-zinc-700">
              <li>1. A referral letter or clinic note is uploaded by a clinician or team.</li>
              <li>2. Identifiers are removed or replaced with pseudonyms before analysis.</li>
              <li>3. Dashboards surface risk, safeguarding and medication insights.</li>
              <li>4. Structured outputs are used to support, not replace, clinical judgement.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">NHS ISB1523-aligned anonymisation</h2>
            <p className="text-sm text-zinc-700">
              Anonymisation logic is designed with reference to the NHS ISB1523 Anonymisation Standard
              for health and social care data.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {nhsPoints.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-800">Motivated intruder thinking</h3>
            <p className="text-sm text-zinc-700">
              Designs are reviewed against a 
              {" "}
              <span className="font-medium">motivated intruder</span>
              {" "}
              model: could a determined third party, with access to public and limited private data,
              reasonably re-identify an individual from the outputs alone?
            </p>
            <p className="text-xs text-zinc-500">
              This page describes design intent and demo behaviour. Any live deployment would be
              configured with local Trust policies, DPIAs and information governance sign-off.
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Governance & Caldicott</h2>
            <p className="text-sm text-zinc-700">
              PsychiatristAI is intended to sit within existing governance structures rather than
              replacing them.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {governancePoints.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-700">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Synthetic demo data
            </p>
            <p>
              Web demos (for clinicians, services and patients) use fully synthetic identifiers and
              example narratives. They are not connected to live NHS systems and do not contain
              real-world patient data.
            </p>
            <p className="text-xs text-zinc-500">
              Any pilot or production deployment would be configured in collaboration with local
              information governance teams and Caldicott Guardians.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Next steps</h2>
            <p className="mt-1 max-w-xl">
              If you would like to explore how PsychiatristAI could fit within your Trust&apos;s data
              protection and governance approach, we recommend a short call with your IG and clinical
              leads present.
            </p>
          </div>
          <a
            href="mailto:info@psychiatrist.ai?subject=PsychiatristAI%20compliance%20discussion"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Contact us about compliance
          </a>
        </section>
      </main>
    </div>
  );
}
