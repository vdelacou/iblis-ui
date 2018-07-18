import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { RenderFunction } from '@storybook/react';
import * as React from 'react';
import { CSSProperties } from 'react';
import { theme } from '../../../src';

const mainContainer: CSSProperties = {
  paddingTop: '50px',
};
const limitWidth: CSSProperties = {
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  paddingLeft: theme.spacing.unit,
  paddingRight: theme.spacing.unit,
  margin: 'auto',
};

export const injectTheme = (story: RenderFunction) => {
  return (
    <div style={mainContainer}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div style={limitWidth}>
          {story()}
        </div>
      </MuiThemeProvider>
    </div>
  );
};

export const injectThemeWithoutLimitWidth = (story: RenderFunction) => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          {story()}
        </div>
      </MuiThemeProvider>
    </div>
  );
};
