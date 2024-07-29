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

interface AddGroupFormProps {
  onSubmit: (object: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function AddGroupForm({
  onSubmit,
  onCancel,
  loading,
}: AddGroupFormProps) {
  const [group, setGroup] = useState({
    name: "",
    owner_id: "",
    city: "",
    zipcode: "",
    address: "",
    local_currency: "eur",
    price_kwh: "",
  });

  const groupSchema = useGroupSchema();
  const { error } = useCheckInput(group, groupSchema);

  async function handleSubmit() {
    try {
      await onSubmit(group);
      setGroup({
        name: "",
        owner_id: "",
        city: "",
        zipcode: "",
        address: "",
        local_currency: "eur",
        price_kwh: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    onCancel();
    setGroup({
      name: "",
      owner_id: "",
      city: "",
      zipcode: "",
      address: "",
      local_currency: "eur",
      price_kwh: "",
    });
  }

  return (
    <FormModal
      title="ADD GROUP"
      icon={<PiStackFill className="text-[1.4rem] max-sm:text-[2rem]" />}
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <FormSection title="INFO">
        <FormInputRow>
          <FormFieldInput
            label="Name"
            placeholder="Barcelona Group"
            className="w-1/2"
            value={group.name}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
          />
          <FormFieldInput
            label="Owner ID"
            type="number"
            placeholder="234"
            className="w-1/2"
            value={group.owner_id}
            onChange={(e) => setGroup({ ...group, owner_id: e.target.value })}
          />
        </FormInputRow>
      </FormSection>
      <FormSection title="UBICATION">
        <FormInputRow>
          <FormFieldInput
            label="City"
            placeholder="Barcelona"
            className="w-1/2"
            value={group.city}
            onChange={(e) => setGroup({ ...group, city: e.target.value })}
          />
          <FormFieldInput
            label="ZIP Code"
            type="number"
            placeholder="BC457"
            className="w-1/2"
            value={group.zipcode}
            onChange={(e) => setGroup({ ...group, zipcode: e.target.value })}
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
            defaultValue="eur"
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
            placeholder="0.89"
            type="number"
            value={group.price_kwh}
            onChange={(e) => setGroup({ ...group, price_kwh: e.target.value })}
          />
        </FormInputRow>
      </FormSection>
    </FormModal>
  );
}
