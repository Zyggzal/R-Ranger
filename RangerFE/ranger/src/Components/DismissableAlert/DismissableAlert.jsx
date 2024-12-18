import { Alert } from "react-bootstrap";

function DismissableAlert({ onClosed, heading, text }) {
      return (
        <div style={{ position:'fixed', bottom: '10px', left: '5%', zIndex: 4, width: '90%' }}>
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