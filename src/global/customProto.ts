declare global {
  interface String {
    toSentenceCase(): string;
  }
}

declare global {
  interface Window {
    __WB_MANIFEST: any;
  }
}

String.prototype.toSentenceCase = function (): string {
  return this.split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
};

export {};
