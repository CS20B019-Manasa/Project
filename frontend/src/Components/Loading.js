import Spinner from 'react-bootstrap/Spinner';
// To create a loading bar when network is slow
export default function Loading() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}