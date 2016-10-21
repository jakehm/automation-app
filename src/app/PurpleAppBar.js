import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from './PurpleAppBar.scss';

const PurpleAppBar = ({ children, ...other }) => (
  <AppBar {...other} theme={theme}>
    Automation Assistant
    {children}
  </AppBar>
);

PurpleAppBar.propTypes = {
  children: PropTypes.node
};

export default PurpleAppBar;
