const id = `13Gii_WhqLtebWuyXXra4GdcS7VEJQ1IBwB_ohgwSF0g`;
const base = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?`;

// Query for text info.
const query1 = encodeURIComponent('Select A, B');
const url1 = `${base}&tq=${query1}`;

// Query for the Gigs.
const query2 = encodeURIComponent('Select D, E, F, G, H');
const url2 = `${base}&tq=${query2}`;

// Query for the video URL
const query3 = encodeURIComponent('Select K');
const url3 = `${base}&tq=${query3}`;

// Fetch and process text info
fetch(url1)
  .then((response) => response.text())
  .then((data) => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    if (rows.length > 0) {
      const errorMsg = `Hey, if you're seeing this it means something has gone wrong. <a href="mailto:missilesswe@gmail.com">Let us know!`;
      document.getElementById('info-1').innerHTML = rows[0].c[1]?.v || errorMsg;
      document.getElementById('info-2').innerHTML = rows[1].c[1]?.v || errorMsg;
    }

    if (rows.length > 0) {
      const description = rows[0].c[1]?.v || '';

      document.getElementById('info-1').innerHTML = description;
    }
  })
  .catch((error) =>
    console.error('Error fetching the first data structure:', error)
  );

// Fetch and process the gigs
fetch(url2)
  .then((response) => response.text())
  .then((data) => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    if (rows.length > 0) {
      const firstRow = rows[0];
      const city = firstRow.c[1]?.v || 'UNKNOWN CITY';
      const date = firstRow.c[2]?.v || '<b>TBA</b>';
      const ticketLink = firstRow.c[4]?.v || '#';

      // Update the modal-text with the new information
      const modalText = document.getElementById('modal-text');
      modalText.innerHTML = `BALLISTIC MISSILE THREAT INBOUND TO ${city.toUpperCase()}, ${date}. SEEK IMMEDIATE SHELTER <a href="${ticketLink}" target="_blank">HERE</a>.`;

      const gigsCollapseable = document.getElementById('gigs-collapseable');
      gigsCollapseable.innerHTML = ''; // Clear existing content

      rows.forEach((row) => {
        const city = row.c[1]?.v || 'TBA';
        const date = row.c[2]?.v || 'TBA';
        const venue = row.c[3]?.v || 'TBA';
        const ticketLink = row.c[4]?.v || '#';

        const gigElement = document.createElement('div');
        gigElement.className = 'modal-gig';
        gigElement.innerHTML = `
          <span class="modal-collapseable-date">${date}</span>
          <div class="modal-collapseable-main-info">
            <div class="modal-collapseable-city">${city}</div>
            <div class="modal-collapseable-venue">${venue}</div>
          </div>
          <div class="modal-collapseable-tickets">
            ${
              ticketLink === '#'
                ? '<span>No tickets yet</span>'
                : `<a target="_blank" href="${ticketLink}">Buy Tickets</a>`
            }
          </div>
        `;

        gigsCollapseable.appendChild(gigElement);
      });
    }
  })
  .catch((error) =>
    console.error('Error fetching the second data structure:', error)
  );

// Fetch and process the video URL
fetch(url3)
  .then((response) => response.text())
  .then((data) => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    if (rows.length > 1) {
      // Ensure there's a second row
      let videoUrl = rows[0].c[0]?.v; // Get the value from the second row, first (and only) column
      if (videoUrl) {
        // Convert YouTube URL to embed URL
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          const videoId = extractYouTubeId(videoUrl);
          if (videoId) {
            videoUrl = `https://www.youtube.com/embed/${videoId}`;
          }
        }

        const videoIframe = document.getElementById('video');
        if (videoIframe) {
          videoIframe.src = videoUrl;
        } else {
          console.error('Video iframe not found');
        }
      } else {
        console.error('No video URL found in the spreadsheet');
      }
    } else {
      console.error('No data found for video URL');
    }
  })
  .catch((error) => console.error('Error fetching the video URL:', error));

// Function to extract YouTube video ID
function extractYouTubeId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
