import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { UploadAvatar } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.11 Upload Avatar', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('UploadAvatar', (() => {
    return (
      <UploadAvatar
        buttonLabel={'Select File'}
        onClick={(_binary, file) => alert(JSON.stringify(file.name))}
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        captionLabel="Supported file types: JPEG, PNG, GIF, BMP (Max 5 MB)"
        fileType=".jpeg,.jpg,.png,.gif,.bmp"
        fileSize={5}
        handleTypeError={action('Error Type')}
        handleSizeError={action('Error Size')}
      />
    );
  }
  ))
  //
  ;
