const projectsEl = document.getElementById('projects')
const IMG_PATH = "../assets/img/projects/"

const projectsArray = [
    {
        title: "Social Media CRUD App",
        description: "Called OnlyPosts this is a social media app that lets users add friends, see posts, react and like posts on their walls. Users can even customize their information in a profile page. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-social.png",
        url: "www.test-social.com"
    },
    {
        title: "Notes CRUD App",
        description: "This web app does stuff.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-notes.png",
        url: "www.test-notes.com"
    },
    {
        title: "Transactions App",
        description: "This full stack web app allows you to create accounts and add transactions. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-expenses.png",
        url: "www.test-transactions.com"
    },
    {
        title: "Movies App",
        description: "Leverages a third party existing API to get a list of movies and display it to the user.",
        tech: ["HTML", "CSS", "JavaScript"],
        img: "project-screenshot-movies.png",
        url: "www.test-movies.com"
    }
]

function addProjectsToDOM () {
    projectsArray.forEach(project => {
        ({ title, description, tech, img, url  } = project)
        const projectEl = document.createElement('div')
        projectEl.classList.add('project')
        projectEl.innerHTML = `
            <img src="${IMG_PATH + img}" alt="${title}">
            <div class="project-info">
                <h3>${title}</h3>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${description}</p>
                <div class="project-tech">
                    ${addTechToProject(tech)}
                </div>
            </div>
            `
        projectsEl.appendChild(projectEl)
    })
}

function addTechToProject(techArr) {
    let innerData = ''

    techArr.forEach(tech => {
        innerData += `<p>${tech}</p>`
    })

    return innerData
}

addProjectsToDOM()

