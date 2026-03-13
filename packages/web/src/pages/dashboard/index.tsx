import { useState } from "react";

import DocumentCard, { type DocumentCardProps } from "../../components/DocumentCard";
import DocumentScreen from "../../components/DocumentScreen";

export default function DashboardPage() {
  const [docFocused, setDocFocused] = useState<DocumentCardProps | null>(null);

  const cadsPreview: DocumentCardProps[] = [
    {
      docid: "clj1h2k340000u7x8g9h0j1k2",
      title: "Design System Guidelines 2026",
      authorId: "user_01",
      authorName: "Ana Silva",
      previewContent: "This document details the new visual guidelines for the user interface, focusing on accessibility and reusable components. We cover the use of design tokens, standardized spacing, and the new color palette for dark mode..."
    },
    {
      docid: "clj1h2k340001u7x8g9h0j1k3",
      title: "Quarterly Performance Report",
      authorId: "user_05",
      authorName: "Marcos Souza",
      previewContent: "Detailed analysis of Q1 technical performance. The report covers API latency metrics, LCP load times, and production error rates, demonstrating a 15% improvement after the implementation of the new global cache system..."
    },
    {
      docid: "clj1h2k340002u7x8g9h0j1k4",
      title: "Engineering Onboarding Manual",
      authorId: "user_12",
      authorName: "Carla Duarte",
      previewContent: "Welcome to the engineering team! This guide contains the step-by-step process for setting up your local environment, accessing our GitHub repositories, and understanding the CI/CD flow. It also includes useful links to internal technical documentation..."
    },
    {
      docid: "clj1h2k340003u7x8g9h0j1k5",
      title: "Information Security Policy",
      authorId: "user_02",
      authorName: "Roberto Alencar",
      previewContent: "Definition of critical standards for the protection of sensitive company data. It covers the use of multi-factor authentication (MFA), strong password policies, and incident response procedures to ensure compliance with LGPD and GDPR..."
    },
    {
      docid: "clj1h2k340004u7x8g9h0j1k6",
      title: "Product Roadmap - H2 2026",
      authorId: "user_09",
      authorName: "Fernanda Lima",
      previewContent: "Strategic vision for the second half of 2026. The main focus will be the integration of generative AI tools into the text editor and the expansion of our infrastructure to the European market, aiming to scale the user base..."
    },
    {
      docid: "clj1h2k340005u7x8g9h0j1k7",
      title: "Sprint #42 Notes",
      authorId: "user_01",
      authorName: "Ana Silva",
      previewContent: "Summary of the last sprint's deliveries. We completed the refactoring of the authentication module and fixed critical bugs reported in the analytics dashboard. We plan to start the migration to the new framework version next week..."
    },
    {
      docid: "clj1h2k340006u7x8g9h0j1k8",
      title: "Writing Style Guide (Copy)",
      authorId: "user_21",
      authorName: "Juliana Mendes",
      previewContent: "How we communicate with our customers. This manual defines the brand's tone of voice: friendly, direct, and professional. It includes examples of how to write error messages that don't frustrate the user and how to structure our newsletters..."
    },
    {
      docid: "clj1h2k340007u7x8g9h0j1k9",
      title: "Microservices Architecture",
      authorId: "user_15",
      authorName: "Thiago Rocha",
      previewContent: "Technical documentation on the transition from monolith to microservices. Explains gRPC communication, the role of the API Gateway, and how we manage eventual consistency between distributed databases using RabbitMQ messaging..."
    },
    {
      docid: "clj1h2k340008u7x8g9h0j1l0",
      title: "Competitor Analysis - March",
      authorId: "user_09",
      authorName: "Fernanda Lima",
      previewContent: "Comparative study between our platform and the three main competitors. We identified gaps in our third-party integration offerings and opportunities to differentiate our product through more agile customer support..."
    },
    {
      docid: "clj1h2k340009u7x8g9h0j1l1",
      title: "Disaster Recovery Plan",
      authorId: "user_02",
      authorName: "Roberto Alencar",
      previewContent: "Emergency protocol for critical server failure. Defines RTO (Recovery Time Objective) and RPO (Recovery Point Objective), lists on-call contacts, and procedures for restoring cloud backups..."
    }
  ];

  const cardsContents = new Map<string, string>([
    [
      "clj1h2k340000u7x8g9h0j1k2",
      "This document details the new visual guidelines for the user interface, focusing on accessibility and reusable components. We cover the use of design tokens, standardized spacing, and the new color palette for dark mode. The goal is to unify the user experience across all platforms, ensuring the brand is recognizable and navigation is intuitive for all user profiles, following WCAG 2.1 Level AA standards."
    ],
    [
      "clj1h2k340001u7x8g9h0j1k3",
      "Detailed analysis of Q1 technical performance. The report covers API latency metrics, LCP load times, and production error rates, demonstrating a 15% improvement after the implementation of the new global cache system. We also observed a significant reduction in memory consumption on edge servers, resulting in a 10% saving in cloud infrastructure costs over the last month, exceeding our initial targets."
    ],
    [
      "clj1h2k340002u7x8g9h0j1k4",
      "Welcome to the engineering team! This guide contains the step-by-step process for setting up your local environment, accessing our GitHub repositories, and understanding the CI/CD flow. It also includes useful links to internal technical documentation, code conventions, and the code review process. We hope this document facilitates your first days at the company and helps you perform your first production deploy within the first week, with all necessary security."
    ],
    [
      "clj1h2k340003u7x8g9h0j1k5",
      "Definition of critical standards for the protection of sensitive company data. It covers the use of multi-factor authentication (MFA), strong password policies, and incident response procedures to ensure compliance with LGPD and GDPR. It is every employee's duty to safeguard information integrity and immediately report any suspicious activity to the security team, ensuring our digital assets remain protected against external and internal threats."
    ],
    [
      "clj1h2k340004u7x8g9h0j1k6",
      "Strategic vision for the second half of 2026. The main focus will be the integration of generative AI tools into the text editor and the expansion of our infrastructure to the European market, aiming to scale the user base. We plan to launch three main new features: real-time automatic translation, context-based style suggestions, and an enhanced simultaneous collaboration system for large remote teams."
    ],
    [
      "clj1h2k340005u7x8g9h0j1k7",
      "Summary of the last sprint's deliveries. We completed the refactoring of the authentication module and fixed critical bugs reported in the analytics dashboard. We plan to start the migration to the new framework version next week, which should resolve performance issues on older mobile devices. Additionally, the QA team validated the new search interface, which now supports advanced filters and tag-based search, improving the discovery experience."
    ],
    [
      "clj1h2k340006u7x8g9h0j1k8",
      "How we communicate with our customers. This manual defines the brand's tone of voice: friendly, direct, and professional. It includes examples of how to write error messages that don't frustrate the user and how to structure our newsletters to ensure higher engagement. Consistency in communication is fundamental to building trust with our audience; therefore, we ask all writers and designers to follow these instructions when creating any customer-facing material."
    ],
    [
      "clj1h2k340007u7x8g9h0j1k9",
      "Technical documentation on the transition from monolith to microservices. Explains gRPC communication, the role of the API Gateway, and how we manage eventual consistency between distributed databases using RabbitMQ messaging. The document details the challenges encountered during the user service migration and lessons learned regarding distributed monitoring and log tracing, essential for maintaining ecosystem stability at scale."
    ],
    [
      "clj1h2k340008u7x8g9h0j1l0",
      "Comparative study between our platform and the three main competitors. We identified gaps in our third-party integration offerings and opportunities to differentiate our product through more agile customer support and a cleaner interface. The analysis suggests we should invest in strategic partnerships with CRM platforms to capture a larger share of the B2B market, where our competitors have recently shown greater difficulty in penetration."
    ],
    [
      "clj1h2k340009u7x8g9h0j1l1",
      "Emergency protocol for critical server failure. Defines RTO (Recovery Time Objective) and RPO (Recovery Point Objective), as well as listing on-call contacts and procedures for restoring cloud backups. This plan is reviewed semi-annually and tested in isolated environments to ensure the team is prepared for any eventuality, minimizing downtime and protecting the integrity of our customers' data."
    ]
  ]);

  return (
    <>
      {
        docFocused ? <DocumentScreen
          docid={docFocused!.docid}
          title={docFocused!.title}
          authorId={docFocused!.authorId}
          authorName={docFocused!.authorName}
          content={cardsContents.get(docFocused!.docid)!}
          onAction={() => setDocFocused(null)}
        /> : null
      }
      <div>
        <div className="w-full grid grid-cols-[repeat(auto-fit,18rem)] justify-center gap-4">
          {
            cadsPreview.map((doc, key) =>
              <DocumentCard
                key={key}
                docid={doc.docid}
                title={doc.title}
                authorName={doc.authorName}
                authorId={doc.authorId}
                previewContent={doc.previewContent}
                onAction={() => setDocFocused(doc)}
              />
            )
          }
        </div>
      </div>
    </>
  );
}