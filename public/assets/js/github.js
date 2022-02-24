const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')

async function getUser() {
    const username = 'unfoldedtree'
    
    try {
        const { data } = await axios(APIURL + username)
        getRepos(username, data)
    } catch(err) {
        // if(err.response.status == 404) {
        //     createErrorCard('No profile with this username')
        // }
    }
}

async function getRepos(username, profile) {
    const createdDate = Date.parse(profile.created_at)
    const now = Date.now()
    const days = Math.floor(Math.abs(createdDate - now) / (36e5 * 24));
    
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=pushed')
        totalProjects = data.length;

        let sumCommits = 0;

        if (sessionStorage.sumCommits) {
            sumCommits = sessionStorage.sumCommits;
        } else {
            for (const repo of data) {
                const REPO_URL = `https://api.github.com/repos/unfoldedtree/${repo.name}/commits`
                const { data } = await axios(REPO_URL)

                sumCommits += data.length;
            }

            sessionStorage.sumCommits = sumCommits
        }

        document.getElementById("days-counter").setAttribute('data-purecounter-end', days);
        document.getElementById("projects-counter").setAttribute('data-purecounter-end', totalProjects);
        document.getElementById("commits-counter").setAttribute('data-purecounter-end', sumCommits);
        document.getElementById("followers-counter").setAttribute('data-purecounter-end', days);
        document.getElementById("followers-counter").setAttribute('data-purecounter-end', profile.followers);

        // document.getElementById("days-counter").innerHTML.reload
        
    } catch(err) {
        // createErrorCard('Problem fetching repos')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getUser()
});