// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'AI Agent Consultant',

    summary: `Technical consulting engagement to assess and guide a production legal AI assistant that drafts client responses by retrieving similar past cases from roughly 330,000 documents and synthesizing answers with GPT-4o. Delivered architecture review, bug identification, and prioritized recommendations across multiple rounds, covering both the current retrieval pipeline and the long-term direction toward a multi-agent knowledge platform. The engagement led the client to sign a larger development project.`,

    description: `Technical consulting engagement to assess and guide the evolution of a legal AI assistant for a US law firm specialized in landlord-tenant law. The system answers client inquiries by searching a base of roughly 330,000 historical documents (around 30 years of expert communications) for semantically similar past cases and synthesizing a draft response with GPT-4o, good enough to be sent to clients after minimal lawyer review. The system runs in production handling around 100 to 200 client situations per day.
    My role was advisory rather than hands-on development: reviewing the existing retrieval-augmented architecture, identifying bugs and technical debt, and producing prioritized recommendations across several rounds. This included evaluating the response pipeline that summarizes the incoming message, expands it into search queries, retrieves similar situations, and synthesizes a final answer, then flagging concrete issues such as a logging step that recorded answers before a downstream validation step could override them, confidence thresholds that were never calibrated against real response quality, and a retrieval step that passed every matched log to the model regardless of relevance. The recommendations also covered the longer-term direction of turning the assistant into an extensible knowledge platform with specialized agents over a unified legal knowledge layer. The assessment work established enough trust and clarity on the roadmap that the client committed to a larger development engagement that followed.`,

    tech: ['Consultant', 'AI Foundry'],

    sub_topic: 'Kumulus',

    outcomes: `The assessment surfaced several issues that were affecting reliability and cost, including a bug where the stored answer could differ from what the user actually received, confidence checks that never triggered in practice, and a retrieval step that inflated cost by sending irrelevant context to the model. Turning these into a prioritized roadmap gave the client a clear path to improve response quality and reduce wasted processing. Beyond the technical findings, the engagement built enough confidence in the direction of the system that it became the basis for a larger, signed development project, which was the main business outcome.`,

    // image: 'assets/',
    
    // github_url: '#',

    // live_url: '#'

    // live_label: 'PLACEHOLDER',
    
    // tier: 0,
    
    // background_image: 'assets/',
    
    // Available colors: neon-blue | neon-purple | neon-green
    // accent_color: 'neon-blue',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    // icon: 'fas fa-car-side',
});