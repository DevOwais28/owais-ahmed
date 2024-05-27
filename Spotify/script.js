document.addEventListener('DOMContentLoaded', main);

async function getsongs() {
    let a = await fetch("/Songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href);
        }
    }
    return songs;
}


// let currentAudio = null;
function main(){
   let songs;
// //    document.query
// Selector(".left").style.innerhtml=
    let promise = new Promise(async (res, rej) => {
        try {
            songs = await getsongs();
            console.log(songs);
            res(songs); // Resolve the promise with the songs
            document.getElementById("circularG").style.display="none";
        } catch (error) {
            rej(error); // Reject the promise if there's an error
        }
    });
    promise.then((songs)=>{
    let songul = document.querySelector(".songslist").getElementsByTagName("ul")[0]
    let songHtml = ''; // Initialize an empty string to concatenate HTML for each song
    for (const song of songs) {
        let so = song.slice(28).replace(/%20/g, '').replace(/_320\(PaglaSongs\)/, '').replace(/_320\(PagalWorld\)/, '').replace(/\(PagalWorld\)/, '');
        // Concatenate HTML for each song
        songHtml += `<li><img src="https://img.icons8.com/?size=50&id=Fac-6DFxc1E7&format=png" alt="">
        <div class="info">${so}</div></li>`;
    }

    // Append the concatenated HTML to the inner HTML of the <ul> element
    songul.innerHTML = songHtml;


    
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
       
        document.querySelector(".playbuttons .prev").addEventListener('click',(e)=>{    
            
            if(currentAudio){   
            currentAudio.pause()    
            currentAudio.currentTime = 0;  
            let audio=null;
        
            prev= songs.indexOf(currentAudio.src)-1
            if(prev<0){
              audio =new Audio(songs.slice(-1))
            }else{
             audio=new Audio(songs[prev])
            }
            
            // console.log("previous Song :"+songs[prev])
                audio.play();
             currentAudio=audio
             
        currentAudio.addEventListener('timeupdate', () => {
            if (currentAudio.duration) {
    
                // Calculate the percentage of playback progress
                let percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                document.querySelector(".seekbar .circle").style.left = percentage + "%";
                // Update the position of the seek bar circle       
                
            }
     
        })
    }
    })
    
        document.querySelector(".playbuttons .next").addEventListener('click',(e)=>{
          
            if(currentAudio){   
                currentAudio.pause()    
                currentAudio.currentTime = 0;  
                let audio=null;
            
                prev= songs.indexOf(currentAudio.src)+1
                if(prev>songs.length-1){
                  audio =new Audio(songs[0]);
                }else{
                 audio=new Audio(songs[prev])
                }
                
                // console.log("previous Song :"+songs[prev])
                    audio.play();
                 currentAudio=audio
                 
            currentAudio.addEventListener('timeupdate', () => {
                if (currentAudio.duration) {
        
                    // Calculate the percentage of playback progress
                    let percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                    document.querySelector(".seekbar .circle").style.left = percentage + "%";
                    // Update the position of the seek bar circle       
                    
                }
         
            })
        }
        })
        // Add event listener for the play/pause button
        select.addEventListener('click', () => {
            if (currentAudio) {
                if (currentAudio.paused) {
                    updatePlayPauseIcon(true)
                    // If paused, resume playback from the saved time
                    if (savedTime > 0) {
                        currentAudio.currentTime = savedTime;
                        savedTime = 0; // Reset the saved time
                        
                    }
                    currentAudio.play();
                } else {
                    updatePlayPauseIcon(false)
                    // If playing, pause the audio and save the current playback position
                    currentAudio.pause();
                    savedTime = currentAudio.currentTime;
                   
                  
                }
               console.log(document.querySelector(".seekbar .circle"))
            }
        });
       
        document.querySelectorAll('.songslist li').forEach((listItem) => {
            listItem.addEventListener('click', (e) => {
                let clickedSong = e.target.textContent.trim();
                console.log("Clicked Song:", clickedSong);
        
                // Find the matching song in the 'songs' array
                let matchingSong = songs.find((song) => {
                    let so = song.slice(28).replace(/%20/g, '').replace(/_320\(PaglaSongs\)/, '').replace(/_320\(PagalWorld\)/, '').replace(/\(PagalWorld\)/, '');
                    return so === clickedSong;
                });
        
                console.log("Matching Song:", matchingSong);
        
                if (matchingSong) {
                    // Pause the currently playing audio, if any
                    if (currentAudio && !currentAudio.paused ) {
                        console.log("Stopping current song:", currentAudio.src);
                        currentAudio.pause(); // Pause the currently playing audio
                        currentAudio.currentTime = 0; // Reset the playback to the beginning
                    }
                                   
                    // Create a new audio element for the clicked song
                    let audio = new Audio(matchingSong);
                 // Preload the audio file
                    audio.preload ="auto";
                
                    audio.play();
                    console.log("Playing:", audio.src);
     
                    updatePlayPauseIcon(true)
                    // Update the reference to the currently playing audio
                    currentAudio = audio;
                   
        currentAudio.addEventListener('timeupdate', () => {
            if (currentAudio.duration) {
    
                // Calculate the percentage of playback progress
                let percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                document.querySelector(".seekbar .circle").style.left = percentage + "%";
                // Update the position of the seek bar circle       
                
            }
     
        });
    
        document.querySelector(".seekbar").addEventListener('click',(e)=>{
            
            let perc = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".seekbar .circle").style.left = perc + "%";
            let percen= Math.max(0, Math.min(perc, 100))
            console.log( currentAudio.currentTime)
            let newTime = (percen / 100) * currentAudio.duration;
        // Set the new playback position of the audio
        currentAudio.currentTime = newTime;
        })
                    // Listen for the 'ended' event to reset the reference when the song ends
                    audio.addEventListener('ended', () => {
                        console.log('Audio has ended.');
                        currentAudio = null;
                        updatePlayPauseIcon(false); // Update the icon to play when the song ends
                    });
        
                    updatePlayPauseIcon(true); // Update the icon to pause when the song starts playing
                } else {
                    console.error('Song not found in the songs array.');
                }
            });
        });
        document.querySelector(".arrow svg").addEventListener('click',(e)=>{
            document.querySelector(".left").style.display="block";
            document.querySelector(".left").style.left="0%";
        
        })
        document.querySelector(".home svg").addEventListener('click',(e)=>{
            document.querySelector(".left").style.left="-150%";
           })
    
    
    })
   
}



main()