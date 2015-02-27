var getDribbbleProjects = function(p) {
    var r = new XMLHttpRequest();

    r.open(
        'GET',
        'https://api.dribbble.com/v1/users/sntaln/shots?callback=handleNewDribbbleData&per_page=8&page=' + p
    )

    r.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN)

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            eval(r.responseText);
        }
    };

    r.send();
    return r
}

var handleNewDribbbleData = function(response) {
    if (page == 1) {
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
            getDribbbleProjects(++page);
        });
    } else {
        if (response.data.length > 0) {
            nonVisibleProjects = nonVisibleProjects.concat(response.data);
            getDribbbleProjects(++page);
        }
    }

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

    setTimeout(cyclePortfolio, 4000);
}

// Set global vars
ACCESS_TOKEN = 'd5ee97865d20bbb01a40f59237a843feb5acb6276c240815dc0bada9dacdcc25';
portfolioContainer = document.getElementById('portfolio');
nonVisibleProjects = [];
page = 1;

// Start getting data, rendering, cycling the portfolio, generally living la vida loca.
getDribbbleProjects(page)
setTimeout(cyclePortfolio, 4000);
