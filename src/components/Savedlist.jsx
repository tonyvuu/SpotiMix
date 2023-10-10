import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

function SavedMusic({savedTrackInfo}) {
  return (
    <Container>
      <h2 className="mt-3">Saved Music Tracks</h2>
      <Row>
        {savedTrackInfo && savedTrackInfo.length > 0 ? (
          savedTrackInfo.map((track, index) => (
            <Card key={index} style={{ width: '18rem' }} className="mt-3">
              <Card.Img variant="top" src={track.imageUrl} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>Artists: {track.artists}</Card.Text>
                <Card.Text>Release Date: {track.releaseDate}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="mt-3">No saved tracks yet.</p>
        )}
      </Row>
    </Container>
  );
}

export default SavedMusic;
