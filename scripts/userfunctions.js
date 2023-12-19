
function saveThePokes(usrName, team, reserves) {
    const users = JSON.parse(localStorage.getItem("users")) || {}
    users[usrName] = {
        team: team || [],
        reserves: reserves || []
    }
    localStorage.setItem("users", JSON.stringify(users))
}

function loadThePokes(usrName) {
    const upper = usrName.toUpperCase()
    const users = JSON.parse(localStorage.getItem("users")) || {}
    return users[upper] || {team: [], reserves: []}
}

function nukeEm(usrName) {
    const users = JSON.parse(localStorage.getItem("users")) || {}
    if (users[usrName]) {
        users[usrName].team = []
        users[usrName].reserves = []
        localStorage.setItem("users", JSON.stringify(users))
    }
}

export { saveThePokes, loadThePokes, nukeEm }
