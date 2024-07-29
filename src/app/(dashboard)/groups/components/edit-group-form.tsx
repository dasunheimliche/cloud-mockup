"use client";

import FormFieldInput from "@/components/form-field-input";
import FormInputRow from "@/components/form-input-row";
import FormModal from "@/components/form-modal";
import FormSection from "@/components/form-section";
import FormSelectorInput from "@/components/form-selector-input";
import useCheckInput from "@/hooks/useCheckInput";
import { useGroupSchema } from "@/stores/zod-store";
import { useState } from "react";
import { PiStackFill } from "react-icons/pi";

interface EditGroupFormProps {
  onSubmit: (object: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  selectedGroup: any;
}

export default function EditGroupForm({
  onSubmit,
  onCancel,
  loading,
  selectedGroup,
}: EditGroupFormProps) {
  const [group, setGroup] = useState({
    id: String(selectedGroup.id),
    name: selectedGroup.name,
    owner_id: String(selectedGroup.owner_id),
    city: selectedGroup.city,
    zipcode: String(selectedGroup.zipcode),
    address: selectedGroup.address,
    local_currency: selectedGroup.local_currency,
    price_kwh: String(selectedGroup.price_kwh),
  });

  const groupSchema = useGroupSchema();
  const { error } = useCheckInput(group, groupSchema);

  return (
    <FormModal
      title="EDIT GROUP"
      icon={<PiStackFill className="text-[1.4rem] max-sm:text-[2rem]" />}
      error={error}
      loading={loading}
      onCancel={onCancel}
      onSubmit={() => onSubmit(group)}
    >
      <FormSection title="INFO">
        <FormInputRow>
          <FormFieldInput
            label="Name"
            value={group.name}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
            placeholder="Barcelona Group"
            className="w-1/2"
          />
          <FormFieldInput
            label="Owner ID"
            value={group.owner_id}
            onChange={(e) => setGroup({ ...group, owner_id: e.target.value })}
            placeholder="234"
            className="w-1/2"
          />
        </FormInputRow>
      </FormSection>
      <FormSection title="UBICATION">
        <FormInputRow>
          <FormFieldInput
            label="City"
            value={group.city}
            onChange={(e) => setGroup({ ...group, city: e.target.value })}
            placeholder="Barcelona"
            className="w-1/2"
          />
          <FormFieldInput
            label="ZIP Code"
            value={group.zipcode}
            onChange={(e) => setGroup({ ...group, zipcode: e.target.value })}
            placeholder="BC457"
            className="w-1/2"
          />
        </FormInputRow>
        <FormInputRow>
          <FormFieldInput
            label="Address"
            placeholder="SF 456"
            value={group.address}
            onChange={(e) => setGroup({ ...group, address: e.target.value })}
          />
        </FormInputRow>
      </FormSection>
      <FormSection title="PRICING">
        <FormInputRow>
          <FormSelectorInput
            label="Local Currency"
            placeholder="Peso"
            selectLabel="Currency"
            className="w-1/2"
            defaultValue={group.local_currency}
            onValueChange={(e) => setGroup({ ...group, local_currency: e })}
            options={[
              {
                value: "eur",
                label: "Euro",
              },
              {
                value: "gbp",
                label: "Pund Sterling",
              },
              {
                value: "chf",
                label: "Swiss Franc",
              },
              {
                value: "usd",
                label: "US Dollar",
              },
              {
                value: "mxn",
                label: "Mexican Peso",
              },
              {
                value: "cop",
                label: "Colombian Peso",
              },
            ]}
          />
          <FormFieldInput
            className="w-1/2"
            label="Kwh Price"
            value={group.price_kwh}
            onChange={() => setGroup({ ...group, price_kwh: group.price_kwh })}
          />
        </FormInputRow>
      </FormSection>
    </FormModal>
  );
}
