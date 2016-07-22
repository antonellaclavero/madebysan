var renderDribbbleProjects = function(response) {
    response.data.forEach(function(project) {
        var projectContainer = document.createElement('li');

        var link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', project.html_url);
        projectContainer.appendChild(link);

        var img = document.createElement('img');
        img.setAttribute('alt', project.title);
        img.setAttribute('src', project.images.hidpi || project.images.normal || project.images.teaser);
        link.appendChild(img);

        portfolioContainer.appendChild(projectContainer);
    });
}

var handleExtraDribbbleProjects = function(response) {
    nonVisibleProjects = response.data.splice(8, response.data.length);
    setInterval(cyclePortfolio, 4000);
}

var cyclePortfolio = function() {
    var visibleProject = portfolioContainer.children[Math.floor((Math.random() * 8))];
    var invisibleProject = nonVisibleProjects.splice(Math.floor((Math.random() * (nonVisibleProjects.length - 1))), 1)[0];

    nonVisibleProjects.push({
        html_url: visibleProject.children[0].href,
        title:    visibleProject.children[0].children[0].alt,
        images:   {
            hidpi: visibleProject.children[0].children[0].src
        }
    });

    visibleProject.children[0].href = invisibleProject.html_url
    visibleProject.children[0].children[0].alt = invisibleProject.title
    visibleProject.children[0].children[0].src = invisibleProject.images.hidpi || invisibleProject.images.normal || invisibleProject.images.teaser
}

// Set global vars
portfolioContainer = document.getElementById('portfolio');
nonVisibleProjects = [];
