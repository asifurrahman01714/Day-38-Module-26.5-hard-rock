//https://api.lyrics.ovh/suggest/:searchText

const searchSongs = async () => {
    const searchText = document.getElementById('searchText').value;
    console.log(searchText);

    toggleSpinner(true);
    //Load Data
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    console.log(data.data);
    console.log(data.data[0]);
    console.log(`title of the song : ${data.data[0].title}`);
    console.log(`id of the song ${data.data[0].id}`);
    displaySongs(data.data);

}


// const searchSongs = () => {
//     const searchText = document.getElementById('searchText').value;
//     console.log(searchText);

//     //Load Data
//     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             console.log(data.data);
//             console.log(data.data[0]);
//             console.log(`title of the song : ${data.data[0].title}`);
//             console.log(`id of the song ${data.data[0].id}`);
//             displaySongs(data.data);
//         })
// }


const displaySongs = songs => {
    console.log(`after calling displaySongs from .then`);
    console.log(songs);
    const songContainer = document.getElementById('songContainer');
    songContainer.innerHTML = ' ';
    songs.forEach(songArray => {
        console.log(songArray);
        console.log("song title: " + songArray.title);
        console.log(`artis name : ${songArray.artist.name}`);
        const songDiv = document.createElement('div');
        songDiv.className = ` single-result row align-items-center my-3 p-3`;
        songDiv.innerHTML = `<div class="col-md-9">
                                <h3 class="lyrics-name">${songArray.title}</h3>
                                <p class="author lead">Album by <span>${songArray.artist.name}</span></p>
                                <audio controls>
                                    <source src="${songArray.preview}" type="audio/ogg">
                                </audio>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${songArray.artist.name}','${songArray.title}')" class="btn btn-success">Get Lyrics</button>
                            </div>`;


        songContainer.appendChild(songDiv);
        toggleSpinner(false);
    });
    
}


const getLyrics = async (artistName, songTitle) => {
    console.log(artistName, songTitle);
    const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
    console.log(`lyrics url ${url}`);
    const res =await fetch(url);
    const lyrics =await res.json();
    console.log(lyrics.lyrics);
    displayLyrics(lyrics);
}

// const getLyrics = (artistName, songTitle) => {
//     console.log(artistName, songTitle);
//     const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
//     console.log(`lyrics url ${url}`);
//     fetch(url)
//         .then(res => res.json())
//         .then(lyrics => {
//             console.log(lyrics.lyrics);
//             displayLyrics(lyrics);
//         })
// }

const displayLyrics = lyrics => {
    
    const lyricsDiv = document.getElementById('lyrics');
    lyricsDiv.innerText = lyrics.lyrics;

}

const toggleSpinner = (show) =>{
    const spinner = document.getElementById('spinner');
    console.log(spinner.classList);
    // if (show) {
    //     spinner.classList.remove('d-none');
    // } else {
    //     spinner.classList.add('d-none');
    // }

    spinner.classList.toggle('d-none');
}
