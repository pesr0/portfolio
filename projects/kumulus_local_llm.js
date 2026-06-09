// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Local LLM RAG Chatbot',

    summary: `RAG chatbot letting factory employees query CNC machine manuals in natural language. Open-source LLMs (Llama3, Mistral) run locally on a GPU server via vLLM, keeping all sensitive documentation completely internal.`,

    
    description: `Development of a RAG chatbot enabling factory employees to query technical manuals for CNC machines in natural language, replacing slow manual searches through extensive PDF documentation. 
    The system classifies each incoming message to determine whether retrieval is needed, generates embeddings of the query, and performs hybrid search (Azure AI Search) to retrieve the most relevant document chunks before generating a response. 
    A key architectural decision was running open-source LLMs locally (Llama3, Mistral, Qwen) via vLLM on a GPU server (Azure VM), eliminating dependency on external AI APIs and keeping sensitive documentation internal. 
    Models run in Docker containers with a custom control API managing which model is active due to VRAM constraints. 
    The FastAPI backend handles authentication (Microsoft Entra ID), conversation history (Azure SQL), and context trimming to respect token limits per model. A separate PDF indexing pipeline was built to onboard new manuals into the search index.`,
    
    tech: ['Local LLM', 'vLLM', 'Docker', 'RAG', 'FastAPI'],
    
    sub_topic: 'Kumulus',
    
    // outcomes: ``,
    
    image: 'assets/hugging_face.png',
    
    tier: 2,

    background_image: 'assets/hugging_face.png',

    // Available colors: neon-blue | neon-purple | neon-green
    accent_color: 'neon-purple',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line', 'fas fa-eye')
    icon: 'fas fa-robot',
});
