"use client";

import type { ChangeEvent } from "react";

import { CheckboxGroupField } from "@/components/forms/checkbox-group-field";
import type { OtherOption } from "@/components/forms/other-input";
import { type ChoiceOption, RadioField } from "@/components/forms/radio-field";
import { TextAreaField } from "@/components/forms/text-area-field";
import { TextField } from "@/components/forms/text-field";
import type { Dictionary } from "@/i18n/dictionaries";
import type { FieldErrors } from "@/lib/forms";
import {
  GUARDIAN,
  type HelpFormValues,
  OTHER,
  STORY_MAX_LENGTH,
  type StepNumber,
  YES,
} from "./state";

export type SetField = <K extends keyof HelpFormValues>(
  key: K,
  value: HelpFormValues[K],
) => void;

type StepFieldsProps = {
  step: StepNumber;
  values: HelpFormValues;
  errors: FieldErrors;
  setField: SetField;
  texts: Dictionary["help"];
  ui: { otherPlaceholder: string; optional: string };
};

const ID = "ajuda";

function labelOf(options: readonly ChoiceOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

/** Campos de cada etapa do formulário "Preciso de ajuda". */
export function StepFields({
  step,
  values,
  errors,
  setField,
  texts,
  ui,
}: StepFieldsProps) {
  const other = (
    name: "limbsOther" | "levelsOther" | "needsOther" | "sourceOther",
    options: readonly ChoiceOption[],
  ): OtherOption => ({
    value: OTHER,
    name,
    text: values[name],
    onTextChange: (text) => setField(name, text),
    placeholder: ui.otherPlaceholder,
    ariaLabel: labelOf(options, OTHER),
    error: errors[name],
  });

  const text = (
    key:
      | "fullName"
      | "birthDate"
      | "city"
      | "state"
      | "phone"
      | "email"
      | "guardianName"
      | "when"
      | "followedBy"
      | "instagram",
  ) => ({
    idPrefix: ID,
    name: key,
    value: values[key],
    error: errors[key],
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setField(key, event.target.value),
  });

  switch (step) {
    case 1: {
      const t = texts.step1;
      return (
        <>
          <TextField
            {...text("fullName")}
            label={t.fullName}
            autoComplete="name"
          />
          <TextField
            {...text("birthDate")}
            type="date"
            label={t.birthDate}
            autoComplete="bday"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              {...text("city")}
              label={t.city}
              autoComplete="address-level2"
            />
            <TextField
              {...text("state")}
              label={t.state}
              autoComplete="address-level1"
            />
          </div>
          <TextField
            {...text("phone")}
            type="tel"
            label={t.phone}
            autoComplete="tel"
            inputMode="tel"
          />
          <TextField
            {...text("email")}
            type="email"
            label={t.email}
            autoComplete="email"
            inputMode="email"
          />
          <RadioField
            idPrefix={ID}
            name="filledBy"
            label={t.filledBy}
            options={t.filledByOptions}
            value={values.filledBy}
            onValueChange={(value) => setField("filledBy", value)}
            error={errors.filledBy}
          />
          {values.filledBy === GUARDIAN ? (
            <div className="animate-in duration-300 fade-in slide-in-from-top-1">
              <TextField {...text("guardianName")} label={t.guardianName} />
            </div>
          ) : null}
        </>
      );
    }

    case 2: {
      const t = texts.step2;
      return (
        <>
          <CheckboxGroupField
            idPrefix={ID}
            name="limbs"
            label={t.limbs}
            options={t.limbOptions}
            values={values.limbs}
            onValuesChange={(next) => setField("limbs", next)}
            error={errors.limbs}
            other={other("limbsOther", t.limbOptions)}
          />
          <CheckboxGroupField
            idPrefix={ID}
            name="levels"
            label={t.level}
            options={t.levelOptions}
            values={values.levels}
            onValuesChange={(next) => setField("levels", next)}
            error={errors.levels}
            other={other("levelsOther", t.levelOptions)}
          />
          <TextField {...text("when")} type="date" label={t.when} />
          <TextAreaField
            idPrefix={ID}
            name="story"
            label={t.story}
            value={values.story}
            onChange={(event) => setField("story", event.target.value)}
            maxLength={STORY_MAX_LENGTH}
            counterTemplate={t.counter}
            error={errors.story}
          />
        </>
      );
    }

    case 3: {
      const t = texts.step3;
      return (
        <>
          <RadioField
            idPrefix={ID}
            name="usesProsthesis"
            label={t.usesProsthesis}
            options={t.yesNoOptions}
            inline
            value={values.usesProsthesis}
            onValueChange={(value) => setField("usesProsthesis", value)}
            error={errors.usesProsthesis}
          />
          {values.usesProsthesis === YES ? (
            <div className="animate-in duration-300 fade-in slide-in-from-top-1">
              <RadioField
                idPrefix={ID}
                name="fits"
                label={t.fits}
                options={t.fitsOptions}
                value={values.fits}
                onValueChange={(value) => setField("fits", value)}
                error={errors.fits}
              />
            </div>
          ) : null}
          <RadioField
            idPrefix={ID}
            name="rehab"
            label={t.rehab}
            options={t.yesNoOptions}
            inline
            value={values.rehab}
            onValueChange={(value) => setField("rehab", value)}
            error={errors.rehab}
          />
          <RadioField
            idPrefix={ID}
            name="followed"
            label={t.followed}
            options={t.yesNoOptions}
            inline
            value={values.followed}
            onValueChange={(value) => setField("followed", value)}
            error={errors.followed}
          />
          {values.followed === YES ? (
            <div className="animate-in duration-300 fade-in slide-in-from-top-1">
              <TextField {...text("followedBy")} label={t.followedBy} />
            </div>
          ) : null}
        </>
      );
    }

    case 4: {
      const t = texts.step4;
      return (
        <>
          <CheckboxGroupField
            idPrefix={ID}
            name="needs"
            label={t.needs}
            options={t.needOptions}
            values={values.needs}
            onValuesChange={(next) => setField("needs", next)}
            error={errors.needs}
            other={other("needsOther", t.needOptions)}
          />
          <TextAreaField
            idPrefix={ID}
            name="details"
            label={t.details}
            value={values.details}
            onChange={(event) => setField("details", event.target.value)}
            error={errors.details}
          />
        </>
      );
    }

    case 5: {
      const t = texts.step5;
      return (
        <>
          <RadioField
            idPrefix={ID}
            name="source"
            label={t.source}
            options={t.sourceOptions}
            value={values.source}
            onValueChange={(value) => setField("source", value)}
            error={errors.source}
            other={other("sourceOther", t.sourceOptions)}
          />
          <TextField
            {...text("instagram")}
            label={t.instagram}
            optionalLabel={ui.optional}
            autoCapitalize="none"
            spellCheck={false}
          />
          <TextAreaField
            idPrefix={ID}
            name="extra"
            label={t.extra}
            optionalLabel={ui.optional}
            value={values.extra}
            onChange={(event) => setField("extra", event.target.value)}
          />
        </>
      );
    }
  }
}
