import Link from "next/link";
import {
  GraduationCap,
  School,
  BriefcaseBusiness,
  ArrowUpRight,
  Plus,
  Info,
} from "lucide-react";
import { templates } from "@/lib/model";
export const metadata = {
  title: "Editable application checklists",
  description:
    "Scholarship, university admission, job application, and custom document checklists. Editable starter examples to adapt to official requirements.",
  alternates: { canonical: "/checklists" },
};
export default function Page() {
  return (
    <>
      <section className="page-hero wrap">
        <span className="eyebrow">A HEAD START, NOT A RULEBOOK</span>
        <h1>
          Every next chapter
          <br />
          starts with a little preparation.
        </h1>
        <p>
          Choose a checklist that fits your opportunity. Make it yours with the
          requirements that actually matter.
        </p>
      </section>
      <section className="content-section wrap">
        <div className="template-grid">
          {templates.map((t, i) => {
            const Icon = [GraduationCap, School, BriefcaseBusiness][i];
            return (
              <Link
                className={"template-card " + t.slug}
                key={t.slug}
                href={"/checklists/" + t.slug}
              >
                <span className="template-icon">
                  <Icon size={28} />
                </span>
                <span className="template-kind">EDITABLE STARTER</span>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <div>
                  <span>{t.items.length} configurable items</span>
                  <span className="arrow-circle">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="info-note">
          <Info size={15} />
          These templates are general examples. They are not official or
          institution-approved checklists. Verify the current instructions and
          update every requirement before checking your documents.
        </div>
        <div
          className="cta-band"
          style={{ margin: "35px 0 0", maxWidth: "none" }}
        >
          <div>
            <h2>Your application is a little different?</h2>
            <p>Start from a blank checklist. Add exactly what you need.</p>
          </div>
          <Link className="button dark" href="/tool?template=custom">
            <Plus size={17} /> Create a custom checklist
          </Link>
        </div>
      </section>
    </>
  );
}
