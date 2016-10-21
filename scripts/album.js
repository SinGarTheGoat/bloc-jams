 // Example Album
var albumZevon = {
     title: 'Bad Luck Streak In Dancing School',
     artist: 'Warren Zevon',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/Warren.jpg',
     songs: [
         { title: '"Bad Luck Streak in Dancing School"  ', duration: '4:26' },
         { title: 'A Certain Girl', duration: '3:14' },
         { title: 'Empty-Handed Heart', duration: '5:01' },
         { title: 'Interlude No. 1', duration: '3:21'},
         { title: 'Play It All Night Long', duration: '2:15'}
     ]
    
}

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
       + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
 
var koolKids = [albumPicasso, albumMarconi, albumZevon]
var koolKidsKounter = 0;


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentAlbum = null;

 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     
     songListContainer.addEventListener('mouseover', function(event) {
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             
           var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
             
         }
     });
     
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
           songRows[i].addEventListener('click', function(event) {
              clickHandler(event.target);
         });
     }
     
     document.getElementById("albumImage").addEventListener('click', function() {
            koolKidsKounter++;
         if (koolKidsKounter>koolKids.length){
            koolKidsKounter= 0;
         }
         setCurrentAlbum(koolKids[koolKidsKounter]);
     });
//     
 };


var findParentByClassName = function(element, targetClass){
    if(element){
        var currentParrent = element.parentElement;
        while(currentParrent.className != targetClass && currentParrent.className !== null){
            currentParrent = currentParrent.parentElement;
        }
        return currentParrent;
    }
};

var getSongItem = function(element){
    switch(element.className){
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element,'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

 var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }


 };