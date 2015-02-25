var getDribbbleProjects = function(page, firstRun) {
    console.log("> Fetching projects: page " + page);
    var r = new XMLHttpRequest();

    r.open(
        'GET',
        'https://api.dribbble.com/v1/users/sntaln/shots?per_page=8&page=' + page,
        !firstRun
    )

    r.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN)
    r.setRequestHeader('Origin', 'http://antonellaclavero.github.io')

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            if (firstRun) {
                getDribbbleProjects(page + 1, false);
                return
            }

            var newProjects = JSON.parse(r.responseText);
            if (newProjects.length > 0) {
                console.log("> New projects found on page " + page + ", adding to list...");
                allProjects = allProjects.concat(newProjects);
                getDribbbleProjects(page + 1, false);
            }
        }
    };

    r.send();
    return r
}

var cyclePortfolio = function() {
    var visibleProject = portfolioContainer.children[Math.floor((Math.random() * 8))];
    var invisibleProject = allProjects.splice(Math.floor((Math.random() * (allProjects.length - 1))), 1)[0];

    allProjects.push({
        html_url: visibleProject.children[0].href,
        title:    visibleProject.children[0].children[0].alt,
        images:   {
            hidpi: visibleProject.children[0].children[0].src
        }
    });

    visibleProject.children[0].href = invisibleProject.html_url
    visibleProject.children[0].children[0].alt = invisibleProject.title
    visibleProject.children[0].children[0].src = invisibleProject.images.hidpi || invisibleProject.images.normal || invisibleProject.images.teaser

    setTimeout(cyclePortfolio, 4000);
}

ACCESS_TOKEN = 'd5ee97865d20bbb01a40f59237a843feb5acb6276c240815dc0bada9dacdcc25';
portfolioContainer = document.getElementById('portfolio');
allProjects = [];

// Render first few projects synchroneously.
var r = getDribbbleProjects(1, true);
var visibleProjects = JSON.parse(r.responseText);

visibleProjects.forEach(function(project) {
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

setTimeout(cyclePortfolio, 4000);
