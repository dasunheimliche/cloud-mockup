"use client";

import FormFieldInput from "@/components/form-field-input";
import FormInputRow from "@/components/form-input-row";
import FormModal from "@/components/form-modal";
import FormMultiFieldInput from "@/components/form-multi-field-input";
import FormSection from "@/components/form-section";
import FormSwitchInput from "@/components/form-switch-input";
import useCheckInput from "@/hooks/useCheckInput";
import { useEditInstanceSchema, useInstanceSchema } from "@/stores/zod-store";
import { useState } from "react";
import { PiStackSimpleFill } from "react-icons/pi";

interface EditInstanceFormProps {
  onSubmit: (object: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  selectedInstance: any;
}

export default function EditInstanceForm({
  onSubmit,
  onCancel,
  loading,
  selectedInstance,
}: EditInstanceFormProps) {
  console.log("SELECTED INSTANCE: ", selectedInstance);

  const [instance, setInstance] = useState({
    id: selectedInstance.id,
    name: selectedInstance.name,
    evaId: selectedInstance.evaId,
    groupId: selectedInstance.groupId,
    mainDisLimit: selectedInstance.mainDisLimit,
    subDisLimit: selectedInstance.subDisLimit,
    opSubDisLimit: selectedInstance.opSubDisLimit,
    percentageOnePriority: selectedInstance.percentageOnePriority,
    percentageTwoPriority: selectedInstance.percentageTwoPriority,
    percentageThreePriority: selectedInstance.percentageThreePriority,
    percentageFourPriority: selectedInstance.percentageFourPriority,
    onlyPv: selectedInstance.onlyPv,
    solarInstalled: selectedInstance.solarInstalled,
  });

  console.log("NEW INSTANCE: ", instance);

  const instanceSchema: any = useEditInstanceSchema();

  const { error } = useCheckInput(instance, instanceSchema);

  return (
    <FormModal
      title="EDIT INSTANCE"
      icon={<PiStackSimpleFill className="text-[1.3rem] max-sm:text-[2rem]" />}
      error={error}
      loading={loading}
      onCancel={onCancel}
      onSubmit={() => onSubmit(instance)}
    >
      <FormSection title="INFO">
        <FormInputRow>
          <FormFieldInput
            label="Name"
            placeholder="Parking"
            value={instance.name}
            onChange={(e) => setInstance({ ...instance, name: e.target.value })}
            className="w-1/2"
          />
          <FormFieldInput
            label="Group ID"
            type="number"
            placeholder="3"
            value={instance.groupId}
            onChange={(e) =>
              setInstance({ ...instance, groupId: +e.target.value })
            }
            className="w-1/2"
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
      </FormSection>
      <FormSection title="PRIORITIES">
        <FormInputRow>
          <FormFieldInput
            label="1º"
            className="w-1/4"
            value={instance.percentageOnePriority}
            onChange={(e) =>
              setInstance({
                ...instance,
                percentageOnePriority: +e.target.value,
              })
            }
          />
          <FormFieldInput
            label="2º"
            className="w-1/4"
            value={instance.percentageTwoPriority}
            onChange={(e) =>
              setInstance({
                ...instance,
                percentageTwoPriority: +e.target.value,
              })
            }
          />
          <FormFieldInput
            label="3º"
            className="w-1/4"
            value={instance.percentageThreePriority}
            onChange={(e) =>
              setInstance({
                ...instance,
                percentageThreePriority: +e.target.value,
              })
            }
          />
          <FormFieldInput
            label="4º"
            className="w-1/4"
            value={instance.percentageFourPriority}
            onChange={(e) =>
              setInstance({
                ...instance,
                percentageFourPriority: +e.target.value,
              })
            }
          />
        </FormInputRow>
      </FormSection>
      <FormSection title="PV">
        <FormInputRow>
          <FormSwitchInput
            label="Only PV"
            className="w-1/5"
            checked={instance.onlyPv}
            onChange={() =>
              setInstance({ ...instance, onlyPv: !instance.onlyPv })
            }
          />
          <FormMultiFieldInput
            className="w-4/5"
            label={"Power distribution"}
            values={instance.solarInstalled}
            field={"solarInstalled"}
            onChange={setInstance}
          />
        </FormInputRow>
      </FormSection>
      <FormSection title="POWER DISTRIBUTION">
        <FormInputRow>
          <FormMultiFieldInput
            label={"Main Distribution"}
            values={instance.mainDisLimit}
            onChange={setInstance}
            field={"mainDisLimit"}
          />
        </FormInputRow>
        <FormInputRow>
          <FormMultiFieldInput
            label={"Sub Distribution"}
            values={instance.subDisLimit}
            onChange={setInstance}
            field={"subDisLimit"}
          />
        </FormInputRow>
        <FormInputRow>
          <FormMultiFieldInput
            label={"Operational Distribution"}
            values={instance.opSubDisLimit}
            onChange={setInstance}
            field={"opSubDisLimit"}
          />
        </FormInputRow>
      </FormSection>
    </FormModal>
  );
}
