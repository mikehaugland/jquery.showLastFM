/*
    jquery.showLastFM.js

    Author: Mike Haugland
    Date: Dec 4th, 2011
    Version: 1.0.0
*/

(function( $ ){

  $.fn.showLastFM = function( options ) {
    var settings = $.extend( {
      'username'         : 'haugland',
      'amount' : 2,
      'includeCurrentPlaying' : false,
      'apikey' : ''
    }, options);

    return this.each(function(){
      var node = $(this);
      var endpoint = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+settings.username+"&limit="+settings.amount+"&api_key="+settings.apikey+"&format=json&callback=?";

      $.getJSON(endpoint, function(data) {
        node.empty();
        $.each(data.recenttracks.track, function(i, track) {
          if (track.date !== undefined) {
            node.append('<div class="lastfm_entry song"><a href="'+track.url+'"><span class="lastfm_track_name">'+track.name+'</span></a> by <span class="lastfm_artist">'+track.artist['#text']+'</span><span class="lastfm_playcount">Played '+$.relativeTime(parseInt(track.date['uts'])*1000)+'</span></div>');
          } else if (settings.includeCurrentPlaying) {
            node.append('<div class="lastfm_entry song"><a href="'+track.url+'"><span class="lastfm_track_name">'+track.name+'</span></a> by <span class="lastfm_artist">'+track.artist['#text']+'</span><span class="lastfm_playcount">Listening now...</span></div>');
          }
        });
      });
    });
  };

})( jQuery );
