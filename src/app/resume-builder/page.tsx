"use client";

import EditorPage from '@/components/views/EditorPage';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export default function Page() {
  return (
    <>
      <WebApplicationSchema />
      <EditorPage />
    </>
  );
}
