async function getsongs(matchingSong) {
    try {
        let response = await fetch(`/Songs/${matchingSong}`);
        let audioURL =  response.url; // Assuming the response is the URL of the audio file
        audioURL.preload='auto'
        return audioURL;
    } catch (error) {
        console.error("Error fetching song:", error);
        throw error; // Throw the error to propagate it
    }
}

function main() {
    let fetsongs = ['Bekhayali(PagalWorld).mp3', 'Bewafa-Bewafa-Bewafa-Nikli-Hai-Tu(PagalWorld).mp3', 'Deewane-Hum-Nahi-Hote-Deewani-Raat-Aati-Hai(PagalWorld).mp3', 'Die-For-You_320(PaglaSongs).mp3', 'Dil-Hai-Ke-Manta-Nahin_320(PaglaSongs).mp3', 'Dil-Mera-Dekho-Na-Meri-Haisiyat-Puchon-Cover(PagalWorld).mp3', 'Downers-At-Dusk_320(PaglaSongs).mp3', 'Ek-Baar-Hi-Kiya-To-Pyar-Kya-Kiya_320(PaglaSongs).mp3', 'Faded_320(PaglaSongs).mp3'];

    let songs = [
        'Bekhayali.mp3', 'Bewafa-Bewafa-Bewafa-Nikli-Hai-Tu.mp3', 'Deewane-Hum-Nahi-Hote-Deewani-Raat-Aati-Hai.mp3', 'Die-For-You.mp3', 'Dil-Hai-Ke-Manta-Nahin.mp3', 'Dil-Mera-Dekho-Na-Meri-Haisiyat-Puchon-Cover.mp3', 'Downers-At-Dusk.mp3', 'Ek-Baar-Hi-Kiya-To-Pyar-Kya-Kiya.mp3', 'Faded.mp3'
    ];

    let promise = new Promise(async (res, rej) => {
        try {
            res(songs); // Resolve the promise with the songs
            document.getElementById("circularG").style.display = "none";
        } catch (error) {
            rej(error); // Reject the promise if there's an error
        }
    });

    promise.then(async (songs) => {
        let songul = document.querySelector(".songslist ul");
        for (const song of songs) {
            songul.innerHTML += `<li><img src="https://img.icons8.com/?size=50&id=Fac-6DFxc1E7&format=png" alt=""><div class="info">${song}</div></li>`;
        }

        let select = document.querySelector(".playbuttons .plays");
        let currentAudio = null;
        let savedTime = 0;

        // Function to update the play/pause icon
        function updatePlayPauseIcon(isPlaying) {
            if (isPlaying) {
                select.innerHTML = `<img class="invert" width="30" height="30" src="https://img.icons8.com/ios-filled/50/pause--v1.png" alt="pause--v1"/>`;
            } else {
                select.innerHTML = `<img class="invert" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-play.png" alt="circled-play"/>`;
            }
        }


        // Add event listener for the play/pause button
        select.addEventListener('click', () => {
            if (currentAudio) {
                if (currentAudio.paused) {
                    updatePlayPauseIcon(true);
                    if (savedTime > 0) {
                        currentAudio.currentTime = savedTime;
                        savedTime = 0;
                    }
                    currentAudio.play();
                } else {
                    updatePlayPauseIcon(false);
                    currentAudio.pause();
                    savedTime = currentAudio.currentTime;
                }
            }
        });
        let matchingSong;
document.querySelectorAll('.songslist li').forEach((listItem) => {
    listItem.addEventListener('click', async (e) => {
        let clickedSong = e.target.textContent.trim();
        let matchingSong = fetsongs.find((song) => {
            return song.includes(clickedSong); // Check if the song name contains the clicked song
        });

        if (matchingSong) {
            let matchedSong = await getsongs(matchingSong);
            console.log(matchedSong);
              if (matchedSong) {
                    if (currentAudio && !currentAudio.paused) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
        
                    currentAudio = new Audio(matchedSong);
                    currentAudio.preload = "auto";
                    currentAudio.play();
        
                    updatePlayPauseIcon(true);
        
                    currentAudio.addEventListener('timeupdate', () => {
                        if (currentAudio.duration) {
                            let percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                            document.querySelector(".seekbar .circle").style.left = percentage + "%";
                        }
        } else {
            console.error('Song not found in the songs array.');
        }
    });
    
        // document.querySelectorAll('.songslist li').forEach((listItem) => {
        //     listItem.addEventListener('click', async (e) => {
        //         let clickedSong = e.target.textContent
        //         let normalizedSongs = fetsongs.map(song => song.split(/[\(_]/)[0] + ".mp3");
        
        //         matchingSong = fetsongs.find((song, index) => {
        //             let normalized = normalizedSongs[index];
        //             if (normalized === clickedSong){
        //                 return song;
        //             }else{
        //             console.log("song not found")
        //         });
        //         let matchedSong = await getsongs(matchingSong);
        //         console.log('matchedSong :' + matchedSong)
                
            
                        
                    });
                 
                    currentAudio.addEventListener('ended', () => {
                        console.log('Audio has ended.');
                        currentAudio = null;
                        updatePlayPauseIcon(false);
                    });
                } else {
                    console.error('Song not found in the songs array.');
                }
            });
        });
        document.querySelector(".seekbar").addEventListener('click', (e) => {
            if (currentAudio) {
                let percentage = ((e.x - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".seekbar .circle").style.left = percentage + "%";
                let timeInSeconds = (percentage / 100) * currentAudio.duration;
                currentAudio.currentTime = timeInSeconds;
            }
        });
        
        
        
        // Event listener for previous button
document.querySelector(".playbuttons .prev").addEventListener('click', async () => {
    if (currentAudio) {
        currentAudio.pause();
        let currentIndex = fetsongs.indexOf(currentAudio.src.split('/').pop());
        let prevIndex = (currentIndex - 1 + fetsongs.length) % fetsongs.length;
        let audioURL = await getsongs(fetsongs[prevIndex]);
        currentAudio.src = audioURL;
        currentAudio.preload = "auto";
        currentAudio.play();
    }
});

// Event listener for next button
document.querySelector(".playbuttons .next").addEventListener('click', async () => {
    if (currentAudio) {
        currentAudio.pause();
        let currentIndex = fetsongs.indexOf(currentAudio.src.split('/').pop());
        let nextIndex = (currentIndex + 1) % fetsongs.length;
        let audioURL = await getsongs(fetsongs[nextIndex]);
        currentAudio.src = audioURL;
        currentAudio.preload = "auto";
        currentAudio.play();
    }
});

        
        
        document.querySelector(".arrow svg").addEventListener('click', (e) => {
            document.querySelector(".left").style.display = "block";
            document.querySelector(".left").style.left = "0%";
        });

        document.querySelector(".home svg").addEventListener('click', (e) => {
            document.querySelector(".left").style.left = "-150%";
        });
    });
}

main();
