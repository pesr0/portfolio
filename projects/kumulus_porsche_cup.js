// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'AI-Powered Damage Analysis – Porsche Cup Brasil',

    summary: `End-to-end computer vision + LLM pipeline to automate damage identification in Porsche Cup racing cars. YOLO detects damaged regions, OpenCV matches against reference images, and GPT identifies parts from the official catalog — deployed on Azure Kubernetes Service.`,

    description: `Development of an end-to-end computer vision and LLM pipeline to automate the identification of damaged parts in racing cars from photos.
    Mechanics upload images of incidents via a web application, which are stored in Azure Blob Storage and processed asynchronously by a worker triggered via Azure Service Bus. The AI pipeline combines object detection (YOLO) to locate damaged regions, visual matching (OpenCV) against reference images, and GPT (Azure OpenAI) to identify and name the specific parts from the official catalog. 
    Results are surfaced to engineers with part replacement suggestions, significantly reducing manual inspection time. 
    The backend was built with FastAPI, persisted in MySQL via SQLAlchemy, and deployed on Azure Kubernetes Service with a CI/CD pipeline (Azure DevOps). 
    One of the main challenges was combining three distinct vision approaches into a reliable sequential pipeline, each compensating for the other's failure modes.`,
    
    tech: ['LLM', 'OpenCV', 'Azure', 'FastAPI', 'Kubernetes', 'YOLO'],
    
    sub_topic: 'Kumulus',

    // outcomes: `teste`,
    
    live_url: 'https://news.microsoft.com/source/latam/features/ia-pt-br/porsche-cup-brasil-analise-acidentes-alimentada-por-ia/',
    
    live_label: 'Article',
    
    image: 'assets/porsche_cup_car.png',
    
    tier: 1,

    background_image: 'assets/porsche_logo.png',

    // Available colors: neon-blue | neon-purple | neon-green
    accent_color: 'neon-blue',
    
    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    icon: 'fas fa-car-side',
});
