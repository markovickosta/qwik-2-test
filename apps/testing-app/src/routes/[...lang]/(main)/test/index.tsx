import { component$, useId } from '@qwik.dev/core';

import { Link } from '@qwik.dev/router';
import { inlineTranslate } from 'qwik-speak';

export default component$(() => {
	const t = inlineTranslate();
	const id = useId();
	const color = 'red';
	return (
		<div class="flex flex-col">
			<style
				dangerouslySetInnerHTML={`#${id} { background: ${color}; }`}
			/>
			<h1 id={id} class="text-2xl test">
				Test route 👋
			</h1>
			<div>{t('home.test')}</div>
			<Link class="underline text-blue-600" href="/">
				Go to homepage
			</Link>
		</div>
	);
});
