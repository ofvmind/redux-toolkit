const { useMemo } = require("react");

export const getPagesArray = (totalPages) => {
  const pagesArray = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }

    return arr;
  }, [totalPages]);

  return pagesArray;
};