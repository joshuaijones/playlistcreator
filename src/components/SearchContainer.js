import { Container, Button, InputGroup, FormControl, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

function SearchBar() {
    const [clientId, setClientId] = useState('2b35f980fa474e3a9830bf98ca3c8155');
    const [clientSecret, setClientSecret] = useState('8923cb519ca5448fb457aaa10035f940')
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [searchTracks, setSearchTracks] = useState([]);
    const [myTracks, setMyTracks] = useState([]);
  
    useEffect(() => {
      //API Access Token
      var authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
      }
      fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))

      //Authorization Request

    }, [])
        
  
    // Search Function
    async function search() {
      console.log('Search for ' + searchInput);
  
      // Get request using search for Artist ID
      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken 
        }
      }
  
      var rawArray = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&market=us&limit=30', searchParameters)
      var jsonArray = await rawArray.json();  
      var searchItemsArray = await jsonArray.tracks.items;
      var execute = () => { 
        setSearchTracks(searchItemsArray)
        console.log(searchTracks) }

      execute();
    };

    const handleTrackClick = (event) => {
        // Adds item to MyTracks
        for (let i=0; i<searchTracks.length; i++) {
            if (searchTracks[i].id === event.currentTarget.id) {
                setMyTracks((prev) => [searchTracks[i], ...prev])
            }
        }
        // Removes item from SearchTracks
        let varTracks = searchTracks;
        varTracks = varTracks.filter((obj) => obj.id !== event.currentTarget.id);
        setSearchTracks(varTracks)
    }

    const handleMyTrackClick = (event) => {
        let varTracks = myTracks;
        varTracks = varTracks.filter((obj) => obj.id !== event.currentTarget.id);
        setMyTracks(varTracks);
    }

    const handleExportClick = (event) => {
        getProfile();
    }

    async function getProfile() {

      }
    
    // async function exportPlaylist() {
    //   console.log('Exporting..');
  
    //   // Get request using search for Artist ID
    //   var searchParameters = {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': 'Bearer ' + accessToken 
    //     }
    //   }
    //   var rawArray = await fetch('https://api.spotify.com/v1/me', searchParameters)
    //   var jsonArray = await rawArray.json();  
    //   var execute = () => { 
    //     console.log(jsonArray) }
    //   execute();

    // } 
        
    

    return (
        <Container>
            {/* SearchBar */}
            <Container>
            <InputGroup className='mb-3' size='lg'>
                <FormControl 
                placeholder='Search for Artist'
                type='input'
                onKeyPress={event => {
                    if (event.key == "Enter") {
                    search();
                    }
                }}
                onChange = {event => setSearchInput(event.target.value)}
                />
                <Button onClick={event => {console.log("Clicked Button")}}>
                Search
                </Button>
            </InputGroup>
            </Container>
            
        <Container>
            <Row>
                {/* Search Results */}
                <Col>
                    <h2>Search Results:</h2>
                    <Row className = 'mx-2 row row-cols-2'>
                        {searchTracks.map( (obj, i) => {
                            return (
                                <div onClick={handleTrackClick} id={obj.id}>
                                <Card>
                                <Card.Img src={obj.album.images[0].url} style={{ width: "100%", height: "100%" }}/>
                                <Card.Body>
                                    <Card.Title>{obj.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{obj.artists[0].name}</Card.Subtitle>
                                </Card.Body>
                                </Card>
                                </div>
                            )
                        })}
                    </Row>
                </Col>
                

                {/* My Playlist */}
                <Col>
                    <h2>My Playlist:</h2>
                    <Row className = 'mx-2 row row-cols-3'>
                    {myTracks.map( (obj, i) => {
                            return (
                                <div onClick={handleMyTrackClick} id={obj.id}>
                                    <Card>
                                    <Card.Body>
                                        <Card.Title>{obj.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{obj.artists[0].name}</Card.Subtitle>
                                    </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </Row>
                    <Button onClick={handleExportClick} >Export</Button>
                </Col>
            </Row>
        </Container>
    </Container>
    )
};

export default SearchBar;