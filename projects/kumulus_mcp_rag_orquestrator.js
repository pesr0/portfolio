// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'MCP RAG Orquestrator',

    summary: `AI support assistant connecting an agent to per-company knowledge bases through the Model Context Protocol and CRM-based authentication. The user's tenant identity, taken from OAuth, automatically routes queries to that company's own document index, so a single assistant serves multiple clients with isolated context, backed by a per-client document ingestion pipeline.`,

    description: `Development of an AI support assistant that connects an agent to per-company knowledge bases through the Model Context Protocol (MCP), integrated with a CRM platform used by the client base. Users authenticate through the CRM's OAuth, and their tenant identity is used automatically to isolate the search context, so each company only ever queries its own documents. The agent answers support and FAQ-style questions by retrieving relevant content for that specific tenant and composing a coherent reply inside a web chat interface.
    The system is built around a multi-tenant design where the user's identity drives which knowledge base gets queried, with no manual selection. When a user signs in, the tenant identifier is extracted from the authentication token and passed to the agent, which calls a search tool exposed by an MCP server to fetch the right documents and ground its answer. The work covered the authentication flow, the MCP server exposing the search tool, the agent consuming that tool, the chat frontend, and a document ingestion pipeline that populates a separate search index per client. One of the main points was guaranteeing strict data isolation between tenants while keeping a single assistant and a single ingestion pipeline serving all of them.`,

    tech: ['MCP', 'Docker', 'RAG', 'Azure Search Service'],

    sub_topic: 'Kumulus',

    outcomes: `The assistant lets multiple companies use a single AI support tool while keeping each one's data isolated through their existing CRM login, removing the need for separate deployments or manual configuration per client. Tying the search scope to the authenticated tenant kept the architecture simple to operate and scale as new clients were added, since onboarding a company came down to creating its index and feeding its documents. For end users, it turned a static knowledge base into a conversational assistant that answers grounded in their own company's material.`,
});