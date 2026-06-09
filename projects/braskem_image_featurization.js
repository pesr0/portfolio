// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Microscopy Image Featurization',

    summary: `OpenCV pipeline to extract quantitative data from microscopy images, filling a gap where existing software fell short. Deployed as a multi-user Streamlit app on Azure for simultaneous team access.`,

    description: `Development of a method for extracting important data from microscopy images. 
    Extracting data from microscopy images was a challenge for the team, as existing software solutions did not meet specific criteria. 
    I developed scripts to identify and extract relevant data related to artifacts in the images (OpenCV). At the end of the process, the collected data was provided through practical and easy-to-understand visualizations. 
    This method was transformed into a web application (Streamlit), deployed in an Azure container (Docker), and made available to company users, allowing simultaneous access by multiple users.`,

    tech: ['Pandas', 'Numpy', 'OpenCV', 'Docker', 'Streamlit', 'Image Analysis'],

    sub_topic: 'Braskem',
    
    // outcomes: ``,

    image: 'assets/image_featurization.jpeg',
});
