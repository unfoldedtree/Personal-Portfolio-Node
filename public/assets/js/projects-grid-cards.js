const projectsEl = document.getElementById('projects')
const IMG_PATH = "../assets/img/projects/"

const projectsArray = [
    {
        title: "Social Media CRUD App",
        description: "Called OnlyPosts this is a social media app that lets users add friends, see posts, react and like posts on their walls. Users can even customize their information in a profile page. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-social.png",
        git_url: "https://github.com/unfoldedtree/social-media-crud-app",
        web_url: "https://social-media-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Notes CRUD App",
        description: "This web app lets users sign on with Google. Then add notes to a wall. Demonstrates full stack functionality.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-notes.png",
        git_url: "https://github.com/unfoldedtree/notes-crud-app",
        web_url: "https://notes-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Transactions App",
        description: "This full stack web app allows you to create accounts and add transactions. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-screenshot-expenses.png",
        git_url: "https://github.com/unfoldedtree/expense-tracker-crud-app",
        web_url: "https://expense-tracker-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Movies App",
        description: "Leverages a third party existing API to get a list of movies and display it to the user.",
        tech: ["HTML", "CSS", "JavaScript"],
        img: "project-screenshot-movies.png",
        git_url: "https://github.com/unfoldedtree/freetime-html-css-js/tree/main/movie-app",
        web_url: ""
    }
]

function addProjectsToDOM () {
    let count = 0;
    projectsArray.forEach(project => {
        const projectEl = document.createElement('div')
        const hiddenClass = (count % 2 == 0) ? "hidden-left" : "hidden-right"
        projectEl.classList.add('project')
        projectEl.classList.add(hiddenClass)
        projectEl.innerHTML = `
            <img src="${IMG_PATH + project.img}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
            </div>
            <div class="overview">
                <div class="overview-head">
                    <h3>Overview</h3>
                    <div>
                        ${project.web_url ? `<a href="${project.web_url}" target="_blank" style="text-decoration: none;"><i class="fas fa-globe btn-project-link"></i></a>` : ''}
                        ${project.git_url ? `<a href="${project.git_url}" target="_blank" style="text-decoration: none;"><i class="fab fa-github btn-project-link"></i></a>` : ''}
                    </div>
                </div>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${addTechToProject(project.tech)}
                </div>
            </div>
            `
        projectsEl.appendChild(projectEl)
        count++;
    })
}

function addTechToProject(techArr) {
    let innerData = ''

    techArr.forEach(tech => {
        innerData += `<p>${tech}</p>`
    })

    return innerData
}

function removeHiddenClasses() {
    document.querySelectorAll('.project').forEach(element => {
        element.classList.add("show-project")
    })
}

addProjectsToDOM()

setTimeout(removeHiddenClasses, 1);

