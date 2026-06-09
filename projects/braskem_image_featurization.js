// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Microscopy Image Featurization',

    description: `Development of a method for extracting important data from microscopy images. 
    Extracting data from microscopy images was a challenge for the team, as existing software solutions did not meet specific criteria. 
    I developed scripts to identify and extract relevant data related to artifacts in the images (OpenCV). At the end of the process, the collected data was provided through practical and easy-to-understand visualizations. 
    This method was transformed into a web application (Streamlit), deployed in an Azure container (Docker), and made available to company users, allowing simultaneous access by multiple users.`,

    // tier: null,

    sub_topic: 'Braskem',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    // icon: 'fas fa-car-side',

    // Available colors: neon-blue | neon-purple | neon-green
    // accent_color: 'neon-blue',

    // background_image: 'assets/porsche_logo.png',

    tech: ['Pandas', 'Numpy', 'OpenCV', 'Docker', 'Streamlit', 'Image Analysis'],

    // github_url: '#',
    
    // live_url: '#'
});
