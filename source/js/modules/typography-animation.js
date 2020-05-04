export default class TypographyAnimation {
  constructor(
    element,
    timer,
    classForActivate,
    property
  ) {
    this._element = element;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._timeOffset = 0;

    this.prePareText();
  }

  createElement(letter, indexLetter, indexWord) {
    const span = document.createElement(`span`);
    const delayItem = (indexLetter + 1) * 10 + indexWord * 15;

    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;

    if (indexLetter % 2 === 0) {
      this._timeOffset += (20 * 2 + delayItem);
    } else {
      this._timeOffset -= (20 / 2 + delayItem);
    }

    return span;
  }

  prePareText() {
    if (!this._element || this._element.classList.contains(`active`)) return;

    const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== '');

    const content = text.reduce((fragmentParent, word, indexWord) => {
      const wordContainer = document.createElement(`span`);
      const wordElement = Array.from(word).reduce((fragment, latter, indexLetter) => {
        fragment.appendChild(this.createElement(latter, indexLetter, indexWord));
        return fragment;
      }, document.createDocumentFragment());

      wordContainer.classList.add(`text-animation__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation(index) {
    if (!this._element || this._element.classList.contains(`active`)) return;

    setTimeout(() => {
      this._element.classList.add(this._classForActivate);
    }, index * this._timer);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
