import { Base } from '@ryze-digital/js-utilities';
import { OptionListProvider } from './OptionListProvider.js';
import { PlaceholderProvider } from './PlaceholderProvider.js';

export class SelectReplace extends Base {
    /**
     * @type {HTMLDivElement}
     */
    #fakeSelect = null;

    /**
     * @type {object}
     */
    #optionListProvider;

    /**
     * @type {object}
     */
    #placeholderProvider;

    /**
     * @type {object}
     */
    #observer;

    /**
     *
     * @param {object} options
     * @param {HTMLSelectElement} [options.el=document.querySelector('select')]
     */
    constructor(options = {}) {
        super({
            el: document.querySelector('select'),
            optionList: {
                calcWidth: true,
                appendTo: document.body
            },
            classes: {
                fakeSelect: 'select-replace',
                placeholder: 'placeholder',
                optionList: 'option-list'
            },
            i18n: {
                languages: ['en', 'de'],
                selectedOptions: {
                    en: 'selected',
                    de: 'ausgewählt'
                },
                use: 'en'
            }
        }, options);

        if (this.options.el.multiple === true && typeof this.options.el.dataset.placeholder === 'undefined') {
            console.error(`Select with id="${this.options.el.id}" is missing data-placeholder`);
        }

        this.#setLanguageToUse();
    }

    init() {
        this.#replaceSelect();

        this.#optionListProvider = new OptionListProvider(
            this.options,
            this.#fakeSelect,
            this.#handleOptionListClick
        );

        this.#placeholderProvider = new PlaceholderProvider(
            this.options,
            this.#fakeSelect,
            this.selectedCount
        );

        this.#placeholderProvider.createPlaceholder();

        this.#observer = new MutationObserver(this.#handleDomChanges);
    }

    update() {
        if (this.#optionListProvider.optionListCreated === true) {
            this.#optionListProvider.syncOptions();
        }

        if (this.options.el.multiple === true) {
            this.#placeholderProvider.refreshSelectedCount(this.selectedCount);
        } else {
            this.#placeholderProvider.placeholder = this.options.el.querySelector('option:checked').textContent;
        }
    }

    /**
     *
     * @returns {number}
     */
    get selectedCount() {
        return this.options.el.querySelectorAll('option:checked').length;
    }

    #setLanguageToUse() {
        if (this.options.i18n.languages.includes(document.documentElement.lang)) {
            this.options.i18n.use = document.documentElement.lang;
        }
    }

    #replaceSelect() {
        this.#fakeSelect = document.createElement('div');
        this.#fakeSelect.classList.add(this.options.classes.fakeSelect);
        this.#fakeSelect.addEventListener('click', this.#handleFakeSelectClick);

        this.options.el.after(this.#fakeSelect);
        this.options.el.style.display = 'none';
    }

    /**
     *
     * @param {object} event
     */
    #handleFakeSelectClick = (event) => {
        event.stopPropagation();

        if (this.#optionListProvider.optionListCreated === false) {
            this.#optionListProvider.createOptionList();
            this.#optionListProvider.syncOptions();
            this.#observer.observe(this.options.el, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }

        if (this.#optionListProvider.visible === true) {
            this.#optionListProvider.hide();
        } else {
            this.#optionListProvider.show();
        }
    };

    /**
     *
     * @param {object} event
     */
    #handleOptionListClick = (event) => {
        const clickedOption = event.target.closest('[data-value]');

        if (clickedOption === null) {
            return;
        }

        const clickedOptionIndex = [].slice.call(this.#optionListProvider.optionList.children).indexOf(clickedOption)
        const realOption = this.options.el.querySelector(`option:nth-child(${clickedOptionIndex + 1})`);

        if (this.options.el.multiple === false) {
            this.#setUnselected();
            this.#setSelected(realOption, clickedOption);
            this.#optionListProvider.hide();
            this.#placeholderProvider.placeholder = event.target.textContent;
        } else {
            this.#toggleSelected(realOption, clickedOption);
            this.#placeholderProvider.refreshSelectedCount(this.selectedCount);
        }

        this.options.el.dispatchEvent(new Event('change'));
    };

    #setUnselected() {
        const realOption = this.options.el.querySelector('option:checked');
        const fakeOption = this.#optionListProvider.optionList.querySelector('[aria-selected="true"]');

        if (realOption !== null) {
            realOption.selected = false;
        }

        if (fakeOption !== null) {
            fakeOption.ariaSelected = 'false';
        }
    }

    /**
     *
     * @param {HTMLOptionElement} realOption
     * @param {HTMLDivElement} fakeOption
     */
    #setSelected(realOption, fakeOption) {
        realOption.selected = true;
        fakeOption.ariaSelected = 'true';
    }

    /**
     *
     * @param {HTMLOptionElement} realOption
     * @param {HTMLDivElement} fakeOption
     */
    #toggleSelected(realOption, fakeOption) {
        realOption.selected = !realOption.selected;
        fakeOption.ariaSelected = fakeOption.ariaSelected === 'true' ? 'false' : 'true';
    }

    #handleDomChanges = () => {
        this.#optionListProvider.syncOptions();

        if (this.options.el.multiple === true) {
            this.#placeholderProvider.refreshSelectedCount(this.selectedCount);
        }
    };
}