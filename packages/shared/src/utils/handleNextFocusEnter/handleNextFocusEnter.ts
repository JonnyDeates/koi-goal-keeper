import {type KeyboardEvent} from "react";

export const handleNextFocusEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    const target = event.target as HTMLInputElement;

    const form = target.form;
    if (form) {
      const index = [...form].indexOf(target);
      if (form.elements.length > index + 1) {
        const nextFormElement = form.elements[index + 1] as HTMLElement;
        nextFormElement.focus();
      }
    }
    event.preventDefault();
  }
};
