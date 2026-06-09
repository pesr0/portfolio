// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Multimodal Signals ML Classifier',

    summary: `ML pipeline + Tkinter desktop app to classify material signals in seconds. Replaced a 30-minute manual analysis with ~75% accuracy via Random Forest, making the result accessible to non-technical analysts.`,

    description: `Developed an end-to-end pipeline that takes a raw data file (a signal from a specific material analysis technique) as input. The signal is automatically normalized, after which relevant features are extracted and fed into a pre-trained Random Forest model (scikit-learn) to predict the corresponding material type. Building on this pipeline, I developed a Python software solution with a graphical interface (Tkinter) to distribute the tool to analysts.
    A key challenge was the limited number of data points available per material. I overcame this by grouping similar materials into defined classes. The system also stores incoming signals for continuous model improvement over time. Close, ongoing collaboration with other departments was essential throughout the project, both to gather training data and to monitor the software's performance in production.`,
    
    tech: ['Pandas', 'Numpy', 'Scipy', 'Sk-learn', 'Machine Learning'],
    
    sub_topic: 'Braskem',
    
    outcomes: `The analysis previously took experienced analysts (analysts with around 30 years of experience) around 30 minutes, and several hours for newer analysts. With this solution, it now runs in seconds at approximately 75% accuracy. Just as importantly, it removed the need for specialized technical knowledge to interpret the signal, democratizing the analysis across the team.`,
    
    image: 'assets/signal_comparator.jpeg',
    
    tier: 3,

    background_image: 'assets/chart_lines.png',

    // Available colors: neon-blue | neon-purple | neon-green
    accent_color: 'neon-green',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line', 'fas fa-eye')
    icon: 'fas fa-chart-line',
});
