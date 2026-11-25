import { type FieldErrors, isValidEmail } from "@/lib/forms";

export const TOTAL_STEPS = 5;
export type StepNumber = 1 | 2 | 3 | 4 | 5;

export type HelpFormValues = {
  // Etapa 1
  fullName: string;
  birthDate: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  filledBy: string;
  guardianName: string;
  // Etapa 2
  limbs: string[];
  limbsOther: string;
  levels: string[];
  levelsOther: string;
  when: string;
  story: string;
  // Etapa 3
  usesProsthesis: string;
  fits: string;
  rehab: string;
  followed: string;
  followedBy: string;
  // Etapa 4
  needs: string[];
  needsOther: string;
  details: string;
  // Etapa 5
  source: string;
  sourceOther: string;
  instagram: string;
  extra: string;
};

export const initialValues: HelpFormValues = {
  fullName: "",
  birthDate: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  filledBy: "",
  guardianName: "",
  limbs: [],
  limbsOther: "",
  levels: [],
  levelsOther: "",
  when: "",
  story: "",
  usesProsthesis: "",
  fits: "",
  rehab: "",
  followed: "",
  followedBy: "",
  needs: [],
  needsOther: "",
  details: "",
  source: "",
  sourceOther: "",
  instagram: "",
  extra: "",
};

export const STORY_MAX_LENGTH = 700;
export const OTHER = "other";
export const YES = "yes";
export const GUARDIAN = "guardian";

export type HelpValidationMessages = {
  required: string;
  invalidEmail: string;
  selectAtLeastOne: string;
};

type TextKey = {
  [K in keyof HelpFormValues]: HelpFormValues[K] extends string ? K : never;
}[keyof HelpFormValues];

/**
 * Valida uma etapa. A ordem das verificações segue a ordem visual,
 * para que o foco vá ao primeiro campo com erro.
 */
export function validateStep(
  step: StepNumber,
  values: HelpFormValues,
  messages: HelpValidationMessages,
): FieldErrors {
  const errors: FieldErrors = {};
  const required = (key: TextKey, when = true) => {
    if (when && values[key].trim() === "") errors[key] = messages.required;
  };
  const atLeastOne = (key: "limbs" | "levels" | "needs") => {
    if (values[key].length === 0) errors[key] = messages.selectAtLeastOne;
  };

  switch (step) {
    case 1:
      required("fullName");
      required("birthDate");
      required("city");
      required("state");
      required("phone");
      required("email");
      if (!errors.email && !isValidEmail(values.email)) {
        errors.email = messages.invalidEmail;
      }
      required("filledBy");
      required("guardianName", values.filledBy === GUARDIAN);
      break;
    case 2:
      atLeastOne("limbs");
      required("limbsOther", values.limbs.includes(OTHER));
      atLeastOne("levels");
      required("levelsOther", values.levels.includes(OTHER));
      required("when");
      required("story");
      break;
    case 3:
      required("usesProsthesis");
      required("fits", values.usesProsthesis === YES);
      required("rehab");
      required("followed");
      required("followedBy", values.followed === YES);
      break;
    case 4:
      atLeastOne("needs");
      required("needsOther", values.needs.includes(OTHER));
      required("details");
      break;
    case 5:
      // Instagram e informação adicional são opcionais.
      required("source");
      required("sourceOther", values.source === OTHER);
      break;
  }
  return errors;
}
