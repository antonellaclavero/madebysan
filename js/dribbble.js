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
