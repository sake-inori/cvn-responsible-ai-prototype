import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BriefcaseBusiness, Check, CheckCircle2, Clock3,
  Download, FileText, Lightbulb, Megaphone, MonitorPlay, Play, RefreshCcw,
  Sparkles, Users, X,
} from "lucide-react";
import {
  designRationale, expertAssessmentResponse, expertHiringResponse, objectives,
  progressByScreen, screenNames, stopFramework, videoTranscript,
} from "./data/courseContent";
import { analyzeResponse, conceptLabels, rubricFor, type FeedbackResult } from "./lib/feedback";

const stopNotesText = [
  "THE STOP CHECK — RESPONSIBLE AI AT WORK",
  "",
  ...stopFramework.flatMap((item) => [
    `${item.letter} — ${item.title}: ${item.shortCue}`,
    item.question,
    `Example: ${item.example}`,
    "",
  ]),
  "KEY TAKEAWAY",
  "Responsible AI is not about avoiding AI. Match human judgment, verification, and safeguards to the risk of the task.",
].join("\n");

const stopNotesHref = `data:text/plain;charset=utf-8,${encodeURIComponent(stopNotesText)}`;

type ChoiceProps = {
  id: string; label: string; checked: boolean; onChange: () => void;
  type?: "radio" | "checkbox"; name?: string; disabled?: boolean;
  result?: "correct" | "incorrect";
};

function Choice({ id, label, checked, onChange, type = "radio", name, disabled, result }: ChoiceProps) {
  return (
    <label className={`choice ${checked ? "selected" : ""} ${result ? `choice-${result}` : ""}`} htmlFor={id}>
      <input id={id} type={type} name={name} checked={checked} onChange={onChange} disabled={disabled} />
      <span className="choice-control" aria-hidden="true">{checked && <Check size={15} strokeWidth={3} />}</span>
      <span>{label}</span>
    </label>
  );
}

function FeedbackPanel({ feedback }: { feedback: FeedbackResult }) {
  return (
    <div className="feedback-panel" aria-live="polite">
      <div>
        <h3><CheckCircle2 size={20} /> What you did well</h3>
        <ul>{feedback.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div>
        <h3><Lightbulb size={20} /> Consider also</h3>
        <ul>{feedback.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}

function LessonHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="lesson-heading">
      <span className="screen-kicker">{eyebrow}</span>
      <h1>{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </header>
  );
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [presenterOpen, setPresenterOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const [dilemma, setDilemma] = useState("");
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(false);
  const [guidedSelected, setGuidedSelected] = useState<string[]>([]);
  const [guidedPartASubmitted, setGuidedPartASubmitted] = useState(false);
  const [guidedText, setGuidedText] = useState("");
  const [guidedFeedback, setGuidedFeedback] = useState<FeedbackResult | null>(null);
  const [guidedRevision, setGuidedRevision] = useState(false);
  const [guidedExpert, setGuidedExpert] = useState(false);
  const [pathway, setPathway] = useState<"marketing" | "hr" | "pm">("marketing");
  const [pathwayNotice, setPathwayNotice] = useState("");
  const [marketingQ1, setMarketingQ1] = useState("");
  const [marketingQ1Submitted, setMarketingQ1Submitted] = useState(false);
  const [marketingQ2, setMarketingQ2] = useState<string[]>([]);
  const [marketingQ2Submitted, setMarketingQ2Submitted] = useState(false);
  const [marketingText, setMarketingText] = useState("");
  const [marketingFeedback, setMarketingFeedback] = useState<FeedbackResult | null>(null);
  const [assessmentText, setAssessmentText] = useState("");
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [transfer, setTransfer] = useState({ task: "", risk: "", safeguard: "" });
  const [actionPlan, setActionPlan] = useState(false);

  const progress = completed ? 100 : progressByScreen[screen];
  const assessmentRubric = useMemo(() => rubricFor(assessmentText), [assessmentText]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [screen]);

  const goTo = (next: number) => {
    const bounded = Math.max(0, Math.min(screenNames.length - 1, next));
    setScreen(bounded);
    setFurthest((current) => Math.max(current, bounded));
  };

  const resetDemo = () => {
    setScreen(0); setFurthest(0); setCompleted(false);
    setDilemma(""); setDilemmaSubmitted(false);
    setGuidedSelected([]); setGuidedPartASubmitted(false); setGuidedText("");
    setGuidedFeedback(null); setGuidedRevision(false); setGuidedExpert(false);
    setPathway("marketing"); setPathwayNotice(""); setMarketingQ1("");
    setMarketingQ1Submitted(false); setMarketingQ2([]); setMarketingQ2Submitted(false);
    setMarketingText(""); setMarketingFeedback(null);
    setAssessmentText(""); setAssessmentSubmitted(false);
    setTransfer({ task: "", risk: "", safeguard: "" }); setActionPlan(false);
    setPresenterOpen(false); setVideoOpen(false);
  };

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const renderHome = () => (
    <>
      <LessonHeader eyebrow="MODULE 3 OF 6 · INTRODUCTION" title="Responsible Use of AI in the Workplace" intro="Make informed and responsible decisions when using AI at work." />
      <div className="meta-row"><span><Clock3 size={18} /> Estimated time: 45–60 minutes</span><span><MonitorPlay size={18} /> Format: Self-paced</span></div>
      <div className="intro-panel"><h2>What you’ll learn</h2><ul>{objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
      <p className="body-copy">AI can improve productivity, but workplace use also introduces risks involving sensitive information, inaccurate outputs, fairness, and accountability. This module helps you make practical decisions about when and how to use AI responsibly.</p>
      <button className="primary-button" type="button" onClick={() => goTo(1)}>Start module <ArrowRight size={18} /></button>
    </>
  );

  const renderDilemma = () => {
    const options = [
      ["a", "Upload the full document because the deadline is urgent."],
      ["b", "Remove obvious names and upload the rest."],
      ["c", "Check whether the tool is approved for confidential data before proceeding."],
      ["d", "Avoid using AI for workplace tasks entirely."],
    ];
    return <>
      <LessonHeader eyebrow="PRIOR KNOWLEDGE · UNGRADED" title="Before We Begin: What Would You Do?" intro="Use your current judgment. You’ll return to this kind of decision after learning a practical framework." />
      <div className="scenario-box"><span>WORKPLACE DILEMMA</span><p>“You have a client meeting in 30 minutes. Your manager asks you to upload a confidential client report to a public AI tool and generate a one-page summary.”</p></div>
      <fieldset className="question-block" disabled={dilemmaSubmitted}><legend>What would you do?</legend><div className="choice-list">{options.map(([value, label]) => <Choice key={value} id={`dilemma-${value}`} name="dilemma" label={label} checked={dilemma === value} onChange={() => setDilemma(value)} />)}</div></fieldset>
      {!dilemmaSubmitted ? <button className="primary-button" type="button" disabled={!dilemma} onClick={() => setDilemmaSubmitted(true)}>Save my response</button> : <div className="neutral-feedback" aria-live="polite"><Lightbulb size={22} /><div><strong>Keep your response in mind.</strong><p>You’ll revisit this type of decision after learning the framework.</p></div></div>}
    </>;
  };

  const renderFramework = () => <>
    <LessonHeader eyebrow="LEARN · 6 MINUTES" title="The STOP Check: Four Questions Before You Use AI" intro="Use this quick check to pause, notice the risks, and choose safeguards that fit the task." />
    <button className="video-card" type="button" onClick={() => setVideoOpen(true)}><span className="video-play"><Play size={24} fill="currentColor" /></span><span><small>SAMPLE VIDEO · 3:20</small><strong>Responsible AI at Work: Why Context Matters</strong><em>Play SME explanation</em></span></button>
    <section className="transcript-panel" aria-labelledby="transcript-title"><div><span>TEXT VERSION</span><h2 id="transcript-title">What the video explains</h2></div><div className="transcript-copy">{videoTranscript.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    <div className="framework-grid">{stopFramework.map((item, index) => <article className={`framework-card framework-card-${index + 1}`} key={item.letter}><div className="card-topline"><div className="letter-badge">{item.letter}</div><span>{item.shortCue}</span></div><h2>{item.title}</h2><p className="framework-question">{item.question}</p><p className="framework-detail">{item.detail}</p><div className="example"><strong>WORKPLACE EXAMPLE</strong>{item.example}</div></article>)}</div>
    <div className="job-aid-row"><div><strong>Keep STOP within reach</strong><p>Download the four questions as a plain-text job aid for your next workplace AI decision.</p></div><a className="secondary-button download-button" href={stopNotesHref} download="STOP-responsible-AI-job-aid.txt"><Download size={18} /> Download STOP notes</a></div>
  </>;

  const renderGuided = () => {
    const considerations = ["Sensitive candidate information", "Accuracy of AI-generated summaries", "Potential bias or unfair impact", "Human oversight of the final hiring decision"];
    return <>
      <LessonHeader eyebrow="GUIDED PRACTICE · STOP WITH SUPPORT" title="Guided Practice: AI in Hiring" intro="First identify the relevant considerations. Then explain what a responsible process would look like." />
      <div className="scenario-box compact"><span>SCENARIO</span><p>“An HR manager uses AI to summarize resumes and recommend the five strongest candidates.”</p></div>
      <section className="practice-section"><div className="part-label"><span>PART A</span> Recognize the risks</div>
        <fieldset className="question-block" disabled={guidedPartASubmitted}><legend>Which responsible-AI considerations are relevant? <small>Select all that apply.</small></legend><div className="choice-list">{considerations.map((item, index) => <Choice key={item} id={`guided-${index}`} type="checkbox" label={item} checked={guidedSelected.includes(item)} onChange={() => toggle(item, guidedSelected, setGuidedSelected)} result={guidedPartASubmitted ? "correct" : undefined} />)}</div></fieldset>
        {!guidedPartASubmitted ? <button className="secondary-button" type="button" disabled={!guidedSelected.length} onClick={() => setGuidedPartASubmitted(true)}>Check considerations</button> : <div className="inline-feedback success"><CheckCircle2 size={20} /><p><strong>This scenario involves multiple risks.</strong> Candidate information may contain sensitive data, AI summaries may omit context, automated recommendations may introduce bias, and hiring decisions should retain human oversight.</p></div>}
      </section>
      {guidedPartASubmitted && <section className="practice-section reveal-section"><div className="part-label"><span>PART B</span> Explain a responsible process</div>
        <label className="prompt-label" htmlFor="guided-response">What should the HR manager do before relying on the AI recommendation?</label>
        <textarea id="guided-response" value={guidedText} onChange={(event) => setGuidedText(event.target.value)} disabled={Boolean(guidedFeedback && !guidedRevision)} placeholder="Use the STOP framework to explain your recommendation…" rows={5} />
        {!guidedFeedback && <button className="primary-button" type="button" disabled={guidedText.trim().length < 8} onClick={() => setGuidedFeedback(analyzeResponse(guidedText))}>Get feedback</button>}
        {guidedFeedback && !guidedExpert && <><FeedbackPanel feedback={guidedFeedback} />{!guidedRevision ? <button className="secondary-button" type="button" onClick={() => setGuidedRevision(true)}>Revise my response</button> : <button className="primary-button" type="button" disabled={guidedText.trim().length < 8} onClick={() => { setGuidedFeedback(analyzeResponse(guidedText)); setGuidedExpert(true); setGuidedRevision(false); }}>Compare with expert reasoning</button>}</>}
        {guidedExpert && guidedFeedback && <div className="comparison-grid" aria-live="polite"><article><span>YOUR RESPONSE</span><p>{guidedText}</p><div className="concept-summary"><strong>Included in your response</strong>{guidedFeedback.found.length ? guidedFeedback.found.map((key) => <small key={key}><Check size={14} />{conceptLabels[key]}</small>) : <small>No STOP concepts detected yet</small>}</div></article><article className="expert-card"><span>EXPERT REASONING</span><p>{expertHiringResponse}</p><div className="concept-summary"><strong>Considerations you may have missed</strong>{guidedFeedback.missing.length ? guidedFeedback.missing.map((key) => <small key={key}>{conceptLabels[key]}</small>) : <small>You addressed all four STOP dimensions.</small>}</div></article></div>}
      </section>}
    </>;
  };

  const choosePathway = (next: "marketing" | "hr" | "pm") => { setPathway(next); setPathwayNotice(next === "marketing" ? "" : "Additional workplace pathway shown for prototype purposes."); };

  const renderApplication = () => {
    const q2Options = ["AI-generated audience segments may contain bias.", "Generated claims may be inaccurate.", "Human review is no longer necessary.", "Customer-facing content may still require human review."];
    return <>
      <LessonHeader eyebrow="CONTEXTUAL APPLICATION · CHOOSE A PATH" title="Apply It to Your Work" intro="The core principles remain the same, but responsible AI decisions may look different across professional contexts." />
      <div className="pathway-grid"><button type="button" className={`pathway-card ${pathway === "marketing" ? "active" : ""}`} onClick={() => choosePathway("marketing")}><Megaphone /><span><strong>Marketing</strong><small>Personalize customer campaigns with AI.</small></span></button><button type="button" className={`pathway-card ${pathway === "hr" ? "active" : ""}`} onClick={() => choosePathway("hr")}><Users /><span><strong>Human resources</strong><small>Use AI to support candidate screening.</small></span></button><button type="button" className={`pathway-card ${pathway === "pm" ? "active" : ""}`} onClick={() => choosePathway("pm")}><BriefcaseBusiness /><span><strong>Project management</strong><small>Summarize project and client information.</small></span></button></div>
      {pathwayNotice && <div className="neutral-feedback small" role="status"><Lightbulb size={19} /><div><strong>{pathway === "hr" ? "Human Resources" : "Project Management"}</strong><p>{pathwayNotice} Select Marketing to continue the working pathway.</p></div></div>}
      {pathway === "marketing" && <div className="application-flow"><div className="scenario-box compact"><span>MARKETING SCENARIO</span><p>“You are preparing a personalized product-launch campaign. A colleague suggests uploading customer CRM data into a generative AI tool to identify audience segments and generate tailored messaging.”</p></div>
        <section className="practice-section"><div className="part-label"><span>QUESTION 1</span> Start with S</div><fieldset className="question-block" disabled={marketingQ1Submitted}><legend>What should the team consider first?</legend><div className="choice-list compact-choices">{["Whether AI will make the campaign more creative.", "Whether customer data can be used in this AI tool.", "Whether AI can generate enough versions quickly.", "Whether competitors already use AI."].map((label, index) => <Choice key={label} id={`market-q1-${index}`} name="market-q1" label={label} checked={marketingQ1 === String(index)} onChange={() => setMarketingQ1(String(index))} result={marketingQ1Submitted && marketingQ1 === String(index) ? (index === 1 ? "correct" : "incorrect") : undefined} />)}</div></fieldset>
          {!marketingQ1Submitted ? <button className="secondary-button" type="button" disabled={!marketingQ1} onClick={() => setMarketingQ1Submitted(true)}>Check answer</button> : <div className={`inline-feedback ${marketingQ1 === "1" ? "success" : "attention"}`}><Lightbulb size={20} /><p><strong>{marketingQ1 === "1" ? "That’s the right first question." : "Start with the information, not the efficiency."}</strong> Before creativity or speed, confirm whether customer information is appropriate for the selected AI tool and whether policy permits this use.</p></div>}
        </section>
        {marketingQ1Submitted && <section className="practice-section reveal-section"><div className="part-label"><span>QUESTION 2</span> Risks after approval</div><fieldset className="question-block" disabled={marketingQ2Submitted}><legend>The company confirms that the AI tool is approved. Which concerns may still remain? <small>Select all that apply.</small></legend><div className="choice-list compact-choices">{q2Options.map((item, index) => <Choice key={item} id={`market-q2-${index}`} type="checkbox" label={item} checked={marketingQ2.includes(String(index))} onChange={() => toggle(String(index), marketingQ2, setMarketingQ2)} result={marketingQ2Submitted && marketingQ2.includes(String(index)) ? (index === 2 ? "incorrect" : "correct") : undefined} />)}</div></fieldset>
          {!marketingQ2Submitted ? <button className="secondary-button" type="button" disabled={!marketingQ2.length} onClick={() => setMarketingQ2Submitted(true)}>Check concerns</button> : <div className="inline-feedback success"><CheckCircle2 size={20} /><p><strong>Approval addresses only one part of the decision.</strong> Bias, inaccurate claims, and the need for human review can remain even when the tool is approved.</p></div>}
        </section>}
        {marketingQ2Submitted && <section className="practice-section reveal-section"><div className="part-label"><span>QUESTION 3</span> Recommend a process</div><label className="prompt-label" htmlFor="marketing-response">What process would you recommend before launching the campaign?</label><textarea id="marketing-response" value={marketingText} onChange={(event) => setMarketingText(event.target.value)} placeholder="Describe the checks, safeguards, and people involved…" rows={4} />{!marketingFeedback ? <button className="primary-button" type="button" disabled={marketingText.trim().length < 8} onClick={() => setMarketingFeedback(analyzeResponse(marketingText))}>Get feedback</button> : <FeedbackPanel feedback={marketingFeedback} />}</section>}
      </div>}
    </>;
  };

  const renderAssessment = () => <>
    <LessonHeader eyebrow="INDEPENDENT PRACTICE · NO HINTS" title="Independent Practice" intro="Now apply the framework to a new workplace situation without guided prompts." />
    <div className="scenario-box"><span>SCENARIO</span><p>“A manager wants to use generative AI to write employee performance feedback using internal evaluation notes.”</p></div>
    <label className="prompt-label large-prompt" htmlFor="assessment-response">Identify two important risks. Recommend what the manager should do, and briefly explain your reasoning using the STOP framework.</label>
    <textarea id="assessment-response" value={assessmentText} onChange={(event) => setAssessmentText(event.target.value)} disabled={assessmentSubmitted} placeholder="Write your recommendation and reasoning…" rows={7} />
    {!assessmentSubmitted ? <button className="primary-button" type="button" disabled={assessmentText.trim().length < 20} onClick={() => setAssessmentSubmitted(true)}>Submit practice assessment</button> : <div className="assessment-results" aria-live="polite"><div className="result-heading"><span>PRACTICE ASSESSMENT FEEDBACK</span><p>This is simulated rubric feedback for reflection—not a high-stakes AI grade.</p></div><div className="rubric-grid">{assessmentRubric.map((item) => <div key={item.label}><span>{item.label}</span><strong className={`status-${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</strong></div>)}</div><div className="expert-response"><span>EXPERT RESPONSE</span><p>{expertAssessmentResponse}</p></div><button className="text-button" type="button" onClick={() => setAssessmentSubmitted(false)}>Edit my response</button></div>}
  </>;

  const renderTransfer = () => <>
    <LessonHeader eyebrow="WORKPLACE TRANSFER · 3 MINUTES" title="Bring It Back to Your Work" intro="Choose one real task and turn the STOP framework into a practical next step." />
    <div className="transfer-form"><label>1. What is the task?<input value={transfer.task} onChange={(event) => setTransfer({ ...transfer, task: event.target.value })} placeholder="e.g., Summarize customer interview notes" /></label><label>2. What is the biggest Responsible AI risk?<input value={transfer.risk} onChange={(event) => setTransfer({ ...transfer, risk: event.target.value })} placeholder="e.g., Confidential customer information" /></label><label>3. What safeguard would you add?<textarea value={transfer.safeguard} onChange={(event) => setTransfer({ ...transfer, safeguard: event.target.value })} placeholder="e.g., Use only the approved tool and remove unnecessary identifiers" rows={3} /></label>{!actionPlan && <button className="primary-button" type="button" disabled={!transfer.task.trim() || !transfer.risk.trim() || !transfer.safeguard.trim()} onClick={() => setActionPlan(true)}>Create my action plan</button>}</div>
    {actionPlan && <div className="action-plan" aria-live="polite"><div className="plan-title"><FileText size={22} /><span><small>MY RESPONSIBLE AI</small><strong>ACTION PLAN</strong></span></div><dl><div><dt>Task</dt><dd>{transfer.task}</dd></div><div><dt>Risk</dt><dd>{transfer.risk}</dd></div><div><dt>Safeguard</dt><dd>{transfer.safeguard}</dd></div></dl></div>}
    {actionPlan && <div className="takeaway"><span>KEY TAKEAWAY</span><p>“Responsible AI is not about avoiding AI. It is about matching the level of human judgment, verification, and safeguards to the risk of the task.”</p></div>}
  </>;

  const renderReview = () => {
    const marketingCorrect = marketingQ1 === "1" && ["0", "1", "3"].every((value) => marketingQ2.includes(value)) && !marketingQ2.includes("2");
    const revisionPoints = [
      ...(dilemma !== "c" ? ["Pause before sharing workplace information. Urgency does not replace an approved-data check."] : []),
      ...(guidedFeedback?.missing.map((key) => `Strengthen your use of ${conceptLabels[key].toLowerCase()} when explaining a decision.`) ?? []),
      ...(!marketingCorrect ? ["After tool approval, continue checking accuracy, fairness, and human review—not only data permission."] : []),
      ...assessmentRubric.filter((item) => item.status !== "Strong").map((item) => `Develop the ${item.label.toLowerCase()} part of your explanation with one more specific detail.`),
    ];
    const strengths = [
      ...(guidedFeedback?.found.map((key) => `You applied ${conceptLabels[key].toLowerCase()} in guided practice.`) ?? []),
      ...(marketingQ1 === "1" ? ["You prioritized appropriate data use before speed or creativity."] : []),
      ...(assessmentRubric.filter((item) => item.status === "Strong").map((item) => `Your independent response showed strength in ${item.label.toLowerCase()}.`)),
      "You translated the framework into a safeguard for your own work.",
    ];
    return <>
      <div className="celebration-hero"><div className="celebration-icon"><Sparkles size={32} /></div><span>MODULE COMPLETE</span><h1>You’re ready to make more responsible AI decisions.</h1><p>You practiced identifying risks, choosing safeguards, revising your reasoning, and transferring the STOP check to your own work.</p></div>
      <section className="learning-review" aria-labelledby="review-title"><div className="review-heading"><span>YOUR LEARNING REVIEW</span><h2 id="review-title">What to carry forward</h2></div><div className="review-columns"><article><h3><CheckCircle2 size={20} /> What you demonstrated</h3><ul>{strengths.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3><Lightbulb size={20} /> Best revision points</h3><ul>{revisionPoints.length ? revisionPoints.slice(0, 4).map((item) => <li key={item}>{item}</li>) : <li>You addressed the core risks. Keep making your safeguards specific to the task, tool, and people affected.</li>}</ul></article></div></section>
      <section className="stop-recap" aria-labelledby="stop-recap-title"><div><span>YOUR FOUR-QUESTION CHECK</span><h2 id="stop-recap-title">STOP before the next AI-assisted decision</h2></div><div className="stop-recap-grid">{stopFramework.map((item) => <div key={item.letter}><strong>{item.letter}</strong><span>{item.title}</span><small>{item.shortCue}</small></div>)}</div></section>
      {actionPlan ? <div className="final-action-plan"><span>YOUR NEXT STEP</span><p>For <strong>{transfer.task}</strong>, watch for <strong>{transfer.risk}</strong> and use this safeguard: <strong>{transfer.safeguard}</strong></p></div> : <div className="final-action-plan"><span>YOUR NEXT STEP</span><p>Choose one upcoming AI-assisted task, name its most important risk, and add a specific safeguard before you begin.</p></div>}
      <div className="completion-banner" role="status"><CheckCircle2 size={30} /><div><strong>Well done—you completed the module.</strong><p>Your STOP notes are available on the learning page whenever you want a quick workplace job aid.</p></div></div>
    </>;
  };

  const screens = [renderHome, renderDilemma, renderFramework, renderGuided, renderApplication, renderAssessment, renderTransfer, renderReview];

  return <div className="app-shell">
    <header className="brand-bar"><div className="brand-wrap">{!logoFailed ? <img src="/columbia-engineering-logo.png" alt="Columbia Video Network and Columbia Engineering" onError={() => setLogoFailed(true)} /> : <div className="brand-fallback visible">COLUMBIA ENGINEERING</div>}</div><div className="header-actions"><button className="quiet-button" type="button" onClick={() => setPresenterOpen(true)}>Design story</button><button className="quiet-button" type="button" onClick={resetDemo}><RefreshCcw size={14} /> Reset demo</button></div></header>
    <div className="course-bar"><div><p>Introduction to Artificial Intelligence</p><strong>Module: Responsible Use of AI in the Workplace</strong></div><div className="progress-readout"><span>{progress}% complete</span><strong>{screen + 1} / {screenNames.length}</strong></div></div>
    <div className="progress-line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Module progress"><span style={{ width: `${progress}%` }} /></div>
    <main className="course-layout"><aside className="module-nav" aria-label="Module navigation"><span className="nav-eyebrow">MODULE JOURNEY</span>{screenNames.map((name, index) => <button key={name} className={`nav-item ${index === screen ? "active" : ""} ${index < screen || completed ? "visited" : ""}`} type="button" disabled={index > furthest} onClick={() => goTo(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name}{(index < screen || completed) && <Check size={15} aria-hidden="true" />}</button>)}</aside><div className="content-column"><section className="lesson-card">{screens[screen]()}</section>{screen > 0 && <nav className="lesson-pagination" aria-label="Lesson pagination"><div className="pagination-side"><button className="secondary-button" type="button" onClick={() => goTo(screen - 1)}><ArrowLeft size={17} /> Previous</button><small>Presentation mode · activities are optional</small></div>{screen < screenNames.length - 1 && <button className="primary-button" type="button" onClick={() => { if (screen === 6) setCompleted(true); goTo(screen + 1); }}>{screen === 6 ? "Finish & review" : "Next"} <ArrowRight size={17} /></button>}</nav>}</div></main>
    {videoOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setVideoOpen(false)}><div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onMouseDown={(event) => event.stopPropagation()}><button className="icon-button close" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}><X /></button><div className="video-placeholder"><Play size={50} /></div><div><span className="screen-kicker">DEMO VIDEO · 3:20</span><h2 id="video-title">Responsible AI at Work: Why Context Matters</h2><p>Demo video placeholder—in a production course, this would contain a concise SME explanation with captions and a downloadable transcript.</p></div></div></div>}
    {presenterOpen && <div className="drawer-backdrop" role="presentation" onMouseDown={() => setPresenterOpen(false)}><aside className="presenter-drawer" role="dialog" aria-modal="true" aria-labelledby="presenter-title" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="screen-kicker">PROJECT INTRODUCTION</span><h2 id="presenter-title">How this learning experience was designed</h2></div><button className="icon-button" type="button" aria-label="Close design introduction" onClick={() => setPresenterOpen(false)}><X /></button></div><p className="drawer-intro">This prototype demonstrates how a broad responsible-AI topic can become a concise, scaffolded, and workplace-relevant asynchronous module.</p>{designRationale.map((note, index) => <article key={note.title} className="presenter-note"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{note.title}</h3><p>{note.body}</p></div></article>)}</aside></div>}
  </div>;
}
