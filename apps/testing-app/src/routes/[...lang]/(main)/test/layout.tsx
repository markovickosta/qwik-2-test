import { Slot, component$ } from '@qwik.dev/core';

import { useSpeak } from 'qwik-speak';

export default component$(() => {
	useSpeak({ assets: ['testPage'] });
	return <Slot />;
});
