const Twilio = window.Twilio;

// Maybe use a redux-middleware for these
export function setupTwilio(component) {
  Twilio.Device.ready((device) => {
    console.log('Twilio.Device Ready!', device);
  });

  Twilio.Device.error((error) => {
    component.setState({
      inCall: false,
    });
    console.log('Twilio.Device Error: ' + error.message, error);
  });

  Twilio.Device.connect((conn) => {
    console.log('Successfully established call!', conn);
  });

  Twilio.Device.disconnect((conn) => {
    component.setState({
      inCall: false,
    });
    console.log('Call ended.', conn);
  });

  Twilio.Device.incoming((conn) => {
    console.log('Incoming connection from ' + conn.parameters.From);
    conn.accept();
  });
}


export default Twilio;
