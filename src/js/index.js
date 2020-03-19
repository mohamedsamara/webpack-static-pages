import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// Import vendors
import './vendor/bootstrap';
import './vendor/jquery.ui';

import { navigation } from './navigation';

// Import application sass styles
import '../styles/less/style.less';

$(document).ready(function() {
  navigation();
});

OfflinePluginRuntime.install();
