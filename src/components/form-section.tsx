import React from "react";
import FormSectionTitle from "./form-section-title";

interface FormSectionProps {
  children: React.ReactNode;
  title: string;
}

export default function FormSection({ children, title }: FormSectionProps) {
  return (
    <div className="w-full relative">
      <FormSectionTitle title={title} />
      <div className="flex flex-col gap-3 mt-2">{children}</div>
    </div>
  );
}
