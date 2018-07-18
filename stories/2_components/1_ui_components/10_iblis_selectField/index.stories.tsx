import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, Field, reduxForm } from 'redux-form';
import { IblisSelectField } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

const values = [{ id: 'en', value: 'English' }, { id: 'fr', value: 'French' }];

const requiredTextField = (value: string) => {
  return value ? undefined : 'Required';
};

export default storiesOf('2.1.10 Iblis SelectField', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  .addDecorator((story: RenderFunction) => {
    return (
      injectProvider(story)
    );
  })
  //
  .add('Iblis SelectField',
    withInfo({
      text:
        `
        Display a select field with border and star if required.

        ## Story Source
        ~~~js
          <Field
            name="entityName"
            component={IblisSelectField}
            disabled={false}
            validate={[requiredTextField]}
            required={true}
            placeholder={'Select your language'}
            fullWidth={true}
            values={values}
          />
        ~~~

        ## Prop Types


          | property          | propType           | required       | default       | description                                                                     |
          |:----------------- |:------------------ |:-------------- |:------------- |:------------------------------------------------------------------------------- |
          | values            | Array<{ id: string or number; value: string }>| yes | - | Values to display in the select                                             |
          | iblisDefaultValue | string or number   | -              | -             | The default value of the Input element.                                         |
          | required          | boolean            | -              | false         | If true, the label is displayed as required with a star                         |
          | fullWidth         | boolean            | -              | false         | If true, the input will take up the full width of its container                 |
          | autoFocus         | boolean            | -              | -             | If true, the input will be focused during the first mount.                      |
          | disabled          | boolean            | -              | false         | If true, the input will be disabled.                                            |
          | placeholder       | string             | -              | -             | The short hint displayed in the input before the user enters a value.           |

      `,
      propTables: false,
      source: false,
    }
    )

      (() => {
        const config = (): ConfigProps<{}, {}> => {
          const configForm: ConfigProps<{}, {}> = {
            form: 'IblisSelectField',
          };
          return configForm;
        };

        const IblisSelectFieldInField = () => (
          <Field
            name="entityName"
            component={IblisSelectField}
            disabled={false}
            validate={[requiredTextField]}
            required={true}
            placeholder={'Select your language'}
            fullWidth={true}
            values={values}
          />
        );
        // connect the form
        const ConnectedForm = reduxForm(config())(IblisSelectFieldInField);

        return (
          <ConnectedForm />
        );
      }
      ))
  //
  .add('Initial Value', (() => {
    const config = (): ConfigProps<{}, {}> => {
      const configForm: ConfigProps<{}, {}> = {
        form: 'IblisSelectField',
      };
      return configForm;
    };

    const IblisSelectFieldInField = () => (
      <Field
        name="entityName"
        component={IblisSelectField}
        validate={[requiredTextField]}
        fullWidth={true}
        values={values}
        iblisDefaultValue={values[1].id}
      />
    );
    // connect the form
    const ConnectedForm = reduxForm(config())(IblisSelectFieldInField);

    return (
      <ConnectedForm />
    );
  }
  ))
  //
  .add('Disabled', (() => {
    const config = (): ConfigProps<{}, {}> => {
      const configForm: ConfigProps<{}, {}> = {
        form: 'IblisSelectField',
      };
      return configForm;
    };

    const IblisSelectFieldInField = () => (
      <Field
        name="entityName"
        component={IblisSelectField}
        disabled={true}
        validate={[requiredTextField]}
        fullWidth={true}
        values={values}
        iblisDefaultValue={values[1].id}
      />
    );
    // connect the form
    const ConnectedForm = reduxForm(config())(IblisSelectFieldInField);

    return (
      <ConnectedForm />
    );
  }
  ))
  //
  ;
