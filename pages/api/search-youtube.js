async function handler(req, res) {
  try {
    const url = 'https://www.googleapis.com/youtube/v3/search?';
    const params = [
      'part=snippet',
      'q='+req.query.q,
      'maxResults=10',
      'type=video',
      'key='+process.env.YOUTUBE_API_KEY
    ];
  
    const results = await fetch(url+params.join('&')).then(response => response.json());
  
    res.status(200).json({ 
      'message': 'success',
      results
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send()
  }
}

export default handler;
