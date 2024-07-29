"use client";

import FormFieldInput from "@/components/form-field-input";
import FormInputRow from "@/components/form-input-row";
import FormModal from "@/components/form-modal";
import FormSection from "@/components/form-section";
import useCheckInput from "@/hooks/useCheckInput";
import { useInstanceSchema } from "@/stores/zod-store";
import { useEffect, useState } from "react";
import { PiStackSimpleFill } from "react-icons/pi";

interface AddInstanceFormProps {
  onSubmit: (object: any) => Promise<void>;
  loading: boolean;
}

export default function AddInstanceForm({
  onSubmit,
  loading,
}: AddInstanceFormProps) {
  const [instance, setInstance] = useState({
    name: "",
    evaId: "",
    groupId: "",
  });

  const instanceSchema: any = useInstanceSchema();

  const { error } = useCheckInput(instance, instanceSchema);

  return (
    <FormModal
      title="ADD INSTANCE"
      icon={<PiStackSimpleFill className="text-[1.3rem] max-sm:text-[2rem]" />}
      error={error}
      loading={loading}
      onSubmit={() =>
        onSubmit({
          name: instance.name,
          local_eva_id: instance.evaId,
          group_id: instance.groupId,
        })
      }
    >
      <FormSection title="INFO">
        <FormInputRow>
          <FormFieldInput
            label="Name"
            placeholder="Parking"
            value={instance.name}
            onChange={(e) => setInstance({ ...instance, name: e.target.value })}
          />
        </FormInputRow>
        <FormInputRow>
          <FormFieldInput
            label="Eva ID"
            placeholder="1321asd-a1sdf3as-a2sd1f-4asd4f"
            value={instance.evaId}
            onChange={(e) =>
              setInstance({ ...instance, evaId: e.target.value })
            }
          />
        </FormInputRow>
        <FormInputRow>
          <FormFieldInput
            label="Group ID"
            type="number"
            placeholder="3"
            value={instance.groupId}
            onChange={(e) =>
              setInstance({ ...instance, groupId: e.target.value })
            }
          />
        </FormInputRow>
      </FormSection>
    </FormModal>
  );
}
