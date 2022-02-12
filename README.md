# Nova Stream Backend

Backend using ExpressJS connected to MongoDB through Mongoose.

## List of API endpoints
  
### User

- POST /user/login - Takes username and password as a parameter and returns token and user.
- POST /user/signup - Providing name, password, and unique email would add a new user into the database.
- GET /user/user-data - fetch user's data.
- GET  /user/liked -  Fetches all videos liked by user.
- POST /user/liked/add/:videoId - adds video to liked videos.
- PUT  /user/liked/remove/:videoId - removes video from liked videos.
- GET  /user/history -  Fetches user's History.
- POST /user/history/add/:videoId - adds video to history.
- PUT  /user/history/remove/:videoId  -  removes video from history.
- DELETE /user/history/delete  -  deletes user's history.

### Playlist

- GET /playlist - fetches user's playlists.
- POST /playlist/new - creates new playlist with provided name.
- DELETE /playlist/delete/:playlistId - deletes playlist.
- POST /playlist/:playlistId/add/:videoId - adds video to user's playlist.
- POST /playlist/:playlistId/remove/:videoId - removes video from user's playlist.

### Video

- GET /video - fetches all videos.
- GET /video/:videoId - fetches single video.
