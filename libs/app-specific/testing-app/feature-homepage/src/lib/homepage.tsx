import { Signal, component$, isServer, useId, useSignal, useTask$ } from '@qwik.dev/core';

import { Link } from '@qwik.dev/router';

export const Homepage = component$((props: {isActive: Signal<boolean>;}) => {
	const id = useId();
	const windowBlur = useSignal<{
		didHappen: boolean;
		setupListeners: boolean | null;
	  }>({ didHappen: false, setupListeners: null });

	useTask$(({ track, cleanup }) => {
		track(() => windowBlur);
  
		if (isServer) return;
		if (
		  windowBlur.value.setupListeners === null ||
		  windowBlur.value.setupListeners === false
		)
		  return;
  
		windowBlur.value.setupListeners = false;
  
		const blurWindowListener = () => {
		  windowBlur.value.didHappen = true;
		};
		const focusOutDocumentListener = (event: FocusEvent) => {
		  windowBlur.value.didHappen = false;
		  setTimeout(() => {
			if (windowBlur.value.didHappen) {
			  return;
			}
			if (props.isActive.value) {
			  const globalSearchGroup = document.getElementById(id);
			  if (!globalSearchGroup?.contains(event.relatedTarget as any)) {
				props.isActive.value = false;
			  }
			}
		  }, 0);
		};
  
		window.addEventListener('blur', blurWindowListener);
		document.addEventListener('focusout', focusOutDocumentListener);
  
		cleanup(() => {
		  window.removeEventListener('blur', blurWindowListener);
		  document.removeEventListener('focusout', focusOutDocumentListener);
		});
	  });

	return (
		<div id={id} class="flex flex-col">
			<h1 class="text-2xl">Homepage 👋</h1>
			<Link class="underline text-blue-600" href="/test">Go to Serbian test route</Link>
			<Link class="underline text-blue-600" href="/en/test/">Go to English test route</Link>
		</div>
	);
});
