import { useEffect, useState } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(function () {
    if (!localStorage.getItem(key)) {
      return [];
    }

    const storedData = JSON.parse(localStorage.getItem(key));

    return storedData;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
