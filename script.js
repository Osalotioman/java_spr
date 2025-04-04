const users = [
    { name: 'Purple', handle: '10billleo', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Unknown', handle: 'Alex00029', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Unknown', handle: 'BillionaireD', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Unknown', handle: 'Blaqjay', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Minerva', handle: 'DisqualifiedAsAHuman', rating: 0, uni: 'uniben', team: '#Terminal' },
    { name: 'Unknown', handle: 'Klever01', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Marianne', handle: 'Mara_Andrea', rating: 0, uni: 'uniben', team: 'unknown' },
    { name: 'Osalotioman', handle: 'Osalotioman', rating: 0, uni: 'uniben', team: '#Terminal' }
];

async function fetchRatings(handles) {
    const url = `https://codeforces.com/api/user.info?handles=${handles.join(';')}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
}

async function updateUserRatings() {
    const userHandles = users.map(user => user.handle);

    const userRatings = await fetchRatings(userHandles);

    userRatings.forEach(ratingInfo => {
        const user = users.find(u => u.handle === ratingInfo.handle);
        if (user) user.rating = ratingInfo.rating;
    });
}

function populateTable() {
    const tableBody = document.getElementById('ratingTableBody');
    const sortedUsers = users.sort((a, b) => b.rating - a.rating);
    let uid = 1;
    sortedUsers.forEach(user => {
        const adjustedRating = 1200 - user.rating;
        const profileLink = `https://codeforces.com/profile/${user.handle}`;
        const row = `<tr><td>${uid}</td><td>${user.name}</td><td>${user.rating}</td><td>${adjustedRating}</td><td><a href="${profileLink}" target="_blank">Profile</a></td><td>${user.team}</td></tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
        ++uid;
    });
}

async function initialize() {
    await updateUserRatings();
    populateTable();
}

window.onload = initialize;
