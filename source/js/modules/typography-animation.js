export default class TypographyAnimation {
  constructor(
      element,
      timer,
      classForActivate,
      property
  ) {
    this.element = element;
    this.timer = timer;
    this.classForActivate = classForActivate;
    this.property = property;
    this.timeOffset = 0;

    this.prepareText();
  }

  createElement(letter, indexLetter, indexWord) {
    const span = document.createElement(`span`);
    const delayItem = (indexLetter + 1) * 10 + indexWord * 15;

    span.textContent = letter;
    span.style.transition = `${this.property} ${this.timer}ms ease ${this.timeOffset}ms`;

    if (indexLetter % 2 === 0) {
      this.timeOffset += (20 * 2 + delayItem);
    } else {
      this.timeOffset -= (20 / 2 + delayItem);
    }

    return span;
  }

  prepareText() {
    if (!this.element || this.element.classList.contains(`active`)) {
      return;
    }

    const text = this.element.textContent.trim().split(` `).filter((letter)=>letter !== ``);

    const content = text.reduce((fragmentParent, word, indexWord) => {
      const wordContainer = document.createElement(`span`);
      const wordElement = Array.from(word).reduce((fragment, letter, indexLetter) => {
        fragment.appendChild(this.createElement(letter, indexLetter, indexWord));
        return fragment;
      }, document.createDocumentFragment());

      wordContainer.classList.add(`text-animation__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  runAnimation(index) {
    if (!this.element || this.element.classList.contains(`active`)) {
      return;
    }

    setTimeout(() => {
      this.element.classList.add(this.classForActivate);
    }, index * this.timer);
  }

  destroyAnimation() {
    this.element.classList.remove(this.classForActivate);
  }
}
