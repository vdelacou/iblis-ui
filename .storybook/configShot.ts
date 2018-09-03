import { setOptions } from '@storybook/addon-options';
import { configure } from '@storybook/react';

function loadStories() {

  // layouts
  require('../stories/1_layouts/1_main_layout/index.stories');
  require('../stories/1_layouts/2_external_form_layout/index.stories');
  require('../stories/1_layouts/3_card_title_layout/index.stories');
  // require('../stories/1_layouts/4_card_menu/index.stories');
  require('../stories/1_layouts/5_content_with_title/index.stories');

  // components / ui-components
  require('../stories/2_components/1_ui_components/01_iblis_button/index.stories');
  require('../stories/2_components/1_ui_components/02_main_menu/index.stories');
  require('../stories/2_components/1_ui_components/03_progress_bar/index.stories');
  // require('../stories/2_components/1_ui_components/04_iblis_snackBar/index.stories');
  require('../stories/2_components/1_ui_components/05_empty_page/index.stories');
  require('../stories/2_components/1_ui_components/06_account_card/index.stories');
  require('../stories/2_components/1_ui_components/07_account_menu/index.stories');
  require('../stories/2_components/1_ui_components/08_footer_menu/index.stories');
  require('../stories/2_components/1_ui_components/09_iblis_textField/index.stories');
  require('../stories/2_components/1_ui_components/10_iblis_selectField/index.stories');
  require('../stories/2_components/1_ui_components/11_upload_avatar/index.stories');
  // require('../stories/2_components/1_ui_components/12_filter_button/index.stories');

  // components / form-components
  // require('../stories/2_components/2_form_components/01_managed_simple_form/index.stories');
  require('../stories/2_components/2_form_components/02_managed_simple_add_form/index.stories');
  require('../stories/2_components/2_form_components/03_managed_simple_list_form/index.stories');
  // require('../stories/2_components/2_form_components/04_user_profile_form/index.stories');
  require('../stories/2_components/2_form_components/05_change_password_form/index.stories');
  require('../stories/2_components/2_form_components/06_delete_account_form/index.stories');

}

setOptions({
  name: 'Iblis UI',
  url: 'https://github.com/vdelacou/iblis-ui',
});

configure(loadStories, module);
