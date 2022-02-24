const projectsEl = document.getElementById('portfolio-container')
const IMG_PATH = "../assets/img/portfolio/"

const projectsArray = [
    {
        title: "Social Media App",
        description: "Called OnlyPosts this is a social media app that lets users add friends, see posts, react and like posts on their walls. Users can even customize their information in a profile page. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-onlyposts.png",
        git_url: "https://github.com/unfoldedtree/social-media-crud-app",
        web_url: "https://social-media-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Notes App",
        description: "This web app lets users sign on with Google. Then add notes to a wall. Demonstrates full stack functionality.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-notes.png",
        git_url: "https://github.com/unfoldedtree/notes-crud-app",
        web_url: "https://notes-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Transactions App",
        description: "This full stack web app allows you to create accounts and add transactions. Sign on with Google.",
        tech: ["HTML", "CSS", "JavaScript", "NodeJS", "MongoDB", "PassportJS", "Google OAuth"],
        img: "project-expense.png",
        git_url: "https://github.com/unfoldedtree/expense-tracker-crud-app",
        web_url: "https://expense-tracker-crud-app.willmcmahan.repl.co"
    },
    {
        title: "Chat App",
        description: "Leverages sockets to allow different users to chat back and forth. Automatically adds new messages by listenings to events.",
        tech: ["HTML", "CSS", "JavaScript"],
        img: "project-chatcord.png",
        git_url: "https://github.com/unfoldedtree/freetime-html-css-js/tree/main/movie-app",
        web_url: ""
    }
]

function addProjectsToDOM () {
    projectsArray.forEach(project => {
        const projectEl = document.createElement('div')
        projectEl.classList = 'col-xl-5 col-lg-6 col-md-6 portfolio-item'
        projectEl.innerHTML = `
            <div class="portfolio-wrap">
                <img class="img-fluid" src="${IMG_PATH + project.img}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                </div>
                <div class="portfolio-links">
                        <div class="overview-head">
                            <h3>Overview</h3>
                            <div>
                                ${project.web_url ? `<a href="${project.web_url}" target="_blank" style="text-decoration: none;">
                                    <i class="bi bi-globe btn-project-link"></i>
                                </a>` : ''}
                                ${project.git_url ? `<a href="${project.git_url}" target="_blank" style="text-decoration: none;">
                                    <i class="bi bi-github btn-project-link"></i>
                                </a>` : ''}
                            </div>
                        </div>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${addTechToProject(project.tech)}
                        </div>
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

function removeHiddenClasses() {
    document.querySelectorAll('.project').forEach(element => {
        element.classList.add("show-project")
    })
}

addProjectsToDOM()

setTimeout(removeHiddenClasses, 1);