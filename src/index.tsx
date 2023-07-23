/* @refresh reload */
import { bootstrapStyledComponents } from 'bootstrapStyledComponents';
import { render } from 'solid-js/web';

import { App } from 'components/App';

bootstrapStyledComponents();

render(() => <App />, document.getElementById('root')!);
