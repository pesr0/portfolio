// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Multimodal Signals ML Classifier',

    description: `Development of a pipeline where a raw data file containing a signal from a specific material analysis technique is used as input. 
    After automated normalization of this signal, features are extracted and used as input data in a pre-trained Random Forest (sklearn) model to predict the type of material corresponding to the signal. Based on this pipeline and model, a software solution (Python) with a graphical interface (Tkinter) was developed to distribute the tool to analysts.
    One of the challenges of the project was the limited number of data points for each material, but by defining classes of similar materials, this issue was overcome. The signals used for analysis are also stored for future model improvement. 
    Previously, this analysis took about 30 minutes for experienced analysts and hours for new analysts, but with this solution, it can now be performed in seconds with an accuracy of approximately 75%, while also removing the need for technical knowledge to interpret the signal (democratizing the analysis).
    For this project, constant communication and meetings with other departments were essential to collect data and monitor software performance.`,

    tier: 3,

    sub_topic: 'Braskem',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line', 'fas fa-eye')
    icon: 'fas fa-chart-line',

    // Available colors: neon-blue | neon-purple | neon-green
    accent_color: 'neon-green',

    background_image: 'assets/chart_lines.png',

    tech: ['Pandas', 'Numpy', 'Scipy', 'Sk-learn', 'Machine Learning'],

    // github_url: '#',

    // live_url: '#'
});
