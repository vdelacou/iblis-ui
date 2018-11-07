
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, Field, reduxForm } from 'redux-form';
import { IblisTextField } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

const requiredTextField = (value: string) => {
  return value && value.trim() !== '' ? undefined : 'Required';
};

export default storiesOf('2.1.9 Iblis TextField', module)
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
  .add('Iblis TextField',
    // withInfo({
    //   text:
    //     `
    //     Display a text field with border and star if required.

    //     ## Story Source
    //     ~~~js
    //       <Field
    //         type="text"
    //         name="entityName"
    //         component={IblisTextField}
    //         disabled={false}
    //         validate={[requiredTextField]}
    //         required={true}
    //         placeholder={'Put your name'}
    //       />
    //     ~~~

    //     ## Prop Types


    //       | property          | propType           | required       | default       | description                                                                     |
    //       |:----------------- |:------------------ |:-------------- |:------------- |:------------------------------------------------------------------------------- |
    //       | type              | string             | yes            | -             | Type attribute of the Input element. It should be a valid HTML5 input type      |
    //       | iblisDefaultValue | string or number   | -              | -             | The default value of the Input element.                                         |
    //       | required          | boolean            | -              | false         | If true, the label is displayed as required with a star                         |
    //       | multiline         | boolean            | -              | false         | If true, a textarea element will be rendered instead of an input.               |
    //       | rows              | number             | -              | -             | Number of rows to display when multiline option is set to true.                 |
    //       | rowsMax           | number             | -              | -             | Maximum number of rows to display when multiline option is set to true.         |
    //       | autoFocus         | boolean            | -              | -             | If true, the input will be focused during the first mount.                      |
    //       | disabled          | boolean            | -              | false         | If true, the input will be disabled.                                            |
    //       | placeholder       | string             | -              | -             | The short hint displayed in the input before the user enters a value.           |
    //       | inputRef          | React.Ref<any>     | -              | -             | Use that property to pass a ref callback to the native input component.         |

    //     `,
    //   propTables: false,
    //   source: false,
    // }
    // )
      (() => {
        const config = (): ConfigProps<{}, {}> => {
          const configForm: ConfigProps<{}, {}> = {
            form: 'IblisTextField',
          };
          return configForm;
        };
        const IblisTextFieldInField = () => (
          <Field
            type="text"
            name="entityName"
            component={IblisTextField}
            disabled={false}
            validate={[requiredTextField]}
            required={true}
            placeholder={'Put your name'}
          />
        );
        // connect the form
        const ConnectedForm = reduxForm(config())(IblisTextFieldInField);

        return (
          <ConnectedForm />
        );
      }
      ))
  //
  .add('Disabled', (() => {
    const config = (): ConfigProps<{}, {}> => {
      const configForm: ConfigProps<{}, {}> = {
        form: 'IblisTextField',
      };
      return configForm;
    };
    const IblisTextFieldInField = () => (
      <Field
        type="text"
        name="entityName"
        component={IblisTextField}
        disabled={true}
        validate={[requiredTextField]}
        required={true}
        placeholder={'Put your name'}
      />
    );
    // connect the form
    const ConnectedForm = reduxForm(config())(IblisTextFieldInField);

    return (
      <ConnectedForm />
    );
  }
  ))
  //
  ;
