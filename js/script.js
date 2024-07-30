const clientId = '23b55cce2b7e43088240884c685068bc';
const clientSecret = '4d5f90b868dc430ab516578c63cc79e5';


async function getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token;
}

async function searchTracks(query) {
    const token = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    return data.tracks.items;
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const tracks = await searchTracks(query);
    displayResults(tracks);
});

function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.classList.add('bg-gray-800','text-white','p-4', 'rounded-lg', 'shadow-lg', 'flex', 'items-center');
        trackDiv.innerHTML = `
            <img src="${track.album.images[0]?.url || 'assets/placeholder.png'}" alt="${track.name}" class="w-16 h-16 rounded-lg mr-4">
            <div>
                <h3 class="text-xl font-semibold">${track.name}</h3>
                <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                <button class="mt-2 bg-green-500 p-2 rounded play-button" data-preview="${track.preview_url}">Play</button>
            </div>
        `;
        resultsDiv.appendChild(trackDiv);
    });

    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const previewUrl = e.target.getAttribute('data-preview');
            if (previewUrl) {
                const audio = new Audio(previewUrl);
                audio.play();
            } else {
                alert('Preview not available');
            }
        });
    });
}
