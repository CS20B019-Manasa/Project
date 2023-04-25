import Alert from 'react-bootstrap/Alert';
// To Alert the error with the message box
export default function Message(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}