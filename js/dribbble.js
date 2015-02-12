var ACCESS_TOKEN = 'd5ee97865d20bbb01a40f59237a843feb5acb6276c240815dc0bada9dacdcc25';

var getAllDribbbleProjects = function() {
    var r = new XMLHttpRequest();

    r.open(
        'GET',
        'https://api.dribbble.com/v1/users/sntaln/shots',
        false
    )

    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) return r;
    };

    r.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN)

    r.send();
    return r
}

projects = JSON.parse(getAllDribbbleProjects().responseText);
portfolioContainer = document.getElementById('portfolio');

projects.forEach(function(project) {
    projectContainer = document.createElement('li');
    projectContainer.classList.add('hidden');

    var link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', project.html_url);
    projectContainer.appendChild(link);

    var img = document.createElement('img');
    img.setAttribute('alt', project.title);
    img.setAttribute('src', project.images.hidpi);
    link.appendChild(img);

    portfolioContainer.appendChild(projectContainer)
});
