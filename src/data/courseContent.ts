export const screenNames = [
  "Module home",
  "Opening dilemma",
  "Learn the STOP check",
  "Guided practice",
  "Workplace application",
  "Independent practice",
  "Transfer to work",
  "Learning review",
] as const;

export const progressByScreen = [0, 14, 28, 43, 58, 72, 86, 100] as const;

export const objectives = [
  "Identify common risks in workplace uses of AI",
  "Evaluate AI-use scenarios with a practical decision framework",
  "Recommend and justify appropriate safeguards",
];

export const stopFramework = [
  {
    letter: "S",
    title: "Sensitive Information",
    shortCue: "Protect the information",
    question: "Am I sharing personal, confidential, proprietary, or restricted information?",
    detail: "Before sharing information with an AI system, consider whether the data is personal, confidential, proprietary, or restricted.",
    example: "Uploading customer CRM data into a public AI tool.",
  },
  {
    letter: "T",
    title: "Truth & Accuracy",
    shortCue: "Verify before you trust",
    question: "How will I verify that the AI output is accurate enough for this task?",
    detail: "AI-generated information can sound confident while still being incomplete or incorrect.",
    example: "Using AI-generated statistics in a client presentation without verification.",
  },
  {
    letter: "O",
    title: "Others Affected",
    shortCue: "Consider the human impact",
    question: "Could this use unfairly affect another person or group?",
    detail: "Consider whether an AI-assisted decision could unfairly affect another person or group.",
    example: "Using AI recommendations to rank job candidates.",
  },
  {
    letter: "P",
    title: "People Stay Responsible",
    shortCue: "Keep a person accountable",
    question: "Who needs to review, explain, approve, or remain accountable for the outcome?",
    detail: "AI can support professional judgment, but responsibility for important decisions remains with people.",
    example: "Automatically sending AI-generated employee performance feedback without human review.",
  },
];

export const expertHiringResponse =
  "The HR manager should first confirm that candidate information can be processed in the approved AI system. AI-generated summaries and rankings should be checked for accuracy and possible bias rather than treated as objective recommendations. A qualified human should review the underlying candidate information and remain responsible for the final hiring decision.";

export const expertAssessmentResponse =
  "Before using AI, the manager should confirm whether internal evaluation notes can be processed by the approved tool. Because performance feedback can significantly affect an employee, the manager should review generated language carefully for accuracy, bias, and inappropriate assumptions. AI can help draft or organize feedback, but the manager should remain responsible for the final evaluation and wording.";

export const designRationale = [
  {
    title: "The design challenge",
    body: "This prototype translates a broad and potentially technical topic—responsible workplace AI—into a short, practical learning experience for busy professionals with limited AI knowledge. The design focuses on decisions learners may face tomorrow, not abstract policy recall.",
  },
  {
    title: "The learning strategy",
    body: "Learners first notice a realistic dilemma, then learn the memorable STOP check, practice with guidance, revise after feedback, apply the ideas in another workplace context, and finally work independently. Support deliberately fades as confidence and responsibility increase.",
  },
  {
    title: "Why these activities",
    body: "Recognition questions surface the four risk areas without heavy reading. Short responses reveal learner reasoning. Immediate, low-stakes feedback supports revision before independent practice. The final action plan makes transfer to real work visible and useful.",
  },
  {
    title: "Alignment to the objectives",
    body: "Risk recognition supports Objective 1. Guided and independent STOP analyses support Objective 2. Recommended safeguards and the workplace action plan support Objective 3. Each assessment asks learners to perform the same kind of judgment named in the objectives.",
  },
  {
    title: "Designing for working professionals",
    body: "Content is chunked, written in plain language, and anchored in familiar work situations. The shared core avoids unnecessary personalization; only the application scenario changes by professional context. A downloadable STOP job aid supports later use at work.",
  },
  {
    title: "Working with the AI subject-matter expert",
    body: "I would begin with an outcome-and-risk mapping session, then ask the SME for authentic decisions, common misconceptions, policy boundaries, and credible model responses. We would review one scenario prototype early, use short weekly check-ins, and maintain a decision log with clear content sign-off points.",
  },
];

export const videoTranscript = [
  "AI tools do not make a workplace task responsible or irresponsible on their own. Context determines the level of risk.",
  "Before using AI, first ask what information you are sharing. Sensitive, confidential, proprietary, or restricted information may require an approved system—or may not be appropriate to share at all.",
  "Next, consider how accurate the output must be. AI can produce confident language that is incomplete or wrong, so verification should match the consequences of an error.",
  "Then consider who could be affected. AI-supported recommendations can repeat bias, overlook context, or affect someone unfairly.",
  "Finally, keep people responsible. A qualified person should review, explain, approve, and remain accountable for important decisions. These four questions form the STOP check.",
];
