// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Document Classifier',

    summary: `Custom document classification model on Azure AI Document Intelligence that labels mining process documents from ANM's SEI system. The classifier identifies which files (economic exploitation plans, permits, licenses, reports, and others) are eligible to feed a downstream AI agent that drafts technical analyses for the agency's reviewers. Built through an iterative curation and training loop with Python tooling, Azure Blob Storage, and continuous feedback from ANM analysts, currently running in production.`,

    description: `Development of a custom document classification model to automate the triage of mining process documents for Brazil's National Mining Agency (ANM). Each mining process holds hundreds of PDFs of mixed types, and the model assigns every document to a predefined category such as permit, economic exploitation plan (PAE), license, or technical report. The classifier feeds a downstream AI agent that extracts structured information and drafts technical analyses for ANM reviewers, so accurate labeling determines which files are used as the primary source for each analysis.
    The model was built on Azure AI Document Intelligence and trained through an iterative loop: GPT made a first pass of pre-classification, the team corrected and consolidated the label set, and the curated dataset was used to retrain the model across several versions. Class definitions were reshaped along the way based on direct feedback from ANM analysts, moving from a broad initial set toward a smaller, more reliable group of categories. One of the main challenges was balancing label granularity against model reliability, since a finer taxonomy improved traceability but hurt classification stability, and keeping the analysis anchored to the PAE as the primary document rather than unrelated files in the process.`,

    tech: ['Azure', 'Computer Vision', 'Dcoker', 'AI Engineer', 'Machine Learning', 'NoSQL'],

    sub_topic: 'Kumulus',

    outcomes: `The model removed the manual step of sorting hundreds of documents per mining process before analysis, letting reviewers reach the relevant files faster and reducing analysis time per process. By labeling documents reliably, it lets the downstream agent anchor its drafts to the correct primary source instead of pulling from unrelated files, which improves the traceability and trustworthiness of each generated analysis. The iterative approach, driven by analyst feedback across model versions, raised classification consistency while keeping the system in active production use at a federal regulatory agency.`,
});