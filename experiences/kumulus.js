// Each file adds one entry to PORTFOLIO_EXPERIENCES.
// To add a new experience: create a new .js file and add its <script> tag to index.html.
window.PORTFOLIO_EXPERIENCES = window.PORTFOLIO_EXPERIENCES || [];
window.PORTFOLIO_EXPERIENCES.push({
    order: 1,
    company: 'Kumulus',
    role: 'Data Scientist',
    // Available colors: neon-blue | neon-purple | neon-green
    color: 'neon-blue',
    period: 'May 2025 - Present',
    achievements: [
        'I am responsible for the development and delivery of production-grade AI systems across multiple clientprojects, including LLM pipelines, computer vision, RAG architectures, custom model training, and multi-tenant AI agents. Solutions included end-to-end REST APIs (FastAPI) integrated with asynchronous workers (Azure Service Bus), deployed on Azure Kubernetes Service with CI/CD pipelines (Azure DevOps).',
        'Developed a computer vision pipeline combining object detection , visual matching (OpenCV) and language model analysis (GPT / Azure OpenAI) to automate damage assessment from images.',
        'Built RAG systems with hybrid search using both cloud-hosted and locally-served open-source LLMs (vLLM, Llama3, Mistral), containerized via Docker.',
        'Developed a multi-tenant AI agent integrating with an MCP Server (Azure Container Apps) for tenant-isolated knowledge retrieval.',
        'Also acted as technical consultant, evaluating architectures and delivering structured recommendations for AI systems in production.',
        'All projects involved direct client engagement, translating business requirements into scalable AI solutions, with code versioning (Git) and structured documentation throughout.',
    ]
});
