import React from 'react';
//import 'react-toolbox/lib/commons.scss';           // Import common styles
import PurpleAppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import { Button } from 'react-toolbox/lib/button'; // Bundled component import

const App = () => (
  <div>
    <PurpleAppBar />
    <section style={{ padding: 20 }}>
      <Button label='go' primary raised/>
    </section>
  </div>
);

export default App;
