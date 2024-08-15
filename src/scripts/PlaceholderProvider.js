export class PlaceholderProvider {
    /**
     * @type {HTMLDivElement}
     */
    #fakeSelect;

    /**
     * @type {Function}
     */
    #clickCallback;

    /**
     * @type {number}
     */
    #initialSelectedCount;

    /**
     * @type {HTMLSpanElement}
     */
    #placeholder;

    /**
     *
     * @param {object} options
     * @param {HTMLDivElement} fakeSelect
     * @param {number} initialSelectedCount
     */
    constructor(options, fakeSelect, initialSelectedCount) {
        this.options = options;
        this.#fakeSelect = fakeSelect;
        this.#initialSelectedCount = initialSelectedCount;
    }

    /**
     *
     * @param {string} text
     */
    set placeholder(text) {
        this.#placeholder.textContent = text;
    }

    createPlaceholder() {
        this.#placeholder = document.createElement('span');

        this.#placeholder.classList.add(this.options.classes.placeholder);

        if (this.options.el.multiple === true) {
            this.refreshSelectedCount(this.#initialSelectedCount);
        } else {
            this.placeholder = this.#getInitialPlaceholderText();
        }

        this.#fakeSelect.append(this.#placeholder);
    }

    /**
     *
     * @param {number} selectedCount
     */
    refreshSelectedCount(selectedCount) {
        if (selectedCount > 0) {
            this.placeholder = `${selectedCount} ${this.options.i18n.selectedOptions[this.options.i18n.use]}`;
        } else {
            this.placeholder = this.options.el.dataset.placeholder;
        }
    }

    /**
     *
     * @returns {string}
     */
    #getInitialPlaceholderText() {
        let placeholderText = this.options.el.querySelector('option').textContent;

        if (this.#initialSelectedCount > 0) {
            placeholderText = this.options.el.querySelector(':checked').textContent;
        }

        return placeholderText;
    }
}