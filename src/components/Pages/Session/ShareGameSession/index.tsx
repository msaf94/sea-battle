import { type Component, createSignal } from 'solid-js';

import { Wrapper } from './styles';

export const ShareGameSession: Component = () => {
    const [getIsShared, setIsShared] = createSignal(false);
    const [getIsSessionCopied, setIsSessionCopied] = createSignal(false);

    function handleClick() {
        const title = 'Вызываю тебя на морской бой';
        const sessionLink = window.location.href;
        const dataToShare: ShareData = { text: title, title, url: sessionLink };

        if (navigator.canShare && navigator.canShare(dataToShare)) {
            navigator.share(dataToShare).then(() => setIsShared(true));
        } else {
            navigator.clipboard.writeText(sessionLink).then(() => setIsSessionCopied(true));
        }
    }

    function renderLabel() {
        if (getIsSessionCopied()) return 'Ссылка скопирована';
        if (getIsShared()) return 'Вы поделились сессией';

        return 'Поделиться сессией';
    }

    return <Wrapper onClick={handleClick}>{renderLabel()}</Wrapper>;
};
