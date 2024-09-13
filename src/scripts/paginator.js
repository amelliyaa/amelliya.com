/**
 * For formatting the pages buttons in a paginated UI component, e.g. [1] [2] [3] ... [4]
 * Assumes that the numbers use 1 based indexing.
 * @param curr The current page number.
 * @param last The last page number.
 * @param surroundWith A positive integer denoting the number of pages numbers to display around the
 *                     current page.
 * @return a list of numbers in a paginated format with a -1 placed where the ellipses should be
 */
export const getPaginatedList = (curr, last, surroundWith) => {
  if (surroundWith < 1) {
    throw new Error("surroundWith must be a positive integer");
  }

  // prevent 1 or n from being duplicated in the page list
  curr = clamp(curr, 2, last - 1);

  let pageList = [];
  let canPushEllipses = true;

  for (let page = 1; page <= last; ++page) {
    let isBeside = false;

    // check if page is beside the current page
    for (let i = 1; i <= surroundWith; ++i && !isBeside) {
      if (curr === page + i || curr === page - 1) {
        isBeside = true;
      }
    }

    // add the page or ellipses to the list
    if (page === 1 || page === last || page === curr || isBeside) {
      pageList.push(page);
      canPushEllipses = true;
    } else if (canPushEllipses) {
      pageList.push(-1);
      canPushEllipses = false;
    }
  }

  return pageList;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
