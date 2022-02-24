const APIURL = 'https://api.github.com/users/unfoldedtree'

const main = document.getElementById('main')

let statsRendered = false;

async function getUserInfoFromGitHub() {
    
    try {
        let totalProjects = 0;
        let sumCommits = 0;
        let daysAsUser = 0;
        let followers = 0;

        if (sessionStorage.daysAsUser && sessionStorage.followers) {
            daysAsUser = sessionStorage.daysAsUser
            followers = sessionStorage.followers
        } else {
            const { data } = await axios(APIURL)
            const createdDate = Date.parse(data.created_at)
            const now = Date.now()
            daysAsUser = Math.floor(Math.abs(createdDate - now) / (36e5 * 24));

            followers = data.followers

            sessionStorage.daysAsUser = daysAsUser
            sessionStorage.followers = followers
        }

        if (sessionStorage.totalProjects && sessionStorage.sumCommits) {
            totalProjects = sessionStorage.totalProjects
            sumCommits = sessionStorage.sumCommits
        } else {
            const { data } = await axios(APIURL + '/repos?sort=pushed')
            totalProjects = data.length;
            
            for (const repo of data) {
                const REPO_URL = `https://api.github.com/repos/unfoldedtree/${repo.name}/commits`
                const { data } = await axios(REPO_URL)

                sumCommits += data.length;
            }

            sessionStorage.totalProjects = totalProjects
            sessionStorage.sumCommits = sumCommits
        }
        
        document.getElementById("days-counter").setAttribute('data-count', daysAsUser);
        document.getElementById("projects-counter").setAttribute('data-count', totalProjects);
        document.getElementById("commits-counter").setAttribute('data-count', sumCommits);
        document.getElementById("followers-counter").setAttribute('data-count', followers);

        $(window).scroll(function() {
            evaluateScroll()
        });
        
        evaluateScroll()
    } catch(err) {
        console.log("Error fetching from Github API.")
    }
}

function evaluateScroll() {
    const oTop = $('#facts').offset().top - window.innerHeight;
    if (!statsRendered && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function() {
            const $this = $(this),
            countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            },
            {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
        statsRendered = true;
    }   
}

window.addEventListener('DOMContentLoaded', () => {
    getUserInfoFromGitHub()
});