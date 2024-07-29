"use client";

import InputField from "@/app/(auth)/components/input-field";
import FormFieldInput from "@/components/form-field-input";
import FormInputRow from "@/components/form-input-row";
import FormModal from "@/components/form-modal";
import FormSection from "@/components/form-section";
import FormSelectorInput from "@/components/form-selector-input";
import useCheckInput from "@/hooks/useCheckInput";
import { useVersionSchema } from "@/stores/zod-store";
import { useState } from "react";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";

interface AddVersionFormProps {
  onSubmit: (object: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function AddVersionForm({
  onSubmit,
  onCancel,
  loading,
}: AddVersionFormProps) {
  const [version, setVersion] = useState<any>({
    type: "solution",
    version: "",
    file: null,
  });

  const versionSchema = useVersionSchema();
  const { error } = useCheckInput(version, versionSchema);

  async function handleSubmit() {
    try {
      await onSubmit(version);
      setVersion({
        type: "",
        version: "",
        file: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    onCancel();
    setVersion({
      type: "",
      version: "",
      file: null,
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) return;

    setVersion({ ...version, file: event.target.files[0] });
  };

  return (
    <FormModal
      title="ADD VERSION"
      icon={
        <RiGitRepositoryCommitsFill className="text-[1.3rem] max-sm:text-[2rem]" />
      }
      error={error}
      loading={loading}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    >
      <FormSection title="INFO">
        <FormInputRow>
          <FormSelectorInput
            defaultValue={version.type}
            selectLabel="solution"
            placeholder="solution"
            label="Type"
            onValueChange={(e) => setVersion({ ...version, type: e })}
            options={[
              { label: "Solution", value: "solution" },
              { label: "Algorithm", value: "algorithm" },
            ]}
          />
        </FormInputRow>
        <FormInputRow>
          <FormFieldInput
            label="Version"
            className="w-full"
            value={version.version}
            onChange={(e) =>
              setVersion({ ...version, version: e.target.value })
            }
          />
        </FormInputRow>
        <FormInputRow>
          <FormFieldInput
            label="File"
            type="file"
            className="w-1/2 cursor-pointer"
            onChange={handleFileChange}
          />
        </FormInputRow>
      </FormSection>
    </FormModal>
  );
}
