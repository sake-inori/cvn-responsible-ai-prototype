export type ConceptKey = "privacy" | "accuracy" | "fairness" | "oversight";

export type FeedbackResult = {
  found: ConceptKey[];
  missing: ConceptKey[];
  strengths: string[];
  considerations: string[];
};

export const conceptLabels: Record<ConceptKey, string> = {
  privacy: "Sensitive information / approved tools",
  accuracy: "Accuracy and verification",
  fairness: "Fairness and potential bias",
  oversight: "Human review and accountability",
};

const patterns: Record<ConceptKey, string[]> = {
  privacy: ["privacy", "confidential", "sensitive", "candidate data", "customer data", "employee data", "approved tool", "permission", "policy", "restricted"],
  accuracy: ["verify", "check", "validate", "accuracy", "accurate", "fact", "review the output", "compare"],
  fairness: ["bias", "fair", "unfair", "discrimination", "discriminate", "equity", "impact"],
  oversight: ["human", "review", "manager", "oversight", "accountable", "responsibility", "approve", "final decision"],
};

const strengthCopy: Record<ConceptKey, string> = {
  privacy: "You considered whether sensitive information can be used in the selected AI tool.",
  accuracy: "You recognized the need to verify AI-generated output.",
  fairness: "You identified the possibility of bias or unfair impact.",
  oversight: "You kept human review and accountability in the process.",
};

const considerationCopy: Record<ConceptKey, string> = {
  privacy: "Confirm that the information can be processed in an approved tool and follows organizational policy.",
  accuracy: "Add a clear verification step before the output is used.",
  fairness: "Check whether the AI output could disadvantage a person or group.",
  oversight: "Name who will review, approve, and remain accountable for the final outcome.",
};

export function analyzeResponse(text: string): FeedbackResult {
  const normalized = text.toLowerCase();
  const keys = Object.keys(patterns) as ConceptKey[];
  const found = keys.filter((key) => patterns[key].some((term) => normalized.includes(term)));
  const missing = keys.filter((key) => !found.includes(key));
  return {
    found,
    missing,
    strengths: found.length ? found.map((key) => strengthCopy[key]) : ["You made a start by proposing a workplace action."],
    considerations: missing.length ? missing.map((key) => considerationCopy[key]) : ["You addressed all four STOP dimensions. Keep the safeguards specific to the task and organization."],
  };
}

export function rubricFor(text: string) {
  const result = analyzeResponse(text);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const status = (keys: ConceptKey[], minimum = 1) => {
    const count = keys.filter((key) => result.found.includes(key)).length;
    if (count >= Math.min(keys.length, minimum + 1)) return "Strong";
    if (count >= minimum) return "Developing";
    return "Needs More Consideration";
  };
  return [
    { label: "Risk Identification", status: status(["privacy", "accuracy", "fairness"], 1) },
    { label: "Application of STOP", status: result.found.length >= 3 ? "Strong" : result.found.length >= 2 ? "Developing" : "Needs More Consideration" },
    { label: "Recommended Action", status: status(["oversight", "privacy"], 1) },
    { label: "Reasoning", status: wordCount >= 45 ? "Strong" : wordCount >= 20 ? "Developing" : "Needs More Consideration" },
  ];
}
