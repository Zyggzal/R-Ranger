import { Alert } from "react-bootstrap";

function DismissableAlert({ onClosed, heading, text }) {
      return (
        <div style={{ position:'sticky', bottom: '10px' }}>
          <Alert className="container" variant="danger" onClose={onClosed} dismissible>
            <Alert.Heading>{ heading ? heading : 'Oops...'}</Alert.Heading>
            <p>
              { text ? text : 'An error occured' }
            </p>
          </Alert>
        </div>
      );
}
  
  export default DismissableAlert;