import type { StructureResolver } from "sanity/structure";

/**
 * The Studio mirrors the site's hierarchy: the patient's concern first, the
 * clinical approach next, and technology after that. Site Settings is a
 * singleton, opened directly rather than as a list of one.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("concern").title("Your Concerns"),
      S.documentTypeListItem("treatmentApproach").title("Treatment Approaches"),
      S.documentTypeListItem("signatureProgramme").title("Signature Programmes"),
      S.divider(),
      S.documentTypeListItem("doctor").title("Doctors"),
      S.documentTypeListItem("result").title("Results"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("journalArticle").title("Journal"),
      S.divider(),
      S.documentTypeListItem("clinicSpace").title("Clinic Spaces"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.divider(),
      S.documentTypeListItem("machine").title("Technology"),
      S.documentTypeListItem("treatment").title("Modalities"),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
