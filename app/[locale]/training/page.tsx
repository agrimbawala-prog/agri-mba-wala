import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hasLocale } from "@/lib/i18n/config";
import { getMarketingCopy } from "@/lib/marketing-content";
import { listTrainingCourses, listEnrollments } from "@/lib/db";
import { TrainingClient } from "./TrainingClient";

type Props = { params: Promise<{ locale: string }> };

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const copy = getMarketingCopy(locale);
  const courses = await listTrainingCourses();
  const enrollments = await listEnrollments();

  return (
    <>
      <Header locale={locale} copy={copy.nav} />
      <main>
        <TrainingClient locale={locale} courses={courses} initialEnrollments={enrollments} />
      </main>
      <Footer locale={locale} copy={copy.footer} nav={copy.nav} />
    </>
  );
}
